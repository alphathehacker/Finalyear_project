import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from '../../components/ui/FilterPanel';
import CollegeDetailsModal from '../../components/ui/CollegeDetailsModal';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import CollegeCard from './components/CollegeCard';
import SortDropdown from './components/SortDropdown';
import ViewToggle from './components/ViewToggle';
import ComparisonBar from './components/ComparisonBar';
import MapView from './components/MapView';
import LoadingGrid from './components/LoadingGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CollegeSearchFilter = () => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [bookmarkedColleges, setBookmarkedColleges] = useState(new Set());
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock college data
  const mockColleges = [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      shortName: "IIT Delhi",
      location: "New Delhi, Delhi",
      type: "Government",
      established: 1961,
      ranking: 2,
      fees: 200000,
      cutoff: "164",
      probability: 85,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical"]
    },
    {
      id: 2,
      name: "Indian Institute of Technology Bombay",
      shortName: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      type: "Government",
      established: 1958,
      ranking: 3,
      fees: 210000,
      cutoff: "144",
      probability: 75,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Electronics", "Mechanical", "Aerospace", "Metallurgy"]
    },
    {
      id: 3,
      name: "Birla Institute of Technology and Science",
      shortName: "BITS Pilani",
      location: "Pilani, Rajasthan",
      type: "Private",
      established: 1964,
      ranking: 25,
      fees: 450000,
      cutoff: "280",
      probability: 92,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Electronics", "Mechanical", "Chemical", "Civil"]
    },
    {
      id: 4,
      name: "National Institute of Technology Trichy",
      shortName: "NIT Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      type: "Government",
      established: 1964,
      ranking: 9,
      fees: 150000,
      cutoff: "1200",
      probability: 68,
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Electronics", "Mechanical", "Civil", "Production"]
    },
    {
      id: 5,
      name: "International Institute of Information Technology",
      shortName: "IIIT Hyderabad",
      location: "Hyderabad, Telangana",
      type: "Deemed",
      established: 1998,
      ranking: 42,
      fees: 350000,
      cutoff: "2500",
      probability: 88,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Electronics", "Computational Biology"]
    },
    {
      id: 6,
      name: "Delhi Technological University",
      shortName: "DTU",
      location: "New Delhi, Delhi",
      type: "Government",
      established: 1941,
      ranking: 58,
      fees: 180000,
      cutoff: "3500",
      probability: 95,
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
      branches: ["Computer Science", "Information Technology", "Electronics", "Mechanical"]
    }
  ];

  // Initialize data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setColleges(mockColleges);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort colleges
  const filteredAndSortedColleges = React.useMemo(() => {
    let filtered = colleges?.filter(college => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery?.toLowerCase();
        if (!college?.name?.toLowerCase()?.includes(query) && 
            !college?.location?.toLowerCase()?.includes(query) &&
            !college?.branches?.some(branch => branch?.toLowerCase()?.includes(query))) {
          return false;
        }
      }

      // Location filter
      if (filters?.location && filters?.location?.length > 0) {
        const collegeState = college?.location?.split(', ')?.[1]?.toLowerCase();
        if (!filters?.location?.some(loc => collegeState?.includes(loc))) {
          return false;
        }
      }

      // College type filter
      if (filters?.collegeType && filters?.collegeType?.length > 0) {
        if (!filters?.collegeType?.includes(college?.type?.toLowerCase())) {
          return false;
        }
      }

      // Fees filter
      if (filters?.feesMin && college?.fees < parseInt(filters?.feesMin)) return false;
      if (filters?.feesMax && college?.fees > parseInt(filters?.feesMax)) return false;

      // Ranking filter
      if (filters?.rankingMin && college?.ranking < parseInt(filters?.rankingMin)) return false;
      if (filters?.rankingMax && college?.ranking > parseInt(filters?.rankingMax)) return false;

      return true;
    });

    // Sort colleges
    switch (sortBy) {
      case 'ranking':
        filtered?.sort((a, b) => a?.ranking - b?.ranking);
        break;
      case 'fees-low':
        filtered?.sort((a, b) => a?.fees - b?.fees);
        break;
      case 'fees-high':
        filtered?.sort((a, b) => b?.fees - a?.fees);
        break;
      case 'cutoff-low':
        filtered?.sort((a, b) => parseInt(a?.cutoff) - parseInt(b?.cutoff));
        break;
      case 'cutoff-high':
        filtered?.sort((a, b) => parseInt(b?.cutoff) - parseInt(a?.cutoff));
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default:
        // Relevance - sort by probability
        filtered?.sort((a, b) => b?.probability - a?.probability);
    }

    return filtered;
  }, [colleges, searchQuery, filters, sortBy]);

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  const handleBookmark = (collegeId) => {
    setBookmarkedColleges(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(collegeId)) {
        newSet?.delete(collegeId);
      } else {
        newSet?.add(collegeId);
      }
      return newSet;
    });
  };

  const handleCompare = (collegeId) => {
    const college = colleges?.find(c => c?.id === collegeId);
    if (!college) return;

    setSelectedColleges(prev => {
      const isAlreadySelected = prev?.some(c => c?.id === collegeId);
      if (isAlreadySelected) {
        return prev?.filter(c => c?.id !== collegeId);
      } else if (prev?.length < 4) {
        return [...prev, college];
      }
      return prev;
    });
  };

  const handleRemoveFromComparison = (collegeId) => {
    setSelectedColleges(prev => prev?.filter(c => c?.id !== collegeId));
  };

  const handleClearComparison = () => {
    setSelectedColleges([]);
  };

  const handleViewDetails = (collegeId) => {
    setSelectedCollegeId(collegeId);
    setIsModalOpen(true);
  };

  const handleCollegeSelect = (collegeId) => {
    handleViewDetails(collegeId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 lg:pb-6">
        <div className="flex">
          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="p-4 lg:p-6">
              {/* Header Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                      College Search & Filter
                    </h1>
                    <p className="text-muted-foreground">
                      Discover and compare colleges based on your preferences and entrance exam scores
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearch={handleSearch}
                  className="mb-4"
                />

                {/* Filter Chips */}
                <FilterChips
                  activeFilters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                  className="mb-4"
                />

                {/* Controls */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterPanelOpen(true)}
                      iconName="Filter"
                      iconPosition="left"
                      className="lg:hidden"
                    >
                      Filters
                    </Button>
                    
                    <div className="text-sm text-muted-foreground">
                      {loading ? 'Loading...' : `${filteredAndSortedColleges?.length} colleges found`}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <SortDropdown
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                    
                    <ViewToggle
                      viewMode={viewMode}
                      onViewModeChange={setViewMode}
                    />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              {loading ? (
                <LoadingGrid count={6} />
              ) : viewMode === 'map' ? (
                <MapView
                  colleges={filteredAndSortedColleges}
                  onCollegeSelect={handleCollegeSelect}
                />
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {filteredAndSortedColleges?.map((college) => (
                    <CollegeCard
                      key={college?.id}
                      college={college}
                      onBookmark={handleBookmark}
                      onCompare={handleCompare}
                      onViewDetails={handleViewDetails}
                      isBookmarked={bookmarkedColleges?.has(college?.id)}
                      isComparing={selectedColleges?.some(c => c?.id === college?.id)}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && filteredAndSortedColleges?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No colleges found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Bar */}
      <ComparisonBar
        selectedColleges={selectedColleges}
        onRemoveCollege={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
      />
      {/* College Details Modal */}
      <CollegeDetailsModal
        collegeId={selectedCollegeId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comparisonMode={true}
      />
    </div>
  );
};

export default CollegeSearchFilter;