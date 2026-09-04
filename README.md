# HelpDesk Tracker — Frontend

React + Tailwind CSS frontend for the HelpDesk Tracker app. This is the UI layer only,
currently running on in-memory mock data (`src/data/mockData.js`) so you can see and
click through the whole app before the Node/Express + MySQL backend exists.

## Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- lucide-react (icons)

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. On the login screen use **"View as User"** or
**"View as Admin"** to jump straight in, or sign in with:

- User: `ishara@company.com` / `password`
- Admin: `admin@company.com` / `password`

## Structure

```
src/
  components/     Sidebar, Topbar, Layout, StatCard, TicketTable, badges
  context/        AuthContext (login/role), TicketContext (ticket CRUD)
  data/           mockData.js — swap this out for real API calls
  pages/
    Login.jsx
    user/         Dashboard, MyTickets, CreateTicket, Profile
    admin/        AdminDashboard, AllTickets, Users
  App.jsx         Routes + role-based route protection
```

## Pages

**User:** Dashboard (Total/Open/In Progress/Resolved stats + Recent Tickets),
My Tickets (search + status filter), Create Ticket (form), Profile, Logout.

**Admin:** Dashboard (org-wide stats), All Tickets (search/filter + inline status
change dropdown), Users (list with role + ticket count), Profile, Logout.

## Wiring up the real backend later

The mock layer is intentionally isolated so swapping it for the Express/MySQL API
is a small change, not a rewrite:

1. `src/context/AuthContext.jsx` — replace `login()` with a `POST /api/auth/login`
   call, store the returned JWT (e.g. in an httpOnly cookie or memory), and decode
   the user/role from it instead of `MOCK_USERS`.
2. `src/context/TicketContext.jsx` — replace the `useState(INITIAL_TICKETS)` seed
   and the `createTicket`/`updateStatus` functions with `fetch`/`axios` calls to:
   - `GET /api/tickets` (admin) or `GET /api/tickets/mine` (user)
   - `POST /api/tickets`
   - `PATCH /api/tickets/:id` (status update)
   - `GET /api/users` (admin Users page)
3. `vite.config.js` already has a commented-out proxy block for `/api` →
   `http://localhost:5000` during local dev — uncomment it once the Express
   server is running.

No component or page needs to change — they all read from the contexts.
