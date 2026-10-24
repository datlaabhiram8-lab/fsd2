import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Plus,
  Users,
  ExternalLink,
  FolderKanban,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const MEETING_TYPES = [
  'Sprint Planning',
  'Daily Stand-up',
  'Code Review',
  'QA and Testing',
  'Client Meeting',
  'Project Demo',
  'Release Planning',
  'Team Retrospective',
  'General Project Meeting',
];

const INITIAL_MEETINGS = [
  {
    id: 'MTG-01',
    title: 'Sprint 24 Planning & Story Point Allocation',
    type: 'Sprint Planning',
    project: 'Apex Mobile Banking App',
    startTime: '2026-10-24T10:00',
    endTime: '2026-10-24T11:00',
    timezone: 'UTC+05:30 (IST)',
    organizer: 'Marcus Sterling',
    invitees: ['Marcus Sterling', 'Jordan Cruz', 'David Chen'],
    agenda: 'Review backlog items for biometric auth and offline storage capabilities.',
    meetingUrl: 'https://meet.google.com/xyz-plan-24',
    status: 'scheduled',
    forClients: false,
  },
  {
    id: 'MTG-02',
    title: 'Milestone 2 Security & Biometric Demo',
    type: 'Client Meeting',
    project: 'Apex Mobile Banking App',
    startTime: '2026-10-25T15:30',
    endTime: '2026-10-25T16:30',
    timezone: 'UTC+05:30 (IST)',
    organizer: 'Marcus Sterling',
    invitees: ['Marcus Sterling', 'Evelyn Reed', 'Jordan Cruz'],
    agenda: 'Demonstrate working FaceID & TouchID SDK authentication to Evelyn Reed for sign-off.',
    meetingUrl: 'https://meet.google.com/apex-demo-sec',
    status: 'scheduled',
    forClients: true,
  },
  {
    id: 'MTG-03',
    title: 'Pre-Release QA & Cross-Browser Regression Sync',
    type: 'QA and Testing',
    project: 'Enterprise Cloud Migration',
    startTime: '2026-10-26T14:00',
    endTime: '2026-10-26T15:00',
    timezone: 'UTC+05:30 (IST)',
    organizer: 'Jordan Cruz',
    invitees: ['Jordan Cruz', 'Elena Rostova'],
    agenda: 'Execute sanity test matrix on staging environment prior to client rollout.',
    meetingUrl: 'https://zoom.us/j/9988776655',
    status: 'scheduled',
    forClients: false,
  },
];

export const MeetingsPage = () => {
  const { user, isOrgAdmin, isClient, isTeamMember } = useAuth();
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [filterType, setFilterType] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    type: 'Sprint Planning',
    project: 'Apex Mobile Banking App',
    startTime: '',
    endTime: '',
    timezone: 'UTC+05:30',
    agenda: '',
    meetingUrl: '',
    forClients: false,
  });

  // Filter based on user role and selected filter
  const visibleMeetings = meetings.filter((m) => {
    // Clients only see meetings where forClients is true
    if (isClient && !m.forClients) return false;
    if (filterType !== 'all' && m.type !== filterType) return false;
    return true;
  });

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    if (!newMeeting.title) return;

    const created = {
      id: `MTG-${Date.now().toString().slice(-3)}`,
      title: newMeeting.title,
      type: newMeeting.type,
      project: newMeeting.project,
      startTime: newMeeting.startTime || new Date().toISOString(),
      endTime: newMeeting.endTime || new Date().toISOString(),
      timezone: newMeeting.timezone,
      organizer: user?.name || 'Administrator',
      invitees: [user?.name || 'User'],
      agenda: newMeeting.agenda,
      meetingUrl: newMeeting.meetingUrl || 'https://meet.google.com/new',
      status: 'scheduled',
      forClients: newMeeting.type === 'Client Meeting' || newMeeting.type === 'Project Demo',
    };

    setMeetings([created, ...meetings]);
    setIsModalOpen(false);
    setNewMeeting({
      title: '',
      type: 'Sprint Planning',
      project: 'Apex Mobile Banking App',
      startTime: '',
      endTime: '',
      timezone: 'UTC+05:30',
      agenda: '',
      meetingUrl: '',
      forClients: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Meetings & Calendar Sync
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isClient
              ? 'Join project check-ins, milestone demos, and client working sessions.'
              : 'Collaborative meetings across sprints, demos, stand-ups, and client sign-offs.'}
          </p>
        </div>

        {/* Action Button: Clients can only schedule if permitted, Admins and Team Members can schedule */}
        {!isClient && (
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Schedule Meeting
          </Button>
        )}
      </div>

      {/* Filter by Meeting Type */}
      <Card className="p-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-navy-900 shrink-0">Meeting Type:</span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
              filterType === 'all'
                ? 'bg-royal-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Types
          </button>
          {MEETING_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
                filterType === t
                  ? 'bg-royal-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Meeting Cards List */}
      <div className="grid gap-4">
        {visibleMeetings.length === 0 ? (
          <Card className="p-8 text-center text-slate-500 text-xs">
            <Video className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            No meetings found for the selected category.
          </Card>
        ) : (
          visibleMeetings.map((mtg) => (
            <Card key={mtg.id} className="p-5 hover:shadow-soft transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">{mtg.id}</span>
                    <Badge variant="indigo">{mtg.type}</Badge>
                    {mtg.forClients && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Client Accessible
                      </span>
                    )}
                    <h3 className="text-base font-bold text-navy-900">{mtg.title}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <FolderKanban className="w-3.5 h-3.5 text-royal-600" />
                      {mtg.project}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(mtg.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <span>•</span>
                    <span>Organizer: <strong>{mtg.organizer}</strong></span>
                  </div>

                  {mtg.agenda && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
                      <strong>Agenda:</strong> {mtg.agenda}
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <a
                    href={mtg.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="primary" size="sm" icon={ExternalLink}>
                      Join Video Call
                    </Button>
                  </a>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Confirmed
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Schedule Meeting Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Project Meeting"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateMeeting}>
              Save & Send Invitations
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateMeeting} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Meeting Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Sprint 24 Code Review & QA Handoff"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Meeting Type</label>
              <select
                value={newMeeting.type}
                onChange={(e) => setNewMeeting({ ...newMeeting, type: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
              >
                {MEETING_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Linked Project</label>
              <input
                type="text"
                placeholder="Apex Mobile Banking App"
                value={newMeeting.project}
                onChange={(e) => setNewMeeting({ ...newMeeting, project: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={newMeeting.startTime}
                onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Meeting URL (Google Meet / Zoom / Teams)</label>
              <input
                type="url"
                placeholder="https://meet.google.com/xyz"
                value={newMeeting.meetingUrl}
                onChange={(e) => setNewMeeting({ ...newMeeting, meetingUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Agenda & Description</label>
            <textarea
              rows={3}
              placeholder="Provide topics, deliverables to review, and expected outcomes..."
              value={newMeeting.agenda}
              onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
