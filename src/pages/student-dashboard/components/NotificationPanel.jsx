import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'EAPCET Counseling Registration',
      message: 'Registration for EAPCET counseling starts tomorrow. Don\'t miss the deadline!',
      date: '2025-08-13',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'cutoff',
      title: 'JEE Main Cutoff Updated',
      message: 'Latest cutoff data for Round 2 counseling has been updated in our database.',
      date: '2025-08-12',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'New Feature: College Comparison',
      message: 'Compare up to 4 colleges side by side with our new comparison tool.',
      date: '2025-08-11',
      priority: 'low',
      read: true
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Document Verification Reminder',
      message: 'Remember to keep your documents ready for the counseling process.',
      date: '2025-08-10',
      priority: 'medium',
      read: true
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deadline':
        return { name: 'Clock', color: 'text-error' };
      case 'cutoff':
        return { name: 'TrendingUp', color: 'text-warning' };
      case 'system':
        return { name: 'Info', color: 'text-primary' };
      case 'reminder':
        return { name: 'Bell', color: 'text-secondary' };
      default:
        return { name: 'Info', color: 'text-muted-foreground' };
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-error text-error-foreground text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" iconName="Settings">
          Settings
        </Button>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications?.map((notification) => {
          const icon = getTypeIcon(notification?.type);
          return (
            <div
              key={notification?.id}
              className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(notification?.priority)} ${
                !notification?.read ? 'bg-opacity-100' : 'bg-opacity-50'
              } transition-smooth hover:bg-opacity-75 cursor-pointer`}
              onClick={() => markAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon name={icon?.name} size={16} className={icon?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-heading font-medium text-sm ${
                      !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification?.title}
                    </h4>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  
                  <p className={`text-xs leading-relaxed ${
                    !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {notification?.message}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.date)?.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            No notifications
          </h4>
          <p className="text-muted-foreground text-sm">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;