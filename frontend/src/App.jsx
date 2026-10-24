import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Dashboards
import { OverviewDashboard } from './pages/dashboard/OverviewDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { ClientDashboard } from './pages/dashboard/ClientDashboard';
import { TeamMemberDashboard } from './pages/dashboard/TeamMemberDashboard';

// Authenticated Pages
import { TasksPage } from './pages/tasks/TasksPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { MeetingsPage } from './pages/meetings/MeetingsPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { DeliverablesPage } from './pages/deliverables/DeliverablesPage';
import { MilestonesPage } from './pages/milestones/MilestonesPage';
import { ClientsPage } from './pages/clients/ClientsPage';
import { TeamPage } from './pages/team/TeamPage';
import { FilesPage } from './pages/files/FilesPage';
import { FeedbackPage } from './pages/feedback/FeedbackPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { PerformancePage } from './pages/performance/PerformancePage';
import { SubmissionsPage } from './pages/submissions/SubmissionsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<Navigate to="/login" replace />} />
            <Route path="/signin/organization" element={<LoginPage />} />
            <Route path="/signin/admin" element={<Navigate to="/signin/organization" replace />} />
            <Route path="/signin/client" element={<LoginPage />} />
            <Route path="/signin/team-member" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Authenticated Workspace Shell */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Role-Specific & General Dashboard Routes */}
              <Route path="/dashboard" element={<OverviewDashboard />} />
              <Route
                path="/dashboard/organization"
                element={
                  <ProtectedRoute allowedRoles={['org_admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={<Navigate to="/dashboard/organization" replace />}
              />
              <Route
                path="/dashboard/client"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/team-member"
                element={
                  <ProtectedRoute allowedRoles={['team_member']}>
                    <TeamMemberDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Shared & Role-Filtered Features */}
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute allowedRoles={['org_admin']}>
                    <ClientsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <ProtectedRoute allowedRoles={['org_admin']}>
                    <TeamPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/deliverables" element={<DeliverablesPage />} />
              <Route path="/milestones" element={<MilestonesPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route
                path="/performance"
                element={
                  <ProtectedRoute allowedRoles={['org_admin']}>
                    <PerformancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedRoles={['org_admin']}>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submissions"
                element={
                  <ProtectedRoute allowedRoles={['team_member', 'org_admin']}>
                    <SubmissionsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<OverviewDashboard />} />
            </Route>

            {/* 404 Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
