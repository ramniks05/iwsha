<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();

$messages = jsonRead('messages.json');
$success  = flash('msg_success');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['mark_id'])) {
    foreach ($messages as &$m) {
        if ($m['id'] === $_POST['mark_id']) $m['status'] = 'read';
    }
    unset($m);
    jsonWrite('messages.json', $messages);
    flash('msg_success', 'Message marked as read.');
    header('Location: ' . BASE_URL . '/admin/messages.php'); exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $messages = array_values(array_filter($messages, fn($m) => $m['id'] !== $_POST['delete_id']));
    jsonWrite('messages.json', $messages);
    flash('msg_success', 'Message deleted.');
    header('Location: ' . BASE_URL . '/admin/messages.php'); exit;
}

$display = array_reverse($messages);
$adminPageTitle = 'Messages';
include dirname(__DIR__) . '/includes/admin-sidebar.php';
?>

<div class="admin-inner-page">
  <div class="admin-inner-header">
    <div>
      <h1>Contact Messages</h1>
      <p>Messages submitted through the Contact Us page.</p>
    </div>
    <a href="<?= BASE_URL ?>/contact.php" target="_blank" rel="noreferrer" class="admin-back-btn">Contact Page ↗</a>
  </div>

  <div class="admin-body">

    <?php if ($success): ?>
    <div class="form-alert form-alert--success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 15.01 9 12.01"/></svg><?= e($success) ?></div>
    <?php endif; ?>

    <?php if (empty($display)): ?>
    <div class="admin-empty-state">
      <svg viewBox="0 0 80 80" fill="none" style="width:64px;opacity:.2">
        <path d="M70 15a2 2 0 01-2 2H12l-7 7V15a2 2 0 012-2h63a2 2 0 012 2z" stroke="currentColor" stroke-width="3"/>
      </svg>
      <p>No messages yet.</p>
    </div>
    <?php else: ?>
    <div class="admin-list-card">
      <div class="admin-app-list">
        <?php foreach ($display as $msg):
          $isNew = ($msg['status'] ?? 'new') === 'new';
        ?>
        <div class="admin-app-item <?= $isNew ? 'admin-app-item--new' : '' ?>">
          <div class="admin-app-header">
            <div class="admin-app-name">
              <strong><?= e($msg['name'] ?? 'Unknown') ?></strong>
              <?php if ($isNew): ?><span class="admin-tag admin-tag--new">New</span><?php endif; ?>
              <?php if (!empty($msg['subject'])): ?><span style="font-size:.82rem;color:var(--muted);margin-left:.5rem"><?= e($msg['subject']) ?></span><?php endif; ?>
            </div>
            <div class="admin-app-meta">
              <span>📅 <?= e(date('d M Y, H:i', strtotime($msg['submitted_at'] ?? 'now'))) ?></span>
              <?php if (!empty($msg['email'])): ?><span>✉ <?= e($msg['email']) ?></span><?php endif; ?>
            </div>
          </div>
          <?php if (!empty($msg['message'])): ?>
          <div class="admin-app-reason"><?= e($msg['message']) ?></div>
          <?php endif; ?>
          <div class="admin-app-actions">
            <?php if ($isNew): ?>
            <form method="POST" style="display:inline">
              <input type="hidden" name="mark_id" value="<?= e($msg['id']) ?>" />
              <button type="submit" class="admin-action-btn admin-action-btn--active">✓ Mark Read</button>
            </form>
            <?php endif; ?>
            <a href="mailto:<?= e($msg['email'] ?? '') ?>" class="admin-action-btn">✉ Reply</a>
            <form method="POST" style="display:inline" onsubmit="return confirm('Delete this message?')">
              <input type="hidden" name="delete_id" value="<?= e($msg['id']) ?>" />
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
