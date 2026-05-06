'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import { SummarySection } from '@/components/summary';

interface Summary {
  documentId: string;
  documentName: string;
  summary: string;
  status: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
}

export default function Summaries() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample summaries data
  const summaries: Summary[] = [
    {
      documentId: 'doc-001',
      documentName: 'Math Notes - Chapter 5',
      summary:
        'This chapter covers fundamental calculus concepts including derivatives, integrals, and their real-world applications. The derivative represents the rate of change of a function at any point, while the integral calculates the area under a curve. Key theorems include the Fundamental Theorem of Calculus, which links differentiation and integration. Applications include optimization problems, physics (motion and forces), and economics (marginal analysis). The chapter emphasizes understanding these concepts through graphical representations and practical problem-solving.',
      status: 'completed',
      flashcardsCount: 24,
      date: '2025-04-25',
    },
    {
      documentId: 'doc-002',
      documentName: 'Biology Study Guide',
      summary:
        'A comprehensive study guide on cellular biology and energy processes in living organisms. Cell biology covers cell structure (prokaryotic vs eukaryotic), organelles and their functions, and the cell membrane. Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose, occurring in the chloroplasts. Cellular respiration, mainly occurring in mitochondria, breaks down glucose to produce ATP for cellular energy. The guide includes detailed diagrams of both processes and their importance in ecosystems.',
      status: 'completed',
      flashcardsCount: 18,
      date: '2025-04-24',
    },
    {
      documentId: 'doc-003',
      documentName: 'History Timeline',
      summary:
        'A comprehensive timeline documenting major historical events from ancient civilizations to the modern era. Ancient period covers Egyptian, Mesopotamian, Greek, and Roman civilizations. Medieval period includes the fall of Rome, rise of feudalism, and Islamic Golden Age. Modern history encompasses the Renaissance, Age of Exploration, Industrial Revolution, World Wars, and contemporary events. Each era highlights key political, social, economic, and cultural developments that shaped human civilization.',
      status: 'processing',
      flashcardsCount: 15,
      date: '2025-04-23',
    },
    {
      documentId: 'doc-004',
      documentName: 'Chemistry Reactions',
      summary:
        'A detailed guide on chemical reactions and stoichiometry. Topics include types of reactions (synthesis, decomposition, single replacement, double replacement, combustion), balancing chemical equations using coefficients, and the law of conservation of mass. Stoichiometry involves calculating quantities of reactants and products using molar ratios. The guide covers limiting reactants, theoretical yield, and percent yield. Real-world applications include industrial chemical processes and environmental chemistry.',
      status: 'completed',
      flashcardsCount: 32,
      date: '2025-04-22',
    },
    {
      documentId: 'doc-005',
      documentName: 'Physics Laws Summary',
      summary:
        "Newton's Laws of Motion form the foundation of classical mechanics. The First Law states that objects remain at rest or in uniform motion unless acted upon by a force. The Second Law defines force as mass times acceleration (F=ma). The Third Law states that for every action, there is an equal and opposite reaction. The guide covers kinematics, dynamics, work, energy, momentum, and rotational motion. Applications include vehicle motion, projectile motion, and planetary orbits.",
      status: 'pending',
      date: '2025-04-21',
    },
    {
      documentId: 'doc-006',
      documentName: 'Literature Analysis',
      summary:
        'An analysis of classic literature covering major themes, character development, and literary devices. Themes often explored include coming of age, good vs evil, love and sacrifice, and societal challenges. Character development shows how protagonists evolve through conflicts and choices. Literary devices include metaphor, symbolism, foreshadowing, and irony that enhance storytelling. The analysis includes comparative studies of different literary periods and their cultural contexts, providing insights into how literature reflects and shapes society.',
      status: 'completed',
      flashcardsCount: 21,
      date: '2025-04-20',
    },
    {
      documentId: 'doc-007',
      documentName: 'Economics Principles',
      summary:
        'Fundamental principles of economics including supply and demand, market structures, and economic systems. Supply and demand determine market prices and quantities. Market structures range from perfect competition to monopoly, each affecting pricing and output. GDP measures economic output, while inflation and unemployment affect economic health. Fiscal and monetary policies are tools governments use to manage economies. The guide covers both microeconomics (individual choices) and macroeconomics (aggregate behavior).',
      status: 'completed',
      flashcardsCount: 19,
      date: '2025-04-19',
    },
    {
      documentId: 'doc-008',
      documentName: 'Psychology Fundamentals',
      summary:
        'An introduction to psychological concepts including cognitive processes, learning, memory, and behavior. The brain structure and neurotransmitter functions underpin psychological processes. Learning occurs through conditioning (classical and operant) and observation. Memory involves encoding, storage, and retrieval of information. Developmental psychology covers lifespan changes from infancy to old age. Mental health and psychological disorders are addressed with treatment approaches.',
      status: 'processing',
      flashcardsCount: 20,
      date: '2025-04-18',
    },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <SummarySection summaries={summaries} columns={2} />
        </div>
      </div>
    </div>
  );
}
