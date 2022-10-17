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
import RestrictedRoutes from './components/routeProtection/restrictedRoutes';
import PrivateRoutes from './components/routeProtection/privateRoutes';
import Widgets from './pages/widgets';
import Training from './pages/training';
import Settings from './pages/settings';
import Strategies from './pages/strategies';
import Details from './pages/details';
import Pricing from './pages/pricing';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/1" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/signup/2" element={<Biz />} />
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/training" element={<Training />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/strategies/create" element={<Strategies />} />
            <Route path="/widget-information/create" element={<Details />} />
            <Route path="/widget-pricing/create" element={<Pricing />} />
          </Route>
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
