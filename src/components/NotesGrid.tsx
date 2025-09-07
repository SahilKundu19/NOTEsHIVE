import React from 'react';
import { Note } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesGrid({ 
  notes, 
  onEditNote, 
  onToggleFavorite, 
  onToggleArchive, 
  onDeleteNote 
}: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-muted-foreground mb-2">No notes found</div>
        <div className="text-sm text-muted-foreground">
          Create your first note to get started
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onToggleFavorite={onToggleFavorite}
          onToggleArchive={onToggleArchive}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}