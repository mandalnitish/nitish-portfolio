export const projectPosts = [
  {
    slug: "odms",
    title: "ODMS (Organ Donor Management System)",
    date: "2026-01-16",
    excerpt:
      "A multi-role platform built with React + Firebase Auth + Firestore, featuring role-based dashboards, admin control, and match workflows.",
    tech: ["React", "Vite", "Firebase Auth", "Firestore", "Tailwind"],
     images: [
    { src: "/projects/odms-1.png", alt: "ODMS dashboard overview" },
    { src: "/projects/odms-2.png", alt: "ODMS match workflow screen" },
  ],
    content: `
ODMS is a multi-role web application designed to manage donor and recipient onboarding and improve the workflow for organ matching. The focus of the project is clear user journeys, secure access control, and a scalable Firestore data model.

## Problem

Manual coordination between donors, recipients, and hospitals is slow and error-prone. A structured system is needed to:
- store verified profiles
- support match requests
- track match history and status
- limit access based on role

## Solution overview

The solution is a role-based application with separate dashboards:
- Donor: profile and availability
- Recipient: match history and request flow
- Doctor: review candidates and match updates
- Admin: manage users, run matching, export reports

## Architecture

### Frontend
- React with Vite for fast builds
- React Router for routes and protected views
- Tailwind CSS for responsive UI

### Backend
- Firebase Auth for login
- Firestore for users, requests, and matches
- Firestore rules for authorization

## Data model

### users/{uid}
- role, fullName, mobile, bloodGroup, organType, address, createdAt

### requests/{requestId}
- createdByUid, requiredOrgan, bloodGroup, status, createdAt

### matches/{matchId}
- donorUid, recipientUid, organType, status, createdAt, reviewedByUid

## Key features
- Role-based login redirect
- Protected routes for dashboards
- Admin filters by role and status
- Match history for recipients
- Export-friendly structured data

## Example: Role-based redirect after login

The idea is simple: after login, read users/{uid} from Firestore and navigate to the correct dashboard.

    // After Firebase Auth login:
    const docRef = doc(db, "users", user.uid);
    const snap = await getDoc(docRef);
    const role = snap.data()?.role;

    if (role === "admin") navigate("/admin");
    else if (role === "doctor") navigate("/dashboard/doctor");
    else if (role === "donor") navigate("/dashboard/donor");
    else navigate("/dashboard/recipient");

## Example: Firestore rule pattern

This pattern ensures users can only read/write their own profile,
while admin can access everything.

    function isSignedIn() {
      return request.auth != null;
    }

    function role() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    match /users/{uid} {
      allow read, write: if isSignedIn() && request.auth.uid == uid;
      allow read, write: if isSignedIn() && role() == "admin";
    }

## Challenges and fixes

### Role security
- UI checks are not enough, so Firestore rules enforce permissions.

### Consistent user profiles
- A Firestore user document is created immediately on signup to ensure role is always available.

## Results
ODMS demonstrates a complete end-to-end workflow: authentication, authorization, data modeling, and role-specific dashboards.

## Next improvements
- Doctor verification workflow
- Notification system for match updates
- Enhanced matching score logic
`.trim(),
  },

  {
    slug: "nixbot",
    title: "NixBot (AI Chatbot for Website Support)",
    date: "2026-01-16",
    excerpt:
      "A lightweight chatbot embedded into a website to answer FAQs, guide users to pages, and collect leads using a clean UI and configurable knowledge base.",
    tech: ["React", "Vite", "UI Widget", "Knowledge Base", "Deployment"],
    images: [
  { src: "/projects/nixbot-1.png", alt: "Nixbot User Dashboard" },
],

    content: `
NixBot is a website-embedded chatbot designed to improve user support and navigation. The goal is to answer common questions instantly, guide visitors to the correct pages, and optionally collect structured queries (name, email, message) that can be reviewed later.

## Problem
Most portfolio and project sites lose visitors because users cannot quickly find:
- project details
- contact information
- policies and links
- next steps to hire or collaborate

A chatbot reduces friction by offering instant answers and clear navigation.

## Solution overview
NixBot is implemented as a reusable widget that can be placed on any page. It provides:
- quick FAQ answers
- guided links to important routes (About, Blog, Projects, Contact)
- a clean conversation UI
- optional lead capture flow

## Architecture

### Frontend widget
- Floating button to open/close the chat
- Conversation view with user/bot messages
- Suggested prompts for common queries
- Mobile-friendly layout

### Knowledge base
- A configurable dataset (JSON or Firestore) containing:
  - question patterns
  - answers
  - recommended links

## Example: Simple FAQ matching

A lightweight baseline uses keyword matching before upgrading to an API-based model.

    const faqs = [
      { k: ["contact", "email"], a: "Open /contact to reach me quickly." },
      { k: ["projects", "case study"], a: "Visit /projects to view case studies." },
      { k: ["blog", "posts"], a: "Visit /blog for technical writeups." },
    ];

    function reply(message) {
      const q = message.toLowerCase();
      const hit = faqs.find(x => x.k.some(word => q.includes(word)));
      return hit ? hit.a : "I can help. Try: 'projects', 'blog', or 'contact'.";
    }

## Key features
- Small footprint and fast loading
- Route suggestions and internal linking
- Basic intent matching for FAQs
- Fallback message when confidence is low
- Optional form capture for unresolved queries

## Challenges and fixes

### Avoiding repetitive answers
- Track recent intents and vary responses when possible.

### Keeping it lightweight
- Use simple matching first, then upgrade to a server/API model if needed.

## Future improvements
- Analytics for most asked questions
- Admin panel to edit FAQs
- Optional AI mode with safety filters
- Multilingual support

## Conclusion
NixBot turns a static site into an interactive experience. It improves navigation, user engagement, and support without heavy backend requirements.
`.trim(),
  },

  {
    slug: "nixpdf",
    title: "NixPDF (PDF Generator and Export Toolkit)",
    date: "2026-01-16",
    excerpt:
      "A PDF export utility built for web apps to generate clean PDFs from structured data (tables, reports, receipts) with filters and consistent formatting.",
    tech: ["JavaScript", "PDF Export", "Tables", "Filters", "Formatting"],
    images: [
  { src: "/projects/nixpdf-1.png", alt: "NixPdf User Dashboard" },
],
    content: `
NixPDF is a PDF generation and export toolkit built to create clean, printable documents from web application data. It focuses on readable formatting, consistent headers/footers, and export flows that support filters before generating the final PDF.

## Problem
Many web apps need PDF export, but common issues include:
- messy formatting
- missing filters and totals
- unreadable tables on A4 pages
- inconsistent fonts and spacing

A reusable export tool solves this across multiple projects.

## Solution overview
NixPDF generates PDF reports from structured inputs:
- title and metadata (date, author, filters)
- table columns and rows
- summary totals and footnotes

It supports:
- pagination
- repeating table headers
- consistent spacing and alignment

## Example: Data-first input

Instead of exporting raw HTML, a clean approach is structured columns + rows.

    const report = {
      title: "Attendance Report",
      meta: { semester: "6", subject: "DM", from: "2026-01-01", to: "2026-01-16" },
      columns: [
        { key: "roll", label: "Roll", width: 10 },
        { key: "name", label: "Name", width: 40 },
        { key: "status", label: "Status", width: 20 },
        { key: "date", label: "Date", width: 30 },
      ],
      rows: data
    };

## Example: Filter-first flow

A good UX is to filter first, then generate.

    const filtered = allRows.filter(r =>
      r.date >= from && r.date <= to && r.status === selectedStatus
    );

    generatePdf({ ...report, rows: filtered });

## Key features
- A4-friendly table layout
- Text wrapping/truncation rules
- Summary sections (totals, counts, breakdown)
- Optional watermark and signature blocks
- Stable formatting across browsers

## Challenges and fixes

### Large datasets
- Split tables across pages and repeat headers.

### Wide tables
- Use adaptive column widths and wrap text.

## Future improvements
- Add charts (summary page)
- Template presets for different report types
- Multi-language export support

## Conclusion
NixPDF makes PDF export reliable, clean, and reusable for admin reports and records where formatting quality matters.
`.trim(),
  },

  {
    slug: "portfolio",
    title: "Personal Portfolio (Vite + React + Firebase Hosting)",
    date: "2026-01-15",
    excerpt:
      "A fast portfolio site with blog + case studies, SEO setup (sitemap, robots), and a clean UI using Tailwind and Framer Motion.",
    tech: ["React", "Vite", "Tailwind", "Framer Motion", "Firebase Hosting"],
    content: `
This portfolio is built as a modern React SPA with real content pages for blog posts and project case studies. The goal was to keep the UI clean while making the site crawlable and easy to navigate.

## Goals
- Clean UI with responsive layout
- Separate pages for About, Blog, Projects, Contact
- SEO essentials: sitemap.xml and robots.txt
- Fast build and deploy workflow

## Implementation

### UI and animation
- Tailwind CSS for consistent spacing and responsiveness
- Framer Motion for smooth transitions

### Routing
- React Router routes for:
  - /blog and /blog/:slug
  - /projects and /projects/:slug

### Deployment
- Firebase Hosting with SPA rewrites to index.html

## Example: Firebase Hosting SPA rewrite

If you refresh /blog/some-post, it must still load. This is the rewrite rule:

    {
      "hosting": {
        "public": "dist",
        "rewrites": [{ "source": "**", "destination": "/index.html" }]
      }
    }

## SEO setup
- public/sitemap.xml includes blog posts and projects
- public/robots.txt references the sitemap
- Content pages provide enough text for indexing and AdSense

## Results
A fast, professional site with content-based routes that behave like real pages.
`.trim(),
  },

  {
    slug: "attendance-system",
    title: "Wi-Fi Hotspot Based Attendance Management System",
    date: "2026-01-14",
    excerpt:
      "A prototype attendance system using hotspot-based presence, admin controls, subject/semester support, and export-ready attendance records.",
    tech: ["Web App", "Admin UI", "Export", "Timetable Logic"],
    content: `
This project focuses on attendance capture using a Wi-Fi hotspot based approach. The goal is to reduce manual attendance effort and provide structured records with filters and exports.

## Problem
Traditional attendance methods consume lecture time and are prone to proxy attendance. A system is needed to:
- capture attendance quickly
- avoid duplicate entries per day
- support subject, semester, and timetable
- provide exports for reports

## Core features
- Admin login and management
- Subject and semester selection
- Attendance record table with filters
- Export to Excel or PDF
- Success messages and clean UI

## Example: Duplicate prevention (one entry/day)

A common approach is to block multiple records for the same student + subject + date.

    const key = \`\${roll}_\${subject}_\${date}\`;
    const already = await getDoc(doc(db, "attendanceKeys", key));
    if (already.exists()) throw new Error("Attendance already marked for today.");

    await setDoc(doc(db, "attendanceKeys", key), { createdAt: serverTimestamp() });
    await addDoc(collection(db, "attendance"), { roll, subject, date, createdAt: serverTimestamp() });

## Next improvements
- Student login view
- Auto scheduling based on timetable time windows
- Stronger duplicate prevention and audit logs
`.trim(),
  },

{
  slug: "firebase-contact-inbox",
  title: "Firebase Contact Inbox (Admin Panel + Firestore)",
  date: "2026-01-17",
  excerpt:
    "A portfolio contact system that stores messages in Firestore and lets admin review, search, and manage inquiries securely.",
  tech: ["React", "Vite", "Firebase Auth", "Firestore", "Tailwind"],
  content: `
This project adds a production-style contact workflow to a portfolio website.

## Problem
A normal contact form sends email, but you lose tracking, history, and status.

## Solution
Store all contact messages in Firestore and build an admin-only inbox to manage them.

## Features
- Contact form saves messages to Firestore
- Admin login required to access inbox
- Mark as Read / Replied / Archived
- Search and filter by date/status
- Secure Firestore rules (admin-only access)

## Data model
### messages/{id}
- name, email, message, createdAt, status, pageRef

## Security
- Only admin role can read all messages
- Public users can only create new messages

## Outcome
A complete admin workflow that improves trust and looks like a real product feature.
`.trim(),
},

{
  slug: "vite-seo-pack",
  title: "Vite SEO Pack (Sitemap, Robots, SPA Rewrite Fix)",
  date: "2026-01-17",
  excerpt:
    "A reusable SEO setup for React SPA: sitemap.xml, robots.txt, policy pages, and Firebase rewrite configuration to avoid 404 on refresh.",
  tech: ["Vite", "React Router", "Firebase Hosting", "SEO", "Sitemap"],
  content: `
This project packages a correct SEO + hosting setup for a React SPA.

## Includes
- public/sitemap.xml with key routes and slugs
- public/robots.txt referencing sitemap
- privacy policy + terms pages
- Firebase Hosting rewrite to index.html for SPA routes

## Common problem solved
Refreshing /blog/:slug returns 404 unless rewrites are configured.

## Outcome
Routes behave like real pages and crawlers can access content reliably.
`.trim(),
}

];
