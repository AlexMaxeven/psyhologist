import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navigation from './components/Navigation/Navigation'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Therapy from './pages/Therapy/Therapy'
import Beams from './components/Beams/Beams'
import Plasma from './components/Plasma/Plasma'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import './App.css'

function AppContent() {
  const { isDark } = useTheme();

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <div className="backgroundWrapper">
          <div className={`backgroundLayer ${isDark ? 'active' : ''}`}>
            <Beams
              beamWidth={2}
              beamHeight={15}
              beamNumber={12}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={0}
            />
          </div>
          <div className={`backgroundLayer ${!isDark ? 'active' : ''}`}>
            <Plasma
              color="#ff6b35"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
        </div>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScrollToTopButton />
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
