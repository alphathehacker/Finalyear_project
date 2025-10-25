import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonBar = ({ 
  selectedColleges, 
  onRemoveCollege, 
  onClearAll, 
  maxSelections = 4,
  className = "" 
}) => {
  if (selectedColleges?.length === 0) return null;

  return (
    <div className={`fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-6 lg:right-6 z-100 ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-modal p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="font-heading font-medium text-foreground">
              Compare Colleges ({selectedColleges?.length}/{maxSelections})
            </h3>
          </div>
          
          <button
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 flex space-x-2 overflow-x-auto">
            {selectedColleges?.map((college) => (
              <div
                key={college?.id}
                className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg flex-shrink-0"
              >
                <span className="text-sm font-medium text-foreground truncate max-w-32">
                  {college?.name}
                </span>
                <button
                  onClick={() => onRemoveCollege(college?.id)}
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="flex-1"
          >
            Clear All
          </Button>
          
          <Button
            as={Link}
            to="/college-details-comparison"
            state={{ colleges: selectedColleges }}
            size="sm"
            disabled={selectedColleges?.length < 2}
            className="flex-1"
          >
            Compare Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;