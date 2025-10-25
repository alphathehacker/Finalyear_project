import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPredictions = () => {
  const recentPredictions = [
    {
      id: 1,
      title: 'Engineering Colleges - Delhi NCR',
      examType: 'JEE Main',
      collegeCount: 45,
      date: '2025-08-11',
      status: 'completed',
      accuracy: 92
    },
    {
      id: 2,
      title: 'Top Private Colleges - Bangalore',
      examType: 'JEE Main',
      collegeCount: 28,
      date: '2025-08-10',
      status: 'completed',
      accuracy: 88
    },
    {
      id: 3,
      title: 'Government Colleges - All India',
      examType: 'JEE Main',
      collegeCount: 67,
      date: '2025-08-09',
      status: 'completed',
      accuracy: 95
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Recent Predictions
        </h3>
        <Link to="/prediction-results-reports">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      {recentPredictions?.length > 0 ? (
        <div className="space-y-4">
          {recentPredictions?.map((prediction) => (
            <div
              key={prediction?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={20} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-medium text-sm text-foreground mb-1">
                    {prediction?.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={12} />
                      <span>{prediction?.examType}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Building2" size={12} />
                      <span>{prediction?.collegeCount} colleges</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{new Date(prediction.date)?.toLocaleDateString('en-IN')}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prediction?.status)}`}>
                      {prediction?.status === 'completed' ? 'Completed' : 'Processing'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {prediction?.accuracy}% accuracy
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                <Link to={`/prediction-results-reports?id=${prediction?.id}`}>
                  <Button variant="ghost" size="sm" iconName="Eye">
                    View
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" iconName="Download">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            No predictions yet
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            Start your first college prediction to see results here
          </p>
          <Link to="/college-prediction-engine">
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Create Prediction
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentPredictions;