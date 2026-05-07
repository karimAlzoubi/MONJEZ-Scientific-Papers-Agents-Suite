import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TryItNow from './components/TryItNow'
import RecentProjects from './components/RecentProjects'
import Comparison from './components/Comparison'
import Pricing from './components/Pricing'
import Audience from './components/Audience'
import Footer from './components/Footer'
import Toaster from './app/components/Toaster'
import { AppProvider } from './app/AppContext'

export default function App() {
  return (
    <AppProvider>
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <TryItNow />
          <RecentProjects />
          <Comparison />
          <Pricing />
          <Audience />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AppProvider>
  )
}
