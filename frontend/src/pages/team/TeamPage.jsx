import React, { useState } from 'react';
import { Users, Mail, UserPlus, CheckCircle2, Shield, FolderKanban } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const TeamPage = () => {
  const [team, setTeam] = useState([
    {
      id: 'TM-01',
      name: 'Jordan Cruz',
      title: 'Senior Full-Stack Engineer',
      email: 'jordan.dev@perfomatrix.com',
      assignedProjects: ['Apex Mobile Banking', 'Internal Core'],
      activeTasks: 4,
      onTimeRate: '96%',
      status: 'Active',
    },
    {
      id: 'TM-02',
      name: 'David Chen',
      title: 'Staff Cloud Infrastructure Architect',
      email: 'david.chen@perfomatrix.com',
      assignedProjects: ['Enterprise Cloud Migration'],
      activeTasks: 3,
      onTimeRate: '94%',
      status: 'Active',
    },
    {
      id: 'TM-03',
      name: 'Elena Rostova',
      title: 'Senior Backend Engineer',
      email: 'elena.r@perfomatrix.com',
      assignedProjects: ['Apex Mobile Banking'],
      activeTasks: 3,
      onTimeRate: '98%',
      status: 'Active',
    },
    {
      id: 'TM-04',
      name: 'Sarah Lin',
      title: 'Lead UI/UX Designer',
      email: 'sarah.lin@perfomatrix.com',
      assignedProjects: ['Apex Mobile Banking', 'E-Commerce'],
      activeTasks: 2,
      onTimeRate: '100%',
      status: 'Active',
    },
  ]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', title: '', project: '' });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newMember.email) return;

    setTeam([
      ...team,
      {
        id: `TM-0${team.length + 1}`,
        name: newMember.name || newMember.email.split('@')[0],
        title: newMember.title || 'Software Engineer',
        email: newMember.email,
        assignedProjects: [newMember.project || 'Apex Mobile Banking'],
        activeTasks: 1,
        onTimeRate: '100%',
        status: 'Invited',
      },
    ]);
    setIsInviteOpen(false);
    setNewMember({ name: '', email: '', title: '', project: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Team Members & Engineering Capacity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage engineers, review project assignments, capacity distribution, and sprint velocity.
          </p>
        </div>

        <Button variant="primary" size="md" icon={UserPlus} onClick={() => setIsInviteOpen(true)}>
          Invite Team Member
        </Button>
      </div>

      <Card>
        <CardHeader
          title={`Engineering Roster (${team.length})`}
          subtitle="Internal team members with task assignment permissions"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Assigned Projects</th>
                <th className="py-3 px-4">Active Tasks</th>
                <th className="py-3 px-4">On-Time Rate</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-navy-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.email}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{t.title}</td>
                  <td className="py-3 px-4">
                    {t.assignedProjects.map((p, i) => (
                      <span key={i} className="inline-block bg-blue-50 text-royal-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-medium mr-1">
                        {p}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-bold text-navy-900">{t.activeTasks}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{t.onTimeRate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={t.status === 'Active' ? 'success' : 'warning'}>{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Team Member"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleInvite}>
              Send Invitation
            </Button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Jordan Cruz"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Company Email</label>
            <input
              type="email"
              required
              placeholder="developer@perfomatrix.com"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Title / Specialization</label>
              <input
                type="text"
                placeholder="Senior Backend Engineer"
                value={newMember.title}
                onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Initial Project Assignment</label>
              <input
                type="text"
                placeholder="Apex Mobile Banking App"
                value={newMember.project}
                onChange={(e) => setNewMember({ ...newMember, project: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
