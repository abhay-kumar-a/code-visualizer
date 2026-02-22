import { useState } from 'react'

interface SolutionTabsProps {
  solution: string
  timeComplexity: string
  spaceComplexity: string
}

function SolutionTabs({ solution, timeComplexity, spaceComplexity }: SolutionTabsProps) {
  const [activeTab, setActiveTab] = useState<'solution' | 'complexity'>('solution')

  return (
    <div className="bg-slate-700 rounded-lg overflow-hidden">
      <div className="flex border-b border-slate-600">
        <button
          onClick={() => setActiveTab('solution')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'solution'
              ? 'bg-slate-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Solution
        </button>
        <button
          onClick={() => setActiveTab('complexity')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'complexity'
              ? 'bg-slate-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Complexity Analysis
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'solution' ? (
          <pre className="bg-slate-800 p-4 rounded overflow-x-auto text-slate-300 font-mono text-sm">
            {solution}
          </pre>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-slate-400">Time Complexity: </span>
              <span className="text-white font-mono">{timeComplexity}</span>
            </div>
            <div>
              <span className="text-slate-400">Space Complexity: </span>
              <span className="text-white font-mono">{spaceComplexity}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SolutionTabs
