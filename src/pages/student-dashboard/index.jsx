import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WelcomeCard from './components/WelcomeCard';
import QuickActionCards from './components/QuickActionCards';
import ProgressTracker from './components/ProgressTracker';
import RecentPredictions from './components/RecentPredictions';
import NotificationPanel from './components/NotificationPanel';
import StatisticsCards from './components/StatisticsCards';
import ChatbotWidget from './components/ChatbotWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const StudentDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setLoading(true);
      
      // Mock user profile data
      setTimeout(() => {
        setUserProfile({
          name: 'Rahul Sharma',
          email: 'rahul.sharma@email.com',
          examType: 'JEE Main',
          rank: 2450,
          category: 'General',
          state: 'Delhi',
          preferredBranches: ['Computer Science', 'Electronics', 'Information Technology'],
          profileCompletion: 85
        });

        setStatistics({
          totalPredictions: 12,
          bookmarkedColleges: 28,
          reportsDownloaded: 8,
          profileViews: 156
        });

        setLoading(false);
      }, 1000);
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading Skeleton */}
            <div className="space-y-8">
              <div className="h-32 bg-muted rounded-xl animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeCard userProfile={userProfile} />

            {/* Quick Actions */}
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                Quick Actions
              </h2>
              <QuickActionCards />
            </div>

            {/* Statistics Cards */}
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                Your Statistics
              </h2>
              <StatisticsCards stats={statistics} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Progress Tracker */}
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Counseling Progress
                  </h2>
                  <ProgressTracker />
                </div>

                {/* Recent Predictions */}
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Recent Activity
                  </h2>
                  <RecentPredictions />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Notifications */}
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Important Updates
                  </h2>
                  <NotificationPanel />
                </div>
              </div>
            </div>

            {/* Profile Completion Reminder */}
            {userProfile?.profileCompletion < 100 && (
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Complete Your Profile
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Your profile is {userProfile?.profileCompletion}% complete. Complete it to get more accurate predictions.
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div
                        className="bg-warning h-2 rounded-full transition-all duration-500"
                        style={{ width: `${userProfile?.profileCompletion}%` }}
                      />
                    </div>
                    <Button variant="warning" size="sm" iconName="User" iconPosition="left">
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default StudentDashboard;