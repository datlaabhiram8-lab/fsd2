import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Calendar, TrendingUp, CheckCircle, Clock, Download, ShieldAlert, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

const ADMIN_TRENDS = [
  { month: 'Jun', completed: 28, onTime: 26, approvals: 8 },
  { month: 'Jul', completed: 34, onTime: 32, approvals: 11 },
  { month: 'Aug', completed: 30, onTime: 29, approvals: 9 },
  { month: 'Sep', completed: 42, onTime: 40, approvals: 14 },
  { month: 'Oct', completed: 38, onTime: 36, approvals: 12 },
];

export const AnalyticsPage = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {isClient
              ? 'Client Project Delivery Analytics'
              : isTeamMember
              ? 'Personal Delivery & Productivity Metrics'
              : 'Organization Analytics & Velocity'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data computed with precise mathematical formulas and role-scoped permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Current Quarter</option>
          </select>

          <Button variant="secondary" size="md" icon={Download}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      {isOrgAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-5 border-l-4 border-l-royal-600">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">On-Time Delivery Rate</span>
            <div className="mt-2 text-2xl font-extrabold text-navy-900">94.7%</div>
            <p className="text-[11px] text-slate-400 mt-1">Completed before contractual deadline</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-emerald-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Review Turnaround</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600">14.6 Hours</div>
            <p className="text-[11px] text-slate-400 mt-1">Submission to decision time</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-blue-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Milestone Velocity</span>
            <div className="mt-2 text-2xl font-extrabold text-navy-900">8.2 / Sprint</div>
            <p className="text-[11px] text-slate-400 mt-1">Milestones closed across 12 projects</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-rose-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overdue Tasks</span>
            <div className="mt-2 text-2xl font-extrabold text-rose-600">2 Items</div>
            <p className="text-[11px] text-slate-400 mt-1">4.3% of active task volume</p>
          </Card>
        </div>
      )}

      {isClient && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 border-l-4 border-l-royal-600">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Milestones Completed</span>
            <div className="mt-2 text-2xl font-extrabold text-navy-900">3 of 8 (37.5%)</div>
            <p className="text-[11px] text-slate-400 mt-1">Across assigned enterprise portals</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Client Sign-offs</span>
            <div className="mt-2 text-2xl font-extrabold text-amber-700">2 Deliverables</div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting client decision notes</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-emerald-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SLA Adherence</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600">100% On-Schedule</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero milestone deadline slips</p>
          </Card>
        </div>
      )}

      {isTeamMember && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-5 border-l-4 border-l-royal-600">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasks Completed</span>
            <div className="mt-2 text-2xl font-extrabold text-navy-900">22 This Month</div>
            <p className="text-[11px] text-slate-400 mt-1">Sprint cycle contributions</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-emerald-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal On-Time Rate</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600">96.0%</div>
            <p className="text-[11px] text-slate-400 mt-1">Exceeds team average of 92%</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-blue-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Task Cycle Time</span>
            <div className="mt-2 text-2xl font-extrabold text-navy-900">1.8 Days</div>
            <p className="text-[11px] text-slate-400 mt-1">From In Progress to Submitted</p>
          </Card>
          <Card className="p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">First-Pass Approval</span>
            <div className="mt-2 text-2xl font-extrabold text-amber-700">91.3%</div>
            <p className="text-[11px] text-slate-400 mt-1">Approved on version v1</p>
          </Card>
        </div>
      )}

      {/* Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            title="Monthly Completion Trends"
            subtitle="Comparing total completions against on-time delivery deadlines"
          />
          <CardBody>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ADMIN_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="completed" fill="#1D4ED8" name="Total Completed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="onTime" fill="#10B981" name="On-Time Delivery" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Approval & Sign-off Velocity"
            subtitle="Deliverables approved each monthly milestone period"
          />
          <CardBody>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ADMIN_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 20]} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="approvals"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Milestone Approvals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
