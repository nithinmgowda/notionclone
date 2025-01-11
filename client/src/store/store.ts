import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Image {
  id: string;
  url: string;
  caption: string;
}

interface Goal {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Page {
  id: string;
  title: string;
  icon?: string;
  content: string;
  coverImage?: string;
  todos: Todo[];
  images: Image[];
  goals: Goal[];
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  children?: string[];
}

interface NotionStore {
  pages: Record<string, Page>;
  currentPage: string | null;
  currentView: 'home' | 'inbox' | 'ai' | 'dashboard' | 'page';
  isSearchOpen: boolean;
  searchQuery: string;
  addPage: (page: Page) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setCurrentPage: (id: string | null) => void;
  setCurrentView: (view: 'home' | 'inbox' | 'ai' | 'dashboard' | 'page') => void;
  setSearchOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<NotionStore>((set) => ({
  pages: {
    'home': {
      id: 'home',
      title: 'Home',
      icon: '🏠',
      content: 'Welcome to your Notion Clone',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      todos: [],
      images: [],
      goals: []
    },
    'getting-started': {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '📚',
      content: 'Learn how to use Notion Clone',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      todos: [],
      images: [],
      goals: []
    }
  },
  currentPage: null,
  currentView: 'dashboard',
  isSearchOpen: false,
  searchQuery: '',

  addPage: (page) => set((state) => ({
    pages: { ...state.pages, [page.id]: page }
  })),

  updatePage: (id, updates) => set((state) => ({
    pages: {
      ...state.pages,
      [id]: { ...state.pages[id], ...updates, updatedAt: new Date().toISOString() }
    }
  })),

  deletePage: (id) => set((state) => {
    const { [id]: deletedPage, ...remainingPages } = state.pages;
    return { pages: remainingPages };
  }),

  setCurrentPage: (id) => set({ currentPage: id, currentView: id ? 'page' : 'dashboard' }),
  setCurrentView: (view) => set({ currentView: view }),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
