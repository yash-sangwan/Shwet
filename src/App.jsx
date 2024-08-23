import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/LandingPage/Home';
import Read from './Pages/Read';
import Write from './Pages/Write';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Read />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
