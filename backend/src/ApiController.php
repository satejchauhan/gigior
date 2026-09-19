<?php

declare(strict_types=1);

final class ApiController
{
    public static function nav(): never
    {
        Http::ok([
            'brand' => self::settings(),
            'salon' => self::grouped('salon'),
            'aesthetics' => self::grouped('aesthetics'),
            'locations' => self::locationsList(),
        ]);
    }

    public static function home(): never
    {
        $pdo = Database::pdo();
        Http::ok([
            'brand' => self::settings(),
            'signature' => $pdo->query("SELECT slug, pillar, category, name, benefit, duration_label, price_label, booking_mode, image FROM services WHERE slug IN ('colour','signature-cut','bridal','ritual-facial','pigmentation','expression-lines','laser','makeup') ORDER BY sort")->fetchAll(),
            'split' => [
                'salon' => ['title' => 'Salon', 'line' => 'Hair, styling, and beauty craft', 'chips' => ['Cut', 'Colour', 'Bridal', 'Nails'], 'image' => '/images/split-salon.png'],
                'aesthetics' => ['title' => 'Aesthetics', 'line' => 'Clinically-led skin and facial work', 'chips' => ['Skin', 'Injectables', 'Laser', 'Body'], 'image' => '/images/split-aesthetics.png'],
            ],
            'results' => $pdo->query('SELECT * FROM results ORDER BY sort LIMIT 4')->fetchAll(),
            'practitioners' => $pdo->query('SELECT slug, name, role, specialisation, qualifications, years, image FROM practitioners ORDER BY sort')->fetchAll(),
            'testimonials' => $pdo->query('SELECT * FROM testimonials ORDER BY sort')->fetchAll(),
            'memberships' => $pdo->query('SELECT name, tagline, price_label, perks FROM memberships ORDER BY sort')->fetchAll(),
            'locations' => self::locationsList(),
            'journal' => $pdo->query('SELECT slug, title, excerpt, category, image, published_at FROM articles ORDER BY published_at DESC LIMIT 4')->fetchAll(),
        ]);
    }

    public static function services(): never
    {
        Http::ok([
            'salon' => self::grouped('salon'),
            'aesthetics' => self::grouped('aesthetics'),
            'all' => Database::pdo()->query('SELECT slug, pillar, category, name, short_line, benefit, duration_label, price_label, booking_mode, image FROM services ORDER BY sort')->fetchAll(),
        ]);
    }

    public static function service(string $pillar, string $slug): never
    {
        $st = Database::pdo()->prepare('SELECT * FROM services WHERE pillar = ? AND slug = ?');
        $st->execute([$pillar, $slug]);
        $row = $st->fetch();
        if (!$row) {
            Http::error('Service not found', 404);
        }
        $row['extra'] = json_decode((string) $row['extra'], true);
        $related = Database::pdo()->prepare('SELECT slug, pillar, category, name, benefit, image, booking_mode FROM services WHERE pillar = ? AND slug != ? ORDER BY sort LIMIT 3');
        $related->execute([$pillar, $slug]);
        $people = Database::pdo()->query('SELECT slug, name, role, specialisation, years, image, register_line FROM practitioners ORDER BY sort')->fetchAll();
        $results = Database::pdo()->prepare('SELECT * FROM results WHERE treatment = ? OR pillar = ? LIMIT 4');
        $results->execute([$row['name'], $pillar]);
        Http::ok(['service' => $row, 'related' => $related->fetchAll(), 'practitioners' => $people, 'results' => $results->fetchAll()]);
    }

    public static function practitioners(): never
    {
        Http::ok(Database::pdo()->query('SELECT * FROM practitioners ORDER BY sort')->fetchAll());
    }

    public static function practitioner(string $slug): never
    {
        $st = Database::pdo()->prepare('SELECT * FROM practitioners WHERE slug = ?');
        $st->execute([$slug]);
        $row = $st->fetch();
        $row ? Http::ok($row) : Http::error('Not found', 404);
    }

    public static function results(): never
    {
        $pillar = $_GET['pillar'] ?? '';
        $concern = $_GET['concern'] ?? '';
        $sql = 'SELECT * FROM results WHERE consent = 1';
        $params = [];
        if ($pillar) {
            $sql .= ' AND pillar = ?';
            $params[] = $pillar;
        }
        if ($concern) {
            $sql .= ' AND concern = ?';
            $params[] = $concern;
        }
        $sql .= ' ORDER BY sort';
        $st = Database::pdo()->prepare($sql);
        $st->execute($params);
        $rows = $st->fetchAll();
        $concerns = Database::pdo()->query('SELECT DISTINCT concern FROM results ORDER BY concern')->fetchAll(PDO::FETCH_COLUMN);
        Http::ok(['items' => $rows, 'concerns' => $concerns, 'disclaimer' => self::settings()['disclaimer'] ?? '']);
    }

    public static function locations(): never
    {
        Http::ok(self::locationsList());
    }

    public static function location(string $slug): never
    {
        $st = Database::pdo()->prepare('SELECT * FROM locations WHERE slug = ?');
        $st->execute([$slug]);
        $row = $st->fetch();
        $row ? Http::ok($row) : Http::error('Not found', 404);
    }

    public static function journal(): never
    {
        Http::ok(Database::pdo()->query('SELECT slug, title, excerpt, category, image, published_at FROM articles ORDER BY published_at DESC')->fetchAll());
    }

    public static function article(string $slug): never
    {
        $st = Database::pdo()->prepare('SELECT * FROM articles WHERE slug = ?');
        $st->execute([$slug]);
        $row = $st->fetch();
        $row ? Http::ok($row) : Http::error('Not found', 404);
    }

    public static function memberships(): never
    {
        $rows = Database::pdo()->query('SELECT * FROM memberships ORDER BY sort')->fetchAll();
        foreach ($rows as &$r) {
            $r['perks'] = json_decode((string) $r['perks'], true);
        }
        Http::ok($rows);
    }

    public static function finder(): never
    {
        $concern = strtolower((string) ($_GET['concern'] ?? ''));
        $map = [
            'skin' => ['ritual-facial', 'acne-plan', 'pigmentation', 'rejuvenation'],
            'hair' => ['signature-cut', 'colour', 'hair-treatments', 'hair-restoration'],
            'face' => ['ritual-facial', 'expression-lines', 'facial-balancing', 'makeup'],
            'body' => ['body', 'laser'],
            'ageing' => ['expression-lines', 'facial-balancing', 'rejuvenation'],
            'acne' => ['acne-plan', 'ritual-facial'],
            'pigmentation' => ['pigmentation', 'laser', 'ritual-facial'],
            'hair-loss' => ['hair-restoration', 'hair-treatments'],
            'bridal-prep' => ['bridal', 'makeup', 'colour', 'nails'],
        ];
        $slugs = $map[$concern] ?? [];
        if (!$slugs) {
            Http::ok(['concern' => $concern, 'items' => []]);
        }
        $in = implode(',', array_fill(0, count($slugs), '?'));
        $st = Database::pdo()->prepare("SELECT slug, pillar, category, name, benefit, booking_mode, image FROM services WHERE slug IN ($in) ORDER BY sort");
        $st->execute($slugs);
        Http::ok(['concern' => $concern, 'items' => $st->fetchAll()]);
    }

    private static function settings(): array
    {
        $rows = Database::pdo()->query('SELECT key, value FROM settings')->fetchAll();
        $out = [];
        foreach ($rows as $r) {
            $out[$r['key']] = $r['value'];
        }
        return $out;
    }

    private static function grouped(string $pillar): array
    {
        $st = Database::pdo()->prepare('SELECT slug, pillar, category, name, short_line, benefit, booking_mode, image FROM services WHERE pillar = ? ORDER BY sort');
        $st->execute([$pillar]);
        $groups = [];
        foreach ($st->fetchAll() as $row) {
            $groups[$row['category']][] = $row;
        }
        return $groups;
    }

    private static function locationsList(): array
    {
        return Database::pdo()->query('SELECT slug, name, neighbourhood, address, hours, phone, whatsapp, image FROM locations ORDER BY sort')->fetchAll();
    }

}
