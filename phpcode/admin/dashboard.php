<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();

$universities   = jsonRead('universities.json');
$fields         = jsonRead('form-config.json');
$applications   = jsonRead('applications.json');
$messages       = jsonRead('messages.json');

$customUnis     = array_filter($universities, fn($u) => !($u['isDefault'] ?? false));
$activeFields   = array_filter($fields,       fn($f) => $f['enabled'] ?? true);
$newApps        = array_filter($applications, fn($a) => ($a['status'] ?? 'new') === 'new');
$newMsgs        = array_filter($messages,     fn($m) => ($m['status'] ?? 'new') === 'new');

$adminPageTitle = 'Dashboard';
include dirname(__DIR__) . '/includes/admin-sidebar.php';
?>

<div class="admin-inner-page">
  <div class="admin-inner-header">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, <?= e($_SESSION[ADMIN_SESSION_KEY]['username'] ?? 'Admin') ?>. Here's a quick overview.</p>
    </div>
  </div>

  <div class="admin-body">

    <!-- Stats -->
    <div class="admin-dash-stats">
      <a href="<?= BASE_URL ?>/admin/universities.php" class="admin-dash-card admin-dash-card--blue">
        <span class="admin-dash-card-icon">🎓</span>
        <strong><?= count($universities) ?></strong>
        <span>Universities Listed</span>
        <span class="admin-dash-card-arrow">→</span>
      </a>
      <a href="<?= BASE_URL ?>/admin/form-builder.php" class="admin-dash-card admin-dash-card--green">
        <span class="admin-dash-card-icon">📋</span>
        <strong><?= count($activeFields) ?></strong>
        <span>Active Form Fields</span>
        <span class="admin-dash-card-arrow">→</span>
      </a>
      <a href="<?= BASE_URL ?>/admin/applications.php" class="admin-dash-card admin-dash-card--orange">
        <span class="admin-dash-card-icon">📩</span>
        <strong><?= count($applications) ?></strong>
        <span>Applications <small>(<?= count($newApps) ?> new)</small></span>
        <span class="admin-dash-card-arrow">→</span>
      </a>
      <a href="<?= BASE_URL ?>/admin/messages.php" class="admin-dash-card admin-dash-card--navy">
        <span class="admin-dash-card-icon">💬</span>
        <strong><?= count($messages) ?></strong>
        <span>Messages <small>(<?= count($newMsgs) ?> new)</small></span>
        <span class="admin-dash-card-arrow">→</span>
      </a>
    </div>

    <!-- Quick Actions -->
    <div class="admin-list-card">
      <h2 class="admin-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/><path d="M13 2v7h7" stroke-linecap="round"/></svg>
        Quick Actions
      </h2>
      <div class="admin-dash-links">
        <?php
        $links = [
          ['href'=>BASE_URL.'/admin/universities.php',  'label'=>'Manage Universities',      'desc'=>'Add, edit or remove university listings on the Programs page.'],
          ['href'=>BASE_URL.'/admin/form-builder.php',  'label'=>'Build Scholarship Form',   'desc'=>'Add, reorder or disable fields on the application form.'],
          ['href'=>BASE_URL.'/admin/applications.php',  'label'=>'View Applications',        'desc'=>'Review scholarship applications submitted by students.'],
          ['href'=>BASE_URL.'/admin/messages.php',      'label'=>'View Messages',            'desc'=>'Read contact form submissions from the public site.'],
          ['href'=>BASE_URL.'/',                        'label'=>'Preview Public Site',      'desc'=>'Open the live site to see how it looks to visitors.'],
        ];
        foreach ($links as $lk): ?>
        <a href="<?= $lk['href'] ?>" class="admin-dash-link" <?= str_starts_with($lk['href'], BASE_URL . '/') && !str_contains($lk['href'], '/admin/') ? 'target="_blank" rel="noreferrer"' : '' ?>>
          <div>
            <strong><?= e($lk['label']) ?></strong>
            <p><?= e($lk['desc']) ?></p>
          </div>
          <span class="admin-dash-link-arrow">→</span>
        </a>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Info note -->
    <div class="admin-dash-note">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg>
      <p>All data is stored as JSON files in <code>phpcode/data/</code>. To connect a MySQL database, update the <code>jsonRead()</code> / <code>jsonWrite()</code> helpers in <code>includes/config.php</code>.</p>
    </div>

  </div>
</div>

<?php include dirname(__DIR__) . '/includes/admin-footer.php'; ?>
