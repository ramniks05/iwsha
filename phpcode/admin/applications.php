<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();

$applications = jsonRead('applications.json');
$success = flash('app_success');

// Mark as reviewed
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['mark_id'])) {
    $id = $_POST['mark_id'];
    foreach ($applications as &$a) {
        if ($a['id'] === $id) $a['status'] = 'reviewed';
    }
    unset($a);
    jsonWrite('applications.json', $applications);
    flash('app_success', 'Application marked as reviewed.');
    header('Location: ' . BASE_URL . '/admin/applications.php'); exit;
}

// Delete
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $applications = array_values(array_filter($applications, fn($a) => $a['id'] !== $_POST['delete_id']));
    jsonWrite('applications.json', $applications);
    flash('app_success', 'Application deleted.');
    header('Location: ' . BASE_URL . '/admin/applications.php'); exit;
}

// Filter
$filter = $_GET['status'] ?? 'all';
$display = $filter === 'new' ? array_filter($applications, fn($a) => ($a['status'] ?? 'new') === 'new') : $applications;
$display = array_reverse($display); // newest first

$adminPageTitle = 'Applications';
include dirname(__DIR__) . '/includes/admin-sidebar.php';
?>

<div class="admin-inner-page">
  <div class="admin-inner-header">
    <div>
      <h1>Scholarship Applications</h1>
      <p>Review, manage and respond to student applications submitted via the website.</p>
    </div>
    <a href="<?= BASE_URL ?>/apply.php" target="_blank" rel="noreferrer" class="admin-back-btn">View Form ↗</a>
  </div>

  <div class="admin-body">

    <?php if ($success): ?>
    <div class="form-alert form-alert--success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 15.01 9 12.01"/></svg><?= e($success) ?></div>
    <?php endif; ?>

    <!-- Filter tabs -->
    <div class="admin-filter-tabs">
      <a href="?status=all"  class="admin-filter-tab <?= $filter === 'all' ? 'active' : '' ?>">All (<?= count($applications) ?>)</a>
      <a href="?status=new"  class="admin-filter-tab <?= $filter === 'new' ? 'active' : '' ?>">New (<?= count(array_filter($applications, fn($a) => ($a['status']??'new') === 'new')) ?>)</a>
    </div>

    <?php if (empty($display)): ?>
    <div class="admin-empty-state">
      <svg viewBox="0 0 80 80" fill="none" style="width:64px;opacity:.2">
        <rect x="15" y="10" width="50" height="60" rx="6" stroke="currentColor" stroke-width="3"/>
        <path d="M25 30h30M25 42h20M25 54h15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <p>No applications yet.</p>
    </div>
    <?php else: ?>
    <div class="admin-list-card">
      <div class="admin-app-list">
        <?php foreach ($display as $app):
          $isNew = ($app['status'] ?? 'new') === 'new';
        ?>
        <div class="admin-app-item <?= $isNew ? 'admin-app-item--new' : '' ?>">
          <div class="admin-app-header">
            <div class="admin-app-name">
              <strong><?= e($app['studentName'] ?? $app['name'] ?? 'Unknown') ?></strong>
              <?php if ($isNew): ?><span class="admin-tag admin-tag--new">New</span><?php endif; ?>
            </div>
            <div class="admin-app-meta">
              <span>📅 <?= e(date('d M Y, H:i', strtotime($app['submitted_at'] ?? 'now'))) ?></span>
              <?php if (!empty($app['destination'])): ?><span>🌍 <?= e($app['destination']) ?></span><?php endif; ?>
            </div>
          </div>
          <div class="admin-app-fields">
            <?php
            $showFields = ['email','phone','age','guardian','education','income'];
            foreach ($showFields as $key) {
                if (!empty($app[$key])) echo '<span><strong>' . e(ucfirst($key)) . ':</strong> ' . e($app[$key]) . '</span>';
            }
            ?>
          </div>
          <?php if (!empty($app['reason'])): ?>
          <div class="admin-app-reason">
            <strong>Reason:</strong> <?= e($app['reason']) ?>
          </div>
          <?php endif; ?>
          <div class="admin-app-actions">
            <?php if ($isNew): ?>
            <form method="POST" style="display:inline">
              <input type="hidden" name="mark_id" value="<?= e($app['id']) ?>" />
              <button type="submit" class="admin-action-btn admin-action-btn--active">✓ Mark Reviewed</button>
            </form>
            <?php endif; ?>
            <a href="mailto:<?= e($app['email'] ?? '') ?>" class="admin-action-btn">✉ Reply</a>
            <form method="POST" style="display:inline" onsubmit="return confirm('Delete this application?')">
              <input type="hidden" name="delete_id" value="<?= e($app['id']) ?>" />
              <button type="submit" class="admin-delete-btn">Delete</button>
            </form>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
  </div>
</div>

<?php include dirname(__DIR__) . '/includes/admin-footer.php'; ?>
