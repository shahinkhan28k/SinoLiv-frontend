# SinoLiv-Streams | Frontend

This is the frontend project for **SinoLiv-Streams** (formerly StreamLoop). 

## 📁 Folder Structure
```text
/
├── .env.example
├── package.json
├── tailwind.config.ts
├── index.html
├── src/
│   ├── App.tsx             # Main routing & layout
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles & fonts
│   ├── components/
│   │   └── Navigation.tsx  # Sidebar & BottomNav
│   ├── contexts/
│   │   └── AuthContext.tsx # JWT Auth logic
│   ├── lib/
│   │   ├── api.ts          # API fetch wrapper
│   │   └── utils.ts        # Tailwind utilities (cn)
│   └── pages/
│       ├── LandingPage.tsx
│       ├── LoginPage.tsx
│       ├── SignupPage.tsx
│       ├── DashboardPage.tsx
│       ├── VideosPage.tsx
│       ├── StreamSetupPage.tsx
│       ├── LivePage.tsx
│       ├── SettingsPage.tsx
│       └── BillingPage.tsx
```

## 🚀 How to deploy to Vercel

1. **Push to GitHub**: Initialize a git repository and push this code to a new GitHub repo.
2. **Import to Vercel**: 
   - Go to [Vercel Dashboard](https://vercel.com).
   - Click **New Project** and import your repository.
3. **Configure Environment Variables**:
   - In the Vercel project settings, go to **Environment Variables**.
   - Add `NEXT_PUBLIC_API_URL` pointing to your backend VPS URL.
   - Add `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
4. **Build Settings**: 
   - Framework Preset: **Vite** (or Next.js if you port the code to App Router).
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy**: Click **Deploy**. Vercel will automatically provide you with a production URL.

## 🛠️ Porting to Next.js (App Router)
If you decide to move this to Next.js App Router:
- Move the contents of `src/pages/` into `app/` folders (e.g., `src/pages/DashboardPage.tsx` -> `app/dashboard/page.tsx`).
- Replace `react-router-dom` components (`Link`, `Navigate`) with `next/link` and `next/navigation`.
- The `AuthContext` and `api.ts` can remain largely unchanged.
