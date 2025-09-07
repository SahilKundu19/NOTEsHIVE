export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption = 'dateCreated' | 'dateUpdated' | 'alphabetical';

export interface NoteFilters {
  searchQuery: string;
  selectedTags: string[];
  showFavorites: boolean;
  showArchived: boolean;
  sortBy: SortOption;
}

export const NOTE_COLORS = [
  { name: 'Default', value: '#ffffff', dark: '#1f1f1f' },
  { name: 'Yellow', value: '#fef3c7', dark: '#451a03' },
  { name: 'Green', value: '#d1fae5', dark: '#064e3b' },
  { name: 'Blue', value: '#dbeafe', dark: '#1e3a8a' },
  { name: 'Purple', value: '#e9d5ff', dark: '#581c87' },
  { name: 'Pink', value: '#fce7f3', dark: '#831843' },
  { name: 'Orange', value: '#fed7aa', dark: '#9a3412' },
  { name: 'Red', value: '#fecaca', dark: '#991b1b' },
];