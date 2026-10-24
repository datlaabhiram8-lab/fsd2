import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Building,
  Briefcase,
  Users,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';

const ROLE_CONFIG = {
  org_admin: {
    id: 'org_admin',
    label: 'Organization',
    heading: 'Organization Sign In',
    subtitle: 'Manage organization operations, clients, team members, and performance analytics.',
    icon: Building,
    path: '/signin/organization',
    dashboard: '/dashboard/organization',
  },
  client: {
    id: 'client',
    label: 'Client',
    heading: 'Client Sign In',
    subtitle: 'Monitor project deliverables, sign off on milestones, and review progress.',
    icon: Briefcase,
    path: '/signin/client',
    dashboard: '/dashboard/client',
  },
  team_member: {
    id: 'team_member',
    label: 'Team Member',
    heading: 'Team Member Sign In',
    subtitle: 'Manage assigned tasks, track milestones, and collaborate with your team.',
    icon: Users,
    path: '/signin/team-member',
    dashboard: '/dashboard/team-member',
  },
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, user, isAuthenticated } = useAuth();

  // If already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const targetDashboard = ROLE_CONFIG[user.role]?.dashboard || '/dashboard';
      navigate(targetDashboard, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Determine active role based on current path
  const getInitialRole = () => {
    if (location.pathname === '/signin/client') return 'client';
    if (location.pathname === '/signin/team-member') return 'team_member';
    return 'org_admin';
  };

  const [selectedRole, setSelectedRole] = useState(getInitialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Synchronize state when navigating between sign-in routes
  useEffect(() => {
    if (location.pathname === '/signin/client') setSelectedRole('client');
    else if (location.pathname === '/signin/team-member') setSelectedRole('team_member');
    else if (
      location.pathname === '/signin/organization' ||
      location.pathname === '/signin/admin'
    ) {
      setSelectedRole('org_admin');
    }
  }, [location.pathname]);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setError('');
    const targetPath = ROLE_CONFIG[roleKey]?.path || '/signin/organization';
    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Submit credentials to backend API with selected role & rememberMe
      const authenticatedUser = await login(email, password, selectedRole, rememberMe);

      // 2. Validate backend returned role against selected role preference
      if (authenticatedUser.role !== selectedRole) {
        await logout();
        const readableSelectedRole = ROLE_CONFIG[selectedRole]?.label || selectedRole;
        setError(
          `Access restricted: This account does not have ${readableSelectedRole} privileges. Please select your assigned workspace role.`
        );
        return;
      }

      // 3. Navigate to verified dashboard
      const targetDashboard = ROLE_CONFIG[authenticatedUser.role]?.dashboard || '/dashboard';
      const destination = location.state?.from?.pathname || targetDashboard;
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = ROLE_CONFIG[selectedRole] || ROLE_CONFIG.org_admin;

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-royal-600 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-royal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-royal-600/30">
            P
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-navy-900">
            Perfomatrix
          </span>
        </Link>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy-900">
          {currentConfig.heading}
        </h2>

        <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto">
          {currentConfig.subtitle}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white border border-slate-200 py-8 px-6 sm:px-10 rounded-2xl shadow-soft">
          {/* Three Role Tabs: Organization, Client, Team Member */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Workspace Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(ROLE_CONFIG).map((cfg) => {
                const Icon = cfg.icon;
                const isSelected = selectedRole === cfg.id;
                return (
                  <button
                    key={cfg.id}
                    type="button"
                    onClick={() => handleRoleSelect(cfg.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-royal-600 bg-royal-50/60 text-royal-700 shadow-xs ring-1 ring-royal-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mb-1.5 ${
                        isSelected ? 'text-royal-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label
                htmlFor="email"
                className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5"
              >
                Email Address
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>

                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block font-bold uppercase tracking-wider text-navy-900"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-royal-600 hover:text-royal-800 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
                />
                <span className="text-xs">Remember me</span>
              </label>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Registration link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-royal-600 hover:text-royal-800"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
