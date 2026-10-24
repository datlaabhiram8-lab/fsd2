import React, { useState } from 'react';
import { FolderArchive, FileText, Download, Upload, Search, Filter, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const FilesPage = () => {
  const { user, isClient } = useAuth();
  const [search, setSearch] = useState('');

  const files = [
    {
      id: 'DOC-01',
      name: 'Apex-Mobile-Banking-Architecture-Spec-v2.pdf',
      project: 'Apex Mobile Banking App',
      category: 'Deliverable',
      size: '4.8 MB',
      updatedAt: '2 days ago',
      uploadedBy: 'Jordan Cruz',
      clientShared: true,
    },
    {
      id: 'DOC-02',
      name: 'Security-Penetration-Testing-Audit-Q4.pdf',
      project: 'Apex Mobile Banking App',
      category: 'Security',
      size: '2.1 MB',
      updatedAt: 'Yesterday',
      uploadedBy: 'Marcus Sterling',
      clientShared: true,
    },
    {
      id: 'DOC-03',
      name: 'Internal-Employee-Capacity-Planning-Q4.xlsx',
      project: 'Internal Management',
      category: 'Confidential Internal',
      size: '1.2 MB',
      updatedAt: 'Oct 20, 2026',
      uploadedBy: 'Marcus Sterling',
      clientShared: false, // Internal only, MUST NOT BE VISIBLE TO CLIENTS!
    },
    {
      id: 'DOC-04',
      name: 'AWS-Infrastructure-Terraform-State.json',
      project: 'Enterprise Cloud Migration',
      category: 'DevOps',
      size: '850 KB',
      updatedAt: 'Oct 15, 2026',
      uploadedBy: 'David Chen',
      clientShared: true,
    },
  ];

  // Restrict clients from seeing internal/unshared files
  const filteredFiles = files.filter((f) => {
    if (isClient && !f.clientShared) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {isClient ? 'Shared Project Documents & Files' : 'Project Files & Document Storage'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isClient
              ? 'Secure client access to verified specs, audit certificates, and project assets.'
              : 'Authorized file repository with organization-level access policies.'}
          </p>
        </div>

        {!isClient && (
          <Button variant="primary" size="md" icon={Upload}>
            Upload Document
          </Button>
        )}
      </div>

      <Card>
        <CardHeader
          title="Document Repository"
          subtitle={`${filteredFiles.length} file(s) available in your authorized scope`}
        />
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents by name or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-royal-600 shrink-0" />
                      <span className="font-semibold text-navy-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{file.project}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      {file.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{file.size}</td>
                  <td className="py-3 px-4 text-slate-500">{file.updatedAt}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-royal-600 hover:text-royal-800 font-semibold inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
