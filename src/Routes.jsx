import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CollegeDetailsComparison from './pages/college-details-comparison';
import BookmarksSavedColleges from './pages/bookmarks-saved-colleges';
import CollegePredictionEngine from './pages/college-prediction-engine';
import PredictionResultsReports from './pages/prediction-results-reports';
import StudentDashboard from './pages/student-dashboard';
import CollegeSearchFilter from './pages/college-search-filter';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookmarksSavedColleges />} />
        <Route path="/college-details-comparison" element={<CollegeDetailsComparison />} />
        <Route path="/bookmarks-saved-colleges" element={<BookmarksSavedColleges />} />
        <Route path="/college-prediction-engine" element={<CollegePredictionEngine />} />
        <Route path="/prediction-results-reports" element={<PredictionResultsReports />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/college-search-filter" element={<CollegeSearchFilter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
