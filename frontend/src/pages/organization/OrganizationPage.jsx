import React, { useState } from 'react';
import { Users, Mail, UserPlus, Shield, Building, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

const INITIAL_MEMBERS = [
  { id: 'm1', name: 'Sarah Lin', email: 'sarah.manager@novatech.io', role: 'manager', department: 'Engineering', status: 'Active' },
  { id: 'm2', name: 'Alex Rivera', email: 'alex.dev@novatech.io', role: 'employee', department: 'Frontend Core', status: 'Active' },
  { id: 'm3', name: 'David Chen', email: 'david.chen@novatech.io', role: 'employee', department: 'Backend Systems', status: 'Active' },
  { id: 'm4', name: 'Elena Rostova', email: 'elena.r@novatech.io', role: 'employee', department: 'Data Platform', status: 'Active' },
];

export const OrganizationPage = () => {
  const { user } = useAuth();
  const { isCorporate, isAcademic } = useWorkspace();

  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [newInvite, setNewInvite] = useState({ email: '', role: 'employee', department: '' });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newInvite.email) return;

    setMembers([
      ...members,
      {
        id: `m-${Date.now()}`,
        name: newInvite.email.split('@')[0],
        email: newInvite.email,
        role: newInvite.role,
        department: newInvite.department || 'General',
        status: 'Invited',
      },
    ]);
    setNewInvite({ email: '', role: 'employee', department: '' });
    setInviteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Organization & Membership
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage organization members, send invitations, and configure workspace permissions.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={UserPlus}
          onClick={() => setInviteModalOpen(true)}
        >
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader
          title={`Active Members (${members.length})`}
          subtitle="All users bound strictly to this tenant boundary"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department / Cohort</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{m.name}</td>
                  <td className="py-3 px-4 text-slate-500">{m.email}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded text-[11px]">
                      {m.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{m.department}</td>
                  <td className="py-3 px-4">
                    <Badge variant={m.status === 'Active' ? 'success' : 'warning'}>{m.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invite Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite New Member"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleInvite}>
              Send Invitation
            </Button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="colleague@domain.com"
              value={newInvite.email}
              onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Role Assignment</label>
              <select
                value={newInvite.role}
                onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                {isCorporate ? (
                  <>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="org_admin">Organization Admin</option>
                  </>
                ) : (
                  <>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="org_admin">Academic Admin</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department / Class</label>
              <input
                type="text"
                placeholder={isCorporate ? 'Engineering' : 'Fall 2026 Batch'}
                value={newInvite.department}
                onChange={(e) => setNewInvite({ ...newInvite, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
