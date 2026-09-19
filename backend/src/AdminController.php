<?php

declare(strict_types=1);

final class AdminController
{
    public static function handle(string $method, string $path): never
    {
        session_name((string) Database::config('session_name'));
        session_start();

        if ($path === '/admin/logout') {
            $_SESSION = [];
            session_destroy();
            header('Location: /admin/login');
            exit;
        }

        if ($path === '/admin/login') {
            if ($method === 'POST') {
                $email = trim((string) ($_POST['email'] ?? ''));
                $pass = (string) ($_POST['password'] ?? '');
                if (hash_equals((string) Database::config('admin_email'), $email)
                    && hash_equals((string) Database::config('admin_password'), $pass)) {
                    $_SESSION['admin'] = $email;
                    header('Location: /admin');
                    exit;
                }
                self::login('Those details were not accepted.');
            }
            self::login();
        }

        if (empty($_SESSION['admin'])) {
            header('Location: /admin/login');
            exit;
        }

        if ($method === 'POST' && preg_match('#^/admin/bookings/(\d+)$#', $path, $m)) {
            $st = Database::pdo()->prepare('UPDATE bookings SET status = ? WHERE id = ?');
            $st->execute([$_POST['status'] ?? 'pending', $m[1]]);
            header('Location: /admin');
            exit;
        }

        $bookings = Database::pdo()->query('SELECT * FROM bookings ORDER BY id DESC LIMIT 50')->fetchAll();
        $enquiries = Database::pdo()->query('SELECT * FROM enquiries ORDER BY id DESC LIMIT 30')->fetchAll();
        self::dashboard($bookings, $enquiries);
    }

    private static function login(string $error = ''): never
    {
        self::wrap('Sign in', static function () use ($error) {
            if ($error) {
                echo '<p class="err">' . htmlspecialchars($error) . '</p>';
            }
            echo '<form method="post" action="/admin/login" class="card">
                <label>Email <input type="email" name="email" required></label>
                <label>Password <input type="password" name="password" required></label>
                <button type="submit">Enter</button>
            </form>';
        });
    }

    private static function dashboard(array $bookings, array $enquiries): never
    {
        self::wrap('The book', static function () use ($bookings, $enquiries) {
            echo '<h2>Reservations</h2><div class="table">';
            foreach ($bookings as $b) {
                echo '<article><strong>' . htmlspecialchars($b['first_name'] . ' ' . $b['last_name']) . '</strong>
                    <span>' . htmlspecialchars($b['email']) . ' · ' . htmlspecialchars($b['phone']) . '</span>
                    <span>' . htmlspecialchars($b['path'] . ' / ' . ($b['service_slug'] ?: 'consult')) . '</span>
                    <span>' . htmlspecialchars(($b['preferred_date'] ?: '') . ' ' . ($b['preferred_time'] ?: '')) . '</span>
                    <form method="post" action="/admin/bookings/' . (int) $b['id'] . '">
                        <select name="status">
                            <option' . ($b['status'] === 'pending' ? ' selected' : '') . '>pending</option>
                            <option' . ($b['status'] === 'confirmed' ? ' selected' : '') . '>confirmed</option>
                            <option' . ($b['status'] === 'cancelled' ? ' selected' : '') . '>cancelled</option>
                        </select>
                        <button>Save</button>
                    </form></article>';
            }
            echo '</div><h2>Notes</h2><div class="table">';
            foreach ($enquiries as $e) {
                echo '<article><strong>' . htmlspecialchars($e['name']) . '</strong>
                    <span>' . htmlspecialchars($e['email']) . '</span>
                    <p>' . nl2br(htmlspecialchars($e['message'])) . '</p></article>';
            }
            echo '</div>';
        });
    }

    private static function wrap(string $title, callable $inner): never
    {
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <title>GIGIOR — ' . htmlspecialchars($title) . '</title>
        <style>
            :root{--c:#391b0d;--i:#F6F1E8}
            body{margin:0;background:var(--i);color:var(--c);font-family:Georgia,serif}
            header{display:flex;justify-content:space-between;padding:1.2rem 8vw;border-bottom:1px solid #e4d5c4}
            a{color:var(--c)}
            main{padding:2rem 8vw 4rem;max-width:980px}
            .card,.table article{background:#efe8dc;padding:1.2rem;margin:.6rem 0}
            label{display:block;margin:0 0 1rem}
            input,select,button{font:inherit;color:var(--c);background:var(--i);border:1px solid var(--c);padding:.5rem .7rem}
            button{cursor:pointer}
            .err{color:#7a1f12}
            article{display:grid;gap:.35rem}
        </style></head><body>
        <header><strong>GIGIOR</strong><nav>';
        if (!empty($_SESSION['admin'])) {
            echo '<a href="/admin">The book</a> · <a href="/admin/logout">Leave</a>';
        }
        echo '</nav></header><main><h1>' . htmlspecialchars($title) . '</h1>';
        $inner();
        echo '</main></body></html>';
        exit;
    }
}
