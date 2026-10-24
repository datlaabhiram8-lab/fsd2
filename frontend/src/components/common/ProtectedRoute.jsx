import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-royal-200 border-t-royal-600 rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Authenticating session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Direct unauthenticated user to the appropriate login route based on requested target
    let targetSignin = '/login';
    if (
      location.pathname.startsWith('/dashboard/organization') ||
      location.pathname.startsWith('/dashboard/admin') ||
      location.pathname.startsWith('/clients') ||
      location.pathname.startsWith('/team')
    ) {
      targetSignin = '/signin/organization';
    } else if (
      location.pathname.startsWith('/dashboard/client') ||
      location.pathname.startsWith('/deliverables')
    ) {
      targetSignin = '/signin/client';
    } else if (
      location.pathname.startsWith('/dashboard/team-member') ||
      location.pathname.startsWith('/submissions')
    ) {
      targetSignin = '/signin/team-member';
    }
    return <Navigate to={targetSignin} state={{ from: location }} replace />;
  }

  // If specific roles are required, ensure the user has one of them
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to user's own role dashboard if trying to access unauthorized role route
    const roleDashboardMap = {
      org_admin: '/dashboard/organization',
      client: '/dashboard/client',
      team_member: '/dashboard/team-member',
    };
    const userDashboard = roleDashboardMap[user.role] || '/dashboard';
    return <Navigate to={userDashboard} replace />;
  }

  return children;
};
