<?php
require_once __DIR__ . '/config.php';

function isAdminLoggedIn(): bool {
    return !empty($_SESSION[ADMIN_SESSION_KEY]);
}

function requireAdmin(): void {
    if (!isAdminLoggedIn()) {
        $back = urlencode($_SERVER['REQUEST_URI'] ?? '');
        header('Location: ' . BASE_URL . '/admin/login.php?redirect=' . $back);
        exit;
    }
}

function adminLogin(string $username, string $password): bool {
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION[ADMIN_SESSION_KEY] = [
            'username'  => $username,
            'logged_at' => time(),
        ];
        return true;
    }
    return false;
}

function adminLogout(): void {
    unset($_SESSION[ADMIN_SESSION_KEY]);
    session_destroy();
}
