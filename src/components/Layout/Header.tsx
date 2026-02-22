import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Code Visualizer
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/visualize" className="hover:text-slate-300 transition-colors">
                Visualize
              </Link>
            </li>
            <li>
              <Link to="/snippets" className="hover:text-slate-300 transition-colors">
                Snippets
              </Link>
            </li>
            <li>
              <Link to="/problems" className="hover:text-slate-300 transition-colors">
                Problems
              </Link>
            </li>
            <li>
              <Link to="/patterns" className="hover:text-slate-300 transition-colors">
                Patterns
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
