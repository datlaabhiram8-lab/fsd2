import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckSquare,
  Clock,
  AlertCircle,
  Users,
  UserCheck,
  FileCheck2,
  Calendar,
  Plus,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  Video,
  FileText
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const projectSummaries = [
    { id: 'PRJ-01', name: 'Apex Mobile Banking App', client: 'Apex Global Enterprises', progress: 74, status: 'On Track', due: 'Nov 15, 2026' },
    { id: 'PRJ-02', name: 'Enterprise Cloud Migration', client: 'Starlight Financial', progress: 42, status: 'In Review', due: 'Dec 01, 2026' },
    { id: 'PRJ-03', name: 'Internal Data Pipeline & ETL', client: 'Internal Product', progress: 88, status: 'Ahead', due: 'Oct 30, 2026' },
  ];

  const pendingApprovals = [
    { id: 'APR-101', project: 'Apex Mobile Banking App', deliverable: 'Biometric Login SDK Integration', submitter: 'Jordan Cruz', client: 'Evelyn Reed', status: 'awaiting_client_approval' },
    { id: 'APR-102', project: 'Enterprise Cloud Migration', deliverable: 'Terraform AWS VPC Module v2', submitter: 'David Chen', client: 'Starlight Financial', status: 'in_review' },
  ];

  const upcomingMeetings = [
    { title: 'Sprint Planning — Sprint 24', time: 'Today, 2:00 PM', project: 'Apex Mobile Banking', type: 'Sprint Planning', host: 'Marcus Sterling' },
    { title: 'Client Milestone Sign-off', time: 'Tomorrow, 10:30 AM', project: 'Apex Mobile Banking', type: 'Client Meeting', host: 'Evelyn Reed (Client)' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-1">
            <span>Organization Administrator View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Organization Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time project oversight, client approvals, team capacity, and milestone delivery.
          </p>
        </div>

        {/* Admin Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => navigate('/projects')}
          >
            Create Project
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={CheckSquare}
            onClick={() => navigate('/tasks')}
          >
            Create Task
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Users}
            onClick={() => navigate('/team')}
          >
            Invite User
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Video}
            onClick={() => navigate('/meetings')}
          >
            Schedule Meeting
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={BarChart3}
            onClick={() => navigate('/reports')}
          >
            Reports
          </Button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-royal-600">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Projects</span>
            <FolderKanban className="w-4 h-4 text-royal-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-navy-900">12</div>
          <p className="text-[11px] text-slate-500 mt-1">9 active, 3 in final sign-off</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Active Tasks</span>
            <CheckSquare className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-navy-900">46</span>
            <span className="text-xs font-semibold text-emerald-600">38 Completed this mo.</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 4 project teams</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Pending Approvals</span>
            <FileCheck2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-700">5</div>
          <p className="text-[11px] text-slate-500 mt-1">3 client reviews, 2 manager reviews</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Overdue Tasks</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-600">2</div>
          <p className="text-[11px] text-slate-500 mt-1">Requires deadline adjustment</p>
        </Card>
      </div>

      {/* Main Grid: Projects & Client Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Projects Progress & Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader
              title="Active Project Progress"
              subtitle="Milestone velocity and client deliverables"
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                  View All Projects
                </Button>
              }
            />
            <div className="divide-y divide-slate-100">
              {projectSummaries.map((p) => (
                <div key={p.id} className="p-5 hover:bg-slate-50/70 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">{p.id}</span>
                      <h4 className="text-sm font-bold text-navy-900">{p.name}</h4>
                      <p className="text-xs text-slate-500">Client: <strong>{p.client}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Target: {p.due}</span>
                      <Badge variant={p.status === 'On Track' ? 'success' : 'indigo'}>{p.status}</Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mt-3">
                    <div
                      className="bg-royal-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
                    <span>Overall Milestone Completion</span>
                    <span className="font-bold text-navy-900">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Submissions & Approvals */}
          <Card>
            <CardHeader
              title="Pending Submissions & Approvals"
              subtitle="Deliverables awaiting manager or client review"
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
                  Review Queue
                </Button>
              }
            />
            <div className="divide-y divide-slate-100 text-xs">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60">
                  <div className="space-y-1">
                    <span className="font-bold text-navy-900 text-sm">{item.deliverable}</span>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>{item.project}</span>
                      <span>•</span>
                      <span>Author: <strong>{item.submitter}</strong></span>
                      <span>•</span>
                      <span>Client: <strong>{item.client}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status="in_review" size="sm" />
                    <Button variant="primary" size="sm">
                      Inspect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Upcoming Meetings & Team Capacity */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-royal-600" />
                Upcoming Meetings
              </h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/meetings')} className="text-xs p-1">
                View Calendar
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingMeetings.map((m, i) => (
                <div key={i} className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy-900">{m.title}</span>
                    <span className="text-[10px] bg-white text-royal-700 px-2 py-0.5 rounded font-medium border border-blue-200">
                      {m.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{m.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Project: {m.project}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Workspace Stakeholders Summary */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-navy-900 mb-3">Workspace Stakeholders</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Active Team Members</span>
                <span className="font-bold text-navy-900">18 Engineers / Leads</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Client Accounts</span>
                <span className="font-bold text-navy-900">7 Partner Portals</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">On-Time Sprint Completion</span>
                <span className="font-bold text-emerald-600">94.2%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
