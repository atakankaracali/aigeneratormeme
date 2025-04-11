import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import MemeApp from './pages/MemeApp';
import Header from './components/Header';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/meme" element={<MemeApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;