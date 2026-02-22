import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import patternsData from '../data/patterns.json'

function Patterns() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatterns = useMemo(() => {
    return patternsData.patterns.filter((pattern) =>
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Coding Patterns</h1>

      <input
        type="text"
        placeholder="Search patterns..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none mb-6"
      />

      <div className="grid gap-4">
        {filteredPatterns.map((pattern) => (
          <Link
            key={pattern.id}
            to={`/patterns/${pattern.id}`}
            className="block bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{pattern.name}</h2>
            <p className="text-slate-400 mb-3">{pattern.description}</p>
            <div className="flex flex-wrap gap-2">
              {pattern.examples.slice(0, 2).map((example, index) => (
                <span
                  key={index}
                  className="text-sm bg-slate-600 text-slate-300 px-2 py-1 rounded"
                >
                  {example}
                </span>
              ))}
              {pattern.examples.length > 2 && (
                <span className="text-sm text-slate-500">
                  +{pattern.examples.length - 2} more
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No patterns found.</p>
        </div>
      )}
    </div>
  )
}

export default Patterns
