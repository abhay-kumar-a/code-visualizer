import { useState, useMemo } from 'react'
import { ProblemCard } from '../components/ProblemViewer'
import problemsData from '../data/problems.json'

type Difficulty = 'all' | 'Easy' | 'Medium' | 'Hard'

function Problems() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('all')

  const filteredProblems = useMemo(() => {
    return problemsData.problems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })
  }, [searchTerm, difficultyFilter])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Interview Problems</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as Difficulty)}
          className="p-2 rounded bg-slate-700 text-white border border-slate-600"
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No problems found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Problems
