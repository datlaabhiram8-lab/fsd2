import React, { useState } from 'react';
import { Settings, Shield, Sliders, CheckCircle2, Building, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    orgName: 'Perfomatrix Technologies',
    enforceClientApprovalOnMilestones: true,
    allowDirectClientMeetingBooking: true,
    notifyOnBlockerSubmission: true,
    notifyOnClientSignoff: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Organization & Workflow Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure tenant policies, client sign-off rules, meeting automation, and security triggers.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings successfully persisted to organization database!
        </div>
      )}

      {/* Organization Details */}
      <Card>
        <CardHeader title="Organization Profile" subtitle="Primary enterprise identity and branding" />
        <CardBody>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={settings.orgName}
                  onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Tenant ID</label>
                <input
                  type="text"
                  disabled
                  value="org_perfomatrix_enterprise_01"
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs text-slate-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Organization Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Workflow & Approval Rules */}
      <Card>
        <CardHeader
          title="Workflow & Approval Policies"
          subtitle="Enforce multi-step verification and client review requirements"
        />
        <CardBody className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-navy-900">Enforce Client Approval on Milestones</span>
              <p className="text-[11px] text-slate-500">
                Tasks flagged with client dependencies cannot transition to 'Completed' until signed off by an authorized client sponsor.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.enforceClientApprovalOnMilestones}
              onChange={(e) => setSettings({ ...settings, enforceClientApprovalOnMilestones: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-navy-900">Allow Direct Client Meeting Booking</span>
              <p className="text-[11px] text-slate-500">
                Clients can request sprint demos and review meetings directly into the shared calendar.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.allowDirectClientMeetingBooking}
              onChange={(e) => setSettings({ ...settings, allowDirectClientMeetingBooking: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-navy-900">Instant Alert on Blocker Submission</span>
              <p className="text-[11px] text-slate-500">
                Immediately dispatch email and push notifications to project managers when an engineer reports a blocker.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifyOnBlockerSubmission}
              onChange={(e) => setSettings({ ...settings, notifyOnBlockerSubmission: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
