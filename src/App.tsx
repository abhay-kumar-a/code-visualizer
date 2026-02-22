import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Visualize from './pages/Visualize'
import Snippets from './pages/Snippets'
import SnippetDetailPage from './pages/SnippetDetailPage'
import EditSnippetPage from './pages/EditSnippetPage'
import Problems from './pages/Problems'
import ProblemDetail from './pages/ProblemDetail'
import Patterns from './pages/Patterns'
import PatternDetail from './pages/PatternDetail'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/snippets/:id" element={<SnippetDetailPage />} />
          <Route path="/snippets/:id/edit" element={<EditSnippetPage />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/patterns/:id" element={<PatternDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
