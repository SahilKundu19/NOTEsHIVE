import React from 'react';
import { NoteFilters } from '../types/note';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';
import { 
  Heart, 
  Archive, 
  FileText, 
  Tag, 
  Briefcase, 
  User, 
  Building,
  ChevronRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';

interface AppSidebarProps {
  filters: NoteFilters;
  onFiltersChange: (filters: NoteFilters) => void;
  noteCounts: {
    total: number;
    favorites: number;
    archived: number;
  };
  tagCounts: Record<string, number>;
  currentView: string;
  onViewChange: (view: string) => void;
}

const predefinedTags = [
  { name: 'Office', icon: Building, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'Work', icon: Briefcase, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'Personal', icon: User, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
];

export function AppSidebar({ 
  filters, 
  onFiltersChange, 
  noteCounts, 
  tagCounts,
  currentView,
  onViewChange 
}: AppSidebarProps) {
  const handleViewChange = (view: string, filterUpdates?: Partial<NoteFilters>) => {
    onViewChange(view);
    if (filterUpdates) {
      onFiltersChange({ 
        searchQuery: '',
        selectedTags: [],
        showFavorites: false,
        showArchived: false,
        sortBy: filters.sortBy, // Preserve current sort
        ...filterUpdates 
      });
    }
  };

  const handleTagFilter = (tagName: string) => {
    onViewChange(`tag-${tagName}`);
    onFiltersChange({
      searchQuery: '',
      selectedTags: [tagName],
      showFavorites: false,
      showArchived: false,
      sortBy: filters.sortBy, // Preserve current sort
    });
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: '#2563eb' }}>
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">NOTEsHIVE</h2>
              <p className="text-xs text-muted-foreground">Your digital notebook</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentView === 'all'}
                  onClick={() => handleViewChange('all', { showFavorites: false, showArchived: false })}
                >
                  <FileText className="h-4 w-4" />
                  <span>All Notes</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {noteCounts.total}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentView === 'favorites'}
                  onClick={() => handleViewChange('favorites', { showFavorites: true, showArchived: false })}
                >
                  <Heart className="h-4 w-4" />
                  <span>Favourites</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {noteCounts.favorites}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentView === 'archived'}
                  onClick={() => handleViewChange('archived', { showFavorites: false, showArchived: true })}
                >
                  <Archive className="h-4 w-4" />
                  <span>Archived</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {noteCounts.archived}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tags Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center gap-2 w-full">
                <Tag className="h-4 w-4" />
                Tags
                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {predefinedTags.map((tag) => {
                    const Icon = tag.icon;
                    const count = tagCounts[tag.name] || 0;
                    return (
                      <SidebarMenuItem key={tag.name}>
                        <SidebarMenuButton
                          isActive={currentView === `tag-${tag.name}`}
                          onClick={() => handleTagFilter(tag.name)}
                          disabled={count === 0}
                          className="group"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{tag.name}</span>
                          {count > 0 && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {count}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Other Tags */}
        {Object.keys(tagCounts).some(tag => !predefinedTags.some(pt => pt.name === tag)) && (
          <SidebarGroup>
            <SidebarGroupLabel>Other Tags</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.entries(tagCounts)
                  .filter(([tagName]) => !predefinedTags.some(pt => pt.name === tagName))
                  .sort(([, a], [, b]) => b - a)
                  .map(([tagName, count]) => (
                    <SidebarMenuItem key={tagName}>
                      <SidebarMenuButton
                        isActive={currentView === `tag-${tagName}`}
                        onClick={() => handleTagFilter(tagName)}
                        size="sm"
                      >
                        <Tag className="h-3 w-3" />
                        <span className="truncate">{tagName}</span>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {count}
                        </Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}