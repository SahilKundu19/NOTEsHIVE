import React from 'react';
import { Note, NOTE_COLORS } from '../types/note';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Heart, 
  Archive, 
  Trash2, 
  MoreHorizontal,
  ArchiveRestore,
  Calendar
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onToggleFavorite, onToggleArchive, onDelete }: NoteCardProps) {
  const isDark = document.documentElement.classList.contains('dark');
  const colorConfig = NOTE_COLORS.find(c => c.value === note.color) || NOTE_COLORS[0];
  const backgroundColor = isDark ? colorConfig.dark : colorConfig.value;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTextPreview = (html: string, maxLength: number = 150) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 h-full"
      style={{ backgroundColor }}
      onClick={() => onEdit(note)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="truncate pr-2">{note.title || 'Untitled'}</h3>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(note.id)}
              className={`h-8 w-8 p-0 ${note.isFavorite ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className="h-4 w-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onToggleArchive(note.id)}>
                  {note.isArchived ? (
                    <>
                      <ArchiveRestore className="h-4 w-4 mr-2" />
                      Unarchive
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(note.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {note.content && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {getTextPreview(note.content)}
          </p>
        )}
        
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(note.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}