/**
 * Main App Component - Yetichat Application
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import AuthWrapper from './components/auth/AuthWrapper'; // Import AuthWrapper
import MainLayout from './components/layout/MainLayout';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <AuthWrapper> {/* Use AuthWrapper */}
            <MainLayout />
          </AuthWrapper>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
