import './App.css';
import './output.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop/scrollToTop.js';
import HomePage from './pages/home';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<p>Login</p>} />
          <Route path="/signup/1" element={<Signup />} />
          <Route path="/signup/2" element={<p>Business Congif</p>} />
          <Route path="/widgets" element={<p>Widgets</p>} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
