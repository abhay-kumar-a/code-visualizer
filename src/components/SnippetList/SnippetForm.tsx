import { useState } from 'react'
import Button from '../common/Button'

interface SnippetFormProps {
  onSubmit: (snippet: {
    title: string
    code: string
    language: string
    tags: string[]
    notes: string
  }) => void
  initialData?: {
    title: string
    code: string
    language: string
    tags: string[]
    notes: string
  }
}

function SnippetForm({ onSubmit, initialData }: SnippetFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [code, setCode] = useState(initialData?.code || '')
  const [language, setLanguage] = useState(initialData?.language || 'javascript')
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '')
  const [notes, setNotes] = useState(initialData?.notes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      code,
      language,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      notes,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-white mb-1">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <div>
        <label className="block text-white mb-1">Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none font-mono"
          rows={8}
          required
        />
      </div>
      <div>
        <label className="block text-white mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
          placeholder="array, sorting, algorithms"
        />
      </div>
      <div>
        <label className="block text-white mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
          rows={3}
        />
      </div>
      <Button type="submit">Save Snippet</Button>
    </form>
  )
}

export default SnippetForm
