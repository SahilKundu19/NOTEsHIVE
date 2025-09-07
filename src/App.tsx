import React, { useState } from "react";
import { Note } from "./types/note";
import { useNotes } from "./hooks/useNotes";
import { useAuth } from "./contexts/AuthContext";
import { NotesGrid } from "./components/NotesGrid";
import { NoteEditor } from "./components/NoteEditor";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { AppSidebar } from "./components/AppSidebar";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Plus, Moon, Sun, Menu, FileText, LogOut } from "lucide-react";
import { Separator } from "./components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

export default function App() {
  const { user, loading, logout } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show authentication screens if not logged in
  if (!user) {
    return authMode === 'signin' ? (
      <SignIn onSwitchToSignUp={() => setAuthMode('signup')} />
    ) : (
      <SignUp onSwitchToSignIn={() => setAuthMode('signin')} />
    );
  }

  // Main app for authenticated users
  return <AuthenticatedApp />;
}

function AuthenticatedApp() {
  const {
    notes,
    allNotes,
    filters,
    setFilters,
    allTags,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    toggleArchive,
  } = useNotes();
  const { user, logout } = useAuth();

  const [selectedNote, setSelectedNote] = useState<Note | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [currentView, setCurrentView] = useState("all");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = async (
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => {
    await createNote(noteData);
    setIsEditing(false);
  };

  const handleUpdateNote = async (
    id: string,
    updates: Partial<Note>,
  ) => {
    await updateNote(id, updates);
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setSelectedNote(null);
  };

  const noteCounts = {
    total: allNotes.filter((n) => !n.isArchived).length,
    favorites: allNotes.filter(
      (n) => n.isFavorite && !n.isArchived,
    ).length,
    archived: allNotes.filter((n) => n.isArchived).length,
  };

  // Calculate tag counts
  const tagCounts = allNotes.reduce(
    (acc, note) => {
      if (!note.isArchived) {
        note.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const getViewTitle = () => {
    if (filters.showFavorites) return "Favourite Notes";
    if (filters.showArchived) return "Archived Notes";
    if (currentView.startsWith("tag-")) {
      const tagName = currentView.replace("tag-", "");
      return `${tagName} Notes`;
    }
    return "All Notes";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar
          filters={filters}
          onFiltersChange={setFilters}
          noteCounts={noteCounts}
          tagCounts={tagCounts}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="font-semibold">
                  {getViewTitle()}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCreateNote}
                  className="h-9"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Note
                </Button>

                <Separator
                  orientation="vertical"
                  className="h-6"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="h-9 w-9 p-0"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>

                <Separator
                  orientation="vertical"
                  className="h-6"
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Signed in as</span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="flex h-[calc(100vh-73px)]">
            {/* Main Content */}
            <div
              className={`flex-1 flex flex-col ${isEditing ? "hidden lg:flex lg:w-1/2" : ""}`}
            >
              <SearchAndFilter
                filters={filters}
                onFiltersChange={setFilters}
                allTags={allTags}
                noteCounts={noteCounts}
              />

              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">
                      {getViewTitle()}
                    </h2>
                    <div className="text-sm text-muted-foreground">
                      {notes.length}{" "}
                      {notes.length === 1 ? "note" : "notes"}
                    </div>
                  </div>

                  <NotesGrid
                    notes={notes}
                    onEditNote={handleEditNote}
                    onToggleFavorite={toggleFavorite}
                    onToggleArchive={toggleArchive}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              </div>
            </div>

            {/* Note Editor */}
            {isEditing && (
              <div className="flex-1 lg:w-1/2 border-l bg-card/30">
                <div className="h-full p-4">
                  <NoteEditor
                    note={selectedNote}
                    allTags={allTags}
                    onSave={handleSaveNote}
                    onUpdate={handleUpdateNote}
                    onClose={handleCloseEditor}
                    onToggleFavorite={toggleFavorite}
                    onToggleArchive={toggleArchive}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Editor Overlay */}
          {isEditing && (
            <div className="lg:hidden fixed inset-0 bg-background z-50">
              <div className="h-full p-4">
                <NoteEditor
                  note={selectedNote}
                  allTags={allTags}
                  onSave={handleSaveNote}
                  onUpdate={handleUpdateNote}
                  onClose={handleCloseEditor}
                  onToggleFavorite={toggleFavorite}
                  onToggleArchive={toggleArchive}
                />
              </div>
            </div>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}