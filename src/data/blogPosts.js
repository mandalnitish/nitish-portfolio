const INTERNAL_LINK = (label, slug) => `[LINK: ${label}] (${slug})`;
const SITE_LINK = (label, path) => `[LINK: ${label}] (${path})`;    

const POST_FOOTER = `
## Feedback and corrections
If you spot an issue, a missing edge case, or you want a deeper example, you can reach me via ${SITE_LINK(
  "Contact",
  "/contact"
)}. I update posts when I find better patterns or when Firebase/React Router behavior changes.
`.trim();


export const blogPosts = [
  {
    slug: "how-i-built-odms-with-firebase",
    title: "How I Built ODMS with React + Firebase (End-to-End Case Study)",
    date: "2026-01-16",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Case Study",
    tags: ["react", "firebase", "firestore", "auth", "security-rules", "deployment"],
    readingTime: "10–12 min",
    excerpt:
      "An end-to-end case study: roles, Firestore schema, security rules strategy, protected routing, and a deployment checklist for a real multi-role ODMS build.",
    content: `
# How I Built ODMS with React + Firebase (End-to-End Case Study)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal  
**Project:** ODMS (Organ Donor Management System)

ODMS is a multi-role system where donors, recipients, doctors/hospitals, and admins need different permissions and different dashboards. The key challenge is not UI—it is **authorization, auditability, and workflow correctness**. This case study documents the approach I used to implement roles, Firestore modeling, security rules, protected routing, and a deployment setup that does not break on refresh.

## What ODMS needed to do (real system requirements)

### Roles and expectations
- **Donor:** create/update profile, see own status, view only own matches.
- **Recipient:** request match, view match history, see only own records.
- **Doctor/Hospital:** review candidates, update match workflow status.
- **Admin:** manage users, approve roles, create matches, export reports.

The architectural implication: **role-based UI is not enough**. Access must be enforced in Firestore rules.

## Data model (kept query-friendly)

### 1) users/{uid}
I treat Firebase Auth as identity, and Firestore as authorization + profile.

Recommended fields:
- \`fullName\`, \`email\`, \`mobile\`, \`address\`
- \`role\`: donor | recipient | doctor | admin
- \`bloodGroup\`, \`organType\`
- \`createdAt\`, \`updatedAt\`

### 2) requests/{requestId}
Requests are created when a recipient (or doctor) requests matching.
- \`createdByUid\`
- \`requiredOrgan\`
- \`bloodGroup\`
- \`location\` (city/state)
- \`status\`: open | processing | closed
- \`createdAt\`

### 3) matches/{matchId}
Matches are workflow records, not just suggestions.
- \`donorUid\`, \`recipientUid\`
- \`organType\`
- \`compatibilityScore\` (number)
- \`status\`: suggested | approved | rejected | completed
- \`reviewedByUid\`
- \`createdAt\`, \`updatedAt\`

This structure supports:
- recipient view: “my matches”
- admin view: “all matches”
- doctor view: “matches to review”

## Auth + profile: the signup pattern that prevents missing-role issues

Firebase Auth does not store roles. So I follow a strict rule:

1) Create Auth user  
2) Immediately write \`users/{uid}\` with role + profile  
3) On login, fetch \`users/{uid}\` and route user accordingly

If a user doc is missing (network failure), I show a “complete profile” flow or create a minimal doc and ask the user to finish setup.

Related: [LINK: Firebase Signup Flow: users/{uid}] (firebase-auth-role-setup-signup)

## Routing: redirect by role (no guesswork)

After login:
- fetch role from \`users/{uid}\`
- navigate to the correct dashboard route

Typical routes:
- \`/admin\`
- \`/dashboard/doctor\`
- \`/dashboard/donor\`
- \`/dashboard/recipient\`

Related: [LINK: Role-Based Routing] (firebase-auth-role-based-routing)  
Related: [LINK: Protected Routes] (protected-routes-react-router-firebase)

## Security rules: the real protection

I treat Firestore Rules as the enforcement layer:
- deny by default
- allow by role or ownership
- block self-upgrade to admin/doctor

Related: [LINK: Firestore Security Rules] (firestore-security-rules-multi-role-app)

## Matching: start simple and keep extensible

For the first working version:
- organ type must match
- blood group must be compatible
- optional: location proximity

The goal is predictable matching that can later evolve:
- weighted scoring
- medical priority fields
- donor availability constraints

## Admin panel: the control room

Admin features that made ODMS feel “real”:
- user filters by role
- match status workflow
- export to Excel/PDF with timestamps and IDs
- audit-friendly columns

Related: [LINK: Admin Export to Excel] (admin-panel-filters-export-excel)  
Related: [LINK: Export PDF Reports] (export-pdf-from-firestore-data)

## Deployment: avoid SPA 404 and ship trust pages

For Firebase Hosting, the most important item is SPA rewrites so refresh works on:
- \`/blog/:slug\`
- \`/admin\`
- \`/dashboard/*\`

Related: [LINK: Firebase Hosting SPA Rewrites] (firebase-hosting-spa-rewrites)  
Related: [LINK: Deploy Vite + React] (vite-react-firebase-hosting-guide)

## Verification checklist (what I test before calling it “done”)
- Open \`/blog/<slug>\` directly in a new tab (no 404)
- Refresh on \`/admin\` and \`/dashboard/*\` (no 404)
- Non-admin user cannot read other users in Firestore
- Recipient sees only matches where \`recipientUid == myUid\`
- Donor sees only matches where \`donorUid == myUid\`
- Export functions are admin-only

## Conclusion
ODMS is a multi-role workflow product, not just a UI demo. The stable combination is:
- Firebase Auth for identity
- Firestore \`users/{uid}\` for role truth
- Firestore Rules for real security
- Role-based routing for correct UX
- Admin exports for reporting and auditability
`.trim(),
  },

  {
    slug: "firebase-auth-role-based-routing",
    title: "Firebase Auth + Role-Based Routing in React (Pattern That Scales)",
    date: "2026-01-15",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "React + Firebase",
    tags: ["react-router", "firebase-auth", "firestore", "roles"],
    readingTime: "7–9 min",
    excerpt:
      "A scalable routing pattern: central auth state, role fetch once, ProtectedRoute guard, and predictable redirects after login.",
    content: `
# Firebase Auth + Role-Based Routing in React (Pattern That Scales)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

Role-based routing is the difference between “it works on my laptop” and a real multi-user system. In ODMS, the same login page can lead to completely different dashboards. If routing is not role-aware, users see incorrect pages, and sensitive pages are easy to guess.

This article focuses on **routing architecture** (UX enforcement). The security enforcement remains Firestore rules.

## The core idea: Auth gives UID, Firestore gives role

Firebase Auth confirms identity and returns a UID. But roles belong in Firestore:

- \`users/{uid}.role\` = donor | recipient | doctor | admin

This enables:
- stable redirects after login
- consistent behavior after refresh
- centralized authorization decisions in the app

Related: [LINK: Signup Role Setup] (firebase-auth-role-setup-signup)

## Recommended structure

### 1) AuthProvider (single source of truth)
A scalable app avoids fetching role in every component.

AuthProvider maintains:
- \`user\`
- \`role\`
- \`loading\`

Flow:
1. listen to Auth state changes
2. if user exists, fetch \`users/{uid}\`
3. set role and stop loading

### 2) ProtectedRoute (reusable guard)
ProtectedRoute should:
- show loader when \`loading\` is true
- redirect to \`/login\` if no user
- enforce allowed roles if provided

Related: [LINK: ProtectedRoute] (protected-routes-react-router-firebase)

## Redirect after login (predictable mapping)

Example mapping:
- admin -> \`/admin\`
- doctor -> \`/dashboard/doctor\`
- donor -> \`/dashboard/donor\`
- recipient -> \`/dashboard/recipient\`

Rule: do not guess. Always read role from Firestore.

## Common routing mistakes I avoid

### Mistake 1: role in localStorage only
LocalStorage is editable. It can be used for caching, not truth.

### Mistake 2: fetching role on every page
This increases reads and creates flicker.

### Mistake 3: allowing “doctor/admin” in signup role selection
In real systems, doctor/admin roles should be verified and assigned by admin.

Related: [LINK: Security Rules] (firestore-security-rules-multi-role-app)

## Verification checklist
- Login as donor -> must land on donor dashboard
- Refresh donor dashboard -> must stay there (no 404, no reroute to wrong dashboard)
- Attempt to open \`/admin\` as donor -> must block (route guard + rules)
- Logout -> protected pages must redirect to login

## Conclusion
Role-based routing is best implemented as:
- one AuthProvider to load role once
- ProtectedRoute for auth + role allowlist
- explicit redirect mapping based on Firestore role

Security note: Firestore rules must still enforce permissions.
`.trim(),
  },

  {
    slug: "vite-react-firebase-hosting-guide",
    title: "Deploy Vite + React to Firebase Hosting (SPA Rewrites + SEO Files)",
    date: "2026-01-14",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Deployment",
    tags: ["vite", "firebase-hosting", "spa", "rewrites", "seo"],
    readingTime: "6–8 min",
    excerpt:
      "A production checklist: dist output, firebase.json rewrites, caching pitfalls, and how to ensure sitemap/robots/policy pages are accessible.",
    content: `
# Deploy Vite + React to Firebase Hosting (SPA Rewrites + SEO Files)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

Deploying a Vite + React SPA to Firebase Hosting is easy until you refresh a deep link and get a 404. This post is a deployment checklist I use to keep routing stable and ensure important SEO/trust files are publicly accessible.

## 1) Confirm the build output is correct

Vite builds to \`dist/\` by default:
- run build
- confirm \`dist/index.html\` exists
- confirm \`dist/assets/*\` exists

Firebase Hosting must serve \`dist\`, not \`src\`.

## 2) firebase.json essentials

Minimum hosting setup:
- \`public: "dist"\`
- ignore config and node_modules

## 3) SPA rewrites (the fix for 404 on refresh)

React Router routes are not server files. Without rewrites, opening:
- \`/blog/some-post\`
looks like a missing file to Hosting.

Rewrite all routes to \`/index.html\` so React Router can resolve the route client-side.

Related: [LINK: SPA Rewrites Guide] (firebase-hosting-spa-rewrites)

## 4) Ship SEO + policy files from /public

For indexing and reviewer trust, ensure these URLs do not 404:
- \`/robots.txt\`
- \`/sitemap.xml\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`
- \`/contact\`

If you use Vite, place static files in:
- \`public/robots.txt\`
- \`public/sitemap.xml\`
- \`public/ads.txt\` (only if required)

Related: [LINK: Sitemap + Robots] (sitemap-robots-for-react-spa)

## 5) Caching pitfalls (when “new deploy” shows old content)

If you deploy and still see old content:
- hard reload
- test incognito
- confirm your build actually updated
- check if a service worker exists (PWA)

## 6) Post-deploy smoke tests (I always do these)

Open directly in new tab:
- \`/\`
- \`/about\`
- \`/blog\`
- \`/blog/<slug>\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`

Then refresh each one. Any failure usually means rewrites are missing.

## Conclusion
A correct Vite + React deployment to Firebase Hosting is:
- build to dist
- serve dist
- rewrite all routes to index.html
- ensure SEO/policy files exist and do not 404
`.trim(),
  },
 
  {
    slug: "seo-for-react-spa-sitemap-robots",
    title: "SEO for React SPA (Sitemap, Robots, Indexing, and Verification Steps)",
    date: "2026-01-13",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "SEO",
    tags: ["seo", "sitemap", "robots", "search-console"],
    readingTime: "5–7 min",
    excerpt:
      "A practical SEO setup for SPAs: what I included in sitemap.xml, robots.txt, and how I verified indexing in Search Console.",
    content: `
# SEO for React SPA (Sitemap, Robots, Indexing, and Verification Steps)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

React SPAs can be indexed, but indexing is more reliable when discovery is explicit. I use a simple SEO baseline that focuses on: sitemap, robots, stable routes, and verification.

## 1) Sitemap.xml: what I include

My sitemap lists real content and trust routes:
- \`/\`
- \`/about\`
- \`/projects\`
- \`/blog\`
- \`/blog/:slug\`
- \`/contact\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`

Important: do not include routes that 404 or require auth.

Related: [LINK: Sitemap + Robots Checklist] (sitemap-robots-for-react-spa)

## 2) robots.txt: keep it simple

I allow crawling and reference sitemap:
- Allow \`/\`
- Provide sitemap URL

## 3) Verify routes first (SEO fails if routes fail)

If your SPA returns 404 on refresh for \`/blog/:slug\`, Google may see unstable pages.

Fix: SPA rewrites in hosting configuration.

Related: [LINK: SPA Rewrites] (firebase-hosting-spa-rewrites)

## 4) Search Console verification steps I follow
- Submit sitemap
- Use URL Inspection for key pages (home, blog, one slug page)
- Confirm “Crawl allowed” and “Page available”

## 5) Content quality matters more than “SEO tricks”
If the site has only thin pages, indexing alone does not help. For portfolio sites, I focus on:
- longer, original blog posts
- clear navigation
- visible author/about identity
- no broken links

Related: [LINK: Writing Technical Articles] (writing-high-quality-technical-articles)

## Conclusion
For a React SPA, reliable SEO starts with:
- stable routes (no refresh 404)
- sitemap + robots in place
- Search Console verification
- real content depth
`.trim(),
  },

  {
    slug: "building-a-clean-portfolio-with-react",
    title: "Building a Clean React Portfolio (Structure, Content Depth, Performance)",
    date: "2026-01-12",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Portfolio",
    tags: ["react", "tailwind", "performance", "ui"],
    readingTime: "6–8 min",
    excerpt:
      "A portfolio structure that reads like a publication: real pages, unique copy per route, performance basics, and trust signals.",
    content: `
# Building a Clean React Portfolio (Structure, Content Depth, Performance)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

A portfolio site is often judged like a publisher site: it must feel complete, navigable, and trustworthy. This post explains the structure I use to avoid “thin site” signals and keep the UI fast.

## 1) Route structure that scales

Even if your homepage is a one-page layout, create real routes:
- \`/about\`
- \`/projects\`
- \`/blog\`
- \`/contact\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`

Why it matters:
- direct links work
- indexing is easier
- reviewers see clear navigation

## 2) Make each page unique (avoid duplicate text)

A common mistake is copying the same “About” paragraph to multiple pages. Reuse components, but ensure:
- each page has additional unique content
- blog posts are not repeated templates
- project pages have real case-study detail

Related: [LINK: Writing Technical Articles] (writing-high-quality-technical-articles)

## 3) Trust signals I always add
- visible author name on blog pages
- contact page with email/social links
- footer links to policy pages
- consistent dates (published + updated)

## 4) Performance basics (practical)
- optimize images
- lazy-load heavy components
- avoid excessive animations on mobile
- keep typography readable

## 5) Deployment behavior (no broken routes)
A clean portfolio must not 404 on refresh for \`/blog/:slug\`.

Related: [LINK: Deploy Guide] (vite-react-firebase-hosting-guide)

## Conclusion
A “clean portfolio” is mostly about:
- structure (real routes)
- uniqueness (no repetitive copy)
- trust (policies, author, contact)
- performance (fast and mobile-friendly)
`.trim(),
  },

  {
    slug: "firestore-security-rules-multi-role-app",
    title: "Firestore Security Rules for Multi-Role Apps (Production Rule Patterns)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Security",
    tags: ["firestore", "security-rules", "roles", "authorization"],
    readingTime: "8–10 min",
    excerpt:
      "Production-friendly rules: deny-by-default, role lookup, ownership checks, admin workflows, and common rule mistakes that leak data.",
    content: `
# Firestore Security Rules for Multi-Role Apps (Production Rule Patterns)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

In Firebase apps, routing is UX, but Firestore Rules are security. If your rules are weak, data can be accessed even if your UI hides it. This post documents rule patterns I use for ODMS-style multi-role apps.

## 1) My rule baseline (deny-by-default)
- Start with no access
- Open only what you need
- Keep rules readable with helper functions
- Prefer ownership checks + role checks

## 2) Role truth comes from users/{uid}
Rules should read role from:
- \`users/{request.auth.uid}\`

This prevents trusting client state.

Related: [LINK: Signup Role Setup] (firebase-auth-role-setup-signup)

## 3) Helper functions (readability wins)

Typical functions:
- \`isSignedIn()\`
- \`uid()\`
- \`userDoc()\`
- \`role()\`
- \`isAdmin()\`
- \`isDoctor()\`

## 4) Users collection: self-access + admin access

Policy:
- user can read/write own profile
- admin can read/write all

Also recommended:
- prevent role self-upgrade (only admin can change role)

## 5) Requests collection: ownership + review roles

Policy example:
- recipient/doctor can create requests
- creator can read own requests
- doctor/admin can read and update
- only admin can delete

## 6) Matches collection: workflow records

Policy example:
- admin creates matches
- doctor/admin updates status
- donor/recipient reads only if they are involved

## 7) Mistakes that cause data leaks
- allowing read for all signed-in users on entire collection
- trusting role from localStorage
- allowing any user to set \`role: "admin"\` in their own doc

Related: [LINK: Role Routing] (firebase-auth-role-based-routing)

## Verification checklist (security)
- donor cannot read \`users\` list
- recipient can read only own requests
- donor can read only matches where \`donorUid == uid\`
- recipient can read only matches where \`recipientUid == uid\`
- only admin can create matches
- only admin/doctor can update match status

## Conclusion
Rules are the foundation of multi-role apps. If you design them carefully (ownership + role + deny-by-default), the rest of the system becomes reliable.
`.trim(),
  },

  {
    slug: "firebase-auth-role-setup-signup",
    title: "Firebase Signup Flow: Create users/{uid} Reliably (No Missing Role Bugs)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "React + Firebase",
    tags: ["firebase-auth", "firestore", "signup", "user-doc"],
    readingTime: "6–8 min",
    excerpt:
      "A robust signup pattern: write the Firestore user profile immediately, enforce role rules, and handle partial failures safely.",
    content: `
# Firebase Signup Flow: Create users/{uid} Reliably (No Missing Role Bugs)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

A common failure in Firebase apps is: signup succeeds, but the Firestore user profile document does not exist. Then login works, but role-based routing breaks because role is unknown. This post focuses on fixing that class of problems.

## Why it happens
- network interruption after Auth user creation
- Firestore write blocked by rules
- client navigates away before \`setDoc\` completes
- inconsistent document shape across versions

## The stable signup pattern

1) Create Auth user  
2) Immediately write \`users/{uid}\`  
3) Store role + minimal profile fields  
4) Redirect after Firestore write completes

### Recommended minimum fields
- \`role\`
- \`fullName\`
- \`email\`
- \`createdAt\`, \`updatedAt\`

Add domain fields later:
- \`bloodGroup\`, \`organType\`, \`address\`, \`mobile\`

## Prevent unsafe role selection
For real systems:
- allow self-signup only as donor/recipient
- doctor/admin should be assigned by admin workflow

Related: [LINK: Security Rules] (firestore-security-rules-multi-role-app)

## Login safety check (handles missing doc)
On login:
- attempt to read \`users/{uid}\`
- if missing, route user to “Complete Profile” page
- or create minimal doc and block restricted routes until complete

## Verification checklist
- create user -> confirm \`users/{uid}\` exists immediately
- refresh -> role still loads and routes correctly
- block any attempt to set role to admin from client
- ensure Firestore rules allow user to write own profile (initially)

Related: [LINK: Protected Routes] (protected-routes-react-router-firebase)

## Conclusion
Role-based apps must treat \`users/{uid}\` creation as mandatory. If you make it reliable, routing and security become stable.
`.trim(),
  },

  {
    slug: "protected-routes-react-router-firebase",
    title: "Protected Routes in React Router + Firebase (Auth Guard + Role Guard)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "React",
    tags: ["react-router", "protected-route", "firebase"],
    readingTime: "6–8 min",
    excerpt:
      "A production-ready ProtectedRoute: loading state, auth redirect, role-based allowlist, and refresh-safe behavior.",
    content: `
# Protected Routes in React Router + Firebase (Auth Guard + Role Guard)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

Protected routes should solve two problems:
1) **Authentication:** is the user signed in?
2) **Authorization:** does the user have permission (role) to view this route?

This post focuses on a guard pattern that prevents flicker, handles refresh, and blocks unauthorized roles.

## The three-state problem (why many guards feel broken)

Every Firebase app has a startup window where:
- auth state is loading
- role is not loaded yet
- UI should not render protected pages

So your guard must handle:
- loading state
- unauthenticated
- authenticated + role verified

## A clean guard contract

ProtectedRoute should:
- render loader while auth/role is loading
- redirect to \`/login\` if no user
- if \`roles\` provided, allow only those roles
- otherwise render children

Related: [LINK: Role Routing] (firebase-auth-role-based-routing)

## Guarding admin and doctor routes

Examples:
- \`/admin\` -> allow admin only
- \`/dashboard/doctor\` -> allow doctor or admin
- \`/dashboard/donor\` -> allow donor
- \`/dashboard/recipient\` -> allow recipient

## Important: do not treat guard as security

Guards improve UX, but security is Firestore Rules.

Related: [LINK: Firestore Rules] (firestore-security-rules-multi-role-app)

## Verification checklist
- open protected route in new tab while logged out -> redirect to login
- login -> redirected to correct dashboard
- refresh protected route -> no unauthorized flash
- donor tries \`/admin\` -> blocked
- doctor tries \`/admin\` -> blocked (unless allowed)

## Conclusion
A production-ready ProtectedRoute is:
- state-aware (loading)
- role-aware (allowlist)
- refresh-safe (role loaded from Firestore)
- complemented by Firestore rules for real security
`.trim(),
  },

  {
    slug: "admin-panel-filters-export-excel",
    title: "Admin Panel: Filters + Export to Excel from Firestore (Audit-Friendly Tables)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Admin",
    tags: ["firestore", "admin-panel", "export", "excel"],
    readingTime: "6–8 min",
    excerpt:
      "Fetch Firestore rows, filter by role/status/date, and export consistent Excel reports with IDs and timestamps for auditability.",
    content: `
# Admin Panel: Filters + Export to Excel from Firestore (Audit-Friendly Tables)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

An admin panel is where multi-role systems become operational. In ODMS, I treat export as a reporting and audit requirement, not a “nice-to-have.”

This post focuses on: **filter model + export design**.

## 1) What I export (and why)

For audit-friendly exports, I include:
- stable IDs (uid, matchId)
- timestamps (createdAt, updatedAt)
- status fields (role, match status)
- minimal personal data (avoid exporting unnecessary fields)

## 2) Filters that actually matter
I implement filters first, then export:
- role (donor/recipient/doctor/admin)
- match status (suggested/approved/rejected/completed)
- date range
- search (name/email/mobile)

Filter-first prevents huge exports and improves usability.

## 3) Columns: keep them consistent
Example columns for users:
- uid
- fullName
- email
- role
- createdAt

Example columns for matches:
- matchId
- donorUid
- recipientUid
- organType
- status
- compatibilityScore
- reviewedByUid
- createdAt

## 4) Export permissions
Export must be admin-only:
- route guard blocks UI access
- Firestore rules prevent data reads for non-admin users

Related: [LINK: Firestore Rules] (firestore-security-rules-multi-role-app)

## 5) Practical verification checklist
- non-admin cannot see export button
- non-admin cannot read full users collection from Firestore
- export includes current filters in filename or header
- timestamps are present and readable
- downloaded sheet has stable columns (no random ordering)

Related: [LINK: Export PDF Reports] (export-pdf-from-firestore-data)

## Conclusion
Admin exports become trustworthy when:
- filters are first-class
- column design is consistent
- permissions are enforced (UI + rules)
- audit fields are always included
`.trim(),
  },

  {
    slug: "export-pdf-from-firestore-data",
    title: "Export PDFs from Firestore Data (Readable Tables, Pagination, A4 Layout)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Admin",
    tags: ["pdf-export", "firestore", "reports"],
    readingTime: "5–7 min",
    excerpt:
      "A clean PDF export approach: filter-first UX, stable columns, page headers, pagination rules, and audit metadata.",
    content: `
# Export PDFs from Firestore Data (Readable Tables, Pagination, A4 Layout)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

PDF export often fails because developers try to print raw HTML without thinking about page rules. I approach PDF export like a report generator: predictable columns, pagination, headers, and metadata.

## 1) Filter-first workflow
I never export “everything” by default. I require filters:
- role/status
- date range
- search keywords

This makes PDFs smaller and more useful.

## 2) Table rules for A4 readability
- limit columns (avoid very wide tables)
- wrap long text (email/address)
- repeat header on each page
- page number footer

## 3) Audit metadata (adds credibility)
At the top of the report:
- generatedAt timestamp
- filters used
- total rows
- optional totals by status

## 4) Permissions
Export must be admin-only and data access must be protected by rules.

Related: [LINK: Firestore Rules] (firestore-security-rules-multi-role-app)

## 5) Verification checklist
- export respects current filters
- PDF opens cleanly on mobile and desktop
- headers repeat on each page
- long strings wrap without breaking layout
- generatedAt and total rows included

Related: [LINK: Admin Excel Export] (admin-panel-filters-export-excel)

## Conclusion
PDF export becomes professional when it behaves like reporting:
- filter-first
- stable columns
- pagination + headers
- audit metadata
`.trim(),
  },

  {
    slug: "cookie-consent-analytics-gate-react",
    title: "Cookie Consent + Analytics Gate in React (Load Tracking After Consent)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Compliance",
    tags: ["cookie-consent", "analytics", "privacy"],
    readingTime: "5–7 min",
    excerpt:
      "A consent-first pattern: store user choice, dispatch events, and load Google Analytics only after consent to reduce compliance risk.",
    content: `
# Cookie Consent + Analytics Gate in React (Load Tracking After Consent)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

If you use analytics, a consent-first approach is safer and cleaner. My goal is simple:
- show a clear notice
- store user choice
- load analytics only after consent

This reduces accidental tracking and improves trust signals on a portfolio site.

## 1) Store consent consistently
I store a single key, for example:
- \`nm_consent_v1: accepted | rejected\`

## 2) Dispatch an event after selection
When a user selects Accept/Reject, dispatch a custom event so other parts of the app can react without tight coupling.

## 3) AnalyticsGate concept
AnalyticsGate does:
- on mount: check localStorage
- if accepted: load analytics script
- if not set: wait for consent event
- if rejected: never load analytics

## 4) Naming note (practical)
Some blockers flag “cookie” keywords. I use neutral component names if needed:
- \`SiteNotice.jsx\`
- \`AnalyticsGate.jsx\`

## 5) Verification checklist
- first visit: banner appears
- accept: analytics loads
- reject: analytics does not load
- refresh: consent state persists
- privacy policy explains analytics usage

Related: [LINK: AdSense Readiness Checklist] (portfolio-site-adsense-readiness-checklist)

## Conclusion
Consent-first analytics is a small implementation detail that improves trust and reduces compliance risk.
`.trim(),
  },

  {
    slug: "firebase-hosting-spa-rewrites",
    title: "Firebase Hosting SPA Rewrites (Fix 404 on Refresh for React Routes)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Deployment",
    tags: ["firebase-hosting", "rewrites", "spa"],
    readingTime: "4–6 min",
    excerpt:
      "If /blog/:slug works by navigation but fails on refresh, add the correct rewrite rule and verify all routes directly.",
    content: `
# Firebase Hosting SPA Rewrites (Fix 404 on Refresh for React Routes)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

If your React Router routes work when you click links but fail when you refresh a deep link, you are missing SPA rewrites. Firebase Hosting is trying to find a file at that path.

## Why the 404 happens
- Hosting receives \`/blog/my-post\`
- It looks for a file named \`/blog/my-post\`
- That file does not exist
- Result: 404

React Router can handle \`/blog/my-post\`, but only after \`index.html\` loads.

## The correct rewrite rule
Rewrite all paths to \`/index.html\` so the SPA can route.

After deploying, test deep links directly:
- \`/about\`
- \`/blog\`
- \`/blog/<slug>\`

## Verification checklist
- open a blog slug directly in a new tab -> loads
- refresh on that slug -> still loads
- open \`/privacy-policy\` directly -> loads
- refresh -> still loads

Related: [LINK: Deploy Vite + React] (vite-react-firebase-hosting-guide)

## Conclusion
SPA rewrites are mandatory for React Router deployments on Firebase Hosting.
`.trim(),
  },
 
  {
    slug: "sitemap-robots-for-react-spa",
    title: "Sitemap.xml + Robots.txt for React SPA (Indexing Checklist + Testing)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "SEO",
    tags: ["sitemap", "robots", "seo"],
    readingTime: "4–6 min",
    excerpt:
      "A practical sitemap/robots checklist for SPAs, including what URLs to include and how to verify deployment correctness.",
    content: `
# Sitemap.xml + Robots.txt for React SPA (Indexing Checklist + Testing)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

Sitemaps and robots.txt are basic SEO hygiene. They do not replace good content, but they make discovery predictable. This post is a checklist I use for React SPAs.

## 1) What my sitemap includes
I include only stable, public routes:
- \`/\`
- \`/about\`
- \`/projects\`
- \`/blog\`
- \`/blog/:slug\`
- \`/contact\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`

Do not include:
- admin routes
- authenticated dashboards
- pages that can 404

## 2) robots.txt essentials
- allow crawling
- reference sitemap location

## 3) Testing in the browser (simple but important)
Open these directly:
- \`/sitemap.xml\`
- \`/robots.txt\`

If they 404, your deployment is incomplete.

## 4) Dependency: SPA rewrites
If your deep links 404 on refresh, fix hosting rewrites first.

Related: [LINK: SPA Rewrites] (firebase-hosting-spa-rewrites)

## Conclusion
Sitemap + robots works when:
- URLs are real and stable
- files are deployed correctly
- routes do not break on refresh
`.trim(),
  },

  {
    slug: "writing-high-quality-technical-articles",
    title: "How I Write Technical Articles (Original Structure + Proof + Screenshots)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Writing",
    tags: ["blogging", "technical-writing", "seo"],
    readingTime: "5–7 min",
    excerpt:
      "A repeatable writing template that avoids thin content: real problem context, architecture, code, screenshots, and validation steps.",
    content: `
# How I Write Technical Articles (Original Structure + Proof + Screenshots)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

If a technical blog feels like generic documentation, it often fails to build trust. My goal is to write posts that are:
- original (not copy-paste templates)
- specific (file names, routes, decisions)
- verifiable (checklists, screenshots)
- helpful (common mistakes + fixes)

## The structure I follow

### 1) Problem statement
What broke or what I needed to achieve.

### 2) Constraints
What tools/stack I used and why.

### 3) Architecture
Short explanation of the moving parts (Auth, Firestore, routing, rules).

### 4) Step-by-step implementation
Concrete steps, not vague advice.

### 5) Code snippets (minimal but real)
Only the parts that matter.

### 6) Verification checklist
How to confirm the solution works.

### 7) Common mistakes
What developers typically do wrong.

### 8) Conclusion + next steps
Where to extend it.

## How I avoid duplicate content across posts
If two posts touch the same topic (e.g., roles), I ensure:
- different intent (routing vs rules vs signup reliability)
- unique examples
- different checklists

Related: [LINK: ODMS Case Study] (how-i-built-odms-with-firebase)

## Conclusion
A portfolio blog becomes a “publisher-grade” blog when it consistently delivers:
- original detail
- clear structure
- proof and verification
- useful internal linking across posts
`.trim(),
  },

  {
    slug: "portfolio-site-adsense-readiness-checklist",
    title: "AdSense Readiness for a Portfolio (Content Depth, Trust, SEO, UX Checklist)",
    date: "2026-01-17",
    updatedAt: "2026-01-17",
    author: "Nitish Mandal",
    category: "Compliance",
    tags: ["adsense", "seo", "trust", "content"],
    readingTime: "6–8 min",
    excerpt:
      "A practical pre-review checklist: content requirements, navigation, policy pages, SEO files, performance, and trust signals.",
    content: `
# AdSense Readiness for a Portfolio (Content Depth, Trust, SEO, UX Checklist)

**Last updated:** 2026-01-17  
**Author:** Nitish Mandal

AdSense review is largely about whether the site looks like a real, useful publication. For a portfolio domain, the safest path is to make it feel complete: clear navigation, original content depth, policy pages, and no broken routes.

## 1) Content depth (most important)
- publish multiple long-form posts (case studies and guides)
- avoid repeating the same paragraphs
- include real implementation details (routes, files, decisions)
- add “verification checklists” to show credibility

Related: [LINK: Writing Articles Template] (writing-high-quality-technical-articles)

## 2) Site structure and navigation
Minimum pages that should exist and work:
- About
- Projects
- Blog
- Contact
- Privacy Policy
- Terms

All links must work on mobile.

## 3) Trust signals
- author name on blog pages
- updated dates
- contact methods
- footer links to policy pages

## 4) SEO baseline
- sitemap.xml reachable
- robots.txt reachable and references sitemap
- stable routes (no refresh 404)

Related: [LINK: Sitemap + Robots] (sitemap-robots-for-react-spa)  
Related: [LINK: SPA Rewrites] (firebase-hosting-spa-rewrites)

## 5) UX and quality checks
- fast loading
- no intrusive popups
- consistent typography
- no placeholder pages
- no “coming soon” on critical routes

## Final verification checklist
- open each key route directly in new tab (no 404)
- check mobile nav and footer links
- confirm privacy/terms are accessible
- ensure blog pages show author + updated date
- remove broken links and unused routes

## Conclusion
Treat your portfolio as a publication:
- publish original, useful articles
- keep navigation and policy pages clean
- ensure routes are stable and crawlable
- avoid duplicated or placeholder content
`.trim(),
  },

  {
  slug: "firebase-contact-form-firestore-inbox",
  title: "Firebase Contact Form + Firestore Inbox (Spam Protection + Admin Inbox Pattern)",
  date: "2026-01-18",
  updatedAt: "2026-01-18",
  author: "Nitish Mandal",
  category: "Firebase",
  tags: ["firebase", "firestore", "contact-form", "spam", "security-rules"],
  readingTime: "9–12 min",
  excerpt:
    "A production-style contact system: Firestore inbox schema, spam protection, consent text, and rules that prevent abuse while keeping messages readable for you.",
  content: `
# Firebase Contact Form + Firestore Inbox (Spam Protection + Admin Inbox Pattern)

**Last updated:** 2026-01-18  
**Author:** Nitish Mandal

A portfolio contact form looks simple, but it can cause real problems:
- spam submissions and bot traffic
- data stored without consent clarity
- Firestore rules that accidentally allow anyone to read messages
- missing admin workflow (where do you actually read messages?)

This post documents a clean, production-style approach: **a Firestore inbox** with a minimal schema, **spam protection**, and **strict rules**.

## Goals (what this system must guarantee)

1) Any visitor can send a message (public form).  
2) Only **you (admin)** can read messages in Firestore.  
3) Messages are stored with useful metadata for review.  
4) Spam and abuse are reduced with practical controls.  
5) The contact page includes clear disclosure (AdSense trust).

## Data model: contacts/{docId}

Recommended fields (minimal and useful):
- \`name\` (string)
- \`email\` (string)
- \`message\` (string)
- \`createdAt\` (timestamp)
- \`source\` (optional: route or page where user submitted)
- \`status\` (optional: new | read | archived)
- \`userAgent\` (optional: for debugging only; do not over-collect)

If you want a clean inbox UI later, \`status\` becomes valuable.

## Frontend: spam protections that actually help

I use 3 simple controls (lightweight, no paid services):

### 1) Honeypot field
Add a hidden field like \`company\`. Humans never fill it, bots often do.

### 2) Minimum time-on-form
Bots submit instantly. I store \`formStartTime\` and reject under ~3 seconds.

### 3) Email validation
Client-side email regex reduces bad data. It is not security, but it improves quality.

Related: ${INTERNAL_LINK("Contact Page Pattern", "contact")}

## Consent text (AdSense trust)

Your contact form should clearly say:
- what is collected (name/email/message)
- why (to respond)
- where stored (Firestore)
- how to request deletion (email)

Add a checkbox for explicit consent and do not submit without it.

## Firestore security rules (critical)

Contact messages are sensitive. A common mistake is:
- allow read to all signed-in users
- allow list access (which leaks everything)

Policy:
- allow create for public (or signed-in) visitors
- allow read/list only for admin

### Rule idea (high-level)
- \`allow create: if true\` (but validate fields)
- \`allow read, list: if isAdmin()\`

Validation examples:
- require \`name\`, \`email\`, \`message\`
- enforce length limits (prevents huge payload spam)
- block extra unexpected fields if you want stricter control

## Admin inbox view (optional but recommended)

Create a simple page:
- list \`contacts\` ordered by createdAt desc
- show \`name\`, \`email\`, short message preview, createdAt
- click -> details view
- add \`status\` update buttons (new/read/archived)

Even if you do not ship the UI publicly, this internal workflow makes your system feel complete.

## Verification checklist (I actually test this)

- Submit contact form -> doc appears in Firestore
- Open Firestore as non-admin -> cannot read any contacts
- Try to query list as non-admin -> denied
- Try spam (honeypot filled) -> rejected on client
- Submit super-long message -> rejected by rules (if you added limits)
- Contact page has privacy disclosure + policy links

## Conclusion

A contact form is a trust signal. When you implement:
- clear disclosure
- strict Firestore rules
- spam resistance
- admin inbox workflow

…it behaves like a real system, not a demo.

${POST_FOOTER}
`.trim(),
},
{
  slug: "adsense-ready-react-site-checklist",
  title: "AdSense Approval Checklist for a React Portfolio (What Reviewers Actually Look For)",
  date: "2026-01-18",
  updatedAt: "2026-01-18",
  author: "Nitish Mandal",
  category: "Compliance",
  tags: ["adsense", "portfolio", "seo", "policy-pages", "content"],
  readingTime: "8–11 min",
  excerpt:
    "A practical checklist: content depth, navigation, policy clarity, crawlability, sitemap/robots verification, and common rejection causes for portfolio domains.",
  content: `
# AdSense Approval Checklist for a React Portfolio (What Reviewers Actually Look For)

**Last updated:** 2026-01-18  
**Author:** Nitish Mandal

AdSense approval is not only about design. It is largely about whether your site looks like a real publication:
- original content
- stable navigation
- policy transparency
- no broken routes
- clear ownership and contact

This checklist is based on the same standards I apply to my own portfolio blog.

## 1) Content depth (the #1 factor)

A portfolio with only short pages often fails “value” checks.

What I do:
- publish multiple long posts (guides + case studies)
- avoid copy-pasting the same paragraphs across pages
- include real implementation detail (routes, schemas, rules)
- include verification checklists and screenshots where possible

Your goal: each important route should feel “complete”.

## 2) Make your pages crawlable (React SPA basics)

If your site is a React SPA:
- deep links must not 404 on refresh
- pages must render meaningful HTML quickly

Fix:
- Hosting rewrites (Firebase Hosting) so every route returns \`index.html\`

Related: ${INTERNAL_LINK("Firebase Hosting SPA Rewrites", "firebase-hosting-spa-rewrites")}

## 3) Policy pages (non-negotiable trust)

Minimum:
- Privacy Policy (include ads/cookies paragraph)
- Terms & Conditions
- Contact page (with email)

Also recommended:
- Footer links to policies on every page

Policy pages should be:
- accessible (no auth)
- not empty
- not generic copy-paste walls (use your actual stack: Firebase Hosting, Firestore, etc.)

## 4) Ads + cookies clarity (especially important)

If you will use AdSense:
- your privacy policy should mention Google ads and cookies/third-party vendors
- provide links to Google’s controls (Ad Center)
- explain user choices: browser settings, ad personalization controls

Related: ${INTERNAL_LINK("Cookie Consent + Analytics Gate", "cookie-consent-analytics-gate-react")}

## 5) Navigation and UX (reviewers behave like users)

I verify:
- top navbar links work
- footer links work
- mobile layout is readable
- no “Coming soon” on core pages
- no broken buttons or dead routes

Your blog should have:
- a list page (/blog)
- individual post pages (/blog/:slug)
- visible author and updated date

## 6) SEO baseline (simple but required)

I ensure:
- \`/robots.txt\` is reachable
- \`/sitemap.xml\` is reachable
- sitemap includes only public, stable routes
- Search Console can fetch pages without errors

Related: ${INTERNAL_LINK("Sitemap + Robots for React SPA", "sitemap-robots-for-react-spa")}
Related: ${INTERNAL_LINK("SEO for React SPA", "seo-for-react-spa-sitemap-robots")}

## 7) Common rejection causes I avoid

- Thin content (few short pages, mostly templates)
- Duplicate content (same text repeated across pages)
- Missing policy pages or no contact details
- Broken routes (SPA refresh 404)
- “Under construction” signals
- Too many ads too early (once approved, keep ads reasonable)

## Final “pre-submit” test (my routine)

Open these directly in a new tab and refresh each:
- \`/\`
- \`/about\`
- \`/projects\`
- \`/blog\`
- \`/blog/<slug>\`
- \`/contact\`
- \`/privacy-policy\`
- \`/terms-and-conditions\`
- \`/sitemap.xml\`
- \`/robots.txt\`

If any fails, fix it before submitting for review.

## Conclusion

For a portfolio, AdSense approval is easiest when you treat the site like a publication:
- real content depth
- stable navigation
- trust pages
- crawlable routes
- good UX on mobile

${POST_FOOTER}
`.trim(),
},


{
  slug: "firebase-firestore-schema-design-for-role-apps",
  title: "Firestore Schema Design for Role-Based Apps (Query-Friendly Patterns + Avoiding Cost Traps)",
  date: "2026-01-18",
  updatedAt: "2026-01-18",
  author: "Nitish Mandal",
  category: "Architecture",
  tags: ["firestore", "schema", "roles", "queries", "performance"],
  readingTime: "10–13 min",
  excerpt:
    "How I model users, workflows, and status records in Firestore to keep queries simple, rules enforceable, and reads predictable in multi-role apps.",
  content: `
# Firestore Schema Design for Role-Based Apps (Query-Friendly Patterns + Avoiding Cost Traps)

**Last updated:** 2026-01-18 
**Author:** Nitish Mandal

Firestore is flexible, but schema choices decide whether your app stays:
- query-friendly
- rule-friendly
- cost-predictable

This post explains patterns I use in ODMS-style systems: multiple roles, workflows, and admin reporting.

## 1) Start with “truth documents”

In multi-role apps, there are 2 truths:
- identity (Auth user)
- authorization/profile (Firestore user doc)

So I always create:
- \`users/{uid}\` as the role truth

Fields:
- \`role\` (donor/recipient/doctor/admin)
- \`fullName\`, \`email\`
- domain fields (bloodGroup, organType, address, mobile)
- timestamps

Related: ${INTERNAL_LINK("Signup Flow users/{uid}", "firebase-auth-role-setup-signup")}

## 2) Model workflows as first-class collections

Avoid storing everything inside \`users/{uid}\`.

For workflow systems, create dedicated collections:
- \`requests\`
- \`matches\`
- \`approvals\` (optional)
- \`auditLogs\` (optional)

Why:
- queries remain simple
- rules are simpler
- admin exports become straightforward

## 3) Use “owner fields” explicitly

Firestore rules and queries become easier if documents contain:
- \`createdByUid\`
- \`donorUid\`
- \`recipientUid\`

Example:
- \`matches/{matchId}\` includes \`donorUid\` and \`recipientUid\`

This enables:
- recipient query: where recipientUid == myUid
- donor query: where donorUid == myUid

It also makes rules readable:
- allow read if request.auth.uid is donorUid or recipientUid (or admin/doctor)

Related: ${INTERNAL_LINK("Security Rules Patterns", "firestore-security-rules-multi-role-app")}

## 4) Status fields should be enumerable and stable

Use stable status strings:
- \`open | processing | closed\`
- \`suggested | approved | rejected | completed\`

Do not use random free-text status values. It breaks filtering and export.

## 5) Avoid “cost traps” (practical)

### Trap A: fetching full users collection in many places
Fix:
- fetch minimal subsets
- cache role in provider (single load)
- use server-side export if data grows

Related: ${INTERNAL_LINK("Role-Based Routing", "firebase-auth-role-based-routing")}

### Trap B: “one giant document” arrays
Arrays grow and cause:
- write contention
- document size limits
- expensive reads

Fix:
- put history into subcollection:
  - \`users/{uid}/activity/{id}\`
or a global collection with \`uid\` field.

### Trap C: rules that require too many reads
Rules can call \`get()\`. Keep it minimal:
- one role lookup doc (users/{uid})
- then simple checks

## 6) Export-ready schema (admin reporting)

If you know you will export:
- store timestamps consistently
- store stable IDs (matchId, requestId, uid)
- store status fields on documents (not derived only in UI)

Related: ${INTERNAL_LINK("Admin Excel Export", "admin-panel-filters-export-excel")}
Related: ${INTERNAL_LINK("PDF Export Reports", "export-pdf-from-firestore-data")}

## 7) My “schema review” checklist

Before I finalize a schema, I ask:

- Can each role query “their” data with 1 simple where clause?
- Can Firestore rules enforce access with ownership fields?
- Can admin export without joining many collections?
- Are statuses enumerable?
- Are timestamps present everywhere?

If yes, the schema is usually stable.

## Conclusion

Firestore works best when you treat schema like product architecture:
- role truth in \`users/{uid}\`
- workflow collections for requests/matches
- explicit ownership fields
- stable statuses and timestamps
- export-friendly document shapes

${POST_FOOTER}
`.trim(),
},

];
