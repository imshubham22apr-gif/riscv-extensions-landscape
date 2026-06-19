import { useState, useRef, useEffect } from 'react';
import './App.css';
import stopwatchImg from './assets/stopwatch.png';
import penImg from './assets/pen.png';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog.";

function App() {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (testStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [testStarted]);

  const startTest = () => {
    setUserInput('');
    setStartTime(null);
    setResult(null);
    setTestStarted(true);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    
    let currentStartTime = startTime;
    if (startTime === null && value.length > 0) {
      currentStartTime = Date.now();
      setStartTime(currentStartTime);
    }
    
    setUserInput(value);

    if (value === SAMPLE_TEXT) {
      const endTime = Date.now();
      const timeTakenMs = endTime - currentStartTime;
      const timeTakenMin = timeTakenMs / (1000 * 60);
      const wordCount = SAMPLE_TEXT.split(/\s+/).filter(Boolean).length;
      const wpm = Math.round(wordCount / timeTakenMin);
      
      setResult(wpm);
      setTestStarted(false);
    }
  };

  const renderSampleText = () => {
    return SAMPLE_TEXT.split('').map((char, index) => {
      let className = '';
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = 'typed-correct';
        } else {
          className = 'char-error';
        }
      } else if (index === userInput.length && testStarted) {
        className = 'char-current';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="canvas-wrapper">
      {/* Decorative Photorealistic Elements */}
      <img src={stopwatchImg} className="corner-asset stopwatch-top" alt="stopwatch decoration" />
      <img src={penImg} className="corner-asset pen-top" alt="pen decoration" />
      <img src={penImg} className="corner-asset pen-bottom" alt="pen decoration" />
      <img src={stopwatchImg} className="corner-asset stopwatch-bottom" alt="stopwatch decoration" />

      {/* Top Navigation / Interface Header */}
      <header className="interface-header">
        <div className="back-btn-wrapper">
          <button className="back-btn" onClick={() => window.location.reload()}>
            <span>&larr;</span>
          </button>
        </div>
        
        <div className="header-contact-details">
          <div className="user-profile">
            <div className="profile-text">
              <span className="profile-name">SwiftType</span>
              <span className="profile-handle">@swifttype.io</span>
            </div>
          </div>

          <div className="contact-item">
            <span className="arrow-down-right">&#8600;</span>
            <div className="contact-text">
              <span className="contact-label">FOLLOW ON SOCIALS</span>
              <span className="contact-value">
                <a href="https://www.linkedin.com/in/panditaashish/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a> /{' '}
                <a href="https://www.instagram.com/kaunaashish/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a> /{' '}
                <a href="https://github.com/imshubham22apr-gif" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Center Layout Container */}
      <main className="main-content">
        <div className="pagination-indicator">
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>

        <div className="badge-wrapper">
          <div className="badge-pill">typing speed test</div>
        </div>

        <h1 className="main-headline">
          your keyboard deserves a <span className="gradient-text">faster typist.</span>
        </h1>

        <p className="main-description">
          who can not just tap keys pretty, but make them converting and growth based.
        </p>

        <p className="sub-description">
          And that's where your whole typing performance will be changed and you will start seeing results not just the words full of fake promises.
        </p>

        {/* The blueprint sample text box */}
        <div className="blueprint-box">
          <div className="blueprint-title">SAMPLE TEXT BLUEPRINT</div>
          <div className="text-display-box">
            <span className="text-sample">
              {renderSampleText()}
            </span>
          </div>
        </div>

        <div className="action-row">
          {!testStarted ? (
            <button className="btn-visit-site" onClick={startTest}>
              Start Test <span className="arrow-up-right-inline">&#8599;</span>
            </button>
          ) : (
            <input
              ref={inputRef}
              type="text"
              className="typing-input"
              placeholder="Type exactly as shown in the blueprint above..."
              value={userInput}
              onChange={handleInput}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
          )}
        </div>

        {/* WPM Results display */}
        {result !== null && (
          <div className="metrics-card">
            <div className="metrics-meta">METRICS //</div>
            <div className="metrics-value-row">
              <span className="metrics-number">{result}</span>
              <span className="metrics-unit">WORDS PER MINUTE</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding Statement */}
      <footer className="branding-footer">
        <p className="footer-quote">
          Typing is not tapping.<br />
          Typing is execution with precision.
        </p>
      </footer>
    </div>
  );
}

export default App;
