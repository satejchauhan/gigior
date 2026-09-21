# GIGIOR

Salon and aesthetic website. Wordmark **GIGIOR**. Line **SALON · AESTHETIC**. Ink **`#391b0d`** on ivory.

React (Vite) frontend. Core PHP JSON API and admin. SQLite for local, no framework.

## Run locally

Two terminals:

```bash
php -S 127.0.0.1:8080 -t backend/public backend/public/router.php
```

```bash
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` and `/admin` to PHP.

## Admin

[http://localhost:5173/admin](http://localhost:5173/admin) or [http://127.0.0.1:8080/admin](http://127.0.0.1:8080/admin)

- Email: `house@gigior.local`
- Password: `GigiorHouse1`

Change both in `backend/config.php` before any public host.

## Deploy (Vercel)

Root `vercel.json` builds the Vite app from `frontend/` and publishes `frontend/dist`.

Site images live only in `frontend/public/images` (copied into the build as `/images/...`).  
`backend/public/images` is a symlink to that folder for local PHP.

SPA routing only rewrites paths **without** a file extension, so `/images/*.png` is served as static files — not `index.html`.

```bash
npm run build
```

Confirm `frontend/dist/images/` exists before relying on a deploy.