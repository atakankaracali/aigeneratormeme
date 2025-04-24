import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import MemeApp from './pages/MemeApp';
import Header from './components/Header';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';
import BlogHome from './blog/BlogHome';
import BlogPost from './blog/BlogPost';

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
          <Route path="/stats" element={<Stats />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;