import { useState } from 'react'
import Modal from '../components/common/Modal'
import SnippetCard from '../components/SnippetList/SnippetCard'
import SnippetForm from '../components/SnippetList/SnippetForm'
import { getSnippets, saveSnippet, deleteSnippet, updateSnippet, type Snippet } from '../utils/storage'

function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>(() => getSnippets())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)

  const handleSaveSnippet = (data: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      updateSnippet(editingSnippet.id, data)
    } else {
      saveSnippet(data)
    }
    setSnippets(getSnippets())
    closeModal()
  }

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setIsModalOpen(true)
  }

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(id)
      setSnippets(getSnippets())
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Code Snippets</h1>
          <p className="text-slate-400 mt-1">Manage your code snippets</p>
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
