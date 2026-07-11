import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Journal from './pages/Journal'
import JournalDetail from './pages/JournalDetail'
import About from './pages/About'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Music from './pages/Music'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<JournalDetail />} />
        <Route path="/music" element={<Music />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
      </Route>
    </Routes>
  )
}

export default App
