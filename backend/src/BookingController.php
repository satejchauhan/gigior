<?php

declare(strict_types=1);

final class BookingController
{
    public static function create(): never
    {
        Http::rateLimit('booking');
        $b = Http::body();
        $first = Http::str($b, 'first_name', 80);
        $email = Http::str($b, 'email', 120);
        $phone = Http::str($b, 'phone', 40);
        if ($first === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === '') {
            Http::error('Please add your name, a valid email, and a telephone number.');
        }

        $st = Database::pdo()->prepare('INSERT INTO bookings (path, service_slug, location_slug, practitioner_slug, preferred_date, preferred_time, first_name, last_name, email, phone, notes, status, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $st->execute([
            Http::str($b, 'path', 40) ?: 'service',
            Http::str($b, 'service_slug', 80) ?: null,
            Http::str($b, 'location_slug', 80) ?: 'the-house',
            Http::str($b, 'practitioner_slug', 80) ?: null,
            Http::str($b, 'preferred_date', 20) ?: null,
            Http::str($b, 'preferred_time', 20) ?: null,
            $first,
            Http::str($b, 'last_name', 80),
            $email,
            $phone,
            Http::str($b, 'notes', 2000),
            'pending',
            gmdate('c'),
        ]);

        Http::ok([
            'id' => (int) Database::pdo()->lastInsertId(),
            'message' => 'GIGIOR has your request. A note will follow — a time is held once we write back.',
        ]);
    }

    public static function enquiry(): never
    {
        Http::rateLimit('enquiry');
        $b = Http::body();
        $name = Http::str($b, 'name', 80);
        $email = Http::str($b, 'email', 120);
        $message = Http::str($b, 'message', 4000);
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
            Http::error('Please add your name, email, and a message.');
        }
        $st = Database::pdo()->prepare('INSERT INTO enquiries (name, email, phone, reason, message, created_at) VALUES (?,?,?,?,?,?)');
        $st->execute([
            $name,
            $email,
            Http::str($b, 'phone', 40),
            Http::str($b, 'reason', 40),
            $message,
            gmdate('c'),
        ]);
        Http::ok(['message' => 'GIGIOR has your note.']);
    }

    public static function subscribe(): never
    {
        Http::rateLimit('subscribe');
        $b = Http::body();
        $email = Http::str($b, 'email', 120);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Http::error('Enter a valid email address.');
        }
        try {
            $st = Database::pdo()->prepare('INSERT INTO subscribers (email, created_at) VALUES (?, ?)');
            $st->execute([$email, gmdate('c')]);
        } catch (PDOException) {
            Http::ok(['message' => 'You are already on the list.']);
        }
        Http::ok(['message' => 'You are on the list.']);
    }
}
