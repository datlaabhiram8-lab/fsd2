import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building,
  Briefcase,
  Users,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';

const ROLES = [
  {
    id: 'org_admin',
    label: 'Organization',
    subtitle: 'Register your organization & create your admin workspace',
    icon: Building,
  },
  {
    id: 'client',
    label: 'Client',
    subtitle: 'Join an organization workspace as a client representative',
    icon: Briefcase,
  },
  {
    id: 'team_member',
    label: 'Team Member',
    subtitle: 'Join an engineering or delivery team with an invite code',
    icon: Users,
  },
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      if (user.role === 'org_admin') navigate('/dashboard/organization', { replace: true });
      else if (user.role === 'client') navigate('/dashboard/client', { replace: true });
      else navigate('/dashboard/team-member', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const [role, setRole] = useState('org_admin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim()) return 'Please enter your work email.';
    if (formData.password.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(formData.password)) return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(formData.password)) return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(formData.password)) return 'Password must contain at least one number.';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';

    if (role === 'org_admin' && !formData.organizationName.trim()) {
      return 'Please enter your organization name.';
    }

    if (role !== 'org_admin' && !formData.organizationCode.trim()) {
      return 'Please enter your organization code or invite code provided by your administrator.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role,
        organizationName: role === 'org_admin' ? formData.organizationName.trim() : undefined,
        organizationCode: role !== 'org_admin' ? formData.organizationCode.trim() : undefined,
      };

      const newUser = await register(payload);

      if (newUser.role === 'org_admin') {
        navigate('/dashboard/organization', { replace: true });
      } else if (newUser.role === 'client') {
        navigate('/dashboard/client', { replace: true });
      } else {
        navigate('/dashboard/team-member', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

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
          Create your account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-royal-600 hover:text-royal-800">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white border border-slate-200 py-8 px-6 sm:px-10 rounded-2xl shadow-soft">
          {/* Account Type Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setError('');
                    }}
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
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Organization Specific field vs Client/Team Member code */}
            {role === 'org_admin' ? (
              <div>
                <label className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Organization Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Building className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="organizationName"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold uppercase tracking-wider text-navy-900">
                    Organization Code / Invite Code
                  </label>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="organizationCode"
                    required
                    placeholder="e.g. ACME4921"
                    value={formData.organizationCode}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-xs text-navy-900 uppercase tracking-wider placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Ask your Organization Administrator for your workspace code.
                </p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Min 8 characters (uppercase, lowercase, number)"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            By creating an account, you agree to Perfomatrix's{' '}
            <span className="text-royal-600 font-semibold cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-royal-600 font-semibold cursor-pointer">Privacy Policy</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
