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

## Performance

- Lenis smooth scroll (disabled when `prefers-reduced-motion`)
- GPU transforms for reveals; no scroll-library animation on every block
- Route-level code splitting
- Responsive `srcset` images, hero preload, `font-display` via self-hosted Fontsource (two families, four files)
- SQLite WAL, prepared statements, rate-limited posts
