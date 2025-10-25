import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ExamTypeSelector from './components/ExamTypeSelector';
import RankInput from './components/RankInput';
import CategorySelector from './components/CategorySelector';
import LocationSelector from './components/LocationSelector';
import BranchSelector from './components/BranchSelector';
import AdvancedFilters from './components/AdvancedFilters';
import ProgressIndicator from './components/ProgressIndicator';
import PredictionResults from './components/PredictionResults';

const CollegePredictionEngine = () => {
  const [formData, setFormData] = useState({
    examType: '',
    rank: '',
    category: '',
    locations: [],
    branches: []
  });

  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { id: 'exam', title: 'Select Exam', description: 'Choose your entrance exam' },
    { id: 'rank', title: 'Enter Rank', description: 'Provide your exam rank/percentile' },
    { id: 'category', title: 'Select Category', description: 'Choose your reservation category' },
    { id: 'location', title: 'Preferred Locations', description: 'Select preferred study locations' },
    { id: 'branches', title: 'Preferred Branches', description: 'Choose your preferred courses' }
  ];

  // Mock prediction data
  const mockPredictions = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi, Delhi',
      type: 'Government',
      ranking: 2,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      probability: 'high',
      previousCutoff: '164',
      fees: 200000,
      averagePackage: 1800000,
      distance: 25,
      availableBranches: ['Computer Science Engineering', 'Electronics & Communication', 'Mechanical Engineering'],
      isBookmarked: false
    },
    {
      id: 2,
      name: 'National Institute of Technology Warangal',
      location: 'Warangal, Telangana',
      type: 'Government',
      ranking: 19,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
      probability: 'high',
      previousCutoff: '1250',
      fees: 150000,
      averagePackage: 1400000,
      distance: 150,
      availableBranches: ['Computer Science Engineering', 'Electrical Engineering', 'Civil Engineering'],
      isBookmarked: true
    },
    {
      id: 3,
      name: 'Birla Institute of Technology and Science Pilani',
      location: 'Pilani, Rajasthan',
      type: 'Private',
      ranking: 25,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
      probability: 'medium',
      previousCutoff: '2100',
      fees: 450000,
      averagePackage: 1600000,
      distance: 280,
      availableBranches: ['Computer Science Engineering', 'Electronics & Instrumentation', 'Chemical Engineering'],
      isBookmarked: false
    },
    {
      id: 4,
      name: 'Vellore Institute of Technology',
      location: 'Vellore, Tamil Nadu',
      type: 'Private',
      ranking: 15,
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400',
      probability: 'medium',
      previousCutoff: '3500',
      fees: 350000,
      averagePackage: 1200000,
      distance: 420,
      availableBranches: ['Information Technology', 'Computer Science Engineering', 'Electronics Engineering'],
      isBookmarked: false
    },
    {
      id: 5,
      name: 'Manipal Institute of Technology',
      location: 'Manipal, Karnataka',
      type: 'Private',
      ranking: 45,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      probability: 'low',
      previousCutoff: '5200',
      fees: 400000,
      averagePackage: 1100000,
      distance: 650,
      availableBranches: ['Computer Science Engineering', 'Information Technology', 'Mechanical Engineering'],
      isBookmarked: false
    }
  ];

  useEffect(() => {
    // Calculate current step based on form completion
    let step = 1;
    if (formData?.examType) step = 2;
    if (formData?.examType && formData?.rank) step = 3;
    if (formData?.examType && formData?.rank && formData?.category) step = 4;
    if (formData?.examType && formData?.rank && formData?.category && formData?.locations?.length > 0) step = 5;
    if (formData?.examType && formData?.rank && formData?.category && formData?.locations?.length > 0 && formData?.branches?.length > 0) step = 6;
    
    setCurrentStep(step);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.examType) {
      newErrors.examType = 'Please select an entrance exam';
    }

    if (!formData?.rank) {
      newErrors.rank = 'Please enter your rank/percentile';
    } else {
      const rank = parseFloat(formData?.rank);
      if (formData?.examType === 'cat') {
        if (rank < 0 || rank > 100) {
          newErrors.rank = 'CAT percentile must be between 0 and 100';
        }
      } else if (rank < 1) {
        newErrors.rank = 'Rank must be greater than 0';
      }
    }

    if (!formData?.category) {
      newErrors.category = 'Please select your category';
    }

    if (formData?.locations?.length === 0) {
      newErrors.locations = 'Please select at least one preferred location';
    }

    if (formData?.branches?.length === 0) {
      newErrors.branches = 'Please select at least one preferred branch';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleGeneratePredictions = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    setShowResults(false);

    // Simulate API call
    setTimeout(() => {
      setPredictions(mockPredictions);
      setShowResults(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handleBookmark = (collegeId) => {
    setPredictions(prev => 
      prev?.map(college => 
        college?.id === collegeId 
          ? { ...college, isBookmarked: !college?.isBookmarked }
          : college
      )
    );
  };

  const handleViewDetails = (collegeId) => {
    // Navigate to college details or open modal
    console.log('View details for college:', collegeId);
  };

  const isFormComplete = formData?.examType && formData?.rank && formData?.category && 
                        formData?.locations?.length > 0 && formData?.branches?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/student-dashboard" className="hover:text-foreground transition-smooth">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">New Prediction</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              College Prediction Engine
            </h1>
            <p className="text-muted-foreground">
              Get personalized college recommendations based on your entrance exam performance and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Progress Indicator */}
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={steps?.length}
                steps={steps}
              />

              {/* Prediction Form */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Target" size={20} className="text-primary" />
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    Prediction Parameters
                  </h2>
                </div>

                <ExamTypeSelector
                  selectedExam={formData?.examType}
                  onExamChange={(value) => setFormData(prev => ({ ...prev, examType: value }))}
                />

                {formData?.examType && (
                  <RankInput
                    rank={formData?.rank}
                    onRankChange={(value) => setFormData(prev => ({ ...prev, rank: value }))}
                    examType={formData?.examType}
                    error={errors?.rank}
                  />
                )}

                {formData?.examType && formData?.rank && (
                  <CategorySelector
                    selectedCategory={formData?.category}
                    onCategoryChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  />
                )}

                {formData?.examType && formData?.rank && formData?.category && (
                  <LocationSelector
                    selectedLocations={formData?.locations}
                    onLocationChange={(value) => setFormData(prev => ({ ...prev, locations: value }))}
                  />
                )}

                {formData?.examType && formData?.rank && formData?.category && formData?.locations?.length > 0 && (
                  <BranchSelector
                    selectedBranches={formData?.branches}
                    onBranchChange={(value) => setFormData(prev => ({ ...prev, branches: value }))}
                    examType={formData?.examType}
                  />
                )}
              </div>

              {/* Advanced Filters */}
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
              />

              {/* Generate Button */}
              <div className="sticky bottom-4 lg:static">
                <Button
                  onClick={handleGeneratePredictions}
                  disabled={!isFormComplete || isGenerating}
                  loading={isGenerating}
                  iconName="Zap"
                  iconPosition="left"
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? 'Generating Predictions...' : 'Generate Predictions'}
                </Button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-8">
              <PredictionResults
                results={showResults ? predictions : []}
                loading={isGenerating}
                onBookmark={handleBookmark}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegePredictionEngine;