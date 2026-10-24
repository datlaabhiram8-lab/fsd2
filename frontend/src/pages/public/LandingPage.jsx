import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const roleWorkspaces = [
    {
      id: 'org_admin',
      title: 'Organization Workspace',
      icon: Building,
      signinPath: '/signin/organization',
      buttonText: 'Sign In as Organization',
      description:
        'Manage organization-wide operations, client accounts, team members, project assignments, milestones, and performance analytics.',
      features: [
        'Organization and user management.',
        'Project allocation and oversight.',
        'Milestone approvals and delivery tracking.',
        'Team capacity and performance analytics.',
      ],
    },
    {
      id: 'client',
      title: 'Client Workspace',
      icon: Briefcase,
      signinPath: '/signin/client',
      buttonText: 'Sign In as Client',
      description:
        'Monitor assigned projects, review deliverables, approve milestones, request changes, and access project documentation.',
      features: [
        'Assigned project progress.',
        'Deliverable review and feedback.',
        'Milestone approvals and change requests.',
        'Project meetings and documentation.',
      ],
    },
    {
      id: 'team_member',
      title: 'Team Member Workspace',
      icon: Users,
      signinPath: '/signin/team-member',
      buttonText: 'Sign In as Team Member',
      description:
        'Manage assigned tasks, update progress, collaborate with teammates, and submit work for review.',
      features: [
        'Personal task board.',
        'Task status and progress updates.',
        'Milestone and deadline tracking.',
        'Team collaboration and meeting schedules.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#0B192C] flex flex-col selection:bg-royal-600 selection:text-white">
      {/* Top Header */}
      <nav className="h-20 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-royal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-royal-600/30">
              P
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-navy-900">Perfomatrix</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-blue-50 text-royal-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                SaaS Platform
              </span>
            </div>
          </div>

          {/* Right: Sign In Link & Register */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-royal-600 hover:text-royal-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm font-semibold bg-royal-600 hover:bg-royal-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-900 leading-tight">
            One Platform. <br />
            <span className="text-royal-600">Every Performance.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            Unite Organizations, Enterprise Clients, and Engineering Team Members.
            Manage multi-tier tasks, milestone sign-offs, video meeting calendars, and objective
            performance analytics from one centralized system.
          </p>
        </div>
      </section>

      {/* Three Dedicated Role Workspaces Section */}
      <section className="py-8 pb-20 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Three Dedicated Role Workspaces
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Strict role-based isolation guaranteeing that clients see only their project deliverables,
            while engineers focus on delivery and organizations oversee capacity.
          </p>
        </div>

        {/* Responsive Grid with exactly 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roleWorkspaces.map((ws) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-soft flex flex-col justify-between hover:shadow-elevated transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-royal-600 flex items-center justify-center border border-blue-200/60">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-navy-900">{ws.title}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{ws.description}</p>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities
                    </span>
                    <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                      {ws.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => navigate(ws.signinPath)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-royal-600 hover:bg-royal-700 active:bg-royal-800 transition-all shadow-sm flex items-center justify-center gap-2 group"
                  >
                    <span>{ws.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>© 2026 Perfomatrix Technologies. Built for enterprise teams and performance precision.</p>
      </footer>
    </div>
  );
};
