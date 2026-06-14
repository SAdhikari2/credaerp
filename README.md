# 🚀 CredaERP Landing Page

A premium, high-conversion landing page designed for **[CredaERP](https://github.com/SAdhikari2/credaerp)**—a robust, offline-first business management software built specifically for Indian retail, pharmacy, and distribution businesses.

This landing page is designed to wow visitors with modern, glassmorphism-inspired dark aesthetics, high-fidelity responsive components, and direct call-to-actions targeting early-adopter signups.

---

## 🌟 Product Value Proposition

CredaERP is tailored to solve the inventory, billing, and compliance headaches of small and medium Indian merchants:

*   **⚡ High-Speed Billing:** Designed for rapid checkout counters with medicine lookups, keyboard shortcuts, and payment logging.
*   **📦 Smart Inventory Control:** Real-time stock status, low-stock notifications, and batch-wise expiry tracking to clear older batches first.
*   **🇮🇳 Indian Compliance & GST Savings:** Full CGST, SGST, IGST, and HSN code support. Dynamic GSTR-1 and GSTR-3B data compilation **reduces client GST filing costs by at least ₹500/month**.
*   **🛡️ Offline-First Reliability:** A machine-bound hardware-activated license key architecture ensures the POS terminal operates 100% offline without needing a continuous internet connection.
*   **⚠️ Single-Counter Focus:** Optimized specifically for standalone, single-counter business operations.

---

## 📂 Project Directory Structure

```text
├── index.html       # Primary website page structure & semantic markup
├── style.css        # CSS variable tokens, glassmorphism UI rules, & media queries
├── script.js        # Vanilla JS interactive carousel, accordion, & modal state
├── README.md        # Technical project documentation (this file)
└── images/          # Product screenshots folder (used by the mockup carousel)
```

---

## 🛠️ Design System & Technical Stack

The landing page is built with a lightweight, dependencies-free **Vanilla Web Stack** to guarantee instantaneous loading times, excellent SEO metrics, and a smooth 60fps scrolling experience:

### 1. Style Guide (CSS Custom Properties)
Defined inside [style.css](file:///Users/saikatmac/.gemini/antigravity/worktrees/credaerp/update-readme-file/style.css), the design system utilizes CSS tokens for theme consistency:

| CSS Variable | Value / Usage | Purpose |
| :--- | :--- | :--- |
| `--bg-main` | `#0b1120` | Base dark viewport background |
| `--bg-card` | `rgba(15, 23, 42, 0.6)` | Translucent glass container base |
| `--color-primary` | `#2563eb` | Brand blue for key indicators & primary actions |
| `--color-secondary` | `#22c55e` | Brand green for success badges & pricing highlights |
| `--color-accent` | `#d946ef` | Pink/magenta accent highlights |
| `--transition-smooth` | `all 0.35s cubic-bezier(...)` | Fluid easing curve for UI components |
| `--font-sans` | `'Plus Jakarta Sans', ...` | Modern, clean geometric sans-serif typeface |

### 2. Layout & Interactions
*   **Glassmorphism:** Elements like feature cards and screenshots mockups employ custom background alphas, fine border-lines (`rgba(255, 255, 255, 0.08)`), and high-strength backdrop filters (`backdrop-filter: blur(16px)`).
*   **Dynamic Backgrounds:** Responsive radial gradients in `body::before` and `body::after` create subtle blue and green glows without using heavy image assets.
*   **Responsive Breakpoints:** Fully optimized via media queries at `1024px` and `768px` to support mobile phones, tablets, and wide billing terminals.

---

## ⚡ UI Interactivity Details

Interactive workflows are managed inside [script.js](file:///Users/saikatmac/.gemini/antigravity/worktrees/credaerp/update-readme-file/script.js):

### 1. macOS Browser Screenshot Carousel
*   Swaps screenshots dynamically using standard data attributes (`data-screenshot`).
*   **Preloading Logic:** Creates a virtual image buffer in memory (`new Image()`) and loads the requested graphic. On success, the container transitions from a blurred loading spinner to the fully rendered image.
*   **Graceful Fallback:** If the required screenshot file is missing from the directory, the JavaScript catches the error and displays setup guidance instructions directly inside the browser mockup frame.

### 2. Collapsible FAQ Accordion
*   Smoothly expands and collapses answers by setting `maxHeight` programmatically based on element scroll heights (`scrollHeight`).
*   Implements an accordion pattern: opening one FAQ automatically closes all other active questions.

### 3. Demo Registration Modal
*   Displays when any "Request Free Demo Key" CTA is clicked, dynamically displaying the requested tier/license type.
*   Handles simulated client-side form validation and submits asynchronously.
*   Replaces the form container with an interactive confirmation screen informing the merchant that a license key will be sent via WhatsApp.

---

## 💻 Local Development & Setup

Since this is a static project, it runs out-of-the-box on any browser without compile steps or server-side setups.

### 1. Serving Locally
To test the preloading script and responsive carousel, use a local server to avoid CORS issues with offline files.

*   **Python 3.x:**
    ```bash
    python -m http.server 8080
    ```
*   **Node.js (npx):**
    ```bash
    npx http-server -p 8080
    ```
*   **VS Code:** Install **Live Server** and click the *Go Live* icon in the status bar.

### 2. Assets Folder Configuration
Create an `images/` directory at the project root and place your high-definition screenshots in it. The javascript carousel will search for these exact file names:

*   `dashboard-analytics.png` — Dashboard Charts & Analytics
*   `dashboard-overview.png` — Dashboard Overview Cards
*   `inventory.png` — Smart Inventory Management
*   `billing-items.png` — POS Terminal Billing Grid
*   `billing-checkout.png` — POS Terminal Checkout & Payment
*   `reports.png` — Business Reports & GST Compliance
*   `gst-filing.png` — GST Filing Dashboard (Recommended to display CA/filer reports)
*   `ca-dashboard.png` — CA Dashboard & Reports (Shows backend compliance ledger exports)

---

## 📞 Support & Contacts

For early access license generation, support queries, or customized demos, reach out via the landing page links:
*   💬 **WhatsApp:** [8967859971](https://wa.me/918967859971)
*   📧 **Email:** credaerp@gmail.com