<?php

declare(strict_types=1);

final class Router
{
    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $path = preg_replace('#^/public#', '', $path) ?: '/';
        $path = rtrim($path, '/') ?: '/';
        $method = strtoupper($method);

        if ($method === 'OPTIONS') {
            http_response_code(204);
            exit;
        }

        try {
            match (true) {
                $method === 'GET' && $path === '/api/nav' => ApiController::nav(),
                $method === 'GET' && $path === '/api/home' => ApiController::home(),
                $method === 'GET' && $path === '/api/services' => ApiController::services(),
                $method === 'GET' && preg_match('#^/api/services/([a-z0-9-]+)/([a-z0-9-]+)$#', $path, $m) => ApiController::service($m[1], $m[2]),
                $method === 'GET' && $path === '/api/practitioners' => ApiController::practitioners(),
                $method === 'GET' && preg_match('#^/api/practitioners/([a-z0-9-]+)$#', $path, $m) => ApiController::practitioner($m[1]),
                $method === 'GET' && $path === '/api/results' => ApiController::results(),
                $method === 'GET' && $path === '/api/locations' => ApiController::locations(),
                $method === 'GET' && preg_match('#^/api/locations/([a-z0-9-]+)$#', $path, $m) => ApiController::location($m[1]),
                $method === 'GET' && $path === '/api/journal' => ApiController::journal(),
                $method === 'GET' && preg_match('#^/api/journal/([a-z0-9-]+)$#', $path, $m) => ApiController::article($m[1]),
                $method === 'GET' && $path === '/api/memberships' => ApiController::memberships(),
                $method === 'GET' && $path === '/api/finder' => ApiController::finder(),
                $method === 'POST' && $path === '/api/bookings' => BookingController::create(),
                $method === 'POST' && $path === '/api/enquiries' => BookingController::enquiry(),
                $method === 'POST' && $path === '/api/subscribe' => BookingController::subscribe(),
                str_starts_with($path, '/admin') => AdminController::handle($method, $path),
                default => Http::error('Not found', 404),
            };
        } catch (Throwable $e) {
            error_log($e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
            Http::error('Server error', 500);
        }
    }
}
