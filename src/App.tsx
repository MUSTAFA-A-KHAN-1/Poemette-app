import React, { useState, useEffect, useMemo, type FC } from 'react';


// Define types for the poem data
interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  year: number;
}

// --- Component Definition ---
const App: FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [fontMode, setFontMode] = useState<'cursive' | 'serif' | 'allura'>('cursive'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch poems from JSON file
  useEffect(() => {
    fetch('/Poemette-app/poems.json')
      .then(response => response.json())
      .then(data => {
        setPoems(data);
        setLoading(false);
        // Set the first poem as selected after loading
        if (data.length > 0) {
          setSelectedPoemId(data[0].id);
        }
      })
      .catch(error => {
        console.error('Error loading poems:', error);
        setLoading(false);
      });
  }, []);

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

  const selectedPoem: Poem | undefined = poems.find(p => p.id === selectedPoemId);

  // Handle poem selection and close sidebar on mobile
  const handleSelectPoem = (id: string) => {
    setSelectedPoemId(id);
    setIsSidebarOpen(false); 
  };
  
  // Set font handler
  const setFont = (mode: 'cursive' | 'serif' | 'allura') => {
    setFontMode(mode);
  };

  // Component for Poem Card
  const PoemCard: FC<{ poem: Poem }> = ({ poem }) => (
    <div
      onClick={() => handleSelectPoem(poem.id)}
      className={`p-4 border-b border-gray-100 cursor-pointer transition duration-300 ease-in-out ${
        poem.id === selectedPoemId
          ? 'bg-amber-200 border-l-4 border-amber-800 shadow-inner text-amber-900'
          : 'hover:bg-amber-50 text-gray-700'
      }`}
    >
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
      <div className="flex flex-col h-full p-4 sm:p-8 overflow-y-auto">
        <div className="md:hidden flex justify-center items-center pb-4 mb-4 border-b border-amber-300">
            <h1 className="text-xl font-extrabold text-amber-900">Poemette</h1>
        </div>

        <div className="max-w-3xl mx-auto w-full p-8 md:p-12 bg-white rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:shadow-3xl"
             style={{
               backgroundImage: 'radial-gradient(circle at 100% 100%, #fef3c7, #fff7e6, #fff)',
               border: '1px solid #f59e0b20'
             }}
        >
          <header className="mb-8 pb-4 border-b-2 border-amber-300 border-opacity-50 text-center">
            <h1 className="text-4xl sm:text-5xl text-amber-900 font-extrabold mb-2 leading-tight" style={fontStyle}>
              {selectedPoem.title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-600 italic mt-3">
              — {selectedPoem.author}
            </h2>
          </header>

          <main className="text-center">
            <div
              className="text-lg sm:text-2xl text-gray-800 whitespace-pre-wrap leading-relaxed"
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
    <div className="flex h-screen antialiased overflow-hidden" style={{ backgroundColor: '#fdf6e3' }}>
      <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 md:static md:translate-x-0 w-80 border-r border-amber-300 bg-amber-50 shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:block`}
      >
        <div className="p-4 border-b border-amber-300 bg-amber-200 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-amber-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            Poemette
          </h2>
          <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="md:hidden p-1 rounded-full text-amber-700 hover:bg-amber-300 transition"
              aria-label="Close menu"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Font Selection */}
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
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading poems...</div>
          ) : (
            poems.map(poem => (
              <PoemCard key={poem.id} poem={poem} />
            ))
          )}
        </div>
        <div className="p-2 text-center text-xs text-amber-600 border-t border-amber-300 bg-amber-100">
          Vite React App (TSX)
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content - Viewer */}
      <div className="flex-1 flex flex-col min-w-0">
        <PoemViewer />
      </div>
      
      {/* Fixed menu button for mobile */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-4 rounded-full bg-amber-700 text-white shadow-xl hover:bg-amber-800 transition transform hover:scale-105"
        aria-label="Open Poem List"
      >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </button>
    </div>
  );
};

export default App;
