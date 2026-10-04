import 'dotenv/config';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_SESSION_COOKIE = 'isg_admin_session';
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const ADMIN_SESSION_TTL_SECONDS = ADMIN_SESSION_TTL_MS / 1000;
const adminPassword = process.env.APP_ADMIN_PASSWORD;
const adminSessions = new Map();
const DATA_DIR = path.join(__dirname, 'data');
const FEED_FILE = path.join(DATA_DIR, 'instagram-feed.json');
const DEFAULT_FEED = [
  {
    id: 'ig-Dd8oKlKDODg',
    url: 'https://www.instagram.com/p/Dd8oKlKDODg/?utm_source=ig_web_copy_link',
    shortcode: 'Dd8oKlKDODg',
    addedAt: new Date().toISOString(),
  },
];

const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const firebaseServiceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
const firebaseDatabaseUrl = process.env.FIREBASE_DATABASE_URL;
const realtimeFeedPath = process.env.FIREBASE_FEED_PATH || 'instagramFeed';
const firestoreCollection = process.env.FIRESTORE_FEED_COLLECTION || 'instagramFeed';

let firestoreDb = null;
let realtimeDb = null;

if (firebaseServiceAccountPath || (firebaseProjectId && firebaseClientEmail && firebasePrivateKey)) {
  const credential = firebaseServiceAccountPath
    ? admin.credential.cert(JSON.parse(fs.readFileSync(path.resolve(firebaseServiceAccountPath), 'utf8')))
    : admin.credential.cert({
      projectId: firebaseProjectId,
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey,
    });

  admin.initializeApp({
    credential,
    ...(firebaseDatabaseUrl ? { databaseURL: firebaseDatabaseUrl } : {}),
  });
  if (firebaseDatabaseUrl) {
    realtimeDb = admin.database();
    console.log('Firebase Realtime Database connected for shared Instagram feed.');
  } else {
    firestoreDb = admin.firestore();
    console.log('Firestore connected for shared Instagram feed.');
  }
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(FEED_FILE)) {
    fs.writeFileSync(FEED_FILE, JSON.stringify(DEFAULT_FEED, null, 2), 'utf8');
  }
}

function readFeedFromFile() {
  ensureDataFile();

  try {
    const fileContents = fs.readFileSync(FEED_FILE, 'utf8');
    const parsed = JSON.parse(fileContents);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to parse shared Instagram feed. Resetting to default.', error);
  }

  fs.writeFileSync(FEED_FILE, JSON.stringify(DEFAULT_FEED, null, 2), 'utf8');
  return DEFAULT_FEED;
}

function writeFeedToFile(feed) {
  ensureDataFile();
  fs.writeFileSync(FEED_FILE, JSON.stringify(feed, null, 2), 'utf8');
}

function extractShortcode(rawUrl) {
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

async function readFeed() {
  if (realtimeDb) {
    const snapshot = await realtimeDb.ref(realtimeFeedPath).once('value');
    const value = snapshot.val();
    if (!value || typeof value !== 'object') {
      return [...DEFAULT_FEED];
    }

    return Object.entries(value)
      .map(([id, item]) => ({ id, ...item }))
      .sort((first, second) => second.addedAt.localeCompare(first.addedAt));
  }

  if (firestoreDb) {
    const snapshot = await firestoreDb.collection(firestoreCollection).orderBy('addedAt', 'desc').get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items.length > 0 ? items : [...DEFAULT_FEED];
  }

  return readFeedFromFile();
}

async function writeFeed(feed) {
  if (realtimeDb) {
    const value = Object.fromEntries(feed.map((item) => [
      item.id || realtimeDb.ref(realtimeFeedPath).push().key,
      { ...item, addedAt: item.addedAt || new Date().toISOString() },
    ]));
    await realtimeDb.ref(realtimeFeedPath).set(value);
    return;
  }

  if (firestoreDb) {
    const batch = firestoreDb.batch();
    const snapshot = await firestoreDb.collection(firestoreCollection).get();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));

    feed.forEach((item) => {
      const ref = firestoreDb.collection(firestoreCollection).doc(item.id || `ig-${Date.now()}`);
      batch.set(ref, { ...item, addedAt: item.addedAt || new Date().toISOString() });
    });

    await batch.commit();
    return;
  }

  writeFeedToFile(feed);
}

async function ensureDefaultEntry() {
  if (realtimeDb) {
    const snapshot = await realtimeDb.ref(realtimeFeedPath).limitToFirst(1).once('value');
    if (!snapshot.exists()) {
      await writeFeed([...DEFAULT_FEED]);
    }
    return;
  }

  if (!firestoreDb) {
    return;
  }

  const snapshot = await firestoreDb.collection(firestoreCollection).limit(1).get();
  if (snapshot.empty) {
    await writeFeed([...DEFAULT_FEED]);
  }
}

async function addFeedItem(url) {
  const cache = await readFeed();
  const shortcode = extractShortcode(url);
  if (!shortcode) {
    return { success: false, message: 'Invalid Instagram link. Please paste a link like https://www.instagram.com/p/Dd8oKlKDODg/' };
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

  if (realtimeDb) {
    const newItemRef = realtimeDb.ref(realtimeFeedPath).push();
    newItem.id = newItemRef.key;
    await newItemRef.set(newItem);
    const nextFeed = [newItem, ...cache];
    return { success: true, item: newItem, feed: nextFeed };
  }

  const nextFeed = [newItem, ...cache];
  await writeFeed(nextFeed);
  return { success: true, item: newItem, feed: nextFeed };
}

async function removeFeedItem(id) {
  const current = await readFeed();
  if (realtimeDb) {
    const item = current.find((entry) => entry.id === id || entry.shortcode === id);
    if (item) {
      await realtimeDb.ref(`${realtimeFeedPath}/${item.id}`).remove();
    }
    return { success: true, feed: current.filter((entry) => entry.id !== id && entry.shortcode !== id) };
  }

  const nextFeed = current.filter((item) => item.id !== id && item.shortcode !== id);
  await writeFeed(nextFeed);
  return { success: true, feed: nextFeed };
}

async function resetFeed() {
  const resetFeed = [...DEFAULT_FEED];
  await writeFeed(resetFeed);
  return { success: true, item: resetFeed[0] };
}

app.use(express.json({ limit: '1mb' }));

function isAdminPasswordValid(password) {
  if (!adminPassword || typeof password !== 'string') {
    return false;
  }

  const candidate = Buffer.from(password);
  const expected = Buffer.from(adminPassword);
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function requireAdminSession(req, res, next) {
  const cookiePrefix = `${ADMIN_SESSION_COOKIE}=`;
  const sessionToken = (req.headers.cookie || '')
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);
  const expiresAt = sessionToken ? adminSessions.get(sessionToken) : null;

  if (!expiresAt || expiresAt <= Date.now()) {
    if (sessionToken) adminSessions.delete(sessionToken);
    return res.status(401).json({ success: false, message: 'Admin sign-in required.' });
  }

  return next();
}

function adminCookieOptions(maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

app.post('/api/admin/login', (req, res) => {
  if (!adminPassword) {
    return res.status(503).json({ success: false, message: 'Admin password is not configured on the server.' });
  }

  if (!isAdminPasswordValid(req.body?.password)) {
    return res.status(401).json({ success: false, message: 'Incorrect admin password.' });
  }

  const sessionToken = randomBytes(32).toString('hex');
  adminSessions.set(sessionToken, Date.now() + ADMIN_SESSION_TTL_MS);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${ADMIN_SESSION_COOKIE}=${sessionToken}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${ADMIN_SESSION_TTL_SECONDS}${secure}`);
  return res.json({ success: true });
});

app.post('/api/admin/logout', (req, res) => {
  const cookiePrefix = `${ADMIN_SESSION_COOKIE}=`;
  const sessionToken = (req.headers.cookie || '')
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);
  if (sessionToken) adminSessions.delete(sessionToken);
  res.setHeader('Set-Cookie', adminCookieOptions(0));
  return res.json({ success: true });
});

app.get('/health', (req, res) => {
  const mode = realtimeDb ? 'realtime-database' : firestoreDb ? 'firestore' : 'file';
  res.json({ ok: true, service: 'instagram-feed-api', mode });
});

app.get('/api/instagram-feed', async (req, res) => {
  try {
    const items = await readFeed();
    res.json(items);
  } catch (error) {
    console.error('Failed to read shared Instagram feed:', error);
    res.status(500).json({ error: 'Failed to load feed' });
  }
});

app.post('/api/instagram-feed', requireAdminSession, async (req, res) => {
  try {
    const { action, url, id } = req.body || {};

    if (action === 'reset') {
      const result = await resetFeed();
      return res.json(result);
    }

    if (action === 'remove') {
      const result = await removeFeedItem(id);
      return res.json(result);
    }

    if (action === 'add') {
      const result = await addFeedItem(url);
      if (!result.success) {
        return res.status(400).json(result);
      }
      return res.json(result);
    }

    return res.status(400).json({ success: false, message: 'Unsupported action.' });
  } catch (error) {
    console.error('Instagram feed operation failed:', error);
    res.status(500).json({ success: false, message: 'Instagram feed operation failed.' });
  }
});

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Instagram feed API is running. Start the Vite app with npm run dev to view the site.',
      api: '/api/instagram-feed',
    });
  });
}

await ensureDefaultEntry();
app.listen(PORT, () => {
  console.log(`Instagram sync API running at http://localhost:${PORT}`);
});
