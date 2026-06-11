<?php
// Usage: include with $pageTitle set before including
$pageTitle = $pageTitle ?? 'IWSHA FOUNDATION';
$fullTitle  = $pageTitle . ' | IWSHA Foundation';

// Active nav helper
function navActive(string $path): string {
    $current = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $current = rtrim($current, '/');
    $path    = rtrim($path, '/');
    if ($path === '' || $path === '/index.php') {
        return ($current === '' || $current === '/index.php' || $current === BASE_URL) ? 'active' : '';
    }
    return (str_ends_with($current, $path)) ? 'active' : '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e(ORG_ABOUT_DESC) ?>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= asset('css/site.css') ?>" />
  <link rel="icon" type="image/png" href="<?= asset('img/iwsha-logo.png') ?>" />
</head>
<body>
<div class="app">

<!-- Top bar -->
<div class="header-top">
  <div class="header-top-inner">
    <div class="header-top-left">
      <a href="tel:<?= CONTACT_PHONE_RAW ?>">📞 <?= CONTACT_PHONE ?></a>
      <a href="mailto:<?= CONTACT_EMAIL ?>">✉️ <?= CONTACT_EMAIL ?></a>
    </div>
    <div class="header-top-social">
      <?php foreach ($GLOBALS['socialLinks'] as $s): ?>
        <a href="<?= e($s['url']) ?>" target="_blank" rel="noreferrer"
           class="social-link" aria-label="<?= e($s['name']) ?>"
           style="--sl-color:<?= e($s['color']) ?>"><?= e($s['icon']) ?></a>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<!-- Main header -->
<header class="header">
  <div class="header-inner">
    <a href="<?= url() ?>" class="brand">
      <img src="<?= asset('img/iwsha-logo.png') ?>" alt="IWSHA Foundation" />
      <div class="brand-text">
        <strong><?= ORG_NAME ?></strong>
        <span class="brand-society"><?= ORG_SOCIETY ?></span>
      </div>
    </a>

    <button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" id="menuBtn">
      <span></span><span></span><span></span>
    </button>

    <div class="header-right" id="headerRight">
      <nav class="nav">
        <a href="<?= url() ?>"                   class="<?= navActive('/index.php') ?>">Home</a>
        <a href="<?= url('programs.php') ?>"      class="<?= navActive('/programs.php') ?>">Programs</a>
        <a href="<?= url('scholarships.php') ?>"  class="<?= navActive('/scholarships.php') ?>">Scholarships</a>
        <a href="<?= url('contact.php') ?>"       class="<?= navActive('/contact.php') ?>">Contact</a>
      </nav>
      <div class="header-actions">
        <a href="<?= WHATSAPP_URL ?>" class="btn-whatsapp" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="<?= url('donate.php') ?>" class="btn-donate-header">Donate</a>
      </div>
    </div>
  </div>
</header>

<main class="main">
