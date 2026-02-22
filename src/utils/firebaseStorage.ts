import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'

export interface Snippet {
  id: string
  title: string
  code: string
  language: string
  tags: string[]
  notes: string
  createdAt: Date
  updatedAt: Date
}

// LocalStorage fallback
const LOCAL_KEY = 'code_snippets_local'

function getLocalSnippets(): Snippet[] {
  const data = localStorage.getItem(LOCAL_KEY)
  if (!data) return []
  return JSON.parse(data).map((s: Snippet) => ({
    ...s,
    createdAt: new Date(s.createdAt),
    updatedAt: new Date(s.updatedAt),
  }))
}

function saveLocalSnippets(snippets: Snippet[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(snippets))
}

export async function getSnippets(): Promise<Snippet[]> {
  if (!isFirebaseConfigured || !db) {
    return getLocalSnippets()
  }

  try {
    const q = query(collection(db, 'snippets'), orderBy('updatedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
      updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
    })) as Snippet[]
  } catch (error) {
    console.error('Firebase error, using localStorage:', error)
    return getLocalSnippets()
  }
}

export async function saveSnippet(snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Snippet> {
  if (!isFirebaseConfigured || !db) {
    const snippets = getLocalSnippets()
    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      ...snippet,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    snippets.unshift(newSnippet)
    saveLocalSnippets(snippets)
    return newSnippet
  }

  try {
    const docRef = await addDoc(collection(db, 'snippets'), {
      ...snippet,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return {
      id: docRef.id,
      ...snippet,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  } catch (error) {
    console.error('Firebase error, using localStorage:', error)
    const snippets = getLocalSnippets()
    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      ...snippet,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    snippets.unshift(newSnippet)
    saveLocalSnippets(snippets)
    return newSnippet
  }
}

export async function updateSnippet(id: string, updates: Partial<Omit<Snippet, 'id' | 'createdAt'>>): Promise<Snippet | null> {
  if (!isFirebaseConfigured || !db) {
    const snippets = getLocalSnippets()
    const index = snippets.findIndex(s => s.id === id)
    if (index === -1) return null
    snippets[index] = {
      ...snippets[index],
      ...updates,
      updatedAt: new Date(),
    }
    saveLocalSnippets(snippets)
    return snippets[index]
  }

  try {
    const docRef = doc(db, 'snippets', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
    return {
      id,
      ...updates,
    } as Snippet
  } catch (error) {
    console.error('Firebase error, using localStorage:', error)
    const snippets = getLocalSnippets()
    const index = snippets.findIndex(s => s.id === id)
    if (index === -1) return null
    snippets[index] = {
      ...snippets[index],
      ...updates,
      updatedAt: new Date(),
    }
    saveLocalSnippets(snippets)
    return snippets[index]
  }
}

export async function deleteSnippet(id: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    const snippets = getLocalSnippets()
    const filtered = snippets.filter(s => s.id !== id)
    saveLocalSnippets(filtered)
    return true
  }

  try {
    await deleteDoc(doc(db, 'snippets', id))
    return true
  } catch (error) {
    console.error('Firebase error, using localStorage:', error)
    const snippets = getLocalSnippets()
    const filtered = snippets.filter(s => s.id !== id)
    saveLocalSnippets(filtered)
    return true
  }
}

export function isUsingFirebase(): boolean {
  return isFirebaseConfigured ?? false
}
