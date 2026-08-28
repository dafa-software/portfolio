import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './components/sections/About'
import { Advantages } from './components/sections/Advantages'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Projects />
      </main>
      <Footer />
    </>
  )
}

export default App
