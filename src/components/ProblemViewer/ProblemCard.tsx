import { Link } from 'react-router-dom'
import Tag from '../common/Tag'

interface Problem {
  id: string
  title: string
  difficulty: string
  category: string
  tags: string[]
}

interface ProblemCardProps {
  problem: Problem
}

function ProblemCard({ problem }: ProblemCardProps) {
  const difficultyColors: Record<string, 'green' | 'yellow' | 'red'> = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red',
  }

  return (
    <Link to={`/problems/${problem.id}`} className="block">
      <div className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
          <Tag label={problem.difficulty} color={difficultyColors[problem.difficulty]} />
        </div>
        <p className="text-slate-400 text-sm mb-3">{problem.category}</p>
        <div className="flex flex-wrap gap-2">
          {problem.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} label={tag} color="purple" />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ProblemCard
