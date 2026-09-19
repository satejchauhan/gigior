<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$config = require $root . '/config.php';

spl_autoload_register(static function (string $class) use ($root): void {
    $file = $root . '/src/' . str_replace('\\', '/', $class) . '.php';
    if (is_file($file)) {
        require $file;
    }
});

Database::boot($config);
Seed::run();

$router = new Router();
$router->dispatch($_SERVER['REQUEST_METHOD'] ?? 'GET', $_SERVER['REQUEST_URI'] ?? '/');
