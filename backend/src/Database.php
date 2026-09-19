<?php

declare(strict_types=1);

final class Database
{
    private static ?PDO $pdo = null;
    private static array $config = [];

    public static function boot(array $config): void
    {
        self::$config = $config;
        $dir = dirname($config['db_path']);
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        $pdo = new PDO('sqlite:' . $config['db_path']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->exec('PRAGMA foreign_keys = ON');
        $pdo->exec('PRAGMA journal_mode = WAL');
        self::$pdo = $pdo;
        self::migrate();
    }

    public static function pdo(): PDO
    {
        if (!self::$pdo) {
            throw new RuntimeException('Database not booted');
        }
        return self::$pdo;
    }

    public static function config(?string $key = null): mixed
    {
        return $key === null ? self::$config : (self::$config[$key] ?? null);
    }

    private static function migrate(): void
    {
        self::$pdo->exec(<<<SQL
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pillar TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_line TEXT NOT NULL,
  benefit TEXT NOT NULL,
  overview TEXT NOT NULL,
  duration_label TEXT,
  price_from INTEGER,
  price_label TEXT,
  booking_mode TEXT NOT NULL DEFAULT 'direct',
  image TEXT,
  sort INTEGER DEFAULT 0,
  extra TEXT
);
CREATE TABLE IF NOT EXISTS practitioners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialisation TEXT,
  qualifications TEXT,
  years INTEGER,
  bio TEXT,
  image TEXT,
  register_line TEXT,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  treatment TEXT NOT NULL,
  concern TEXT NOT NULL,
  pillar TEXT NOT NULL,
  description TEXT,
  timeline TEXT,
  practitioner TEXT,
  before_image TEXT,
  after_image TEXT,
  guest_label TEXT,
  consent INTEGER DEFAULT 1,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  city TEXT,
  treatment TEXT,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  neighbourhood TEXT,
  address TEXT,
  hours TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  image TEXT,
  parking TEXT,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  category TEXT,
  image TEXT,
  published_at TEXT
);
CREATE TABLE IF NOT EXISTS memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  tagline TEXT,
  price_label TEXT,
  perks TEXT,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  service_slug TEXT,
  location_slug TEXT,
  practitioner_slug TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  reason TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);
SQL);
    }
}
