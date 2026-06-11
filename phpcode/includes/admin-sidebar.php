<?php
// Usage: include at the top of every admin page after requireAdmin()
$adminPageTitle = $adminPageTitle ?? 'Admin';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= e($adminPageTitle) ?> | IWSHA Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/site.css" />
  <link rel="icon" type="image/png" href="<?= BASE_URL ?>/assets/img/iwsha-logo.png" />
</head>
<body>
<div class="admin-layout">

  <!-- Sidebar -->
  <aside class="admin-sidebar">
    <div class="admin-sidebar-logo">
      <img src="<?= BASE_URL ?>/assets/img/iwsha-logo.png" alt="IWSHA" />
      <div>
        <strong>IWSHA</strong>
        <span>Admin Panel</span>
      </div>
    </div>

    <nav class="admin-sidebar-nav">
      <?php
      $adminNav = [
          ['href' => BASE_URL . '/admin/dashboard.php',   'label' => 'Dashboard',     'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'],
          ['href' => BASE_URL . '/admin/universities.php', 'label' => 'Universities',  'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
          ['href' => BASE_URL . '/admin/form-builder.php', 'label' => 'Form Builder',  'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h5M7 13h8M7 17h4" stroke-linecap="round"/></svg>'],
          ['href' => BASE_URL . '/admin/applications.php', 'label' => 'Applications',  'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round"/></svg>'],
          ['href' => BASE_URL . '/admin/messages.php',     'label' => 'Messages',      'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'],
      ];
      $currentFile = basename($_SERVER['PHP_SELF']);
      foreach ($adminNav as $item):
          $itemFile = basename($item['href']);
          $isActive = ($itemFile === $currentFile) ? 'admin-sidebar-link--active' : '';
      ?>
      <a href="<?= $item['href'] ?>" class="admin-sidebar-link <?= $isActive ?>">
        <?= $item['icon'] ?>
        <?= $item['label'] ?>
      </a>
      <?php endforeach; ?>
    </nav>

    <div class="admin-sidebar-footer">
      <a href="<?= BASE_URL ?>/" target="_blank" rel="noreferrer" class="admin-sidebar-site-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke-linecap="round"/></svg>
        View Site
      </a>
      <a href="<?= BASE_URL ?>/admin/logout.php" class="admin-sidebar-logout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Sign Out
      </a>
    </div>
  </aside>

  <!-- Main content -->
  <div class="admin-layout-main">
