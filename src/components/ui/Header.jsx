import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Predict', path: '/college-prediction-engine', icon: 'Target' },
    { label: 'Results', path: '/prediction-results-reports', icon: 'BarChart3' },
    { label: 'Search', path: '/college-search-filter', icon: 'Search' },
    { label: 'Saved', path: '/bookmarks-saved-colleges', icon: 'Bookmark' }
  ];

  const isActive = (path) => location?.pathname === path;

  const notifications = [
    { id: 1, title: 'New prediction results available', time: '2 hours ago', unread: true },
    { id: 2, title: 'College application deadline reminder', time: '1 day ago', unread: true },
    { id: 3, title: 'Profile updated successfully', time: '3 days ago', unread: false }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-200 bg-card border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/student-dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-lg text-foreground hidden sm:block">
            AdmissionPredictor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-300">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-medium text-sm">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth ${
                        notification?.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-300">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-sm text-foreground">Rahul Sharma</p>
                  <p className="text-xs text-muted-foreground">rahul.sharma@email.com</p>
                </div>
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      {/* Overlay for dropdowns */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-250"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;