import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const PredictionResults = ({ results, loading, onBookmark, onViewDetails, className = "" }) => {
  const [sortBy, setSortBy] = useState('relevance');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'distance', label: 'Distance' },
    { value: 'fees', label: 'Fees (Low to High)' },
    { value: 'ranking', label: 'NIRF Ranking' },
    { value: 'cutoff', label: 'Previous Cutoff' }
  ];

  const getProbabilityColor = (probability) => {
    switch (probability) {
      case 'high':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getProbabilityText = (probability) => {
    switch (probability) {
      case 'high':
        return 'High Chance';
      case 'medium':
        return 'Medium Chance';
      case 'low':
        return 'Low Chance';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-center">
              <p className="font-medium text-foreground">Generating Predictions</p>
              <p className="text-sm text-muted-foreground">
                Analyzing your profile and matching with colleges...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results || results?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading font-medium text-lg text-foreground mb-2">
          No Predictions Generated
        </h3>
        <p className="text-muted-foreground">
          Fill in your details and click "Generate Predictions" to see college recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            College Predictions
          </h2>
          <p className="text-sm text-muted-foreground">
            {results?.length} colleges match your profile
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-48"
          />
        </div>
      </div>
      {/* Results Grid */}
      <div className="space-y-4">
        {results?.map((college) => (
          <div
            key={college?.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-smooth"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* College Image */}
              <div className="flex-shrink-0">
                <Image
                  src={college?.image}
                  alt={college?.name}
                  className="w-full lg:w-24 h-32 lg:h-24 rounded-lg object-cover"
                />
              </div>

              {/* College Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {college?.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{college?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Building" size={14} />
                        <span>{college?.type}</span>
                      </div>
                      {college?.ranking && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Trophy" size={14} />
                          <span>NIRF #{college?.ranking}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getProbabilityColor(college?.probability)}`}>
                    {getProbabilityText(college?.probability)}
                  </div>
                </div>

                {/* Branch Availability */}
                {college?.availableBranches && college?.availableBranches?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Available Branches:</p>
                    <div className="flex flex-wrap gap-2">
                      {college?.availableBranches?.slice(0, 3)?.map((branch, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                        >
                          {branch}
                        </span>
                      ))}
                      {college?.availableBranches?.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          +{college?.availableBranches?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {college?.previousCutoff && (
                    <div>
                      <p className="text-xs text-muted-foreground">Previous Cutoff</p>
                      <p className="font-mono font-medium text-sm text-foreground">
                        {college?.previousCutoff}
                      </p>
                    </div>
                  )}
                  {college?.fees && (
                    <div>
                      <p className="text-xs text-muted-foreground">Annual Fees</p>
                      <p className="font-mono font-medium text-sm text-foreground">
                        ₹{college?.fees?.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {college?.averagePackage && (
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Package</p>
                      <p className="font-mono font-medium text-sm text-foreground">
                        ₹{(college?.averagePackage / 100000)?.toFixed(1)}L
                      </p>
                    </div>
                  )}
                  {college?.distance && (
                    <div>
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-mono font-medium text-sm text-foreground">
                        {college?.distance} km
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onBookmark(college?.id)}
                      iconName={college?.isBookmarked ? "BookmarkCheck" : "Bookmark"}
                      iconPosition="left"
                    >
                      {college?.isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(college?.id)}
                      iconName="ExternalLink"
                      iconPosition="right"
                    >
                      View Details
                    </Button>
                  </div>

                  {college?.probability === 'high' && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="TrendingUp" size={14} />
                      <span className="text-xs font-medium">Recommended</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Results
        </Button>
      </div>
    </div>
  );
};

export default PredictionResults;