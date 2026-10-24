import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { ClientDashboard } from './ClientDashboard';
import { TeamMemberDashboard } from './TeamMemberDashboard';

export const OverviewDashboard = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();

  if (isClient) {
    return <ClientDashboard />;
  }

  if (isTeamMember) {
    return <TeamMemberDashboard />;
  }

  // Default to Organization Admin Dashboard
  return <AdminDashboard />;
};
