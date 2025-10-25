import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonView = ({ colleges, onRemoveCollege, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'rankings', label: 'Rankings', icon: 'Trophy' },
    { id: 'cutoffs', label: 'Cutoffs', icon: 'TrendingUp' },
    { id: 'fees', label: 'Fees', icon: 'DollarSign' },
    { id: 'placements', label: 'Placements', icon: 'Briefcase' }
  ];

  const renderComparisonRow = (label, getValue, highlight = false) => (
    <div className={`grid grid-cols-${colleges?.length + 1} gap-4 py-3 border-b border-border ${highlight ? 'bg-muted/50' : ''}`}>
      <div className="font-medium text-foreground">{label}</div>
      {colleges?.map((college, index) => (
        <div key={index} className="text-center">
          {getValue(college)}
        </div>
      ))}
    </div>
  );

  const getBestValue = (colleges, getValue, isHigherBetter = true) => {
    const values = colleges?.map(getValue);
    return isHigherBetter ? Math.max(...values) : Math.min(...values);
  };

  const renderValueWithHighlight = (value, bestValue, formatter = (v) => v) => {
    const isHighlighted = value === bestValue;
    return (
      <span className={isHighlighted ? 'font-semibold text-success' : 'text-foreground'}>
        {formatter(value)}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-400 bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              College Comparison
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card border-r border-border p-4">
          <nav className="space-y-2">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span className="font-medium">{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* College Headers */}
          <div className={`grid grid-cols-${colleges?.length + 1} gap-4 mb-6`}>
            <div></div>
            {colleges?.map((college, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="relative">
                  <button
                    onClick={() => onRemoveCollege(college?.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs hover:bg-error/80 transition-smooth"
                  >
                    <Icon name="X" size={12} />
                  </button>
                  <Image
                    src={college?.logo}
                    alt={`${college?.name} logo`}
                    className="w-16 h-16 object-cover rounded-lg mx-auto mb-3"
                  />
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {college?.shortName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{college?.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Content */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {activeSection === 'overview' && (
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Basic Information
                </h3>
                {renderComparisonRow('Established', (college) => college?.established)}
                {renderComparisonRow('Type', (college) => college?.type)}
                {renderComparisonRow('Campus Size', (college) => college?.stats?.campusSize || 'N/A')}
                {renderComparisonRow('Total Students', (college) => college?.stats?.totalStudents?.toLocaleString() || 'N/A')}
                {renderComparisonRow('Faculty', (college) => college?.stats?.faculty || 'N/A')}
                {renderComparisonRow('Courses Offered', (college) => college?.stats?.courses || 'N/A')}
              </div>
            )}

            {activeSection === 'rankings' && (
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Rankings Comparison
                </h3>
                {renderComparisonRow(
                  'NIRF Ranking',
                  (college) => {
                    const bestRank = getBestValue(colleges, (c) => c?.rankings?.nirf || 999, false);
                    return renderValueWithHighlight(
                      college?.rankings?.nirf || 'N/A',
                      bestRank,
                      (v) => v === 'N/A' ? v : `#${v}`
                    );
                  },
                  true
                )}
                {renderComparisonRow(
                  'QS World Ranking',
                  (college) => {
                    const bestRank = getBestValue(colleges, (c) => c?.rankings?.qs || 9999, false);
                    return renderValueWithHighlight(
                      college?.rankings?.qs || 'N/A',
                      bestRank,
                      (v) => v === 'N/A' ? v : `#${v}`
                    );
                  }
                )}
                {renderComparisonRow(
                  'Times Ranking',
                  (college) => {
                    const bestRank = getBestValue(colleges, (c) => c?.rankings?.times || 9999, false);
                    return renderValueWithHighlight(
                      college?.rankings?.times || 'N/A',
                      bestRank,
                      (v) => v === 'N/A' ? v : `#${v}`
                    );
                  }
                )}
              </div>
            )}

            {activeSection === 'cutoffs' && (
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  JEE Main Cutoffs (General Category)
                </h3>
                {renderComparisonRow(
                  'Computer Science',
                  (college) => {
                    const csCutoff = college?.cutoffs?.['jee-main']?.general?.find(c => c?.branch?.includes('Computer'))?.closingRank;
                    const bestCutoff = getBestValue(
                      colleges,
                      (c) => c?.cutoffs?.['jee-main']?.general?.find(cut => cut?.branch?.includes('Computer'))?.closingRank || 99999,
                      false
                    );
                    return renderValueWithHighlight(
                      csCutoff || 'N/A',
                      bestCutoff,
                      (v) => v === 'N/A' ? v : v?.toLocaleString()
                    );
                  },
                  true
                )}
                {renderComparisonRow(
                  'Electrical Engineering',
                  (college) => {
                    const eeCutoff = college?.cutoffs?.['jee-main']?.general?.find(c => c?.branch?.includes('Electrical'))?.closingRank;
                    const bestCutoff = getBestValue(
                      colleges,
                      (c) => c?.cutoffs?.['jee-main']?.general?.find(cut => cut?.branch?.includes('Electrical'))?.closingRank || 99999,
                      false
                    );
                    return renderValueWithHighlight(
                      eeCutoff || 'N/A',
                      bestCutoff,
                      (v) => v === 'N/A' ? v : v?.toLocaleString()
                    );
                  }
                )}
                {renderComparisonRow(
                  'Mechanical Engineering',
                  (college) => {
                    const meCutoff = college?.cutoffs?.['jee-main']?.general?.find(c => c?.branch?.includes('Mechanical'))?.closingRank;
                    const bestCutoff = getBestValue(
                      colleges,
                      (c) => c?.cutoffs?.['jee-main']?.general?.find(cut => cut?.branch?.includes('Mechanical'))?.closingRank || 99999,
                      false
                    );
                    return renderValueWithHighlight(
                      meCutoff || 'N/A',
                      bestCutoff,
                      (v) => v === 'N/A' ? v : v?.toLocaleString()
                    );
                  }
                )}
              </div>
            )}

            {activeSection === 'fees' && (
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Fee Structure (Annual)
                </h3>
                {renderComparisonRow(
                  'Tuition Fee',
                  (college) => {
                    const tuitionFee = college?.feeStructure?.btech?.academic?.reduce((sum, fee) => sum + fee?.amount, 0) || 0;
                    const bestFee = getBestValue(
                      colleges,
                      (c) => c?.feeStructure?.btech?.academic?.reduce((sum, fee) => sum + fee?.amount, 0) || 999999,
                      false
                    );
                    return renderValueWithHighlight(
                      tuitionFee,
                      bestFee,
                      (v) => `₹${v?.toLocaleString()}`
                    );
                  },
                  true
                )}
                {renderComparisonRow(
                  'Hostel Fee',
                  (college) => {
                    const hostelFee = college?.feeStructure?.btech?.hostel?.reduce((sum, fee) => sum + fee?.amount, 0) || 0;
                    const bestFee = getBestValue(
                      colleges,
                      (c) => c?.feeStructure?.btech?.hostel?.reduce((sum, fee) => sum + fee?.amount, 0) || 999999,
                      false
                    );
                    return renderValueWithHighlight(
                      hostelFee,
                      bestFee,
                      (v) => `₹${v?.toLocaleString()}`
                    );
                  }
                )}
                {renderComparisonRow(
                  'Total Annual Fee',
                  (college) => {
                    const totalFee = (college?.feeStructure?.btech?.academic?.reduce((sum, fee) => sum + fee?.amount, 0) || 0) +
                                   (college?.feeStructure?.btech?.hostel?.reduce((sum, fee) => sum + fee?.amount, 0) || 0);
                    const bestFee = getBestValue(
                      colleges,
                      (c) => ((c?.feeStructure?.btech?.academic?.reduce((sum, fee) => sum + fee?.amount, 0) || 0) +
                             (c?.feeStructure?.btech?.hostel?.reduce((sum, fee) => sum + fee?.amount, 0) || 0)) || 999999,
                      false
                    );
                    return renderValueWithHighlight(
                      totalFee,
                      bestFee,
                      (v) => `₹${v?.toLocaleString()}`
                    );
                  }
                )}
              </div>
            )}

            {activeSection === 'placements' && (
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Placement Statistics (2024)
                </h3>
                {renderComparisonRow(
                  'Placement Rate',
                  (college) => {
                    const placementRate = college?.placementStats?.['2024']?.placementRate || 0;
                    const bestRate = getBestValue(colleges, (c) => c?.placementStats?.['2024']?.placementRate || 0);
                    return renderValueWithHighlight(
                      placementRate,
                      bestRate,
                      (v) => `${v}%`
                    );
                  },
                  true
                )}
                {renderComparisonRow(
                  'Average Package',
                  (college) => {
                    const avgPackage = college?.placementStats?.['2024']?.averagePackage || 0;
                    const bestPackage = getBestValue(colleges, (c) => c?.placementStats?.['2024']?.averagePackage || 0);
                    return renderValueWithHighlight(
                      avgPackage,
                      bestPackage,
                      (v) => `₹${v}L`
                    );
                  }
                )}
                {renderComparisonRow(
                  'Highest Package',
                  (college) => {
                    const highestPackage = college?.placementStats?.['2024']?.highestPackage || 0;
                    const bestPackage = getBestValue(colleges, (c) => c?.placementStats?.['2024']?.highestPackage || 0);
                    return renderValueWithHighlight(
                      highestPackage,
                      bestPackage,
                      (v) => `₹${v}L`
                    );
                  }
                )}
                {renderComparisonRow(
                  'Companies Visited',
                  (college) => {
                    const companiesVisited = college?.placementStats?.['2024']?.companiesVisited || 0;
                    const bestCount = getBestValue(colleges, (c) => c?.placementStats?.['2024']?.companiesVisited || 0);
                    return renderValueWithHighlight(
                      companiesVisited,
                      bestCount
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;