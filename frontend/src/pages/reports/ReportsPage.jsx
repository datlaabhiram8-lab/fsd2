import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const ReportsPage = () => {
  const [reportType, setReportType] = useState('sla');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Organization Performance Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Auditable delivery statistics, SLA adherence, and milestone turnaround metrics.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Download}>
          Export Audit Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-l-4 border-l-royal-600">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall SLA Compliance</span>
          <div className="mt-2 text-2xl font-extrabold text-navy-900">97.8%</div>
          <p className="text-[11px] text-slate-500 mt-1">Based on agreed milestone targets</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Sign-off Velocity</span>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">18.4 Hours</div>
          <p className="text-[11px] text-slate-500 mt-1">Average time from submission to approval</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revision Loop Ratio</span>
          <div className="mt-2 text-2xl font-extrabold text-amber-700">1.14 Cycles</div>
          <p className="text-[11px] text-slate-500 mt-1">86% approved on first submission</p>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Milestone Delivery Ledger — Q4 2026"
          subtitle="Contractual verification and sign-off records"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Milestone</th>
                <th className="py-3 px-4">Contractual Due</th>
                <th className="py-3 px-4">Actual Delivery</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Client Signee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-bold text-navy-900">Apex Mobile Banking</td>
                <td className="py-3 px-4 font-semibold text-slate-700">Milestone 1 — UX Architecture</td>
                <td className="py-3 px-4 text-slate-600">Oct 15, 2026</td>
                <td className="py-3 px-4 text-slate-600">Oct 14, 2026</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">-1 Day (Ahead)</td>
                <td className="py-3 px-4 font-semibold text-slate-900">Evelyn Reed</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-bold text-navy-900">Apex Mobile Banking</td>
                <td className="py-3 px-4 font-semibold text-slate-700">Milestone 2 — Biometrics</td>
                <td className="py-3 px-4 text-slate-600">Nov 02, 2026</td>
                <td className="py-3 px-4 text-slate-600">Pending Review</td>
                <td className="py-3 px-4 text-blue-600 font-bold">On Schedule</td>
                <td className="py-3 px-4 font-semibold text-slate-900">Evelyn Reed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
