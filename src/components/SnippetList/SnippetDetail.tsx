import Tag from '../common/Tag'
import type { Snippet } from '../../utils/storage'

interface SnippetDetailProps {
  snippet: Snippet
}

function SnippetDetail({ snippet }: SnippetDetailProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">{snippet.title}</h2>
        <p className="text-slate-400">{snippet.language}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {snippet.tags.map((tag, index) => (
          <Tag key={index} label={tag} color="blue" />
        ))}
      </div>

      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto text-slate-300 font-mono text-sm">
        {snippet.code}
      </pre>

      {snippet.notes && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Notes</h3>
          <p className="text-slate-300">{snippet.notes}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-slate-500">
        Created: {new Date(snippet.createdAt).toLocaleDateString()}
        <br />
        Updated: {new Date(snippet.updatedAt).toLocaleDateString()}
      </div>
    </div>
  )
}

export default SnippetDetail
