import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Flag,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Video,
  Download,
  MessageSquare
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ClientDashboard = () => {
  const navigate = useNavigate();

  // Client-specific state & approval modal
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [approvalHistory, setApprovalHistory] = useState([
    {
      id: 'APR-801',
      deliverable: 'UI/UX Interactive Figma Prototype for Mobile App',
      milestone: 'Milestone 1 — Core Experience',
      reviewedAt: '2 days ago',
      decision: 'Approved',
      client: 'Evelyn Reed',
      comment: 'Excellent flow on the authentication and transfer screens.',
    },
  ]);

  const [deliverablesToReview, setDeliverablesToReview] = useState([
    {
      id: 'DEL-201',
      title: 'Biometric Authentication & FaceID Security Module',
      milestone: 'Milestone 2 — Security & Compliance',
      project: 'Apex Mobile Banking App',
      submittedAt: 'Today at 9:30 AM',
      author: 'Jordan Cruz (Lead Engineer)',
      files: ['Biometric-Architecture-Spec-v2.pdf', 'Security-Pen-Test-Report.pdf'],
      notes: 'All OWASP MASVS Level 2 requirements met. Ready for client review and acceptance.',
    },
    {
      id: 'DEL-202',
      title: 'Transaction History Infinite Scroll & Export API',
      milestone: 'Milestone 3 — Banking Operations',
      project: 'Apex Mobile Banking App',
      submittedAt: 'Yesterday',
      author: 'Elena Rostova',
      files: ['API-Swagger-Contract-v1.json'],
      notes: 'Please verify the CSV/PDF format matches Apex banking statements.',
    },
  ]);

  const clientProjects = [
    {
      id: 'PRJ-01',
      name: 'Apex Mobile Banking App',
      milestonesCompleted: 2,
      totalMilestones: 5,
      progress: 60,
      nextDeadline: 'Nov 02, 2026',
      status: 'Active Review',
    },
    {
      id: 'PRJ-03',
      name: 'Cloud Data Warehouse & Reporting',
      milestonesCompleted: 1,
      totalMilestones: 3,
      progress: 35,
      nextDeadline: 'Dec 10, 2026',
      status: 'In Development',
    },
  ];

  const handleClientDecision = (decision) => {
    if (!selectedDeliverable) return;

    const newApprovalRecord = {
      id: `APR-${Date.now().toString().slice(-4)}`,
      deliverable: selectedDeliverable.title,
      milestone: selectedDeliverable.milestone,
      reviewedAt: 'Just now',
      decision: decision === 'approved' ? 'Approved' : 'Changes Requested',
      client: 'Evelyn Reed',
      comment: reviewComment || (decision === 'approved' ? 'Approved for deployment.' : 'Revisions requested.'),
    };

    setApprovalHistory([newApprovalRecord, ...approvalHistory]);
    setDeliverablesToReview(deliverablesToReview.filter(d => d.id !== selectedDeliverable.id));
    setSelectedDeliverable(null);
    setReviewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            <span>Verified Client Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Client Project Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track milestones, review submitted deliverables, approve timelines, and collaborate with your project leads.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            icon={FileCheck2}
            onClick={() => navigate('/deliverables')}
          >
            Review Deliverables
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Flag}
            onClick={() => navigate('/milestones')}
          >
            Milestone Schedule
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Video}
            onClick={() => navigate('/meetings')}
          >
            Project Meetings
          </Button>
        </div>
      </div>

      {/* Deliverables Requiring Client Action */}
      <Card className="border-2 border-royal-200 bg-white">
        <CardHeader
          title="Deliverables Awaiting Your Review & Sign-off"
          subtitle="Your approval unlocks subsequent milestone phases"
        />
        <div className="divide-y divide-slate-100">
          {deliverablesToReview.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All submitted deliverables have been reviewed. No pending client actions.
            </div>
          ) : (
            deliverablesToReview.map((deliv) => (
              <div key={deliv.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-royal-700 bg-royal-50 border border-royal-200 font-semibold px-2 py-0.5 rounded">
                      {deliv.milestone}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">{deliv.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Project: <strong>{deliv.project}</strong></span>
                    <span>•</span>
                    <span>Submitted: {deliv.submittedAt} by {deliv.author}</span>
                  </div>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    "{deliv.notes}"
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    {deliv.files.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                        <FileText className="w-3 h-3 text-royal-600" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedDeliverable(deliv)}
                  >
                    Review & Decide
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Grid: Shared Projects & Approval History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Projects */}
        <Card>
          <CardHeader
            title="Shared Projects & Progress"
            subtitle="Verified client access for Apex Global Enterprises"
          />
          <div className="divide-y divide-slate-100">
            {clientProjects.map((proj) => (
              <div key={proj.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400">{proj.id}</span>
                    <h4 className="text-sm font-bold text-navy-900">{proj.name}</h4>
                  </div>
                  <Badge variant="indigo">{proj.status}</Badge>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-royal-600 h-2.5 rounded-full"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Milestones: <strong>{proj.milestonesCompleted} of {proj.totalMilestones} Completed</strong></span>
                  <span>Target: <strong>{proj.nextDeadline}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Client Approval Audit History */}
        <Card>
          <CardHeader
            title="Official Approval & Revision History"
            subtitle="Immutable record of client milestone decisions"
          />
          <div className="divide-y divide-slate-100 text-xs">
            {approvalHistory.map((rec) => (
              <div key={rec.id} className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-900">{rec.deliverable}</span>
                  <Badge variant={rec.decision === 'Approved' ? 'success' : 'danger'}>
                    {rec.decision}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-500">
                  {rec.milestone} • Signed off by <strong>{rec.client}</strong> ({rec.reviewedAt})
                </div>
                <p className="text-slate-600 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                  "{rec.comment}"
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Review Modal Dialog */}
      {selectedDeliverable && (
        <Modal
          isOpen={!!selectedDeliverable}
          onClose={() => setSelectedDeliverable(null)}
          title={`Client Review: ${selectedDeliverable.title}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <Button variant="ghost" size="sm" onClick={() => setSelectedDeliverable(null)}>
                Cancel
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClientDecision('changes')}
                  className="text-rose-700 border-rose-300 hover:bg-rose-50"
                >
                  Request Changes
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleClientDecision('approved')}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Approve Deliverable
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold text-navy-900">Project / Milestone:</span>
              <p className="text-slate-600">{selectedDeliverable.project} — {selectedDeliverable.milestone}</p>
            </div>

            <div>
              <span className="font-bold text-navy-900">Attached Documents & Specs:</span>
              <div className="mt-1 space-y-1">
                {selectedDeliverable.files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="font-mono text-navy-900">{file}</span>
                    <button className="text-royal-600 hover:text-royal-800 flex items-center gap-1 font-semibold">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">
                Client Decision Notes & Directives
              </label>
              <textarea
                rows={3}
                placeholder="Include feedback, questions, or explicit sign-off confirmation..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
