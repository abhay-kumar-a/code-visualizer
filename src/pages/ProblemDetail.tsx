import { useParams, Link } from 'react-router-dom'
import { SolutionTabs } from '../components/ProblemViewer'
import Tag from '../components/common/Tag'
import problemsData from '../data/problems.json'

function ProblemDetail() {
  const { id } = useParams<{ id: string }>()
  const problem = problemsData.problems.find((p) => p.id === id)

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-400">Problem not found.</p>
        <Link to="/problems" className="text-blue-400 hover:text-blue-300">
          Back to Problems
        </Link>
      </div>
    )
  }

  const difficultyColors: Record<string, 'green' | 'yellow' | 'red'> = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/problems" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to Problems
      </Link>

      <div className="bg-slate-700 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
          <Tag label={problem.difficulty} color={difficultyColors[problem.difficulty]} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags.map((tag, index) => (
            <Tag key={index} label={tag} color="purple" />
          ))}
        </div>

        <p className="text-slate-300 mb-6">{problem.description}</p>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Examples</h2>
          {problem.examples.map((example, index) => (
            <div key={index} className="bg-slate-800 rounded p-4">
              <div className="mb-2">
                <span className="text-slate-400">Input: </span>
                <span className="text-white font-mono">{example.input}</span>
              </div>
              <div className="mb-2">
                <span className="text-slate-400">Output: </span>
                <span className="text-white font-mono">{example.output}</span>
              </div>
              {example.explanation && (
                <div>
                  <span className="text-slate-400">Explanation: </span>
                  <span className="text-slate-300">{example.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SolutionTabs
        solution={problem.solution}
        timeComplexity={problem.timeComplexity}
        spaceComplexity={problem.spaceComplexity}
      />
    </div>
  )
}

export default ProblemDetail
