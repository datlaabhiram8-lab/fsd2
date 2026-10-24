import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Link as LinkIcon,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Modal } from '../../components/common/Modal';

export const SubmissionsPage = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();

  const [submissions, setSubmissions] = useState([
    {
      id: 'SUB-301',
      taskId: 'TSK-103',
      taskTitle: 'Biometric FaceID SDK Integration Deliverable',
      version: 'v2',
      submittedAt: 'Today, 9:30 AM',
      files: ['Biometric-Architecture-Spec-v2.pdf', 'Security-Pen-Test-Report.pdf'],
      links: ['https://github.com/perfomatrix/apex-banking/pull/42'],
      notes: 'Addressed PIN fallback feedback and confirmed encryption on local Secure Enclave.',
      status: 'in_review',
      reviewerFeedback: null,
    },
    {
      id: 'SUB-302',
      taskId: 'TSK-105',
      taskTitle: 'Sanitize Request Payload for Audit Event Logger',
      version: 'v1',
      submittedAt: 'Yesterday, 4:00 PM',
      files: ['audit-emitter-sanitize.ts'],
      links: [],
      notes: 'Initial commit for request header redacting.',
      status: 'changes_requested',
      reviewerFeedback: 'Please ensure Authorization and Cookie headers are specifically stripped before logging.',
    },
    {
      id: 'SUB-300',
      taskId: 'TSK-106',
      taskTitle: 'UI Design System & Token Generation in Figma',
      version: 'v1',
      submittedAt: 'Oct 18, 2026',
      files: ['Figma-Design-Tokens.json'],
      links: ['https://figma.com/file/apex-mobile-ui'],
      notes: 'Initial Figma token exports.',
      status: 'approved',
      reviewerFeedback: 'Approved by Client (Evelyn Reed) for Milestone 1 sign-off.',
    },
  ]);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newSub, setNewSub] = useState({
    taskId: 'TSK-101',
    taskTitle: 'Implement OAuth 2.0 PKCE Flow for Mobile App',
    notes: '',
    link: '',
    fileName: '',
  });

  const handleNewSubmission = (e) => {
    e.preventDefault();
    setSubmissions([
      {
        id: `SUB-${Date.now().toString().slice(-3)}`,
        taskId: newSub.taskId,
        taskTitle: newSub.taskTitle,
        version: 'v1',
        submittedAt: 'Just now',
        files: newSub.fileName ? [newSub.fileName] : ['deliverable-artifacts.zip'],
        links: newSub.link ? [newSub.link] : [],
        notes: newSub.notes || 'Completed work submission for review.',
        status: 'in_review',
        reviewerFeedback: null,
      },
      ...submissions,
    ]);
    setIsSubmitOpen(false);
    setNewSub({ taskId: 'TSK-101', taskTitle: 'Implement OAuth 2.0 PKCE Flow', notes: '', link: '', fileName: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Work Submissions & Version History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deliverables submitted for manager evaluation, revision cycles, and client sign-offs.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Upload} onClick={() => setIsSubmitOpen(true)}>
          New Submission
        </Button>
      </div>

      <div className="grid gap-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold bg-blue-50 text-royal-700 border border-blue-200 px-2 py-0.5 rounded">
                    {sub.version}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{sub.taskId}</span>
                  <h3 className="text-base font-bold text-navy-900">{sub.taskTitle}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Submitted: <strong>{sub.submittedAt}</strong></span>
                  <span>•</span>
                  <span>{sub.files.length} file(s) attached</span>
                  {sub.links.length > 0 && <span>• {sub.links.length} pull request / external link(s)</span>}
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{sub.notes}"
                </p>

                {/* Feedback Alert if Changes Requested or Approved */}
                {sub.reviewerFeedback && (
                  <div className={`p-2.5 rounded-lg text-xs font-medium flex items-start gap-2 ${
                    sub.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {sub.status === 'approved' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong>Reviewer Feedback:</strong> {sub.reviewerFeedback}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <StatusPill status={sub.status} />

                {sub.status === 'changes_requested' && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={RotateCcw}
                    onClick={() => setIsSubmitOpen(true)}
                  >
                    Resubmit Work (v2)
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        title="Submit Work for Review"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsSubmitOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleNewSubmission}>
              Upload & Submit
            </Button>
          </>
        }
      >
        <form onSubmit={handleNewSubmission} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Select Task</label>
            <input
              type="text"
              value={`${newSub.taskId} — ${newSub.taskTitle}`}
              disabled
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs text-slate-600 cursor-not-allowed font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Artifact File Name</label>
            <input
              type="text"
              placeholder="e.g. biometric-auth-build-v2.zip or test-results.pdf"
              value={newSub.fileName}
              onChange={(e) => setNewSub({ ...newSub, fileName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">External Pull Request / Repository Link</label>
            <input
              type="url"
              placeholder="https://github.com/perfomatrix/apex-banking/pull/45"
              value={newSub.link}
              onChange={(e) => setNewSub({ ...newSub, link: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Submission Notes & Verification Summary</label>
            <textarea
              rows={3}
              placeholder="Describe deliverables completed, tests run, and instructions for reviewers..."
              value={newSub.notes}
              onChange={(e) => setNewSub({ ...newSub, notes: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
