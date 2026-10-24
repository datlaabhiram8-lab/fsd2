import React from 'react';
import { Flag, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const MilestonesPage = () => {
  const milestones = [
    {
      id: 'MS-01',
      title: 'Milestone 1 — Architecture & Core Design Sign-off',
      project: 'Apex Mobile Banking App',
      dueDate: 'Oct 15, 2026',
      status: 'Approved',
      approvedBy: 'Evelyn Reed (Client)',
      completionDate: 'Oct 18, 2026',
      deliverablesCount: 3,
    },
    {
      id: 'MS-02',
      title: 'Milestone 2 — Biometrics & Security Integration',
      project: 'Apex Mobile Banking App',
      dueDate: 'Nov 02, 2026',
      status: 'Awaiting Sign-off',
      approvedBy: 'Pending Evelyn Reed review',
      completionDate: 'In Review',
      deliverablesCount: 2,
    },
    {
      id: 'MS-03',
      title: 'Milestone 3 — Banking Operations & Transfer Engine',
      project: 'Apex Mobile Banking App',
      dueDate: 'Nov 20, 2026',
      status: 'In Progress',
      approvedBy: 'Unassigned',
      completionDate: 'Estimated Nov 18',
      deliverablesCount: 4,
    },
    {
      id: 'MS-04',
      title: 'Milestone 4 — Final Production Acceptance & Store Deployment',
      project: 'Apex Mobile Banking App',
      dueDate: 'Dec 10, 2026',
      status: 'Planning',
      approvedBy: 'Unassigned',
      completionDate: 'Estimated Dec 05',
      deliverablesCount: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Project Milestones & Deliverable Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track contractual milestones, client acceptance criteria, and project phases.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((m, idx) => (
          <Card key={m.id} className="p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  m.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : m.status === 'Awaiting Sign-off'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-400">{m.id}</span>
                    <h3 className="text-base font-bold text-navy-900">{m.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>Project: <strong>{m.project}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Target: {m.dueDate}
                    </span>
                    <span>•</span>
                    <span>{m.deliverablesCount} Deliverables</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Approval Status: <strong>{m.approvedBy}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge
                  variant={
                    m.status === 'Approved'
                      ? 'success'
                      : m.status === 'Awaiting Sign-off'
                      ? 'warning'
                      : 'default'
                  }
                >
                  {m.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
