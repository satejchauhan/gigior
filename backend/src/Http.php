<?php

declare(strict_types=1);

final class Http
{
    public static function json(mixed $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function ok(mixed $data = null): never
    {
        self::json(['ok' => true, 'data' => $data]);
    }

    public static function error(string $message, int $status = 400): never
    {
        self::json(['ok' => false, 'error' => $message], $status);
    }

    public static function body(): array
    {
        $raw = file_get_contents('php://input') ?: '';
        $json = json_decode($raw, true);
        if (is_array($json)) {
            return $json;
        }
        return $_POST;
    }

    public static function str(array $data, string $key, int $max = 500): string
    {
        $value = trim((string) ($data[$key] ?? ''));
        $value = strip_tags($value);
        return mb_substr($value, 0, $max);
    }

    public static function rateLimit(string $bucket): void
    {
        $dir = dirname(Database::config('db_path')) . '/ratelimit';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0';
        $file = $dir . '/' . hash('sha256', $bucket . $ip) . '.json';
        $now = time();
        $window = (int) Database::config('rate_limit_window');
        $max = (int) Database::config('rate_limit_max');
        $hits = [];
        if (is_file($file)) {
            $hits = json_decode((string) file_get_contents($file), true) ?: [];
        }
        $hits = array_values(array_filter($hits, static fn ($t) => $now - (int) $t < $window));
        if (count($hits) >= $max) {
            self::error('Please wait a moment before sending again.', 429);
        }
        $hits[] = $now;
        file_put_contents($file, json_encode($hits));
    }
}
