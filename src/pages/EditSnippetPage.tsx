import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { getSnippets, updateSnippet } from '../utils/storage'

function EditSnippetPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const snippets = getSnippets()
  const snippet = snippets.find((s) => s.id === id)

  const [title, setTitle] = useState(snippet?.title || '')
  const [code, setCode] = useState(snippet?.code || '')
  const [language, setLanguage] = useState(snippet?.language || 'javascript')
  const [tags, setTags] = useState(snippet?.tags.join(', ') || '')
  const [notes, setNotes] = useState(snippet?.notes || '')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSnippet(snippet.id, {
      title,
      code,
      language,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      notes,
    })
    navigate(`/snippets/${snippet.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to={`/snippets/${snippet.id}`} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Snippet
      </Link>

      <div className="bg-slate-700 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Snippet</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-1">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:outline-none font-mono"
              rows={10}
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 rounded bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="array, sorting, algorithms"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Save Changes</Button>
            <Link to={`/snippets/${snippet.id}`}>
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSnippetPage
