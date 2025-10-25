import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = () => {
  const counselingSteps = [
    {
      id: 1,
      title: 'Profile Setup',
      description: 'Complete your academic profile',
      status: 'completed',
      date: '2025-08-10'
    },
    {
      id: 2,
      title: 'Rank Verification',
      description: 'Verify your entrance exam rank',
      status: 'completed',
      date: '2025-08-11'
    },
    {
      id: 3,
      title: 'College Prediction',
      description: 'Generate your first prediction',
      status: 'current',
      date: '2025-08-12'
    },
    {
      id: 4,
      title: 'Document Preparation',
      description: 'Prepare required documents',
      status: 'pending',
      date: '2025-08-15'
    },
    {
      id: 5,
      title: 'Counseling Registration',
      description: 'Register for counseling process',
      status: 'pending',
      date: '2025-08-20'
    }
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'current':
        return { name: 'Clock', color: 'text-warning' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStepBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'current':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const completedSteps = counselingSteps?.filter(step => step?.status === 'completed')?.length;
  const progressPercentage = (completedSteps / counselingSteps?.length) * 100;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Counseling Progress
        </h3>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {completedSteps} of {counselingSteps?.length} completed
          </p>
          <p className="font-mono font-medium text-primary">
            {Math.round(progressPercentage)}%
          </p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Steps List */}
      <div className="space-y-4">
        {counselingSteps?.map((step, index) => {
          const icon = getStepIcon(step?.status);
          return (
            <div
              key={step?.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${getStepBg(step?.status)} transition-smooth`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon name={icon?.name} size={20} className={icon?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-medium text-sm text-foreground">
                  {step?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Target: {new Date(step.date)?.toLocaleDateString('en-IN')}
                </p>
              </div>
              {step?.status === 'current' && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;