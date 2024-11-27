import './App.css';
import { prizes as initialPrizes } from './prizes';
import { useState, useEffect } from 'react';

function App() {
  const [spinning, setSpinning] = useState(false);
  const [prizes, setPrizes] = useState<string[]>([]);
  const [showWheel, setShowWheel] = useState(false);
  const [newPrize, setNewPrize] = useState('');

  // Load prizes from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPrizes = params.get('prizes');
    if (urlPrizes) {
      setPrizes(urlPrizes.split(','));
    } else {
      setPrizes(initialPrizes);
    }
  }, []);

  // Update URL when prizes change
  const updateUrlParams = (updatedPrizes: string[]) => {
    const params = new URLSearchParams(window.location.search);
    params.set('prizes', updatedPrizes.join(','));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const spinWheel = () => {
    setSpinning(true);
    const randomDegrees = Math.floor(Math.random() * 360) + 3600; // Spin multiple times
    const wheel = document.querySelector('.wheel') as HTMLElement;
    if (wheel) {
      wheel.style.transform = `rotate(${randomDegrees}deg)`;
    }

    // Calculate result based on final position
    setTimeout(() => {
      setSpinning(false);
    }, 5000);
  };

  const addPrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPrize.trim()) {
      const updatedPrizes = [...prizes, newPrize.trim()];
      setPrizes(updatedPrizes);
      updateUrlParams(updatedPrizes);
      setNewPrize('');
    }
  };

  const deletePrize = (index: number) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(updatedPrizes);
    updateUrlParams(updatedPrizes);
  };

  const toggleView = () => {
    setShowWheel(!showWheel);
  };

  return (
    <div className="container">
      <button onClick={toggleView}>{showWheel ? 'Edit Prizes' : 'Spin the Wheel'}</button>

      {showWheel ? (
        <div className="wheel-container">
          <div
            className={`wheel ${spinning ? 'spinning' : ''}`}
            onClick={spinning ? undefined : spinWheel}
            style={{ cursor: spinning ? 'not-allowed' : 'pointer' }}
          >
            {prizes.map((item, index) => (
              <div
                key={index}
                className="segment"
                style={{
                  transform: `rotate(${(360 / prizes.length) * index}deg)`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="pointer">V</div>
        </div>
      ) : (
        <div className="prize-list">
          <form onSubmit={addPrize}>
            <input
              type="text"
              value={newPrize}
              onChange={(e) => setNewPrize(e.target.value)}
              placeholder="Enter new prize"
            />
            <button type="submit">Add Prize</button>
          </form>

          <ul>
            {prizes.map((prize, index) => (
              <li key={index}>
                {prize}
                <button onClick={() => deletePrize(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
