import React from 'react';
import { NoteFilters, SortOption } from '../types/note';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, X, Tag, Heart, Archive, ArrowUpDown, Calendar, Clock, SortAsc } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SearchAndFilterProps {
  filters: NoteFilters;
  onFiltersChange: (filters: NoteFilters) => void;
  allTags: string[];
  noteCounts: {
    total: number;
    favorites: number;
    archived: number;
  };
}

export function SearchAndFilter({ 
  filters, 
  onFiltersChange, 
  allTags,
  noteCounts 
}: SearchAndFilterProps) {
  const updateFilters = (updates: Partial<NoteFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearSearch = () => {
    updateFilters({ searchQuery: '' });
  };

  const toggleTag = (tag: string) => {
    const selectedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    updateFilters({ selectedTags });
  };

  const handleSortChange = (sortBy: SortOption) => {
    updateFilters({ sortBy });
  };

  const getSortLabel = (sortOption: SortOption) => {
    switch (sortOption) {
      case 'dateCreated': return 'Date created';
      case 'dateUpdated': return 'Date updated';  
      case 'alphabetical': return 'Alphabetical';
      default: return 'Date updated';
    }
  };

  const getSortIcon = (sortOption: SortOption) => {
    switch (sortOption) {
      case 'dateCreated': return Calendar;
      case 'dateUpdated': return Clock;
      case 'alphabetical': return SortAsc;
      default: return Clock;
    }
  };

  return (
    <div className="p-4 border-b bg-muted/30">
      {/* Search Bar and Sort */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            placeholder="Search notes..."
            className="pl-10 pr-10"
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sort Dropdown */}
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] h-10">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateUpdated">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Date updated
              </div>
            </SelectItem>
            <SelectItem value="dateCreated">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date created
              </div>
            </SelectItem>
            <SelectItem value="alphabetical">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                Alphabetical
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Tag Filters Display */}
      {filters.selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          <span className="text-xs text-muted-foreground">Filtered by:</span>
          {filters.selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}