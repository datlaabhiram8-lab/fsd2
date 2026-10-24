import React, { useState } from 'react';
import { UserCheck, Building, Mail, Plus, FolderKanban, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ClientsPage = () => {
  const [clients, setClients] = useState([
    {
      id: 'CL-01',
      name: 'Evelyn Reed',
      title: 'VP of Product',
      company: 'Apex Global Enterprises',
      email: 'client@apexglobal.com',
      assignedProjects: ['Apex Mobile Banking App'],
      status: 'Active Portal',
      lastActive: '2 hours ago',
    },
    {
      id: 'CL-02',
      name: 'Arthur Hayes',
      title: 'Chief Technology Officer',
      company: 'Starlight Financial',
      email: 'arthur.h@starlight.io',
      assignedProjects: ['Enterprise Cloud Migration'],
      status: 'Active Portal',
      lastActive: 'Yesterday',
    },
    {
      id: 'CL-03',
      name: 'Sophia Laurent',
      title: 'Director of Digital',
      company: 'Nordic Retail Group',
      email: 'sophia@nordicretail.se',
      assignedProjects: ['E-Commerce Scalability'],
      status: 'Invited',
      lastActive: 'Pending Acceptance',
    },
  ]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', company: '', project: '' });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newClient.email) return;

    setClients([
      ...clients,
      {
        id: `CL-0${clients.length + 1}`,
        name: newClient.name || newClient.email.split('@')[0],
        title: 'Client Stakeholder',
        company: newClient.company || 'Enterprise Partner',
        email: newClient.email,
        assignedProjects: [newClient.project || 'Apex Mobile Banking App'],
        status: 'Invited',
        lastActive: 'Just invited',
      },
    ]);
    setIsInviteOpen(false);
    setNewClient({ name: '', email: '', company: '', project: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Client Accounts & Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage external client sponsors, assign project access scopes, and track engagement.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsInviteOpen(true)}>
          Invite Client
        </Button>
      </div>

      <Card>
        <CardHeader
          title={`Active Client Partners (${clients.length})`}
          subtitle="Clients can only access projects explicitly assigned below"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Client Contact</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Assigned Projects</th>
                <th className="py-3 px-4">Portal Status</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-navy-900">{c.name}</div>
                    <div className="text-[11px] text-slate-500">{c.email}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{c.company}</td>
                  <td className="py-3 px-4">
                    {c.assignedProjects.map((p, i) => (
                      <span key={i} className="inline-block bg-blue-50 text-royal-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-medium mr-1">
                        {p}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={c.status === 'Active Portal' ? 'success' : 'warning'}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{c.lastActive}</td>
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
        title="Invite Client to Project Portal"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleInvite}>
              Send Portal Invitation
            </Button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Client Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Evelyn Reed"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Client Work Email</label>
            <input
              type="email"
              required
              placeholder="client@company.com"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. Apex Global"
                value={newClient.company}
                onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Assign to Project</label>
              <input
                type="text"
                placeholder="Apex Mobile Banking App"
                value={newClient.project}
                onChange={(e) => setNewClient({ ...newClient, project: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
