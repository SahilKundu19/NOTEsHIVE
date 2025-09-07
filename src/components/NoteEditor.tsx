import React, { useState, useEffect } from 'react';
import { Note } from '../types/note';
import { RichTextEditor } from './RichTextEditor';
import { TagInput } from './TagInput';
import { ColorPicker } from './ColorPicker';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { X, Save, Heart, Archive, ArchiveRestore } from 'lucide-react';
import { Separator } from './ui/separator';

interface NoteEditorProps {
  note: Note | null;
  allTags: string[];
  onSave: (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

export function NoteEditor({ 
  note, 
  allTags, 
  onSave, 
  onUpdate, 
  onClose, 
  onToggleFavorite,
  onToggleArchive 
}: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setColor(note.color);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
      setColor('#ffffff');
    }
  }, [note]);

  const handleSave = () => {
    const noteData = {
      title: title.trim() || 'Untitled',
      content,
      tags,
      color,
      isFavorite: note?.isFavorite || false,
      isArchived: note?.isArchived || false,
    };

    if (note) {
      onUpdate(note.id, noteData);
    } else {
      onSave(noteData);
    }
    onClose();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="h-8"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <ColorPicker selectedColor={color} onColorChange={setColor} />
              
              {note && (
                <>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(note.id)}
                    className={`h-8 ${note.isFavorite ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className="h-4 w-4 mr-1" fill={note.isFavorite ? 'currentColor' : 'none'} />
                    {note.isFavorite ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleArchive(note.id)}
                    className="h-8"
                  >
                    {note.isArchived ? (
                      <>
                        <ArchiveRestore className="h-4 w-4 mr-1" />
                        Unarchive
                      </>
                    ) : (
                      <>
                        <Archive className="h-4 w-4 mr-1" />
                        Archive
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="mb-4"
          />

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <TagInput
                tags={tags}
                onTagsChange={setTags}
                suggestions={allTags}
                placeholder="Add tags..."
              />
            </div>
          </div>

          {note && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div>Created: {formatDate(note.createdAt)}</div>
              <div>Updated: {formatDate(note.updatedAt)}</div>
              {note.isArchived && (
                <Badge variant="secondary">Archived</Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your note..."
          />
        </CardContent>
      </Card>
    </div>
  );
}