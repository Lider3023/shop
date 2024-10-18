import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Loader from './components/Loader';

const App:FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(simulateLoading);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
