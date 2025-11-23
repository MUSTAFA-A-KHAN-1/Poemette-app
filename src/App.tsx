import React, { useState, useEffect, useMemo, FC } from 'react';

// Define types for the static poem data
interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  year: number;
}

// --- Static Poem Data ---
const initialPoems: Poem[] = [
  {
    id: 'p1',
    title: 'A Red, Red Rose',
    author: 'Robert Burns',
    content: "O my Luve is like a red, red rose,\nThat’s newly sprung in June;\nO my Luve is like the melody,\nThat’s sweetly play’d in tune.\n\nAs fair art thou, my bonnie lass,\nSo deep in luve am I;\nAnd I will luve thee still, my dear,\nTill a’ the seas gang dry.",
    year: 1794,
  },
  {
    id: 'p2',
    title: 'The Road Not Taken',
    author: 'Robert Frost',
    content: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;\n\nThen took the other, as just as fair,\nAnd having perhaps the better claim,\nBecause it was grassy and wanted wear;\nThough as for that the passing there\nHad worn them really about the same.",
    year: 1916,
  },
  {
    id: 'p3',
    title: 'Sonnet 18',
    author: 'William Shakespeare',
    content: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date:\n\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;\nAnd every fair from fair sometime declines,\nBy chance or nature's changing course untrimm'd.",
    year: 1609,
  },
];

// --- Component Definition ---
const App: FC = () => {
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [fontMode, setFontMode] = useState<'cursive' | 'serif' | 'allura'>('cursive'); 

  // Dynamic style based on the selected font mode
  const fontStyle = useMemo(() => {
    let family: string;
    let height: string;

    if (fontMode === 'cursive') {
      family = 'cursive, "Segoe Script", "Brush Script MT", "Lucida Handwriting", "Monotype Corsiva", sans-serif';
      height = '2';
    } else if (fontMode === 'allura') {
      family = 'Allura, cursive, sans-serif'; 
      height = '1.8';
    } else { // serif (Georgia)
      family = 'Georgia, serif'; 
      height = '1.8'; 
    }
    return { fontFamily: family, lineHeight: height };
  }, [fontMode]);

  // Type assertion for selectedPoem since it can be undefined
  const selectedPoem: Poem | undefined = initialPoems.find(p => p.id === selectedPoemId);

  // Load the first poem on component mount
  useEffect(() => {
    if (initialPoems.length > 0 && !selectedPoemId) {
      setSelectedPoemId(initialPoems[0].id);
    }
  }, [selectedPoemId]);

  const handleSelectPoem = (id: string) => {
    setSelectedPoemId(id);
  };
  
  // Set font handler
  const setFont = (mode: 'cursive' | 'serif' | 'allura') => {
    setFontMode(mode);
  };

  // Component for Poem Card - explicitly typed props
  const PoemCard: FC<{ poem: Poem }> = ({ poem }) => (
    <div
      onClick={() => handleSelectPoem(poem.id)}
      className={`p-4 border-b border-gray-100 cursor-pointer transition duration-300 ease-in-out ${
        poem.id === selectedPoemId
          ? 'bg-amber-200 border-l-4 border-amber-800 shadow-inner text-amber-900'
          : 'hover:bg-amber-50 text-gray-700'
      }`}
    >
      {/* Poem title uses the dynamic font style */}
      <h3 className="text-xl font-bold truncate" style={fontStyle}>
        {poem.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        by {poem.author}
      </p>
    </div>
  );

  const PoemViewer: FC = () => {
    if (!selectedPoem) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-xl font-semibold mb-2">Select a Poem</p>
          <p>Choose a title from the collection on the left.</p>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col h-full p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full p-10 md:p-12 bg-white rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:shadow-3xl"
             style={{
               backgroundImage: 'radial-gradient(circle at 100% 100%, #fef3c7, #fff7e6, #fff)',
               border: '1px solid #f59e0b20'
             }}
        >
          {/* Header */}
          <header className="mb-8 pb-4 border-b-2 border-amber-300 border-opacity-50 text-center">
            {/* Title uses the dynamic font style */}
            <h1 className="text-5xl text-amber-900 font-extrabold mb-2 leading-tight" style={fontStyle}>
              {selectedPoem.title}
            </h1>
            <h2 className="text-2xl font-serif text-gray-600 italic mt-3">
              — {selectedPoem.author}
            </h2>
          </header>

          {/* Content */}
          <main className="text-center">
            {/* Poem content uses the dynamic font style */}
            <div
              className="text-2xl text-gray-800 whitespace-pre-wrap leading-relaxed"
              style={fontStyle}
            >
              {selectedPoem.content}
            </div>
          </main>
          
          <footer className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-500 font-mono">
            Original Publication Year: {selectedPoem.year}
          </footer>
        </div>
      </div>
    );
  };


  return (
    <div className="flex h-screen antialiased" style={{ backgroundColor: '#fdf6e3' /* Light Cream/Parchment Background */ }}>
      {/* Font link added to the DOM */}
      <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />

      {/* Sidebar - Poem List (Book Spine Look) */}
      <div className="w-80 border-r border-amber-300 bg-amber-50 shadow-lg flex flex-col">
        <div className="p-4 border-b border-amber-300 bg-amber-200">
          <h2 className="text-2xl font-extrabold text-amber-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            Poemette
          </h2>
        </div>
        
        {/* 2. Font Selection Segmented Control */}
        <div className="p-4 border-b border-amber-200">
            <p className="text-sm text-amber-700 font-semibold mb-2">Reading Style:</p>
            <div className="flex justify-between bg-amber-100 rounded-lg p-1 space-x-1 shadow-inner">
                {['serif', 'allura', 'cursive'].map(mode => (
                    <button
                        key={mode}
                        onClick={() => setFont(mode as 'serif' | 'allura' | 'cursive')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                            fontMode === mode
                                ? 'bg-amber-600 text-white shadow-md'
                                : 'text-amber-700 hover:bg-amber-300'
                        }`}
                        // Apply font-specific style only to the button content for preview
                        style={{ fontFamily: mode === 'allura' ? 'Allura, sans-serif' : (mode === 'cursive' ? 'cursive, sans-serif' : 'serif') }}
                    >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                ))}
            </div>
        </div>

        <div className="p-4 bg-amber-100 border-b border-amber-200">
          <p className="text-sm text-amber-700 font-semibold">Select a Title</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {initialPoems.map(poem => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
        <div className="p-2 text-center text-xs text-amber-600 border-t border-amber-300 bg-amber-100">
          Vite React App (TSX)
        </div>
      </div>

      {/* Main Content - Viewer */}
      <div className="flex-1 flex flex-col">
        <PoemViewer />
      </div>
    </div>
  );
};

export default App;