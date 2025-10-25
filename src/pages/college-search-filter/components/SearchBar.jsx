import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onSearch, className = "" }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, name: "IIT Delhi", type: "college", location: "New Delhi" },
    { id: 2, name: "IIT Bombay", type: "college", location: "Mumbai" },
    { id: 3, name: "Computer Science Engineering", type: "course", category: "Engineering" },
    { id: 4, name: "BITS Pilani", type: "college", location: "Pilani" },
    { id: 5, name: "Mechanical Engineering", type: "course", category: "Engineering" },
    { id: 6, name: "NIT Trichy", type: "college", location: "Tiruchirappalli" },
    { id: 7, name: "Electronics Engineering", type: "course", category: "Engineering" },
    { id: 8, name: "IIIT Hyderabad", type: "college", location: "Hyderabad" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery?.length > 1) {
      const filtered = mockSuggestions?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion?.name);
    setShowSuggestions(false);
    onSearch(suggestion?.name);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search colleges, courses, or locations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-300 max-h-64 overflow-y-auto">
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
            >
              <Icon 
                name={suggestion?.type === 'college' ? 'GraduationCap' : 'BookOpen'} 
                size={16} 
                className="text-primary flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{suggestion?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {suggestion?.type === 'college' ? suggestion?.location : suggestion?.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;