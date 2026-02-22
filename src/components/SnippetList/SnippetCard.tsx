import { Link } from 'react-router-dom'
import Tag from '../common/Tag'
import type { Snippet } from '../../utils/firebaseStorage'

interface SnippetCardProps {
  snippet: Snippet
  onDelete: (id: string) => void
  onEdit: (snippet: Snippet) => void
}

function SnippetCard({ snippet, onDelete, onEdit }: SnippetCardProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-5 hover:bg-slate-650 transition-all duration-200 border border-slate-600 hover:border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{snippet.title}</h3>
          <p className="text-slate-400 text-sm">{snippet.language}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/snippets/${snippet.id}`}
            className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
            title="View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          <button
            onClick={() => onEdit(snippet)}
            className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {snippet.tags.map((tag, index) => (
          <Tag key={index} label={tag} color="blue" />
        ))}
      </div>

      <pre className="p-3 bg-slate-800 rounded text-sm text-slate-300 overflow-x-auto max-h-32">
        {snippet.code.slice(0, 150)}
        {snippet.code.length > 150 && '...'}
      </pre>

      {snippet.notes && (
        <p className="mt-3 text-slate-400 text-sm italic">
          {snippet.notes.slice(0, 100)}
          {snippet.notes.length > 100 && '...'}
        </p>
      )}

      <div className="mt-3 text-xs text-slate-500">
        Updated: {snippet.updatedAt?.toLocaleDateString?.() || 'N/A'}
      </div>
    </div>
  )
}

export default SnippetCard
