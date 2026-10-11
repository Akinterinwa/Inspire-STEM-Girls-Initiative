import 'dotenv/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import admin from 'firebase-admin';

export const ADMIN_SESSION_COOKIE = 'isg_admin_session';
export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
export const ADMIN_SESSION_TTL_SECONDS = ADMIN_SESSION_TTL_MS / 1000;

const DEFAULT_ADMIN_PASSWORD = 'admin123';

export function getAdminPassword() {
  const raw = process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  if (!raw || !raw.trim()) {
    return DEFAULT_ADMIN_PASSWORD;
  }
  return raw.trim().replace(/^["']|["']$/g, '');
}

export function parseRequestBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function isAdminPasswordValid(candidatePassword) {
  if (typeof candidatePassword !== 'string' || !candidatePassword.trim()) {
    return false;
  }

  const cleanCandidate = candidatePassword.trim().replace(/^["']|["']$/g, '');
  const activePassword = getAdminPassword();

  const candidateBuf = Buffer.from(cleanCandidate);
  const expectedBuf = Buffer.from(activePassword);

  if (candidateBuf.length === expectedBuf.length && timingSafeEqual(candidateBuf, expectedBuf)) {
    return true;
  }

  // Fallback aliases if custom APP_ADMIN_PASSWORD wasn't set
  const hasCustomPassword = Boolean(process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD);
  if (!hasCustomPassword) {
    if (cleanCandidate === 'admin123' || cleanCandidate === 'isg-initiative' || cleanCandidate === 'admin') {
      return true;
    }
  }

  return false;
}

export function createAdminSessionToken() {
  const adminPassword = getAdminPassword();
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = String(expiresAt);
  const signature = createHmac('sha256', adminPassword).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token) {
  const adminPassword = getAdminPassword();
  if (!token || typeof token !== 'string') return false;

  const [payload, signature] = token.split('.');
  const expiresAt = Number(payload);

  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expectedSignature = createHmac('sha256', adminPassword).update(payload).digest();
  const providedSignature = /^[a-f0-9]{64}$/i.test(signature || '')
    ? Buffer.from(signature, 'hex')
    : Buffer.alloc(0);

  return (
    providedSignature.length === expectedSignature.length &&
    expectedSignature.length > 0 &&
    timingSafeEqual(providedSignature, expectedSignature)
  );
}

export function extractSessionToken(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization || '';
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  const cookieHeader = req.headers?.cookie || req.headers?.Cookie || '';
  const cookiePrefix = `${ADMIN_SESSION_COOKIE}=`;
  const tokenFromCookie = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  return tokenFromCookie || '';
}

export function buildAdminCookie(token, maxAge = ADMIN_SESSION_TTL_SECONDS, isSecure = false) {
  const secureFlag = isSecure ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secureFlag}`;
}

// ----------------- Feed Storage & Firebase -----------------

export const DEFAULT_FEED = [
  {
    id: 'ig-Dd8oKlKDODg',
    url: 'https://www.instagram.com/p/Dd8oKlKDODg/?utm_source=ig_web_copy_link',
    shortcode: 'Dd8oKlKDODg',
    addedAt: new Date().toISOString(),
  },
];

let inMemoryFeed = [...DEFAULT_FEED];
let firestoreDb = null;
let realtimeDb = null;
let firebaseInitialized = false;

export function initFirebase() {
  if (firebaseInitialized) return { firestoreDb, realtimeDb };
  firebaseInitialized = true;

  try {
    const rawPossibleJson = [
      process.env.FIREBASE_SERVICE_ACCOUNT,
      process.env.FIREBASE_CONFIG,
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    ].find((v) => typeof v === 'string' && v.trim().startsWith('{'));

    const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
    const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const rawDatabaseUrl = process.env.FIREBASE_DATABASE_URL;
    const isPlaceholderDb = !rawDatabaseUrl || rawDatabaseUrl.includes('your-database-name') || !rawDatabaseUrl.startsWith('https://');
    const firebaseDatabaseUrl = isPlaceholderDb ? undefined : rawDatabaseUrl.trim();

    const candidateFiles = [
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
      path.join(process.cwd(), 'firebase-service-account.json'),
      path.join(process.cwd(), 'serviceAccountKey.json'),
    ].filter(Boolean);

    const existingFile = candidateFiles.find((f) => {
      try {
        return typeof f === 'string' && !f.trim().startsWith('{') && fs.existsSync(f) && fs.statSync(f).isFile();
      } catch {
        return false;
      }
    });

    let credential = null;
    if (rawPossibleJson) {
      credential = admin.credential.cert(JSON.parse(rawPossibleJson));
    } else if (existingFile) {
      credential = admin.credential.cert(JSON.parse(fs.readFileSync(existingFile, 'utf8')));
    } else if (firebaseProjectId && firebaseClientEmail && firebasePrivateKey) {
      credential = admin.credential.cert({
        projectId: firebaseProjectId,
        clientEmail: firebaseClientEmail,
        privateKey: firebasePrivateKey,
      });
    }

    if (credential && admin.apps.length === 0) {
      admin.initializeApp({
        credential,
        ...(firebaseDatabaseUrl ? { databaseURL: firebaseDatabaseUrl } : {}),
      });
    }

    if (admin.apps.length > 0) {
      if (firebaseDatabaseUrl) {
        realtimeDb = admin.database();
      } else {
        firestoreDb = admin.firestore();
      }
    }
  } catch (err) {
    console.warn('[Firebase] Init notice:', err.message);
  }

  return { firestoreDb, realtimeDb };
}

function getFeedFilePath() {
  return path.join(process.cwd(), 'data', 'instagram-feed.json');
}

export function readFeedFromFile() {
  try {
    const filePath = getFeedFilePath();
    if (fs.existsSync(filePath)) {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryFeed = parsed;
        return parsed;
      }
    }
  } catch (_) {}
  return inMemoryFeed;
}

export function writeFeedToFile(feed) {
  inMemoryFeed = feed;
  try {
    const filePath = getFeedFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(feed, null, 2), 'utf8');
  } catch (_) {
    // In read-only serverless environments, inMemoryFeed persists for instance lifetime
  }
}

export function extractShortcode(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const match = rawUrl.trim().match(/(?:instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+))/i);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{5,25}$/.test(rawUrl.trim())) {
    return rawUrl.trim();
  }
  return null;
}

export async function readFeed() {
  const { firestoreDb: fDb, realtimeDb: rDb } = initFirebase();
  const realtimeFeedPath = process.env.FIREBASE_FEED_PATH || 'instagramFeed';
  const firestoreCollection = process.env.FIRESTORE_FEED_COLLECTION || 'instagramFeed';

  if (rDb) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('RealtimeDB read timeout')), 3500)
      );
      const snapshot = await Promise.race([rDb.ref(realtimeFeedPath).once('value'), timeoutPromise]);
      const value = snapshot.val();
      if (value && typeof value === 'object') {
        return Object.entries(value)
          .map(([id, item]) => ({ id, ...item }))
          .sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || ''));
      }
    } catch (_) {}
  }

  if (fDb) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firestore read timeout')), 3500)
      );
      const snapshot = await Promise.race([
        fDb.collection(firestoreCollection).orderBy('addedAt', 'desc').get(),
        timeoutPromise,
      ]);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (items.length > 0) return items;
    } catch (_) {}
  }

  return readFeedFromFile();
}

export async function writeFeed(feed) {
  const { firestoreDb: fDb, realtimeDb: rDb } = initFirebase();
  const realtimeFeedPath = process.env.FIREBASE_FEED_PATH || 'instagramFeed';
  const firestoreCollection = process.env.FIRESTORE_FEED_COLLECTION || 'instagramFeed';

  if (rDb) {
    try {
      const value = Object.fromEntries(
        feed.map((item) => [
          item.id || rDb.ref(realtimeFeedPath).push().key,
          { ...item, addedAt: item.addedAt || new Date().toISOString() },
        ])
      );
      await rDb.ref(realtimeFeedPath).set(value);
      return;
    } catch (_) {}
  }

  if (fDb) {
    try {
      const batch = fDb.batch();
      const snapshot = await fDb.collection(firestoreCollection).get();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      feed.forEach((item) => {
        const ref = fDb.collection(firestoreCollection).doc(item.id || `ig-${Date.now()}`);
        batch.set(ref, { ...item, addedAt: item.addedAt || new Date().toISOString() });
      });
      await batch.commit();
      return;
    } catch (_) {}
  }

  writeFeedToFile(feed);
}

export async function addFeedItem(url) {
  const cache = await readFeed();
  const shortcode = extractShortcode(url);
  if (!shortcode) {
    return {
      success: false,
      message: 'Invalid Instagram link. Please paste a link like https://www.instagram.com/p/Dd8oKlKDODg/',
    };
  }

  if (cache.some((item) => item.shortcode === shortcode)) {
    return { success: false, message: 'This Instagram post is already in your feed.' };
  }

  const cleanUrl = `https://www.instagram.com/p/${shortcode}/`;
  const newItem = {
    id: `ig-${shortcode}-${Date.now()}`,
    url: cleanUrl,
    shortcode,
    addedAt: new Date().toISOString(),
  };

  const nextFeed = [newItem, ...cache];
  await writeFeed(nextFeed);
  return { success: true, item: newItem, feed: nextFeed };
}

export async function removeFeedItem(id) {
  const current = await readFeed();
  const nextFeed = current.filter((item) => item.id !== id && item.shortcode !== id);
  await writeFeed(nextFeed);
  return { success: true, feed: nextFeed };
}

export async function resetFeed() {
  const reset = [...DEFAULT_FEED];
  await writeFeed(reset);
  return { success: true, item: reset[0] };
}

// ----------------- HTTP Route Handlers -----------------

export async function handleAdminLogin(req, res) {
  const body = parseRequestBody(req);
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: false,
        message: 'Admin password is not configured on the server. Please set APP_ADMIN_PASSWORD in environment variables.',
      })
    );
  }

  if (!isAdminPasswordValid(body?.password)) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: false,
        message: 'Incorrect admin password.',
      })
    );
  }

  const token = createAdminSessionToken();
  const isSecure = process.env.NODE_ENV === 'production' || req.headers?.['x-forwarded-proto'] === 'https';
  res.setHeader('Set-Cookie', buildAdminCookie(token, ADMIN_SESSION_TTL_SECONDS, isSecure));
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ success: true, token }));
}

export async function handleAdminLogout(req, res) {
  const isSecure = process.env.NODE_ENV === 'production' || req.headers?.['x-forwarded-proto'] === 'https';
  res.setHeader('Set-Cookie', buildAdminCookie('', 0, isSecure));
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ success: true }));
}

export async function handleHealth(req, res) {
  const { firestoreDb: fDb, realtimeDb: rDb } = initFirebase();
  const mode = rDb ? 'realtime-database' : fDb ? 'firestore' : 'file';
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ ok: true, service: 'instagram-feed-api', mode }));
}

export async function handleInstagramFeed(req, res) {
  if (req.method === 'GET') {
    try {
      const items = await readFeed();
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(items));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Failed to load feed' }));
    }
  }

  if (req.method === 'POST') {
    const token = extractSessionToken(req);
    if (!verifyAdminSessionToken(token)) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, message: 'Admin sign-in required.' }));
    }

    try {
      const body = parseRequestBody(req);
      const { action, url, id } = body;

      if (action === 'reset') {
        const result = await resetFeed();
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(result));
      }

      if (action === 'remove') {
        const result = await removeFeedItem(id);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(result));
      }

      if (action === 'add') {
        const result = await addFeedItem(url);
        res.statusCode = result.success ? 200 : 400;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(result));
      }

      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, message: 'Unsupported action.' }));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, message: 'Instagram feed operation failed.' }));
    }
  }

  res.statusCode = 405;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ error: 'Method not allowed' }));
}
