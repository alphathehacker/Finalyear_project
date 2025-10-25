import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookmarkCard = ({ 
  college, 
  onRemove, 
  onShare, 
  onViewDetails, 
  onUpdateNotes, 
  onUpdateTags,
  onUpdatePriority,
  isSelected,
  onSelect,
  showCheckbox = false
}) => {
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(college?.notes || '');

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success bg-success/10 border-success/20';
    if (probability >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'Star';
      case 'medium': return 'Circle';
      case 'low': return 'Minus';
      default: return 'Circle';
    }
  };

  const handleNotesSubmit = () => {
    onUpdateNotes(college?.id, notes);
    setEditingNotes(false);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-card ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          {showCheckbox && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(college?.id, e?.target?.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
          )}
          
          <Image
            src={college?.logo}
            alt={`${college?.name} logo`}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-semibold text-base text-foreground truncate">
                {college?.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdatePriority(college?.id, college?.priority === 'high' ? 'medium' : 'high')}
                className="w-6 h-6"
              >
                <Icon 
                  name={getPriorityIcon(college?.priority)} 
                  size={14} 
                  className={college?.priority === 'high' ? 'text-warning' : 'text-muted-foreground'}
                />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Icon name="MapPin" size={14} />
              <span>{college?.location}</span>
              <span>•</span>
              <span>{college?.type}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                getProbabilityColor(college?.probability)
              }`}>
                {college?.probability}% Chance
              </span>
              
              {college?.tags && college?.tags?.length > 0 && (
                <div className="flex items-center space-x-1">
                  {college?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {college?.tags?.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{college?.tags?.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div>
          <span className="text-muted-foreground">NIRF Rank:</span>
          <span className="ml-2 font-medium text-foreground">#{college?.nirfRank}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Cutoff:</span>
          <span className="ml-2 font-medium text-foreground">{college?.cutoff}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Fees:</span>
          <span className="ml-2 font-medium text-foreground">₹{college?.fees?.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Updated:</span>
          <span className="ml-2 font-medium text-foreground">{college?.lastUpdated}</span>
        </div>
      </div>
      {/* Notes Section */}
      {(college?.notes || editingNotes) && (
        <div className="mb-3 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Personal Notes</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingNotes(!editingNotes)}
              iconName={editingNotes ? "X" : "Edit"}
              iconSize={14}
            >
              {editingNotes ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {editingNotes ? (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e?.target?.value)}
                placeholder="Add your personal notes about this college..."
                className="w-full p-2 text-sm border border-border rounded-md bg-background text-foreground resize-none"
                rows={3}
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleNotesSubmit}>
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setNotes(college?.notes || '');
                    setEditingNotes(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {college?.notes?.length > 100 && !isNotesExpanded
                ? `${college?.notes?.substring(0, 100)}...`
                : college?.notes
              }
              {college?.notes?.length > 100 && (
                <button
                  onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                  className="ml-2 text-primary hover:underline text-sm"
                >
                  {isNotesExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          )}
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(college?.id)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(college)}
            iconName="Share"
            iconSize={14}
          >
            Share
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(college?.id)}
          iconName="Trash2"
          iconSize={14}
          className="text-error hover:text-error hover:bg-error/10"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default BookmarkCard;