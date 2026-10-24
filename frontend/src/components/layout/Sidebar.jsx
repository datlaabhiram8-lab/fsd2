import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Video,
  Users,
  UserCheck,
  Award,
  BarChart3,
  FolderArchive,
  Bell,
  Settings,
  X,
  FileCheck2,
  Flag,
  MessageSquare,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || 'org_admin';

  // Role-Specific Navigation Schemas per Specification
  const orgAdminNav = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/projects', label: 'Projects', icon: FolderKanban },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/meetings', label: 'Meetings', icon: Video },
    { to: '/clients', label: 'Clients', icon: UserCheck },
    { to: '/team', label: 'Team', icon: Users },
    { to: '/performance', label: 'Performance', icon: Award },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/files', label: 'Files', icon: FolderArchive },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const clientNav = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/projects', label: 'My Projects', icon: FolderKanban },
    { to: '/deliverables', label: 'Deliverables', icon: FileCheck2 },
    { to: '/milestones', label: 'Milestones', icon: Flag },
    { to: '/meetings', label: 'Meetings', icon: Video },
    { to: '/files', label: 'Shared Files', icon: FolderArchive },
    { to: '/feedback', label: 'Messages & Feedback', icon: MessageSquare },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const teamMemberNav = [
    { to: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { to: '/projects', label: 'My Projects', icon: FolderKanban },
    { to: '/tasks', label: 'My Tasks', icon: CheckSquare },
    { to: '/submissions', label: 'Submissions', icon: FileCheck2 },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/meetings', label: 'Meetings', icon: Video },
    { to: '/performance', label: 'Performance', icon: Award },
    { to: '/files', label: 'Files', icon: FolderArchive },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  let currentNav = orgAdminNav;
  if (isClient) currentNav = clientNav;
  if (isTeamMember) currentNav = teamMemberNav;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Deep Navy Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B192C] text-slate-200 flex flex-col border-r border-[#1B304D] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1B304D]">
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-royal-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-royal-600/30 group-hover:scale-105 transition-transform">
              <span className="text-lg">P</span>
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Perfomatrix
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                One Platform. Every Performance.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Role Banner */}
        <div className="px-4 py-3 border-b border-[#1B304D] bg-[#071322]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Active Workspace:</span>
            <span
              className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                isOrgAdmin
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                  : isClient
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                  : 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
              }`}
            >
              {user?.roleLabel || 'Organization Admin'}
            </span>
          </div>
          <p className="text-xs font-semibold text-white mt-1 truncate">
            {user?.orgName || 'Perfomatrix Technologies'}
          </p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-royal-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#15273F]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card at Footer */}
        <div className="p-4 border-t border-[#1B304D] bg-[#071322]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-royal-700 text-white flex items-center justify-center text-xs font-bold border border-royal-500">
              {user?.avatarInitials || 'MS'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.title || 'Team Member'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
