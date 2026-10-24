import React, { useState } from 'react';
import { MessageSquare, Send, User, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const FeedbackPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'MSG-01',
      sender: 'Evelyn Reed (Client)',
      avatar: 'ER',
      time: 'Yesterday at 3:15 PM',
      text: 'Hi Marcus and Jordan, we reviewed the initial biometric authentication screen flow. The layout looks sharp, but please ensure we support fallback to 6-digit PIN if biometric sensors fail on Android.',
      isClient: true,
    },
    {
      id: 'MSG-02',
      sender: 'Marcus Sterling (Org Admin)',
      avatar: 'MS',
      time: 'Yesterday at 4:20 PM',
      text: 'Thanks Evelyn! Absolutely — the PIN fallback is part of Milestone 2 Task 101. Jordan has already implemented the fallback state machine. We will showcase this in our scheduled demo on Thursday.',
      isClient: false,
    },
  ]);

  const [newMsg, setNewMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg) return;

    setMessages([
      ...messages,
      {
        id: `MSG-${Date.now()}`,
        sender: user?.name || 'User',
        avatar: user?.avatarInitials || 'U',
        time: 'Just now',
        text: newMsg,
        isClient: user?.role === 'client',
      },
    ]);
    setNewMsg('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Project Messages & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct collaboration thread between client stakeholders and project leadership.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Apex Mobile Banking — Stakeholder Channel"
          subtitle="All comments and feedback are logged with timestamps"
        />
        <div className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs ${
                m.isClient ? 'bg-emerald-50/60 border border-emerald-100' : 'bg-slate-50 border border-slate-100'
              } p-4 rounded-xl`}
            >
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center shrink-0">
                {m.avatar}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-900">{m.sender}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Post a message or feedback directive..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
            <Button type="submit" variant="primary" size="md" icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
