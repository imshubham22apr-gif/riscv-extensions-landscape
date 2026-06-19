import { useState, useEffect, useRef } from "react";
import "./App.css";
import stopwatchImg from "./assets/stopwatch.png";
import penImg from "./assets/pen.png";

// ------------ Function to determine backend domain dynamically ------------
// You don't need to understand this function, it's just a helper function to get the backend domain
function getBackendDomain() {
  const domain = window.location.hostname || window.currentURL;
  const protocolPrefix = "https://";
  const firstDotIndex = domain.indexOf(".");
  const subdomain = domain.substring(0, firstDotIndex);
  const restOfDomain = domain.substring(firstDotIndex);
  return protocolPrefix + subdomain + "-backend" + restOfDomain;
}
// ---------------------------------------------------------------------------

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog";

function App() {
  // Initialize states as per instructions
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [keystrokes, setKeystrokes] = useState(0);

  const inputRef = useRef(null);
  const backendDomain = getBackendDomain();

  // Focus typing input when test starts
  useEffect(() => {
    if (isStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStarted]);

  // Fetch leaderboard from backend
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${backendDomain}/api/leaderboard`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  // Save player score to backend
  const saveScore = async (playerName, wpmScore, accuracyScore) => {
    try {
      await fetch(`${backendDomain}/api/leaderboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, wpm: wpmScore, accuracy: accuracyScore }),
      });
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  // Fetch leaderboard on mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Complete the handleStart Function
  const handleStart = () => {
    setInput("");
    setStartTime(null);
    setResult(null);
    setKeystrokes(0);
    setIsStarted(true);
  };

  // Handle Typing Input
  const handleInput = (e) => {
    const value = e.target.value;

    // Start the timer on the first keystroke
    let currentStartTime = startTime;
    if (startTime === null && value.length > 0) {
      currentStartTime = Date.now();
      setStartTime(currentStartTime);
    }

    // Track total keystrokes (only increments on new character additions)
    if (value.length > input.length) {
      setKeystrokes((prev) => prev + (value.length - input.length));
    }

    setInput(value);

    // Detect when typing is complete
    if (value === SAMPLE_TEXT) {
      const endTime = Date.now();
      const timeTakenMs = endTime - currentStartTime;
      const timeTakenMin = timeTakenMs / (1000 * 60);

      // WPM: words ÷ minutes
      const wordCount = SAMPLE_TEXT.split(/\s+/).filter(Boolean).length;
      const wpm = Math.round(wordCount / timeTakenMin);

      // Accuracy: (correct characters ÷ total characters) × 100
      // Correct characters at completion is SAMPLE_TEXT.length.
      // Total characters typed is captured in keystrokes.
      const totalCharactersTyped = keystrokes + (value.length - input.length);
      const accuracy = Math.round((SAMPLE_TEXT.length / totalCharactersTyped) * 100);

      // Result message
      const resultMessage = `${name || "Player"}, your speed is ${wpm} WPM with ${accuracy}% accuracy!`;
      setResult(resultMessage);
      setIsStarted(false);

      // Call saveScore and fetchLeaderboard immediately after saving
      saveScore(name || "Player", wpm, accuracy).then(() => {
        fetchLeaderboard();
      });
    }
  };

  // Renders sample text with visual progress feedback
  const renderSampleText = () => {
    return SAMPLE_TEXT.split("").map((char, index) => {
      let className = "";
      if (index < input.length) {
        if (input[index] === char) {
          className = "typed-correct";
        } else {
          className = "char-error";
        }
      } else if (index === input.length && isStarted) {
        className = "char-current";
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
                <a href="https://www.linkedin.com/in/panditaashish/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a> /{" "}
                <a href="https://www.instagram.com/kaunaashish/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a> /{" "}
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

        <div className="action-row" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          {/* Input field for entering player name (required before starting) */}
          {!isStarted && (
            <input
              type="text"
              className="typing-input"
              style={{ maxWidth: "320px", textAlign: "center" }}
              placeholder="Enter your name to start..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {!isStarted ? (
            <button className="btn-visit-site" onClick={handleStart} disabled={!name.trim()}>
              Start Test <span className="arrow-up-right-inline">&#8599;</span>
            </button>
          ) : (
            <input
              ref={inputRef}
              type="text"
              className="typing-input"
              placeholder="Type exactly as shown in the blueprint above..."
              value={input}
              onChange={handleInput}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
          )}
        </div>

        {/* Display result message after completion */}
        {result !== null && (
          <div className="metrics-card">
            <div className="metrics-meta">METRICS //</div>
            <div className="metrics-value-row">
              <span className="metrics-unit">{result}</span>
            </div>
          </div>
        )}

        {/* Leaderboard Entries */}
        <div className="metrics-card" style={{ marginTop: "32px" }}>
          <div className="metrics-meta">LEADERBOARD //</div>
          {leaderboard.length === 0 ? (
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "12px" }}>No entries yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, marginTop: "12px" }}>
              {leaderboard.map((entry, index) => (
                <li key={entry._id || index} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.03)", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
                  <span>{index + 1}. {entry.name}</span>
                  <span style={{ color: "var(--electric-blue)", fontWeight: "700" }}>{entry.wpm} WPM ({entry.accuracy || 100}% ACC)</span>
                </li>
              ))}
            </ul>
          )}
        </div>
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
