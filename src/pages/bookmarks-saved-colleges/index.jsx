import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookmarkCard from './components/BookmarkCard';
import BookmarkList from './components/BookmarkList';
import BulkActions from './components/BulkActions';
import SearchAndFilter from './components/SearchAndFilter';
import ExportModal from './components/ExportModal';

const BookmarksSavedColleges = () => {
  const navigate = useNavigate();
  
  // State management
  const [activeList, setActiveList] = useState('all');
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filters, setFilters] = useState({});
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Mock data for bookmarked colleges
  const [bookmarkedColleges] = useState([
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      shortName: "IIT Delhi",
      location: "New Delhi, Delhi",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      probability: 85,
      nirfRank: 2,
      cutoff: 164,
      fees: 200000,
      lastUpdated: "2 days ago",
      dateAdded: new Date('2024-08-10'),
      priority: "high",
      listId: "favorites",
      tags: ["Top Choice", "Engineering"],
      notes: "Excellent placement record and research opportunities. Strong alumni network in tech industry."
    },
    {
      id: 2,
      name: "Indian Institute of Technology Bombay",
      shortName: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      probability: 78,
      nirfRank: 3,
      cutoff: 143,
      fees: 200000,
      lastUpdated: "1 day ago",
      dateAdded: new Date('2024-08-09'),
      priority: "high",
      listId: "favorites",
      tags: ["Dream College", "Mumbai"],
      notes: "Great campus life and proximity to tech companies in Mumbai."
    },
    {
      id: 3,
      name: "Delhi Technological University",
      shortName: "DTU",
      location: "New Delhi, Delhi",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      probability: 92,
      nirfRank: 36,
      cutoff: 2847,
      fees: 150000,
      lastUpdated: "3 days ago",
      dateAdded: new Date('2024-08-08'),
      priority: "medium",
      listId: "backup",
      tags: ["Safe Option", "Delhi"],
      notes: "Good backup option with decent placement opportunities."
    },
    {
      id: 4,
      name: "Netaji Subhas University of Technology",
      shortName: "NSUT",
      location: "New Delhi, Delhi",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      probability: 95,
      nirfRank: 47,
      cutoff: 3542,
      fees: 140000,
      lastUpdated: "1 week ago",
      dateAdded: new Date('2024-08-05'),
      priority: "medium",
      listId: "backup",
      tags: ["Backup", "Affordable"],
      notes: "Affordable option with good faculty in computer science."
    },
    {
      id: 5,
      name: "Birla Institute of Technology and Science",
      shortName: "BITS Pilani",
      location: "Pilani, Rajasthan",
      type: "Private",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      probability: 65,
      nirfRank: 25,
      cutoff: 298,
      fees: 450000,
      lastUpdated: "4 days ago",
      dateAdded: new Date('2024-08-07'),
      priority: "high",
      listId: "dream",
      tags: ["Private", "Expensive"],
      notes: "Premium private institution with excellent industry connections."
    }
  ]);

  // Mock data for bookmark lists
  const [bookmarkLists, setBookmarkLists] = useState([
    { id: 'all', name: 'All Bookmarks', type: 'default', isDefault: true },
    { id: 'favorites', name: 'Favorites', type: 'favorites', isDefault: false },
    { id: 'backup', name: 'Backup Options', type: 'backup', isDefault: false },
    { id: 'dream', name: 'Dream Colleges', type: 'dream', isDefault: false },
    { id: 'applied', name: 'Applied', type: 'applied', isDefault: false }
  ]);

  // Calculate bookmark counts for each list
  const bookmarkCounts = {
    all: bookmarkedColleges?.length,
    favorites: bookmarkedColleges?.filter(c => c?.listId === 'favorites')?.length,
    backup: bookmarkedColleges?.filter(c => c?.listId === 'backup')?.length,
    dream: bookmarkedColleges?.filter(c => c?.listId === 'dream')?.length,
    applied: bookmarkedColleges?.filter(c => c?.listId === 'applied')?.length,
    highPriority: bookmarkedColleges?.filter(c => c?.priority === 'high')?.length,
    highChance: bookmarkedColleges?.filter(c => c?.probability >= 80)?.length
  };

  // Filter and sort colleges
  const getFilteredColleges = () => {
    let filtered = bookmarkedColleges;

    // Filter by active list
    if (activeList !== 'all') {
      filtered = filtered?.filter(college => college?.listId === activeList);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(college =>
        college?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        college?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.location && filters?.location?.length > 0) {
      filtered = filtered?.filter(college =>
        filters?.location?.some(loc => 
          college?.location?.toLowerCase()?.includes(loc?.toLowerCase())
        )
      );
    }

    if (filters?.probability && filters?.probability?.length > 0) {
      filtered = filtered?.filter(college => {
        return filters?.probability?.some(prob => {
          if (prob === 'high') return college?.probability >= 80;
          if (prob === 'medium') return college?.probability >= 60 && college?.probability < 80;
          if (prob === 'low') return college?.probability < 60;
          return false;
        });
      });
    }

    if (filters?.priority && filters?.priority?.length > 0) {
      filtered = filtered?.filter(college =>
        filters?.priority?.includes(college?.priority)
      );
    }

    if (filters?.type && filters?.type?.length > 0) {
      filtered = filtered?.filter(college =>
        filters?.type?.some(type => 
          college?.type?.toLowerCase()?.includes(type?.toLowerCase())
        )
      );
    }

    if (filters?.minFees) {
      filtered = filtered?.filter(college => college?.fees >= parseInt(filters?.minFees));
    }

    if (filters?.maxFees) {
      filtered = filtered?.filter(college => college?.fees <= parseInt(filters?.maxFees));
    }

    // Sort colleges
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'probability':
          return b?.probability - a?.probability;
        case 'fees':
          return a?.fees - b?.fees;
        case 'ranking':
          return a?.nirfRank - b?.nirfRank;
        case 'dateAdded':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredColleges = getFilteredColleges();

  // Handlers
  const handleSelectBookmark = (collegeId, isSelected) => {
    setSelectedBookmarks(prev => 
      isSelected 
        ? [...prev, collegeId]
        : prev?.filter(id => id !== collegeId)
    );
  };

  const handleSelectAll = () => {
    setSelectedBookmarks(filteredColleges?.map(c => c?.id));
    setShowBulkActions(true);
  };

  const handleDeselectAll = () => {
    setSelectedBookmarks([]);
    setShowBulkActions(false);
  };

  const handleRemoveBookmark = (collegeId) => {
    // In real app, this would update the backend
    console.log('Removing bookmark:', collegeId);
  };

  const handleShareBookmark = (college) => {
    // In real app, this would open share modal
    console.log('Sharing college:', college?.name);
  };

  const handleViewDetails = (collegeId) => {
    navigate(`/college-details-comparison?id=${collegeId}`);
  };

  const handleUpdateNotes = (collegeId, notes) => {
    // In real app, this would update the backend
    console.log('Updating notes for college:', collegeId, notes);
  };

  const handleUpdateTags = (collegeId, tags) => {
    // In real app, this would update the backend
    console.log('Updating tags for college:', collegeId, tags);
  };

  const handleUpdatePriority = (collegeId, priority) => {
    // In real app, this would update the backend
    console.log('Updating priority for college:', collegeId, priority);
  };

  const handleCreateList = (listName) => {
    const newList = {
      id: Date.now()?.toString(),
      name: listName,
      type: 'custom',
      isDefault: false
    };
    setBookmarkLists(prev => [...prev, newList]);
  };

  const handleDeleteList = (listId) => {
    setBookmarkLists(prev => prev?.filter(list => list?.id !== listId));
    if (activeList === listId) {
      setActiveList('all');
    }
  };

  const handleRenameList = (listId, newName) => {
    setBookmarkLists(prev => 
      prev?.map(list => 
        list?.id === listId ? { ...list, name: newName } : list
      )
    );
  };

  const handleBulkRemove = () => {
    console.log('Bulk removing:', selectedBookmarks);
    setSelectedBookmarks([]);
    setShowBulkActions(false);
  };

  const handleBulkMove = (targetListId) => {
    console.log('Moving bookmarks to list:', targetListId, selectedBookmarks);
    setSelectedBookmarks([]);
    setShowBulkActions(false);
  };

  const handleBulkExport = () => {
    setIsExportModalOpen(true);
  };

  const handleBulkShare = () => {
    console.log('Sharing bookmarks:', selectedBookmarks);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting with config:', exportConfig);
    // In real app, this would generate and download the file
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  // Update bulk actions visibility
  useEffect(() => {
    setShowBulkActions(selectedBookmarks?.length > 0);
  }, [selectedBookmarks]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button 
                onClick={() => navigate('/student-dashboard')}
                className="hover:text-foreground transition-smooth"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={14} />
              <span>Bookmarks</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  Bookmarks & Saved Colleges
                </h1>
                <p className="text-muted-foreground">
                  Manage your saved colleges and organize them into custom lists
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  onClick={() => navigate('/college-search-filter')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add More Colleges
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/college-details-comparison')}
                  iconName="GitCompare"
                  iconPosition="left"
                  iconSize={16}
                >
                  Compare Selected
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar - Lists */}
            <div className="lg:col-span-3">
              <BookmarkList
                lists={bookmarkLists}
                activeList={activeList}
                onListChange={setActiveList}
                onCreateList={handleCreateList}
                onDeleteList={handleDeleteList}
                onRenameList={handleRenameList}
                bookmarkCounts={bookmarkCounts}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {/* Search and Filter */}
              <SearchAndFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />

              {/* Bulk Actions */}
              {showBulkActions && (
                <BulkActions
                  selectedCount={selectedBookmarks?.length}
                  totalCount={filteredColleges?.length}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkRemove={handleBulkRemove}
                  onBulkMove={handleBulkMove}
                  onBulkExport={handleBulkExport}
                  onBulkShare={handleBulkShare}
                  lists={bookmarkLists?.filter(list => !list?.isDefault)}
                />
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    {bookmarkLists?.find(list => list?.id === activeList)?.name || 'All Bookmarks'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    ({filteredColleges?.length} college{filteredColleges?.length !== 1 ? 's' : ''})
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  iconName="CheckSquare"
                  iconPosition="left"
                  iconSize={14}
                >
                  {showBulkActions ? 'Cancel Selection' : 'Select Multiple'}
                </Button>
              </div>

              {/* College Cards */}
              {filteredColleges?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredColleges?.map((college) => (
                    <BookmarkCard
                      key={college?.id}
                      college={college}
                      onRemove={handleRemoveBookmark}
                      onShare={handleShareBookmark}
                      onViewDetails={handleViewDetails}
                      onUpdateNotes={handleUpdateNotes}
                      onUpdateTags={handleUpdateTags}
                      onUpdatePriority={handleUpdatePriority}
                      isSelected={selectedBookmarks?.includes(college?.id)}
                      onSelect={handleSelectBookmark}
                      showCheckbox={showBulkActions}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Bookmark" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-medium text-lg text-foreground mb-2">
                    No bookmarks found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || Object.keys(filters)?.length > 0
                      ? 'Try adjusting your search or filters' :'Start by bookmarking colleges from your prediction results'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={() => navigate('/college-prediction-engine')}
                      iconName="Target"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Get Predictions
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/college-search-filter')}
                      iconName="Search"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Search Colleges
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedColleges={selectedBookmarks?.map(id => 
          bookmarkedColleges?.find(c => c?.id === id)
        )?.filter(Boolean)}
        onExport={handleExport}
      />
    </div>
  );
};

export default BookmarksSavedColleges;