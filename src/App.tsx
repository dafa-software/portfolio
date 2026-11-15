import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
