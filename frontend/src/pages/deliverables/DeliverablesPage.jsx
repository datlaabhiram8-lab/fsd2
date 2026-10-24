import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { Modal } from '../../components/common/Modal';

export const DeliverablesPage = () => {
  const { user } = useAuth();

  const [deliverables, setDeliverables] = useState([
    {
      id: 'DEL-201',
      title: 'Biometric Authentication & FaceID Security Module',
      milestone: 'Milestone 2 — Security & Compliance',
      project: 'Apex Mobile Banking App',
      submittedAt: 'Today at 9:30 AM',
      author: 'Jordan Cruz (Lead Engineer)',
      files: ['Biometric-Architecture-Spec-v2.pdf', 'Security-Pen-Test-Report.pdf'],
      notes: 'All OWASP MASVS Level 2 requirements met. Ready for client review and acceptance.',
      status: 'in_review',
      decisionNotes: null,
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
      status: 'in_review',
      decisionNotes: null,
    },
    {
      id: 'DEL-199',
      title: 'UI/UX Interactive Figma Prototype for Mobile App',
      milestone: 'Milestone 1 — Core Experience',
      project: 'Apex Mobile Banking App',
      submittedAt: 'Oct 18, 2026',
      author: 'Sarah Lin',
      files: ['Figma-Design-Tokens.json', 'Clickable-Prototype-Guide.pdf'],
      notes: 'Initial UX mockups approved by product sponsor.',
      status: 'approved',
      decisionNotes: 'Approved by Evelyn Reed (Client) with zero blockers.',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleDecision = (decision) => {
    if (!selectedItem) return;

    setDeliverables(prev =>
      prev.map(d =>
        d.id === selectedItem.id
          ? {
              ...d,
              status: decision === 'approve' ? 'approved' : 'changes_requested',
              decisionNotes: feedback || (decision === 'approve' ? 'Approved by Client.' : 'Revisions requested by Client.'),
            }
          : d
      )
    );
    setSelectedItem(null);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Client Deliverables & Review Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formal deliverable sign-offs and revision requests for assigned projects.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {deliverables.map((deliv) => (
          <Card key={deliv.id} className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-royal-700 bg-royal-50 border border-royal-200 font-semibold px-2 py-0.5 rounded">
                    {deliv.milestone}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{deliv.id}</span>
                  <h3 className="text-base font-bold text-navy-900">{deliv.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Project: <strong>{deliv.project}</strong></span>
                  <span>•</span>
                  <span>Author: <strong>{deliv.author}</strong></span>
                  <span>•</span>
                  <span>Submitted: {deliv.submittedAt}</span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{deliv.notes}"
                </p>

                <div className="flex items-center gap-2">
                  {deliv.files.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      <FileText className="w-3 h-3 text-royal-600" />
                      {f}
                    </span>
                  ))}
                </div>

                {deliv.decisionNotes && (
                  <div className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    deliv.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{deliv.decisionNotes}</span>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <StatusPill status={deliv.status} />

                {deliv.status === 'in_review' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedItem(deliv)}
                  >
                    Evaluate Deliverable
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Decision Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Evaluate Deliverable: ${selectedItem.title}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecision('changes')}
                  className="text-rose-700 border-rose-300 hover:bg-rose-50"
                >
                  Request Changes
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDecision('approve')}
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
              <p className="text-slate-600">{selectedItem.project} — {selectedItem.milestone}</p>
            </div>

            <div>
              <span className="font-bold text-navy-900">Attached Artifacts:</span>
              <div className="mt-1 space-y-1">
                {selectedItem.files.map((f, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="font-mono text-navy-900">{f}</span>
                    <button className="text-royal-600 hover:text-royal-800 font-semibold flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">
                Client Decision Feedback
              </label>
              <textarea
                rows={3}
                placeholder="State approval reasoning or specific change requests required..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
