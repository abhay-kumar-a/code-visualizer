const SNIPPETS_KEY = 'code_snippets'

export interface Snippet {
  id: string
  title: string
  code: string
  language: string
  tags: string[]
  notes: string
  createdAt: string
  updatedAt: string
}

export function getSnippets(): Snippet[] {
  const data = localStorage.getItem(SNIPPETS_KEY)
  return data ? JSON.parse(data) : []
}

export function saveSnippet(snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Snippet {
  const snippets = getSnippets()
  const now = new Date().toISOString()
  const newSnippet: Snippet = {
    ...snippet,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  snippets.push(newSnippet)
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets))
  return newSnippet
}

export function updateSnippet(id: string, updates: Partial<Omit<Snippet, 'id' | 'createdAt'>>): Snippet | null {
  const snippets = getSnippets()
  const index = snippets.findIndex(s => s.id === id)
  if (index === -1) return null
  
  snippets[index] = {
    ...snippets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets))
  return snippets[index]
}

export function deleteSnippet(id: string): boolean {
  const snippets = getSnippets()
  const filtered = snippets.filter(s => s.id !== id)
  if (filtered.length === snippets.length) return false
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(filtered))
  return true
}
