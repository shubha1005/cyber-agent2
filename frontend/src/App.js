import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import News from './Components/News';
import Tutorial from './Components/Tutorial';
import Port from './Components/Port';
import Cryptography from './Components/Cryptography';
import DynamicQuiz from './Components/DynamicQuiz';

function App() {
  const quotes = [
    "Stay safe online: Think before you click.",
    "Your security is in your hands: Keep your passwords strong and unique.",
    "Beware of phishing attacks: Verify before you share.",
    "Cybersecurity is a shared responsibility – protect yourself and others."
  ];

  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <header className="App-header">
          <h1 className="app-title">CYBER AGENT</h1>

          {/* Navigation Bar */}
          <nav>
            <ul className="nav-bar" >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/port-scanner">Port Scanner</Link></li>
              <li><Link to="/Cryptography">Cryptography</Link></li>
              <li><Link to="/quiz">IT Quiz</Link></li>
            </ul>
          </nav>
        </header>

        {/* Main Section */}
        <main>
          <Routes>
            {/* Home Section */}
            <Route
              path="/"
              element={
                <div className="home-container">
                  <h2>Cybersecurity Awareness</h2>
                  <div className="quote-container">
                    {quotes.map((quote, index) => (
                      <div key={index} className="quote-card">
                        <p>{quote}</p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* Other Sections */}
            <Route path="/news" element={<News />} />
            <Route path="/tutorials" element={<Tutorial />} />
            <Route path="/port-scanner" element={<Port />} />
            <Route path="/Cryptography" element={<Cryptography />} />
            <Route path="/quiz" element={<DynamicQuiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
