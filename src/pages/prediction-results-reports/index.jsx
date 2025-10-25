import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PredictionSummary from './components/PredictionSummary';
import SearchBar from './components/SearchBar';
import FilterSortPanel from './components/FilterSortPanel';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import StatsSummary from './components/StatsSummary';
import ResultsGrid from './components/ResultsGrid';
import ExportModal from './components/ExportModal';
import CollegeDetailsModal from '../../components/ui/CollegeDetailsModal';

const PredictionResultsReports = () => {
  const navigate = useNavigate();
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [collegeDetailsModal, setCollegeDetailsModal] = useState({ open: false, collegeId: null });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('probability');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  // Mock prediction data
  const predictionData = {
    examType: 'JEE Main 2024',
    rank: 15420,
    category: 'General',
    preferences: ['Computer Science', 'Delhi/NCR', 'Government Colleges', 'Fees < 3L'],
    totalColleges: 127,
    distribution: {
      high: 23,
      moderate: 45,
      low: 59
    }
  };

  // Mock colleges data
  const mockColleges = [
    {
      id: 1,
      name: 'Delhi Technological University',
      shortName: 'DTU',
      location: 'Delhi',
      branch: 'Computer Science Engineering',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 78,
      previousCutoff: 12450,
      predictedCutoff: 13200,
      nirfRank: 36,
      fees: 150000,
      averagePackage: 1200000,
      collegeType: 'government',
      isBookmarked: false
    },
    {
      id: 2,
      name: 'Netaji Subhas University of Technology',
      shortName: 'NSUT',
      location: 'Delhi',
      branch: 'Computer Science Engineering',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 65,
      previousCutoff: 8950,
      predictedCutoff: 9500,
      nirfRank: 58,
      fees: 125000,
      averagePackage: 1100000,
      collegeType: 'government',
      isBookmarked: true
    },
    {
      id: 3,
      name: 'Indira Gandhi Delhi Technical University',
      shortName: 'IGDTUW',
      location: 'Delhi',
      branch: 'Information Technology',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 82,
      previousCutoff: 18200,
      predictedCutoff: 19000,
      nirfRank: 72,
      fees: 140000,
      averagePackage: 950000,
      collegeType: 'government',
      isBookmarked: false
    },
    {
      id: 4,
      name: 'Bharati Vidyapeeth College of Engineering',
      shortName: 'BVCOE',
      location: 'Delhi',
      branch: 'Computer Science Engineering',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 45,
      previousCutoff: 6200,
      predictedCutoff: 6800,
      nirfRank: 145,
      fees: 280000,
      averagePackage: 850000,
      collegeType: 'private',
      isBookmarked: false
    },
    {
      id: 5,
      name: 'Maharaja Surajmal Institute of Technology',
      shortName: 'MSIT',
      location: 'Delhi',
      branch: 'Electronics & Communication',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 58,
      previousCutoff: 8500,
      predictedCutoff: 9200,
      nirfRank: 98,
      fees: 195000,
      averagePackage: 750000,
      collegeType: 'private',
      isBookmarked: false
    },
    {
      id: 6,
      name: 'Jamia Millia Islamia',
      shortName: 'JMI',
      location: 'Delhi',
      branch: 'Computer Science Engineering',
      image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=200&fit=crop',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop',
      admissionProbability: 72,
      previousCutoff: 11200,
      predictedCutoff: 12000,
      nirfRank: 42,
      fees: 85000,
      averagePackage: 1050000,
      collegeType: 'government',
      isBookmarked: true
    }
  ];

  // Initialize data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setColleges(mockColleges);
      setFilteredColleges(mockColleges);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort colleges
  useEffect(() => {
    let filtered = [...colleges];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(college =>
        college?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        college?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        college?.branch?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.probability?.length > 0) {
      filtered = filtered?.filter(college => {
        const prob = college?.admissionProbability;
        return filters?.probability?.some(p => {
          if (p === 'high') return prob >= 70;
          if (p === 'moderate') return prob >= 40 && prob < 70;
          if (p === 'low') return prob < 40;
          return false;
        });
      });
    }

    if (filters?.location?.length > 0) {
      filtered = filtered?.filter(college =>
        filters?.location?.includes(college?.location?.toLowerCase())
      );
    }

    if (filters?.collegeType?.length > 0) {
      filtered = filtered?.filter(college =>
        filters?.collegeType?.includes(college?.collegeType)
      );
    }

    if (filters?.feesMin) {
      filtered = filtered?.filter(college => college?.fees >= parseInt(filters?.feesMin));
    }

    if (filters?.feesMax) {
      filtered = filtered?.filter(college => college?.fees <= parseInt(filters?.feesMax));
    }

    if (filters?.rankingMin) {
      filtered = filtered?.filter(college => college?.nirfRank >= parseInt(filters?.rankingMin));
    }

    if (filters?.rankingMax) {
      filtered = filtered?.filter(college => college?.nirfRank <= parseInt(filters?.rankingMax));
    }

    if (filters?.packageMin) {
      filtered = filtered?.filter(college => 
        college?.averagePackage >= parseInt(filters?.packageMin) * 100000
      );
    }

    if (filters?.packageMax) {
      filtered = filtered?.filter(college => 
        college?.averagePackage <= parseInt(filters?.packageMax) * 100000
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'probability':
          aValue = a?.admissionProbability;
          bValue = b?.admissionProbability;
          break;
        case 'ranking':
          aValue = a?.nirfRank;
          bValue = b?.nirfRank;
          break;
        case 'fees':
          aValue = a?.fees;
          bValue = b?.fees;
          break;
        case 'package':
          aValue = a?.averagePackage;
          bValue = b?.averagePackage;
          break;
        case 'alphabetical':
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredColleges(filtered);
  }, [colleges, searchTerm, filters, sortBy, sortOrder]);

  // Calculate stats
  const stats = {
    totalColleges: filteredColleges?.length,
    averageFees: filteredColleges?.reduce((sum, college) => sum + college?.fees, 0) / filteredColleges?.length || 0,
    averagePackage: filteredColleges?.reduce((sum, college) => sum + college?.averagePackage, 0) / filteredColleges?.length || 0,
    distribution: {
      high: filteredColleges?.filter(c => c?.admissionProbability >= 70)?.length,
      moderate: filteredColleges?.filter(c => c?.admissionProbability >= 40 && c?.admissionProbability < 70)?.length,
      low: filteredColleges?.filter(c => c?.admissionProbability < 40)?.length
    }
  };

  // Event handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy, newSortOrder = sortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleCollegeSelect = (collegeId, selected) => {
    if (selected) {
      setSelectedColleges(prev => [...prev, collegeId]);
    } else {
      setSelectedColleges(prev => prev?.filter(id => id !== collegeId));
    }
  };

  const handleSelectAll = () => {
    setSelectedColleges(filteredColleges?.map(c => c?.id));
  };

  const handleClearSelection = () => {
    setSelectedColleges([]);
  };

  const handleBookmark = (collegeId, bookmarked) => {
    setColleges(prev => prev?.map(college =>
      college?.id === collegeId ? { ...college, isBookmarked: bookmarked } : college
    ));
  };

  const handleBulkBookmark = () => {
    setColleges(prev => prev?.map(college =>
      selectedColleges?.includes(college?.id) ? { ...college, isBookmarked: true } : college
    ));
  };

  const handleCompare = (collegeId) => {
    navigate('/college-details-comparison', { 
      state: { compareColleges: [collegeId] }
    });
  };

  const handleBulkCompare = () => {
    if (selectedColleges?.length <= 4) {
      navigate('/college-details-comparison', { 
        state: { compareColleges: selectedColleges }
      });
    }
  };

  const handleViewDetails = (collegeId) => {
    setCollegeDetailsModal({ open: true, collegeId });
  };

  const handleExport = async (exportData) => {
    // Mock export functionality
    console.log('Exporting data:', exportData);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (exportData?.format === 'pdf') {
      // Mock PDF download
      console.log('PDF report generated');
    } else if (exportData?.format === 'excel') {
      // Mock Excel download
      console.log('Excel file generated');
    } else if (exportData?.format === 'email') {
      // Mock email sending
      console.log('Email sent to:', exportData?.emailData?.recipients);
    }
  };

  const allSelected = selectedColleges?.length === filteredColleges?.length && filteredColleges?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Prediction Summary */}
          <PredictionSummary
            predictionData={predictionData}
            isCollapsed={summaryCollapsed}
            onToggle={() => setSummaryCollapsed(!summaryCollapsed)}
          />

          <div className="flex gap-6">
            {/* Filter Panel - Desktop Sidebar */}
            <FilterSortPanel
              isOpen={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                onFilterToggle={() => setFilterPanelOpen(true)}
                placeholder="Search colleges by name, location, or branch..."
              />

              {/* Bulk Actions Toolbar */}
              <BulkActionsToolbar
                selectedCount={selectedColleges?.length}
                totalCount={filteredColleges?.length}
                allSelected={allSelected}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onBulkBookmark={handleBulkBookmark}
                onBulkCompare={handleBulkCompare}
                onBulkExport={() => setExportModalOpen(true)}
              />

              {/* Stats Summary */}
              <StatsSummary stats={stats} />

              {/* Results Grid */}
              <ResultsGrid
                colleges={filteredColleges}
                selectedColleges={selectedColleges}
                onCollegeSelect={handleCollegeSelect}
                onBookmark={handleBookmark}
                onCompare={handleCompare}
                onViewDetails={handleViewDetails}
                loading={loading}
              />

              {/* Pagination would go here for large datasets */}
              {filteredColleges?.length > 0 && !loading && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredColleges?.length} of {predictionData?.totalColleges} colleges
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        selectedColleges={selectedColleges?.map(id => 
          filteredColleges?.find(c => c?.id === id)
        )?.filter(Boolean)}
        onExport={handleExport}
      />
      <CollegeDetailsModal
        collegeId={collegeDetailsModal?.collegeId}
        isOpen={collegeDetailsModal?.open}
        onClose={() => setCollegeDetailsModal({ open: false, collegeId: null })}
        comparisonMode={true}
      />
    </div>
  );
};

export default PredictionResultsReports;