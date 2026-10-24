# Perfomatrix — One Platform. Every Performance.

A unified platform for task management, project collaboration, performance assessment, meeting calendar, and analytics across **Organization Admins**, **Clients**, and **Team Members**.

---

## 🎨 Design Direction

- **Primary Background**: White and very light blue (`#F0F7FF` / `bg-lightblue-100`).
- **Sidebar & Navigation**: Deep navy blue (`#0B192C` / `bg-[#0B192C]`).
- **Primary Buttons**: Royal blue (`#2563EB` / `#1D4ED8`) with white text.
- **Cards**: White with subtle borders (`border-slate-200`), rounded corners (`rounded-2xl`), and soft shadows (`shadow-soft`).
- **Typography**: Dark navy text (`#0B192C`) on light backgrounds; crisp white on dark navy navigation.

---

## 👥 Three Application Roles & Dedicated Portals

1. **Organization Admin (`org_admin`)**:
   - Total project portfolio oversight, task assignments, and review pipelines.
   - Client invitations, account provisioning, and explicit project scoping.
   - Team member capacity, performance ratings, and workload distribution.
   - Central meeting scheduler (Stand-ups, Demos, Client Syncs) and auditable reports.
   - **Navigation**: Dashboard, Projects, Tasks, Calendar, Meetings, Clients, Team, Performance, Reports, Files, Notifications, Settings.

2. **Client (`client`)**:
   - Access restricted strictly to assigned projects.
   - Milestone progress tracking and contractual delivery roadmaps.
   - Deliverables Review Queue: Inspect attached specs and formally **Approve** or **Request Changes** with comments.
   - Join scheduled client meetings and access verified shared files.
   - **Privacy Guard**: Clients cannot see internal employee evaluations, internal team discussions, org settings, or unrelated projects.
   - **Navigation**: Dashboard, My Projects, Deliverables, Milestones, Meetings, Shared Files, Messages or Feedback, Notifications, Profile.

3. **Team Member (`team_member`)**:
   - Focused workspace prioritizing tasks due today and this week.
   - Work submissions with multi-file attachments, pull request links, and version preservation.
   - Report blockers immediately to alert project leads.
   - View reviewer comments and resubmit updated work (v1 -> v2).
   - View scheduled stand-ups, meetings, and personal sprint ratings.
   - **Navigation**: My Dashboard, My Projects, My Tasks, Submissions, Calendar, Meetings, Performance, Files, Notifications, Profile.

---

## 🔄 8-Stage Shared Task Lifecycle

```
[ To Do ] ➔ [ In Progress ] ➔ [ Submitted ] ➔ [ In Review ]
                                                    │
                   ┌────────────────────────────────┴────────────────────────────────┐
                   ▼                                                                 ▼
         [ Changes Requested ]                                                  [ Approved ]
                   │                                                                 │
                   └─────────── (Resubmit v2) ─────────────────────────┐             ▼
                                                                       └─────➔ [ Completed ]
[ Blocked ] ◄── (Can occur at any stage when blocked by dependency)
```

1. **To Do**: Initial task assignment with requirements and deadlines.
2. **In Progress**: Work underway by the assigned engineer.
3. **Submitted**: Artifacts uploaded (files, PR links) awaiting evaluation.
4. **In Review**: Under technical manager or client evaluation.
5. **Changes Requested**: Reviewer left specific feedback requiring revision.
6. **Approved**: Formally accepted by manager or client sponsor.
7. **Completed**: Final completion recorded in the audit trail.
8. **Blocked**: Obstacle reported, alerting project leadership and pausing penalties.

---

## 📅 Meeting & Calendar Suite

Supports 9 dedicated meeting types with external video call links (Google Meet, Zoom, Teams):
- `Sprint Planning`
- `Daily Stand-up`
- `Code Review`
- `QA and Testing`
- `Client Meeting`
- `Project Demo`
- `Release Planning`
- `Team Retrospective`
- `General Project Meeting`

---

## 🚀 How to Run & Verify

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173`** in your browser.

3. **Verify Role Experiences**:
   - Use the **Active Role** dropdown in the top navbar to instantly test:
     - **Organization Admin** (`admin@perfomatrix.com`): View project portfolios, review queues, team capacity, and settings.
     - **Client** (`client@apexglobal.com`): View the client portal, test approving or requesting changes on deliverables, and check milestones.
     - **Team Member** (`jordan.dev@perfomatrix.com`): View assigned tasks, report blockers, and test submitting work artifacts.
   - Verify that all navigation links, breadcrumbs, and permission guards adapt immediately.
