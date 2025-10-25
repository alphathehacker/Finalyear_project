import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeCard = ({ 
  college, 
  onBookmark, 
  onCompare, 
  onViewDetails, 
  isBookmarked = false,
  isComparing = false,
  className = "" 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success bg-success/10 border-success/20';
    if (probability >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getProbabilityText = (probability) => {
    if (probability >= 80) return 'High';
    if (probability >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card hover:shadow-modal transition-smooth overflow-hidden ${className}`}>
      {/* College Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={college?.image}
          alt={college?.name}
          className="w-full h-full object-cover transition-smooth hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(college?.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
            isBookmarked 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-white/90 text-muted-foreground hover:text-primary'
          }`}
        >
          <Icon name={isBookmarked ? "BookmarkCheck" : "Bookmark"} size={16} />
        </button>

        {/* Ranking Badge */}
        {college?.ranking && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full">
            <span className="text-xs font-medium text-foreground">
              NIRF #{college?.ranking}
            </span>
          </div>
        )}
      </div>
      {/* College Info */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1 line-clamp-2">
            {college?.name}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{college?.location}</span>
          </div>
        </div>

        {/* College Type & Established */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
            {college?.type}
          </span>
          <span className="text-xs text-muted-foreground">
            Est. {college?.established}
          </span>
        </div>

        {/* Fees */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Annual Fees</span>
            <span className="font-mono font-medium text-foreground">
              ₹{college?.fees?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Available Branches */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2">Available Branches</p>
          <div className="flex flex-wrap gap-1">
            {college?.branches?.slice(0, 3)?.map((branch, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
              >
                {branch}
              </span>
            ))}
            {college?.branches?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                +{college?.branches?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Cutoff & Probability */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Previous Cutoff</span>
            <span className="font-mono font-medium text-foreground">
              {college?.cutoff}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Admission Probability</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProbabilityColor(college?.probability)}`}>
              {getProbabilityText(college?.probability)} ({college?.probability}%)
            </span>
          </div>
        </div>

        {/* Actions */}
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
            variant={isComparing ? "default" : "secondary"}
            size="sm"
            onClick={() => onCompare(college?.id)}
            iconName={isComparing ? "Check" : "Plus"}
            iconPosition="left"
          >
            {isComparing ? 'Added' : 'Compare'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;