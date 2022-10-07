import './App.css';
import './output.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop/scrollToTop.js';
import HomePage from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Biz from './pages/biz';
import Terms from './pages/terms';
import Privacy from './pages/privacy';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signup/1" element={<Signup />} />
          <Route path="/signup/2" element={<Biz />} />
          <Route path="/widgets" element={<p>Widgets</p>} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
