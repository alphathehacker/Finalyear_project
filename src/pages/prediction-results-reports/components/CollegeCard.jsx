import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeCard = ({ college, onBookmark, onCompare, onViewDetails, isSelected, onSelect }) => {
  const [isBookmarked, setIsBookmarked] = useState(college?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(college?.id, !isBookmarked);
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 70) return 'text-success bg-success/10 border-success/20';
    if (probability >= 40) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getProbabilityIcon = (probability) => {
    if (probability >= 70) return 'TrendingUp';
    if (probability >= 40) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className={`bg-card border rounded-lg shadow-card hover:shadow-modal transition-smooth ${
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      {/* Header with selection and bookmark */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(college?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${
            getProbabilityColor(college?.admissionProbability)
          }`}>
            <div className="flex items-center space-x-1">
              <Icon name={getProbabilityIcon(college?.admissionProbability)} size={14} />
              <span>{college?.admissionProbability}%</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon 
            name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
            size={18}
            className={isBookmarked ? "text-primary" : ""}
          />
        </Button>
      </div>
      {/* College Image */}
      <div className="px-4 pb-3">
        <div className="w-full h-32 overflow-hidden rounded-lg">
          <Image
            src={college?.image}
            alt={college?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* College Info */}
      <div className="px-4 pb-4">
        <div className="flex items-start space-x-3 mb-3">
          <Image
            src={college?.logo}
            alt={`${college?.name} logo`}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-base text-foreground truncate">
              {college?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{college?.location}</p>
          </div>
        </div>

        {/* Branch and Cutoff */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Branch:</span>
            <span className="text-sm font-medium text-foreground">{college?.branch}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">2023 Cutoff:</span>
            <span className="text-sm font-mono font-medium text-foreground">
              {college?.previousCutoff}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Predicted 2024:</span>
            <span className="text-sm font-mono font-medium text-primary">
              {college?.predictedCutoff}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">NIRF Rank</p>
            <p className="font-mono font-medium text-sm text-foreground">#{college?.nirfRank}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Fees (₹)</p>
            <p className="font-mono font-medium text-sm text-foreground">
              {(college?.fees / 100000)?.toFixed(1)}L
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Avg Package</p>
            <p className="font-mono font-medium text-sm text-foreground">
              {(college?.averagePackage / 100000)?.toFixed(1)}L
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(college?.id)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCompare(college?.id)}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;