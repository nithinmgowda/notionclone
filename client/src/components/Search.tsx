import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/store';

const Search: React.FC = () => {
  const { 
    isSearchOpen, 
    setSearchOpen, 
    searchQuery, 
    setSearchQuery,
    pages,
    setCurrentPage
  } = useStore();
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const filteredPages = Object.values(pages).filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setCurrentPage(id);
    setSearchOpen(false);
    setSearchQuery('');
  };

  if (!isSearchOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages..."
          className="search-input"
        />
        <div className="search-results">
          {filteredPages.map(page => (
            <div
              key={page.id}
              className="search-result-item"
              onClick={() => handleSelect(page.id)}
            >
              <span className="result-icon">{page.icon}</span>
              <span className="result-title">{page.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div 
        className="search-backdrop"
        onClick={() => setSearchOpen(false)}
      />
    </div>
  );
};

export default Search;
