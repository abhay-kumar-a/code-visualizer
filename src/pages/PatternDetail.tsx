import { useParams, Link } from 'react-router-dom'
import patternsData from '../data/patterns.json'

function PatternDetail() {
  const { id } = useParams<{ id: string }>()
  const pattern = patternsData.patterns.find((p) => p.id === id)

  if (!pattern) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-400">Pattern not found.</p>
        <Link to="/patterns" className="text-blue-400 hover:text-blue-300">
          Back to Patterns
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/patterns" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to Patterns
      </Link>

      <div className="bg-slate-700 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">{pattern.name}</h1>
        <p className="text-slate-300 mb-6">{pattern.description}</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">When to Use</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {pattern.whenToUse.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Template Code</h2>
          <pre className="bg-slate-800 p-4 rounded overflow-x-auto text-slate-300 font-mono text-sm">
            {pattern.templateCode}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Example Problems</h2>
          <div className="flex flex-wrap gap-2">
            {pattern.examples.map((example, index) => (
              <span
                key={index}
                className="bg-slate-600 text-slate-200 px-3 py-1 rounded text-sm"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatternDetail
