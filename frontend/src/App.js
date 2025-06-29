import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState('apod');
  const [apod, setApod] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [mediaResults, setMediaResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [rover, setRover] = useState('');
  const [camera, setCamera] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fetchApod = (selectedDate = '') => {
    setLoading(true);
    const url = selectedDate
      ? `http://localhost:5000/api/apod?date=${selectedDate}`
      : `http://localhost:5000/api/apod`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setApod(data);
        setLoading(false);
      });
  };

  const fetchAiInsight = async (contextText) => {
    if (!contextText) return;
    setAiLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: contextText }),
      });
      const data = await res.json();
      setAiInsight(data.summary || 'No summary available.');
    } catch (err) {
      setAiInsight('Failed to fetch AI insight.');
    } finally {
      setAiLoading(false);
    }
  };

  const fetchMars = useCallback((selectedDate = date) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedDate) params.append('date', selectedDate);
    if (rover) params.append('rover', rover);
    if (camera) params.append('camera', camera);

    const url = `http://localhost:5000/api/mars?${params.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMarsPhotos(data);
        setLoading(false);
      });
  }, [date, rover, camera]);

  const fetchMedia = () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    fetch(`https://images-api.nasa.gov/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const items = data.collection.items || [];
        setMediaResults(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (tab === 'apod') {
      fetchApod();
    } else if (tab === 'mars') {
      fetchMars();
    }
  }, [tab, fetchMars]);

  useEffect(() => {
    if (tab === 'apod' && apod?.explanation) {
      fetchAiInsight(apod.explanation);
    }
  }, [apod, tab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <header className="bg-gray-950/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide whitespace-nowrap">MY NASA PROJECT</h1>
          <nav className="flex gap-2 sm:gap-4">
            {['apod', 'mars', 'media'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setTab(item);
                  setLoading(item !== 'media');
                  if (item === 'media') setMediaResults([]);
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  tab === item ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {item === 'apod'
                  ? 'Astronomy Picture'
                  : item === 'mars'
                  ? 'Mars Rover Photos'
                  : 'Media Search'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          {tab !== 'media' && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 rounded text-black"
            />
          )}
          {tab === 'mars' && (
            <>
              <select value={rover} onChange={(e) => setRover(e.target.value)} className="p-2 rounded text-black">
                <option value="">All Rovers</option>
                <option value="Curiosity">Curiosity</option>
                <option value="Opportunity">Opportunity</option>
                <option value="Spirit">Spirit</option>
              </select>
              <select value={camera} onChange={(e) => setCamera(e.target.value)} className="p-2 rounded text-black">
                <option value="">All Cameras</option>
                <option value="FHAZ">Front Hazard Avoidance</option>
                <option value="RHAZ">Rear Hazard Avoidance</option>
                <option value="NAVCAM">Navigation Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry Camera</option>
                <option value="MAHLI">Hand Lens Imager</option>
                <option value="MARDI">Descent Imager</option>
                <option value="PANCAM">Panoramic Camera</option>
                <option value="MINITES">Mini-TES</option>
              </select>
            </>
          )}
          {tab === 'media' && (
            <input
              type="text"
              placeholder="Search for media (e.g. moon)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded text-black w-64"
            />
          )}
          <button
            onClick={() =>
              tab === 'apod' ? fetchApod(date) : tab === 'mars' ? fetchMars(date) : fetchMedia()
            }
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12">
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading...</p>
        ) : (
          <>
            {tab === 'apod' && apod && (
              <div className="max-w-4xl mx-auto bg-white text-black rounded-xl shadow-lg overflow-hidden">
                <img src={apod.url} alt={apod.title} className="w-full max-h-[500px] object-cover" />
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">{apod.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{apod.date}</p>
                    <p className="text-gray-800 leading-relaxed">{apod.explanation}</p>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-blue-700">🔍 AI Insight</h3>
                    {aiLoading ? (
                      <p className="text-sm text-gray-600 italic">Generating summary...</p>
                    ) : (
                      <p className="text-gray-700">{aiInsight}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tab === 'mars' && marsPhotos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {marsPhotos.map((photo) => (
                  <div key={photo.id} className="bg-white text-black rounded-lg shadow-md overflow-hidden">
                    <img src={photo.img_src} alt="Mars" className="w-full h-56 object-cover" />
                    <div className="p-4 space-y-1 text-sm">
                      <p><strong>Rover:</strong> {photo.rover.name}</p>
                      <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                      <p><strong>Date:</strong> {photo.earth_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'mars' && marsPhotos.length === 0 && (
              <p className="text-center text-gray-400 mt-6">No photos available for your filters.</p>
            )}

            {tab === 'media' && mediaResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mediaResults.map((item, index) => {
                  const data = item.data[0];
                  const thumbnail = item.links?.[0]?.href;
                  return (
                    <div key={index} className="bg-white text-black rounded shadow overflow-hidden">
                      {thumbnail && <img src={thumbnail} alt={data.title} className="w-full h-48 object-cover" />}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{data.title}</h3>
                        <p className="text-sm text-gray-700">{data.date_created?.slice(0, 10)}</p>
                        <p className="text-sm text-gray-600 line-clamp-3">{data.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {tab === 'media' && mediaResults.length === 0 && (
              <p className="text-center text-gray-400 mt-6">Try searching for something like "Mars" or "Nebula".</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
