/**
 * Main App Component - Yetichat Application
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import TestBypassAuth from './components/auth/TestBypassAuth';
import MainLayout from './components/layout/MainLayout';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <TestBypassAuth>
            <MainLayout />
          </TestBypassAuth>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
