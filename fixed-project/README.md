# Ecom.lk – Sri Lanka B2B Marketplace Frontend

> Milestone 01 · Desktop Homepage UI  
> Stack: **Next.js 14** · **Tailwind CSS 3** · **React 18**

---

## 🗂️ Project Structure

```
ecom-in-sri-lanka-frontend/
├── app/
│   ├── globals.css          ← global styles (Tailwind base)
│   ├── layout.js            ← root HTML wrapper + <meta> tags
│   └── page.js              ← homepage: assembles all components
│
├── components/
│   ├── Header.jsx           ← top bar + logo + search + user icons
│   ├── Navbar.jsx           ← main nav (All Categories, Home, Products…)
│   ├── CategorySidebar.jsx  ← left sidebar category list
│   ├── HeroBanner.jsx       ← auto-sliding hero + promo cards
│   ├── RecommendedProducts.jsx ← tabbed 4-col product grid
│   └── FeatureCards.jsx     ← Why Trade on Ecom.lk? trust cards
│
├── public/                  ← static assets (images go here later)
├── .gitignore
├── jsconfig.json            ← enables @/ import alias
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```

---

## 🚀 Step-by-Step Setup (New to Next.js? Start here!)

### Step 1 – Install Prerequisites

You need **Node.js** (version 18 or higher) and **Git** installed.

1. Download Node.js: https://nodejs.org  (choose "LTS" version)
2. Download Git: https://git-scm.com
3. Download VS Code (recommended editor): https://code.visualstudio.com

After installing, open **Terminal** (Mac/Linux) or **Command Prompt** (Windows) and verify:

```bash
node -v      # should print v18.x.x or higher
npm -v       # should print 9.x.x or higher
git --version
```

---

### Step 2 – Get the Project Files

**Option A – Download the ZIP from Claude chat**  
Extract the ZIP somewhere easy, e.g. `C:\Projects\` or `~/Projects/`

**Option B – Clone from GitHub (after you push in Step 5)**
```bash
git clone https://github.com/YOUR_USERNAME/ecom-in-sri-lanka-frontend.git
cd ecom-in-sri-lanka-frontend
```

---

### Step 3 – Install Dependencies

Open the project folder in VS Code, then open the **VS Code Terminal** (`Ctrl + `` ` ``):

```bash
npm install
```

This reads `package.json` and downloads Next.js, React, and Tailwind CSS into a `node_modules/` folder.  
⚠️ This takes 1–2 minutes. Do NOT manually edit `node_modules`.

---

### Step 4 – Run the Development Server

```bash
npm run dev
```

You will see output like:
```
▶ Next.js 14.2.5
- Local: http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

You should see the Ecom.lk homepage! 🎉

**Hot reload**: Any time you save a file, the browser refreshes automatically.

To stop the server: press `Ctrl + C` in the terminal.

---

### Step 5 – Push to GitHub

#### 5a – Create the repository on GitHub

1. Go to https://github.com and log in
2. Click the **+** button (top-right) → **New repository**
3. Repository name: `ecom-in-sri-lanka-frontend`
4. Set to **Public** (or Private if you prefer)
5. ❌ Do NOT tick "Add a README" or "Add .gitignore" (we already have those)
6. Click **Create repository**
7. Copy the repository URL, e.g.:  
   `https://github.com/YOUR_USERNAME/ecom-in-sri-lanka-frontend.git`

#### 5b – Initialise Git and push

In your VS Code terminal, inside the project folder:

```bash
# Initialise git (only needed once)
git init

# Stage all files
git add .

# Create the first commit
git commit -m "Milestone 01: Desktop homepage UI - Next.js + Tailwind"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ecom-in-sri-lanka-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Your code is now live on GitHub! ✅

---

### Step 6 – Making Changes & Pushing Updates

After editing files:

```bash
git add .
git commit -m "describe what you changed"
git push
```

---

## 🎨 Brand Colours

| Name         | Hex       | Used for                        |
|--------------|-----------|---------------------------------|
| Navy (dark)  | `#0C1E35` | Header, Navbar, Footer          |
| Navy (mid)   | `#1E3A5F` | Sidebar header, secondary UI    |
| Golden Saffron | `#E8820C` | CTAs, buttons, active states  |
| Page BG      | `#F5F7FA` | Body background                 |
| White        | `#FFFFFF` | Cards, panels                   |

---

## 📋 Component Reference

| Component              | File                         | State? | Description                        |
|------------------------|------------------------------|--------|------------------------------------|
| Header                 | `components/Header.jsx`      | ✅ Yes | Logo, search, cart, account icons  |
| Navbar                 | `components/Navbar.jsx`      | ✅ Yes | Nav links, All Categories button   |
| CategorySidebar        | `components/CategorySidebar.jsx` | ✅ Yes | Left category list with hover  |
| HeroBanner             | `components/HeroBanner.jsx`  | ✅ Yes | Auto-sliding hero + promo cards    |
| RecommendedProducts    | `components/RecommendedProducts.jsx` | ✅ Yes | Tabbed product grid        |
| FeatureCards           | `components/FeatureCards.jsx` | ❌ No | Static USP/trust cards section    |

---

## 🗺️ Upcoming Milestones

- **Milestone 02** – Mobile responsive layout (Tailwind breakpoints: `sm:`, `md:`, `lg:`)
- **Milestone 03** – Product listing / search results page
- **Milestone 04** – Product detail page
- **Milestone 05** – Supplier profile page
- **Milestone 06** – API integration (WooCommerce or custom backend)

---

## 🛠️ Useful Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Check for code errors
```

---

## 📚 Learning Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- React Docs: https://react.dev

---

*powered by techromzIT*
