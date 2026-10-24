import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Video,
  Upload,
  MessageSquare,
  Flag,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const TeamMemberDashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 'TSK-101',
      title: 'Biometric Authentication Flow with FaceID & Fingerprint',
      project: 'Apex Mobile Banking App',
      priority: 'high',
      dueDate: 'Today, 5:00 PM',
      status: 'in_progress',
    },
    {
      id: 'TSK-104',
      title: 'Fix Race Condition on Refresh Token Rotation',
      project: 'Internal Core Security',
      priority: 'urgent',
      dueDate: 'Tomorrow',
      status: 'todo',
    },
    {
      id: 'TSK-105',
      title: 'Sanitize Request Payload for Audit Event Logger',
      project: 'Compliance Suite',
      priority: 'high',
      dueDate: 'Oct 26',
      status: 'changes_requested',
      reviewerNotes: 'Please remove plain-text auth headers from the logger payload.',
    },
    {
      id: 'TSK-106',
      title: 'Unit Test Coverage for PostgreSQL Transaction Service',
      project: 'Apex Mobile Banking App',
      priority: 'medium',
      dueDate: 'Oct 28',
      status: 'in_progress',
    },
  ]);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);
  const [blockerNote, setBlockerNote] = useState('');

  const upcomingMeetings = [
    { title: 'Sprint 24 Stand-up', time: 'Today, 10:00 AM', link: 'https://meet.google.com/xyz-demo' },
    { title: 'Apex Architecture Sync', time: 'Tomorrow, 3:30 PM', link: 'https://meet.google.com/abc-demo' },
  ];

  const handleReportBlocker = (e) => {
    e.preventDefault();
    if (!blockerNote) return;

    // Mark the first task as blocked
    setTasks(tasks.map((t, idx) => idx === 0 ? { ...t, status: 'blocked' } : t));
    setIsBlockerModalOpen(false);
    setBlockerNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-royal-700 border border-blue-200 mb-1">
            <span>Engineer & Contributor Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            My Workspace & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your daily focus: assigned deliverables, feedback loops, and sprint milestones.
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            icon={Upload}
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Submit Work
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={AlertTriangle}
            onClick={() => setIsBlockerModalOpen(true)}
            className="text-rose-700 border-rose-300 hover:bg-rose-50"
          >
            Report Blocker
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={CheckSquare}
            onClick={() => navigate('/tasks')}
          >
            My Tasks
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-royal-600">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Today / This Week</span>
          <div className="mt-2 text-2xl font-extrabold text-navy-900">3 Tasks</div>
          <p className="text-[11px] text-slate-500 mt-1">1 urgent priority</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-500">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</span>
          <div className="mt-2 text-2xl font-extrabold text-navy-900">2 Tasks</div>
          <p className="text-[11px] text-slate-500 mt-1">Across 2 projects</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">On-Time Delivery Rate</span>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">96.0%</div>
          <p className="text-[11px] text-slate-500 mt-1">Last 30-day sprint cycle</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revision Requests</span>
          <div className="mt-2 text-2xl font-extrabold text-amber-700">1 Item</div>
          <p className="text-[11px] text-slate-500 mt-1">Requires code update</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assigned Tasks & Revision Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader
              title="Assigned Tasks & Priorities"
              subtitle="Ordered by due date and urgency"
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
                  View Full Board
                </Button>
              }
            />
            <div className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">{task.id}</span>
                        <h4 className="text-sm font-bold text-navy-900">{task.title}</h4>
                      </div>
                      <div className="text-xs text-slate-500">{task.project}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {task.dueDate}
                      </span>
                      <StatusPill status={task.status} size="sm" />
                    </div>
                  </div>

                  {task.reviewerNotes && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <div>
                        <strong>Reviewer Feedback:</strong> {task.reviewerNotes}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Meetings & Productivity */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-royal-600" />
              Scheduled Team Meetings
            </h3>
            <div className="space-y-3">
              {upcomingMeetings.map((m, i) => (
                <div key={i} className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-navy-900">{m.title}</span>
                    <span className="text-[11px] text-slate-500">{m.time}</span>
                  </div>
                  <a
                    href={m.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-royal-600 hover:text-royal-800"
                  >
                    <Video className="w-3.5 h-3.5" /> Join Video Call
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-bold text-navy-900 mb-2">Personal Sprint Performance</h3>
            <p className="text-xs text-slate-500 mb-4">
              Feedback from Sprint 23 manager review.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-navy-900">Sprint Rating</span>
                <span className="font-bold text-emerald-600">4.8 / 5.0 (Exceeds)</span>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "Consistently high quality code and rapid turnaround on security recommendations."
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Report Blocker Modal */}
      <Modal
        isOpen={isBlockerModalOpen}
        onClose={() => setIsBlockerModalOpen(false)}
        title="Report Project Blocker"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsBlockerModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReportBlocker}>
              Submit Blocker Alert
            </Button>
          </>
        }
      >
        <form onSubmit={handleReportBlocker} className="space-y-3 text-xs">
          <p className="text-slate-600">
            Reporting a blocker alerts project managers and pauses deadline penalization while the obstacle is resolved.
          </p>
          <div>
            <label className="block font-bold text-navy-900 mb-1">Obstacle Details</label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Awaiting client sandbox API credentials to test OAuth PKCE flow..."
              value={blockerNote}
              onChange={(e) => setBlockerNote(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
