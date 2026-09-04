export const USERS = [
  { id: 1, name: 'Ishara Perera', email: 'ishara@company.com', role: 'user', tickets: 5 },
  { id: 2, name: 'Nadeesha Silva', email: 'admin@company.com', role: 'admin', tickets: 0 },
  { id: 3, name: 'Kasun Fernando', email: 'kasun@company.com', role: 'user', tickets: 3 },
  { id: 4, name: 'Dilani Jayasuriya', email: 'dilani@company.com', role: 'user', tickets: 2 },
  { id: 5, name: 'Ruwan Bandara', email: 'ruwan@company.com', role: 'user', tickets: 4 },
]

export const INITIAL_TICKETS = [
  { id: 'TCK-1001', subject: 'Cannot connect to VPN from home network', category: 'Network', priority: 'High', status: 'Open', requester: 'Ishara Perera', createdAt: '2026-08-12' },
  { id: 'TCK-1002', subject: 'Outlook crashes when opening large attachments', category: 'Software', priority: 'Medium', status: 'In Progress', requester: 'Kasun Fernando', createdAt: '2026-08-12' },
  { id: 'TCK-1003', subject: 'New monitor request for accounting desk', category: 'Hardware', priority: 'Low', status: 'Resolved', requester: 'Dilani Jayasuriya', createdAt: '2026-08-11' },
  { id: 'TCK-1004', subject: 'Password reset needed for shared drive', category: 'Access', priority: 'Medium', status: 'Resolved', requester: 'Ruwan Bandara', createdAt: '2026-08-11' },
  { id: 'TCK-1005', subject: 'Printer on 3rd floor jamming repeatedly', category: 'Hardware', priority: 'Medium', status: 'In Progress', requester: 'Ishara Perera', createdAt: '2026-08-10' },
  { id: 'TCK-1006', subject: 'Slack notifications not syncing on desktop app', category: 'Software', priority: 'Low', status: 'Open', requester: 'Kasun Fernando', createdAt: '2026-08-10' },
  { id: 'TCK-1007', subject: 'Laptop fan making loud grinding noise', category: 'Hardware', priority: 'High', status: 'Open', requester: 'Dilani Jayasuriya', createdAt: '2026-08-09' },
  { id: 'TCK-1008', subject: 'Need access to finance reporting dashboard', category: 'Access', priority: 'Medium', status: 'In Progress', requester: 'Ruwan Bandara', createdAt: '2026-08-09' },
  { id: 'TCK-1009', subject: 'Onboarding laptop setup for new hire', category: 'Hardware', priority: 'High', status: 'Resolved', requester: 'Ishara Perera', createdAt: '2026-08-08' },
  { id: 'TCK-1010', subject: 'Email signature template not applying', category: 'Software', priority: 'Low', status: 'Resolved', requester: 'Kasun Fernando', createdAt: '2026-08-07' },
]

export const CATEGORIES = ['Hardware', 'Software', 'Network', 'Access', 'Other']
export const PRIORITIES = ['Low', 'Medium', 'High']
export const STATUSES = ['Open', 'In Progress', 'Resolved']
