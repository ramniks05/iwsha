<?php
// ── Site Configuration ──────────────────────────────────────────────────
define('SITE_ROOT', dirname(__DIR__));
define('DATA_DIR',  SITE_ROOT . '/data/');

// Determine base URL dynamically
$protocol  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host      = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/');
// Strip /admin sub-path so BASE_URL is always the phpcode root
$base = preg_replace('#/admin(/.*)?$#', '', $scriptDir);
define('BASE_URL', $protocol . '://' . $host . $base);

// ── Organization ────────────────────────────────────────────────────────
define('ORG_NAME',       'IWSHA FOUNDATION');
define('ORG_SOCIETY',    'International Welfare Society for Human Affability');
define('ORG_REG',        'Reg. No. 0577/16');
define('ORG_HERO_DESC',  'Scholarships and guidance for ambitious students pursuing education in India and across the globe.');
define('ORG_ABOUT_DESC', 'IWSHA FOUNDATION empowers underserved students through scholarships, mentorship, and admission support — helping them pursue education in India and abroad.');
define('ORG_FOOTER_MISSION', 'Dedicated to catalyzing transformative change through scholarships, donor support, and welfare guidance for students pursuing education in India and across the globe.');

// ── Contact ─────────────────────────────────────────────────────────────
define('CONTACT_PHONE',     '+91 98765 43210');
define('CONTACT_PHONE_RAW', '919876543210');
define('CONTACT_EMAIL',     'support@iwshafoundation.org');
define('CONTACT_ADDRESS',   'G-33, Indira Deep Complex, Lucknow');
define('CONTACT_ADDR2',     'Uttar Pradesh, India');
define('CONTACT_HOURS',     'Mon – Sat, 9:30 AM – 6:30 PM');
define('WHATSAPP_URL',      'https://wa.me/message/2KPHVMI2QG6SK1');

// Aliases for templates
define('ORG_PHONE',     CONTACT_PHONE);
define('ORG_PHONE_TEL', CONTACT_PHONE_RAW);
define('ORG_EMAIL',     CONTACT_EMAIL);
define('ORG_ADDRESS',   CONTACT_ADDRESS);
define('ORG_ADDRESS2',  CONTACT_ADDR2);
define('ORG_HOURS',     CONTACT_HOURS);

// ── Payment ──────────────────────────────────────────────────────────────
define('ORG_UPI_ID',    'iwsha@upi');
define('ORG_BANK_NAME', 'State Bank of India');
define('ORG_ACCOUNT',   'XXXX-XXXX-1234');
define('ORG_IFSC',      'SBIN0001234');

// ── Admin Credentials (swap with DB/env later) ──────────────────────────
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'iwsha@2024');
define('ADMIN_SESSION_KEY', 'iwsha_admin');

// ── Social links ─────────────────────────────────────────────────────────
$GLOBALS['socialLinks'] = [
    ['name' => 'Facebook',  'url' => 'https://www.facebook.com/share/1G7yPU4hfY/', 'icon' => 'f',  'color' => '#1877f2'],
    ['name' => 'Instagram', 'url' => 'https://www.instagram.com/iwshatrust',        'icon' => 'ig', 'color' => '#e4405f'],
    ['name' => 'X',         'url' => 'https://x.com/iwshatrust',                    'icon' => 'X',  'color' => '#000'],
    ['name' => 'YouTube',   'url' => 'https://youtube.com',                          'icon' => '▶', 'color' => '#ff0000'],
    ['name' => 'LinkedIn',  'url' => 'https://linkedin.com',                         'icon' => 'in', 'color' => '#0a66c2'],
];

// ── Helpers ──────────────────────────────────────────────────────────────
function url(string $path = ''): string {
    return BASE_URL . '/' . ltrim($path, '/');
}

function asset(string $path): string {
    return BASE_URL . '/assets/' . ltrim($path, '/');
}

function e(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function slugify(string $str): string {
    return trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($str)), '-');
}

function jsonRead(string $file): array {
    $path = DATA_DIR . $file;
    if (!file_exists($path)) return [];
    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

function jsonWrite(string $file, array $data): bool {
    $path = DATA_DIR . $file;
    return file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
}

function redirect(string $path): void {
    header('Location: ' . url($path));
    exit;
}

function flash(string $key, string $msg = ''): string {
    if ($msg !== '') {
        $_SESSION['flash'][$key] = $msg;
        return '';
    }
    $val = $_SESSION['flash'][$key] ?? '';
    unset($_SESSION['flash'][$key]);
    return $val;
}

session_start();
