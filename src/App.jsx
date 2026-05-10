import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Journal from './pages/Journal'
import JournalDetail from './pages/JournalDetail'
import About from './pages/About'
import Projects from './pages/Projects'
import Research from './pages/Research'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<MainLayout />}>
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<JournalDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
      </Route>
    </Routes>
  )
}

export default App
