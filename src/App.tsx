import { useState } from 'react';
import './App.css';
import { prizes } from './prizes';

function App() {
  const [spinning, setSpinning] = useState(false);

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

  return (
    <div className="container">
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
        <div className="pointer">⯆</div>
      </div>
    </div>
  );
}

export default App;
