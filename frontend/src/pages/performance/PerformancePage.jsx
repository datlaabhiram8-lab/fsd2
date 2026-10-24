import React from 'react';
import { Award, Star, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const PerformancePage = () => {
  const { user, isClient, isTeamMember, isOrgAdmin } = useAuth();

  // Strict Security Rule: Clients must NEVER access employee performance scores or internal reviews!
  if (isClient) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-navy-900">Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Internal employee performance reviews and individual ratings are confidential to company staff and are not visible in client portals.
        </p>
      </div>
    );
  }

  const teamReviews = [
    {
      id: 'REV-01',
      employee: 'Jordan Cruz',
      title: 'Senior Full-Stack Engineer',
      managerScore: 4.8,
      selfScore: 4.6,
      period: 'Sprint 23 — Q4 2026',
      status: 'Reviewed',
      highlights: 'Spearheaded OAuth PKCE implementation and resolved critical payment gateway latency.',
    },
    {
      id: 'REV-02',
      employee: 'David Chen',
      title: 'Staff Cloud Infrastructure Architect',
      managerScore: 4.7,
      selfScore: 4.5,
      period: 'Sprint 23 — Q4 2026',
      status: 'Reviewed',
      highlights: 'Migrated 14 microservices with zero downtime and optimized AWS egress costs by 22%.',
    },
    {
      id: 'REV-03',
      employee: 'Elena Rostova',
      title: 'Senior Backend Engineer',
      managerScore: 4.9,
      selfScore: 4.8,
      period: 'Sprint 23 — Q4 2026',
      status: 'Reviewed',
      highlights: 'Flawless database audit trail streaming implementation with automated test coverage.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          {isTeamMember ? 'My Performance & Reviews' : 'Organization Performance & Capacity Reviews'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Internal sprint appraisals, self-evaluations, manager ratings, and delivery metrics.
        </p>
      </div>

      <div className="grid gap-5">
        {(isTeamMember ? teamReviews.filter(r => r.employee === 'Jordan Cruz') : teamReviews).map((rev) => (
          <Card key={rev.id} className="p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-slate-400">{rev.id}</span>
                  <h3 className="text-base font-bold text-navy-900">{rev.employee}</h3>
                  <span className="text-xs text-slate-500">({rev.title})</span>
                </div>
                <div className="text-xs text-slate-500">Evaluation Cycle: <strong>{rev.period}</strong></div>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{rev.highlights}"
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Manager Rating</div>
                  <div className="text-xl font-extrabold text-royal-700 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-royal-600 text-royal-600" />
                    <span>{rev.managerScore}</span>
                    <span className="text-xs text-slate-400">/ 5.0</span>
                  </div>
                </div>

                <Badge variant="success">{rev.status}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
