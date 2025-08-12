import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import RequisitionForm from './pages/RequisitionForm';
import RequestsList from './pages/RequestsList';
import UserManagement from './pages/UserManagement';
import CompanyInfo from './pages/CompanyInfo';
import { Toaster } from 'react-hot-toast';
import CVForm from './pages/CVForm';
import CandidateProfiles from './pages/CandidateProfile';
import { AppProvider } from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/requisition"
            element={
              <PrivateRoute>
                <Layout>
                  <RequisitionForm />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <PrivateRoute>
                <Layout>
                  <RequestsList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cv-form"
            element={
              <PrivateRoute>
                <Layout>
                  <CVForm />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate-profiles"
            element={
              <PrivateRoute>
                <Layout>
                  <CandidateProfiles />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute adminOnly>
                <Layout>
                  <UserManagement />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/company"
            element={
              <PrivateRoute>
                <Layout>
                  <CompanyInfo />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </AppProvider>
  );
}

export default App;