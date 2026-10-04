/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { PageId, ProgramItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProgramModal } from './components/ProgramModal';

import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { ImpactPage } from './components/pages/ImpactPage';
import { VisionPage } from './components/pages/VisionPage';
import { TeamPage } from './components/pages/TeamPage';
import { PartnersPage } from './components/pages/PartnersPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { GetInvolvedPage } from './components/pages/GetInvolvedPage';
import { DonatePage } from './components/pages/DonatePage';
import { AdminPage } from './components/pages/AdminPage';

const validPages: PageId[] = [
  'home',
  'about',
  'programs',
  'impact',
  'vision',
  'team',
  'partners',
  'reports',
  'get-involved',
  'donate',
  'admin',
];

const pageToPath = (page: PageId) => (page === 'home' ? '/' : `/${page}`);
const pathToPage = (path: string): PageId => {
  const normalized = path.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '') || 'home';
  const normalizedValue = normalized === '' ? 'home' : normalized;
  return validPages.includes(normalizedValue as PageId)
    ? (normalizedValue as PageId)
    : 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  // Scroll to top on page transition and update the browser URL to a real path.
  const handleNavigate = (page: PageId) => {
    const nextPath = pageToPath(page);
    const currentPath = window.location.pathname;

    if (currentPath !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keep selected page in sync with browser forward/back history and legacy hash URLs.
  useEffect(() => {
    const syncPageFromLocation = () => {
      const hashPage = window.location.hash.replace(/^#\/?/, '');
      const nextPage = pathToPage(hashPage ? `/${hashPage}` : window.location.pathname);

      if (validPages.includes(nextPage)) {
        setCurrentPage(nextPage);
      }
    };

    syncPageFromLocation();

    window.addEventListener('popstate', syncPageFromLocation);
    window.addEventListener('hashchange', syncPageFromLocation);

    return () => {
      window.removeEventListener('popstate', syncPageFromLocation);
      window.removeEventListener('hashchange', syncPageFromLocation);
    };
  }, []);

  const handleSelectProgram = (program: ProgramItem) => {
    setSelectedProgram(program);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  return (
    <MotionConfig reducedMotion="never">
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#2C0E40] selection:text-[#F0C747]">
        {/* Navigation Bar */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main Content Area with Page Transition Animation */}
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProgram={handleSelectProgram}
              />
            )}

            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

            {currentPage === 'programs' && (
              <ProgramsPage
                onNavigate={handleNavigate}
                onSelectProgram={handleSelectProgram}
              />
            )}

            {currentPage === 'impact' && (
              <ImpactPage
                onNavigate={handleNavigate}
                onSelectProgram={handleSelectProgram}
              />
            )}

            {currentPage === 'vision' && <VisionPage onNavigate={handleNavigate} />}

            {currentPage === 'team' && <TeamPage onNavigate={handleNavigate} />}

            {currentPage === 'partners' && <PartnersPage onNavigate={handleNavigate} />}

            {currentPage === 'reports' && <ReportsPage onNavigate={handleNavigate} />}

            {currentPage === 'get-involved' && (
              <GetInvolvedPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'donate' && <DonatePage onNavigate={handleNavigate} />}

            {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Program Details Modal */}
      <ProgramModal
        program={selectedProgram}
        onClose={handleCloseModal}
        onGetInvolved={() => {
          handleCloseModal();
          handleNavigate('get-involved');
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  </MotionConfig>
  );
}
