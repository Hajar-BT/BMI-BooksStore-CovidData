import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PoidsIdeal from './components/PoidsIdeal';
import BooksStore from './components/BooksStore';
import Covid from './components/Covid';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/poidsIdeal" element={<PoidsIdeal />} />
        <Route path="/books" element={<BooksStore />} />
        <Route path="/covid" element={<Covid />} />
      </Routes>
    </Router>
  );
};

export default App;
