# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians to discover, filter, inspect dynamic availability, and reserve production studios hourly with transparent pricing.

---

## 🔗 Important Links

- **Live Application URL:** [https://studiospace-client-three-rho.vercel.app](https://studiospace-client-three-rho.vercel.app/)
- **Backend API URL:** [https://studiospace-server-2vfp.onrender.com](https://studiospace-server-2vfp.onrender.com)
- **Client Repository:** [https://github.com/abukausar-dev/studiospace-client](https://github.com/abukausar-dev/studiospace-client)
- **Server Repository:** [https://github.com/abukausar-dev/studiospace-server](https://github.com/abukausar-dev/studiospace-server)

---

## 🌟 Key Features (Assignment Core & Challenges)

- **Interactive Studios Explorer & Dynamic Filtering:** Real-time search by title or location, multi-category selection, price range filtering (`$gte` and `$lte`), dynamic sorting (price low-to-high, high-to-low, top-rated, newest), and paginated navigation backed by skeleton loading states.
- **Detailed Studio Showcases & Interactive Booking:** Full workspace specifications, gallery carousel, included amenities and equipment breakdown, verified host details, genuine customer reviews, and a real-time reservation modal calculating hourly rates and refundable security deposits.
- **Full Host Workspace Management (CRUD):** Authenticated hosts can list new creative spaces (`/add-studio`), view and track their owned workspaces (`/my-listings`), edit specifications via pre-filled forms (`/studios/edit/[id]`), and delete spaces using custom confirmation modal dialogs without browser alerts.
- **Double-Booking Overlap Prevention (Challenge 2):** Backend conflict prevention algorithm calculating time-slot overlaps (`existing.startAt < new.endAt AND existing.endAt > new.startAt`) against active reservations to prevent schedule collisions with HTTP 409 status handling.
- **Secure Authentication with HTTPOnly Cookies (Challenge 1):** BetterAuth client and server integration with custom JWT HTTPOnly cookie authorization (`studio_access`), password validation rules (uppercase, lowercase, 6+ characters), and protected dashboard route persistence across reloads.
- **Full-System Theme Customization (Challenge 3):** Seamless Light (`studiolight`) and Dark (`studiodark`) theme toggling powered by DaisyUI themes and `next-themes`, ensuring high contrast and readability across every section.
- **Reservation Lifecycle & Cancellation:** Creators can inspect their bookings on `/my-bookings` with real-time status badges (Pending, Confirmed, Completed, Cancelled) and cancel pending slots via custom modal dialogs.

---

## 💻 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, DaisyUI 5, Lucide React, Swiper 14, Sonner, `next-themes`.
- **Backend:** Node.js, Express.js 5 (ESM), MongoDB Native Driver, Cookie Parser, CORS, JSON Web Token (JWT).
- **Authentication & Security:** BetterAuth, Custom JWT HTTPOnly Cookie (`studio_access`), CORS credentials whitelist.
- **Deployment:** Vercel (Client) and Render (Server Web Service).

---

## 🔑 Examiner Test Credentials

Examiners can test protected host features, private routes, and booking workflows using these credentials:

- **Email:** `examiner@example.com`
- **Password:** `Examiner123`

---

## 🚀 Local Setup Instructions

### 1. Clone the Repositories
```bash
git clone [https://github.com/abukausar-dev/studiospace-client.git](https://github.com/abukausar-dev/studiospace-client.git)
git clone [https://github.com/abukausar-dev/studiospace-server.git](https://github.com/abukausar-dev/studiospace-server.git)