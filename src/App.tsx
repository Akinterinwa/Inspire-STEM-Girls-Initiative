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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  // Scroll to top on page transition
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Allow browser back/forward or simple URL hash sync if hash is present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
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
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProgram = (program: ProgramItem) => {
    setSelectedProgram(program);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  return (
    <MotionConfig reducedMotion="never">
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#0e4b3c] selection:text-white">
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
