import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Modal } from '../../components/common/Modal';

const INITIAL_TASKS = [
  {
    id: 'TSK-101',
    title: 'Implement OAuth 2.0 PKCE Flow for Mobile App',
    description: 'Ensure token storage complies with OWASP guidelines and biometric unlock is verified.',
    project: 'Apex Mobile Banking App',
    priority: 'high',
    status: 'in_progress',
    assignee: 'Jordan Cruz',
    dueDate: 'Oct 28, 2026',
    requiresClientApproval: true,
  },
  {
    id: 'TSK-102',
    title: 'Optimize Multi-Tenant Database Query Performance',
    description: 'Refactor compound PostgreSQL indexes on organization_id and project_id.',
    project: 'Enterprise Cloud Migration',
    priority: 'urgent',
    status: 'in_progress',
    assignee: 'David Chen',
    dueDate: 'Oct 25, 2026',
    requiresClientApproval: false,
  },
  {
    id: 'TSK-103',
    title: 'Biometric FaceID SDK Integration Deliverable',
    description: 'Completed unit test suite and security audit report. Submitted for client evaluation.',
    project: 'Apex Mobile Banking App',
    priority: 'medium',
    status: 'submitted',
    assignee: 'Jordan Cruz',
    dueDate: 'Oct 24, 2026',
    requiresClientApproval: true,
  },
  {
    id: 'TSK-104',
    title: 'Milestone 2 Security Audit Penetration Testing',
    description: 'In client review queue awaiting sign-off by Evelyn Reed.',
    project: 'Apex Mobile Banking App',
    priority: 'high',
    status: 'in_review',
    assignee: 'Marcus Sterling',
    dueDate: 'Oct 26, 2026',
    requiresClientApproval: true,
  },
  {
    id: 'TSK-105',
    title: 'Sanitize Request Payload for Audit Event Logger',
    description: 'Reviewer requested changes: remove plain-text auth headers from the logger payload.',
    project: 'Compliance Suite',
    priority: 'high',
    status: 'changes_requested',
    assignee: 'Elena Rostova',
    dueDate: 'Oct 23, 2026',
    requiresClientApproval: false,
  },
  {
    id: 'TSK-106',
    title: 'UI Design System & Token Generation in Figma',
    description: 'Client sign-off achieved with formal approval recorded in the audit trail.',
    project: 'Apex Mobile Banking App',
    priority: 'low',
    status: 'approved',
    assignee: 'Sarah Lin',
    dueDate: 'Oct 18, 2026',
    requiresClientApproval: true,
  },
  {
    id: 'TSK-107',
    title: 'Database Migration Script for Organization Schemas',
    description: 'All migrations successfully verified on staging and production environments.',
    project: 'DevOps',
    priority: 'medium',
    status: 'completed',
    assignee: 'David Chen',
    dueDate: 'Oct 20, 2026',
    requiresClientApproval: false,
  },
  {
    id: 'TSK-108',
    title: 'Apple Pay Sandbox Payment Gateway Certificate',
    description: 'Blocked: Awaiting Apple Developer Enterprise provisioning profile approval.',
    project: 'Apex Mobile Banking App',
    priority: 'urgent',
    status: 'blocked',
    assignee: 'Jordan Cruz',
    dueDate: 'Oct 22, 2026',
    requiresClientApproval: true,
  },
];

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'border-t-slate-400' },
  { id: 'in_progress', title: 'In Progress', color: 'border-t-blue-500' },
  { id: 'submitted', title: 'Submitted', color: 'border-t-amber-500' },
  { id: 'in_review', title: 'In Review', color: 'border-t-purple-500' },
  { id: 'changes_requested', title: 'Changes Req.', color: 'border-t-rose-500' },
  { id: 'approved', title: 'Approved', color: 'border-t-teal-500' },
  { id: 'completed', title: 'Completed', color: 'border-t-emerald-500' },
  { id: 'blocked', title: 'Blocked', color: 'border-t-red-600' },
];

export const TasksPage = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Create Task Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: 'Apex Mobile Banking App',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    requiresClientApproval: true,
  });

  // Client role isolation check: Clients only see tasks for their assigned projects
  const visibleTasks = tasks.filter((t) => {
    if (isClient && !t.requiresClientApproval && t.project !== 'Apex Mobile Banking App') {
      return false;
    }
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    const taskObj = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTask.title,
      description: newTask.description,
      project: newTask.project,
      priority: newTask.priority,
      status: 'todo',
      assignee: newTask.assignee || 'Unassigned',
      dueDate: newTask.dueDate || 'Next week',
      requiresClientApproval: newTask.requiresClientApproval,
    };

    setTasks([taskObj, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      project: 'Apex Mobile Banking App',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      requiresClientApproval: true,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {isTeamMember ? 'My Tasks & Workflow Board' : 'Task & Workflow Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enforcing the full 8-stage lifecycle: Assignment → Work → Submission → Review → Client Approval → Completion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="bg-slate-200/80 p-1 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-navy-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-navy-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {!isClient && (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsModalOpen(true)}
            >
              Create Task
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks by title, project, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 focus:bg-white transition-all text-navy-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              <option value="all">All Statuses (8 Stages)</option>
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>{col.title}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Kanban Board View with all 8 statuses */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-4 items-start overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const colTasks = visibleTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-slate-100/80 border border-slate-200 rounded-xl p-3 flex flex-col min-w-[260px] max-w-[280px] shrink-0"
              >
                <div className={`flex items-center justify-between pb-2 mb-2 border-b-2 ${col.color}`}>
                  <span className="text-xs font-bold text-navy-900">{col.title}</span>
                  <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[160px]">
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs italic">
                      No items
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft hover:shadow-elevated transition-all space-y-2 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-slate-400">{task.id}</span>
                          <span
                            className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                              task.priority === 'urgent'
                                ? 'bg-rose-50 text-rose-600'
                                : task.priority === 'high'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-navy-900 group-hover:text-royal-600 transition-colors line-clamp-2">
                          {task.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="truncate max-w-[110px] font-semibold text-slate-700">
                            {task.assignee}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Task ID</th>
                  <th className="py-3 px-4">Title & Project</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-500">{t.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-navy-900">{t.title}</div>
                      <div className="text-[11px] text-slate-400">{t.project}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{t.assignee}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-slate-600">{t.priority}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{t.dueDate}</td>
                    <td className="py-3 px-4">
                      <StatusPill status={t.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Save & Assign Task
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement OAuth 2.0 PKCE Flow"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Requirements & Acceptance Criteria</label>
            <textarea
              rows={3}
              placeholder="State technical requirements, deliverables, and review criteria..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Project</label>
              <input
                type="text"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white text-navy-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Assignee</label>
              <input
                type="text"
                placeholder="e.g. Jordan Cruz"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white text-navy-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="reqClientAppr"
              checked={newTask.requiresClientApproval}
              onChange={(e) => setNewTask({ ...newTask, requiresClientApproval: e.target.checked })}
              className="rounded border-slate-300 text-royal-600 focus:ring-royal-500"
            />
            <label htmlFor="reqClientAppr" className="font-semibold text-navy-900 cursor-pointer">
              Requires Client Sign-off prior to task completion
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};
