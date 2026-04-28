'use client';

import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function Flashcards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcardSets = [
    {
      id: 1,
      title: "Math Formulas",
      cards: [
        { q: "What is the Pythagorean theorem?", a: "a² + b² = c²" },
        { q: "What is the formula for area of a circle?", a: "πr²" },
        { q: "What is the slope formula?", a: "(y₂ - y₁) / (x₂ - x₁)" },
      ],
    },
    {
      id: 2,
      title: "Biology Terms",
      cards: [
        { q: "What is photosynthesis?", a: "Process where plants convert light into chemical energy" },
        { q: "Define mitochondria", a: "The powerhouse of the cell" },
      ],
    },
  ];

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Flashcards</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flashcard Sets */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Sets</h2>
            <div className="space-y-2">
              {flashcardSets.map((set, index) => (
                <button
                  key={set.id}
                  onClick={() => {
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full text-left p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-600"
                >
                  <h3 className="font-semibold text-gray-900">{set.title}</h3>
                  <p className="text-sm text-gray-600">{set.cards.length} cards</p>
                </button>
              ))}
            </div>
          </div>

          {/* Flashcard Display */}
          <div className="lg:col-span-2">
            {flashcardSets.length > 0 && (
              <>
                <div
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-12 min-h-96 flex items-center justify-center cursor-pointer transform transition hover:scale-105"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide mb-4 opacity-75">
                      {isFlipped ? "Answer" : "Question"}
                    </p>
                    <p className="text-2xl font-semibold">
                      {isFlipped
                        ? flashcardSets[0].cards[currentCard]?.a
                        : flashcardSets[0].cards[currentCard]?.q}
                    </p>
                    <p className="text-xs opacity-75 mt-8">Click to flip</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() =>
                      setCurrentCard(
                        currentCard === 0
                          ? flashcardSets[0].cards.length - 1
                          : currentCard - 1
                      )
                    }
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 font-semibold">
                    {currentCard + 1} / {flashcardSets[0].cards.length}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentCard(
                        currentCard === flashcardSets[0].cards.length - 1
                          ? 0
                          : currentCard + 1
                      )
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
