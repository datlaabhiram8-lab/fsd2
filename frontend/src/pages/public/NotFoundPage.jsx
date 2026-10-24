import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white text-royal-600 border border-slate-200 shadow-soft flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">404 — Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md">
        The requested page does not exist or your role does not have authorization to view this resource.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/dashboard">
          <Button variant="primary" size="md" icon={Home}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
