import { useState, useEffect } from 'react';
import { Note, NoteFilters } from '../types/note';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from 'firebase/firestore';

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filters, setFilters] = useState<NoteFilters>({
    searchQuery: '',
    selectedTags: [],
    showFavorites: false,
    showArchived: false,
    sortBy: 'dateUpdated',
  });

  useEffect(() => {
    if (!user) return;

    const constraints: any[] = [];
    let baseQuery = collection(db, 'notes');

    // Always filter by current user
    constraints.push(where('userId', '==', user.uid));

    // Apply filters
    if (filters.showArchived) {
      constraints.push(where('isArchived', '==', true));
    } else {
      constraints.push(where('isArchived', '==', false));
    }

    if (filters.showFavorites) {
      constraints.push(where('isFavorite', '==', true));
    }

    if (filters.selectedTags.length > 0) {
      constraints.push(where('tags', 'array-contains-any', filters.selectedTags));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'dateCreated':
        constraints.push(orderBy('createdAt', 'desc'));
        break;
      case 'dateUpdated':
        constraints.push(orderBy('updatedAt', 'desc'));
        break;
      case 'alphabetical':
        constraints.push(orderBy('title'));
        break;
      default:
        constraints.push(orderBy('updatedAt', 'desc'));
    }

    const q = query(baseQuery, ...constraints);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notesData.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          tags: data.tags || [],
          color: data.color || '#ffffff',
          isFavorite: data.isFavorite || false,
          isArchived: data.isArchived || false,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        });
      });
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [filters, user]);

  const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'notes'), {
      ...noteData,
      userId: user?.uid,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    const docRef = doc(db, 'notes', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  };

  const deleteNote = async (id: string) => {
    const docRef = doc(db, 'notes', id);
    await deleteDoc(docRef);
  };

  const toggleFavorite = async (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      await updateNote(id, { isFavorite: !note.isFavorite });
    }
  };

  const toggleArchive = async (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      await updateNote(id, { isArchived: !note.isArchived });
    }
  };

  // Get all unique tags from current notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

  // Filter notes by search query on client side (Firestore doesn't support full text search)
  const filteredNotes = notes.filter(note => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (!note.title.toLowerCase().includes(query) &&
          !note.content.toLowerCase().includes(query) &&
          !note.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false;
      }
    }
    return true;
  });

  return {
    notes: filteredNotes,
    allNotes: notes,
    filters,
    setFilters,
    allTags,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    toggleArchive,
  };
}
