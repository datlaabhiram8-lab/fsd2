import React, { useState } from 'react';
import { FolderKanban, Plus, Users, Calendar, Flag, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ProjectsPage = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();

  const [projects, setProjects] = useState([
    {
      id: 'PRJ-01',
      name: 'Apex Mobile Banking App',
      client: 'Apex Global Enterprises',
      lead: 'Jordan Cruz',
      members: 6,
      progress: 60,
      milestones: '2 of 5 Completed',
      status: 'Active',
      deadline: 'Nov 15, 2026',
    },
    {
      id: 'PRJ-02',
      name: 'Enterprise Cloud Migration',
      client: 'Starlight Financial',
      lead: 'David Chen',
      members: 4,
      progress: 42,
      milestones: '1 of 4 Completed',
      status: 'Active',
      deadline: 'Dec 01, 2026',
    },
    {
      id: 'PRJ-03',
      name: 'Cloud Data Warehouse & Reporting',
      client: 'Apex Global Enterprises',
      lead: 'Elena Rostova',
      members: 5,
      progress: 35,
      milestones: '1 of 3 Completed',
      status: 'In Development',
      deadline: 'Dec 10, 2026',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '', lead: '', deadline: '' });

  // Client Isolation: Clients can only see projects assigned to their organization!
  const visibleProjects = projects.filter((p) => {
    if (isClient && p.client !== 'Apex Global Enterprises') {
      return false;
    }
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProject.name) return;

    setProjects([
      ...projects,
      {
        id: `PRJ-0${projects.length + 1}`,
        name: newProject.name,
        client: newProject.client || 'Enterprise Client',
        lead: newProject.lead || user?.name || 'Lead',
        members: 3,
        progress: 10,
        milestones: '0 of 4 Completed',
        status: 'Active',
        deadline: newProject.deadline || 'Dec 2026',
      },
    ]);
    setIsModalOpen(false);
    setNewProject({ name: '', client: '', lead: '', deadline: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {isClient ? 'My Assigned Projects' : 'Project Portfolio & Workspaces'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isClient
              ? 'Active enterprise deliverables, progress roadmaps, and milestone status.'
              : 'Manage project scopes, client bindings, assigned engineering leads, and delivery SLAs.'}
          </p>
        </div>

        {!isClient && (
          <Button variant="primary" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Create Project
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleProjects.map((p) => (
          <Card key={p.id} hover className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-semibold text-slate-400">{p.id}</span>
                <Badge variant={p.status === 'Active' ? 'indigo' : 'success'}>{p.status}</Badge>
              </div>

              <h3 className="text-base font-bold text-navy-900">{p.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Client: <strong className="text-navy-900">{p.client}</strong>
              </p>
              <p className="text-xs text-slate-500">
                Lead: <strong className="text-slate-700">{p.lead}</strong>
              </p>

              {/* Progress Bar */}
              <div className="mt-4 space-y-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-royal-600 h-2 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Milestones: {p.milestones}</span>
                  <span className="font-bold text-navy-900">{p.progress}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {p.members} team members
              </span>
              <span>Due: {p.deadline}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Initialize Project
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile Banking App v2"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Client Partner</label>
              <input
                type="text"
                placeholder="Apex Global Enterprises"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Project Lead</label>
              <input
                type="text"
                placeholder="Jordan Cruz"
                value={newProject.lead}
                onChange={(e) => setNewProject({ ...newProject, lead: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Target Completion Date</label>
            <input
              type="date"
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
