import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar'
import Home from './pages/home'
import About from './pages/about'
import Projects from './pages/projects'
import Project from './pages/project'
import Contact from './pages/contact'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <NavBar />
      <div>
      {/* create react router routes to page components home, about me, projects, contact, 404, and project/:id */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>

    </>
  )
}

export default App
