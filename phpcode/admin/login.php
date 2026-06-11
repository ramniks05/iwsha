<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';

// Already logged in → go to dashboard
if (isAdminLoggedIn()) {
    header('Location: ' . BASE_URL . '/admin/dashboard.php');
    exit;
}

$error    = '';
$redirect = $_GET['redirect'] ?? (BASE_URL . '/admin/dashboard.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['username'] ?? '');
    $pass = $_POST['password'] ?? '';
    if ($user === '' || $pass === '') {
        $error = 'Please enter both username and password.';
    } elseif (!adminLogin($user, $pass)) {
        $error = 'Invalid username or password. Please try again.';
    } else {
        header('Location: ' . $redirect);
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login | IWSHA Foundation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/site.css" />
  <link rel="icon" type="image/png" href="<?= BASE_URL ?>/assets/img/iwsha-logo.png" />
</head>
<body>
<div class="admin-login-page">
  <div class="admin-login-bg" aria-hidden="true">
    <div class="admin-login-orb admin-login-orb--1"></div>
    <div class="admin-login-orb admin-login-orb--2"></div>
    <div class="admin-login-orb admin-login-orb--3"></div>
  </div>

  <div class="admin-login-card">
    <div class="admin-login-logo">
      <img src="<?= BASE_URL ?>/assets/img/iwsha-logo.png" alt="IWSHA Foundation" />
      <div>
        <strong>IWSHA FOUNDATION</strong>
        <span>Admin Panel</span>
      </div>
    </div>
    <div class="admin-login-divider"></div>
    <h1 class="admin-login-title">Sign in to Admin</h1>
    <p class="admin-login-sub">Manage universities, forms, and content.</p>

    <?php if ($error): ?>
    <div class="admin-login-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg>
      <?= e($error) ?>
    </div>
    <?php endif; ?>

    <form method="POST" class="admin-login-form" novalidate>
      <input type="hidden" name="redirect" value="<?= e($redirect) ?>" />

      <div class="admin-login-field">
        <label for="username">Username</label>
        <div class="admin-login-input-wrap">
          <span class="admin-login-input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke-linecap="round"/></svg>
          </span>
          <input id="username" name="username" type="text" autocomplete="username"
            placeholder="Enter username" value="<?= e($_POST['username'] ?? '') ?>" required />
        </div>
      </div>

      <div class="admin-login-field">
        <label for="password">Password</label>
        <div class="admin-login-input-wrap">
          <span class="admin-login-input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4" stroke-linecap="round"/></svg>
          </span>
          <input id="password" name="password" type="password" autocomplete="current-password"
            placeholder="Enter password" required />
          <button type="button" class="admin-login-pw-toggle" id="pwToggle" aria-label="Show password">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" id="eyeIcon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <button type="submit" class="admin-login-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Sign In
      </button>
    </form>

    <p class="admin-login-hint">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4" stroke-linecap="round"/></svg>
      Credentials are managed by your site administrator.
    </p>
  </div>
</div>
<script>
  const btn = document.getElementById('pwToggle');
  const inp = document.getElementById('password');
  if (btn && inp) {
    btn.addEventListener('click', () => {
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  }
</script>
</body>
</html>
