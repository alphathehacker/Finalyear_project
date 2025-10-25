import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const CollegeDetailsModal = ({ collegeId, isOpen, onClose, comparisonMode = false }) => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen && collegeId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCollege({
          id: collegeId,
          name: 'Indian Institute of Technology Delhi',
          shortName: 'IIT Delhi',
          location: 'New Delhi, Delhi',
          type: 'Government',
          established: 1961,
          ranking: {
            nirf: 2,
            qs: 185,
            times: 401
          },
          image: '/assets/images/college-placeholder.jpg',
          logo: '/assets/images/iit-delhi-logo.png',
          cutoffs: {
            general: 164,
            obc: 118,
            sc: 89,
            st: 76
          },
          fees: {
            tuition: 200000,
            hostel: 25000,
            mess: 36000
          },
          placements: {
            averagePackage: 1800000,
            highestPackage: 5500000,
            placementRate: 95
          },
          courses: [
            'Computer Science Engineering',
            'Electrical Engineering',
            'Mechanical Engineering',
            'Civil Engineering'
          ],
          facilities: [
            'Library', 'Hostel', 'Sports Complex', 'Medical Center', 'Cafeteria'
          ],
          description: 'IIT Delhi is one of the premier engineering institutions in India, known for its excellence in technical education and research.'
        });
        setLoading(false);
      }, 500);
    }
  }, [isOpen, collegeId]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'cutoffs', label: 'Cutoffs', icon: 'TrendingUp' },
    { id: 'fees', label: 'Fees', icon: 'DollarSign' },
    { id: 'placements', label: 'Placements', icon: 'Briefcase' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen' }
  ];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCompare = () => {
    // Handle comparison logic
    console.log('Adding to comparison:', college?.name);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-lg shadow-modal overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Loading college details...</span>
            </div>
          </div>
        ) : college ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <Image 
                  src={college?.logo} 
                  alt={`${college?.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    {college?.name}
                  </h2>
                  <p className="text-muted-foreground">{college?.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                  iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                  iconPosition="left"
                >
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                {comparisonMode && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCompare}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Compare
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="font-medium text-sm">{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <Image 
                    src={college?.image} 
                    alt={college?.name}
                    className="w-full h-48 rounded-lg object-cover"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                        NIRF Ranking
                      </h4>
                      <p className="font-mono font-medium text-2xl text-foreground">
                        #{college?.ranking?.nirf}
                      </p>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                        Established
                      </h4>
                      <p className="font-mono font-medium text-2xl text-foreground">
                        {college?.established}
                      </p>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                        Type
                      </h4>
                      <p className="font-medium text-lg text-foreground">
                        {college?.type}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-medium text-lg text-foreground mb-2">
                      About
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {college?.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-medium text-lg text-foreground mb-3">
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {college?.facilities?.map((facility, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cutoffs' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-lg text-foreground">
                    JEE Main Cutoff Ranks (2024)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(college?.cutoffs)?.map(([category, rank]) => (
                      <div key={category} className="bg-muted rounded-lg p-4">
                        <h5 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                          {category?.toUpperCase()}
                        </h5>
                        <p className="font-mono font-medium text-2xl text-foreground">
                          {rank}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'fees' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-lg text-foreground">
                    Annual Fee Structure
                  </h4>
                  
                  <div className="space-y-3">
                    {Object.entries(college?.fees)?.map(([type, amount]) => (
                      <div key={type} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                        <span className="font-medium text-foreground capitalize">
                          {type} Fee
                        </span>
                        <span className="font-mono font-medium text-foreground">
                          ₹{amount?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
                      <span className="text-foreground">Total Annual Fee</span>
                      <span className="font-mono text-primary">
                        ₹{Object.values(college?.fees)?.reduce((a, b) => a + b, 0)?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'placements' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-lg text-foreground">
                    Placement Statistics (2024)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <h5 className="font-heading font-medium text-sm text-success mb-1">
                        Placement Rate
                      </h5>
                      <p className="font-mono font-medium text-2xl text-success">
                        {college?.placements?.placementRate}%
                      </p>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <h5 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                        Average Package
                      </h5>
                      <p className="font-mono font-medium text-lg text-foreground">
                        ₹{(college?.placements?.averagePackage / 100000)?.toFixed(1)}L
                      </p>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <h5 className="font-heading font-medium text-sm text-muted-foreground mb-1">
                        Highest Package
                      </h5>
                      <p className="font-mono font-medium text-lg text-foreground">
                        ₹{(college?.placements?.highestPackage / 100000)?.toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-lg text-foreground">
                    Available Courses
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {college?.courses?.map((course, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <Icon name="BookOpen" size={16} className="text-primary" />
                        <span className="font-medium text-foreground">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CollegeDetailsModal;