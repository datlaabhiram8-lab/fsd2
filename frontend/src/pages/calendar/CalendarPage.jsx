import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Video, Flag, CheckSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const CalendarPage = () => {
  const { user, isClient } = useAuth();
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  const calendarEvents = [
    { day: 24, title: 'Sprint 24 Planning', type: 'meeting', time: '10:00 AM', project: 'Apex Banking' },
    { day: 25, title: 'Milestone 2 Client Sign-off', type: 'milestone', time: '3:30 PM', project: 'Apex Banking' },
    { day: 26, title: 'QA Regression Review', type: 'meeting', time: '2:00 PM', project: 'Cloud Migration' },
    { day: 28, title: 'Biometric Auth Task Deadline', type: 'deadline', time: '5:00 PM', project: 'Apex Banking' },
    { day: 30, title: 'Monthly Retrospective', type: 'meeting', time: '4:00 PM', project: 'Internal' },
  ];

  // 31 days grid
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Shared Project Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Coordinated deadlines, sprint meetings, and client milestone delivery schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={ChevronLeft} onClick={() => {}} />
          <span className="text-xs font-bold text-navy-900 px-3">{currentMonth}</span>
          <Button variant="secondary" size="sm" icon={ChevronRight} onClick={() => {}} />
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold text-navy-900 py-3">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 min-h-[500px]">
          {days.map((d) => {
            const dayEvents = calendarEvents.filter(e => e.day === d);
            return (
              <div key={d} className="p-2 min-h-[90px] hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-semibold ${d === 23 ? 'w-5 h-5 rounded-full bg-royal-600 text-white flex items-center justify-center' : 'text-slate-600'}`}>
                    {d}
                  </span>
                </div>

                <div className="space-y-1">
                  {dayEvents.map((evt, i) => (
                    <div
                      key={i}
                      className={`p-1 rounded text-[10px] font-medium truncate ${
                        evt.type === 'milestone'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : evt.type === 'deadline'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-blue-50 text-royal-700 border border-blue-200'
                      }`}
                    >
                      <div className="font-bold truncate">{evt.title}</div>
                      <div className="text-[9px] text-slate-500">{evt.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
