import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar'
import Home from './pages/home'
import About from './pages/about'
import Project from './pages/project'
import Contact from './pages/contact'
import NotFound from './pages/NotFound'
import Footer from './components/footer'

function App() {

  return (
    <>
      <NavBar />
      <div className='main-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
