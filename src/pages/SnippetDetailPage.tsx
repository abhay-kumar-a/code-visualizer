import { useParams, Link, useNavigate } from 'react-router-dom'
import Tag from '../components/common/Tag'
import Button from '../components/common/Button'
import { getSnippets, deleteSnippet } from '../utils/storage'

function SnippetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const snippets = getSnippets()
  const snippet = snippets.find((s) => s.id === id)

  if (!snippet) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-400">Snippet not found.</p>
        <Link to="/snippets" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
          Back to Snippets
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(snippet.id)
      navigate('/snippets')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/snippets" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Snippets
      </Link>

      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{snippet.title}</h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-600 rounded-full text-sm text-slate-300">
                {snippet.language}
              </span>
              <span className="text-slate-500 text-sm">
                Created: {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
              <span className="text-slate-500 text-sm">
                Updated: {new Date(snippet.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/snippets/${snippet.id}/edit`}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <Button onClick={handleDelete} variant="danger">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {snippet.tags.map((tag, index) => (
            <Tag key={index} label={tag} color="blue" />
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Code</h2>
          <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto text-slate-300 font-mono text-sm whitespace-pre-wrap">
            {snippet.code}
          </pre>
        </div>

        {snippet.notes && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Notes</h2>
            <div className="bg-slate-800 p-4 rounded-lg text-slate-300">
              {snippet.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SnippetDetailPage
