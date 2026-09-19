<?php

declare(strict_types=1);

return [
    'app_name' => 'GIGIOR',
    'env' => 'local',
    'db_path' => __DIR__ . '/storage/gigior.db',
    'admin_email' => 'house@gigior.local',
    'admin_password' => 'GigiorHouse1',
    'session_name' => 'gigior_admin',
    'cors_origin' => 'http://localhost:5173',
    'mail_to' => 'house@gigior.local',
    'rate_limit_window' => 300,
    'rate_limit_max' => 8,
];
