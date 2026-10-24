import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WorkspaceContext = createContext(null);

const TERMINOLOGY = {
  corporate: {
    task: 'Task',
    tasks: 'Tasks',
    project: 'Project',
    projects: 'Projects',
    member: 'Employee',
    members: 'Employees',
    manager: 'Manager',
    assessment: 'Performance Review',
    assessments: 'Performance Reviews',
    criterion: 'KPI & Goal',
    criteria: 'KPIs & Objectives',
    score: 'Rating',
    badge: 'Corporate',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  academic: {
    task: 'Assignment',
    tasks: 'Assignments',
    project: 'Class / Course',
    projects: 'Classes & Courses',
    member: 'Student',
    members: 'Students',
    manager: 'Teacher',
    assessment: 'Grading Rubric',
    assessments: 'Rubrics & Grades',
    criterion: 'Rubric Criterion',
    criteria: 'Grading Criteria',
    score: 'Grade / Marks',
    badge: 'Academic',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export const WorkspaceProvider = ({ children }) => {
  const { user } = useAuth();
  const [workspaceType, setWorkspaceType] = useState('corporate');

  // Sync workspace type with user if user switches role
  useEffect(() => {
    if (user?.workspace) {
      setWorkspaceType(user.workspace);
    }
  }, [user]);

  const toggleWorkspace = () => {
    setWorkspaceType(prev => (prev === 'corporate' ? 'academic' : 'corporate'));
  };

  const getTerm = (key) => {
    return TERMINOLOGY[workspaceType]?.[key] || key;
  };

  const isCorporate = workspaceType === 'corporate';
  const isAcademic = workspaceType === 'academic';

  return (
    <WorkspaceContext.Provider
      value={{
        workspaceType,
        setWorkspaceType,
        toggleWorkspace,
        getTerm,
        terms: TERMINOLOGY[workspaceType],
        isCorporate,
        isAcademic,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
