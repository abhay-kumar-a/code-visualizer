import { useState, useEffect } from 'react'
import Modal from '../components/common/Modal'
import SnippetCard from '../components/SnippetList/SnippetCard'
import SnippetForm from '../components/SnippetList/SnippetForm'
import { getSnippets, saveSnippet, deleteSnippet, updateSnippet, isUsingFirebase, type Snippet } from '../utils/firebaseStorage'

function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)

  useEffect(() => {
    loadSnippets()
  }, [])

  const loadSnippets = async () => {
    try {
      setLoading(true)
      const data = await getSnippets()
      setSnippets(data)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSnippet = async (data: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      await updateSnippet(editingSnippet.id, data)
    } else {
      await saveSnippet(data)
    }
    await loadSnippets()
    closeModal()
  }

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setIsModalOpen(true)
  }

  const handleDeleteSnippet = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      await deleteSnippet(id)
      await loadSnippets()
    }
  }

  const openModal = () => {
    setEditingSnippet(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingSnippet(null)
  }

  const usingFirebase = isUsingFirebase()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-slate-400 mt-4">Loading snippets...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Code Snippets</h1>
          <p className="text-slate-400 mt-1">
            Manage your code snippets
            <span className={`ml-2 px-2 py-1 rounded text-xs ${usingFirebase ? 'bg-green-600' : 'bg-yellow-600'}`}>
              {usingFirebase ? 'Cloud Sync' : 'Local Storage'}
            </span>
          </p>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Snippet
        </button>
      </div>

      {!usingFirebase && (
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
          <p className="text-yellow-400 text-sm">
            Firebase not configured. Using browser localStorage.
            <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-yellow-300">
              Setup Firebase
            </a> for cloud sync.
          </p>
        </div>
      )}

      {snippets.length === 0 ? (
        <div className="text-center py-16 bg-slate-700 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No snippets yet</p>
          <p className="text-slate-500 text-sm mt-2">Click "New Snippet" to create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={handleDeleteSnippet}
              onEdit={handleEditSnippet}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSnippet ? 'Edit Snippet' : 'New Snippet'}
      >
        <SnippetForm
          onSubmit={handleSaveSnippet}
          initialData={editingSnippet ? {
            title: editingSnippet.title,
            code: editingSnippet.code,
            language: editingSnippet.language,
            tags: editingSnippet.tags,
            notes: editingSnippet.notes,
          } : undefined}
        />
      </Modal>
    </div>
  )
}

export default Snippets
