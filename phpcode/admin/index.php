<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();
header('Location: ' . BASE_URL . '/admin/dashboard.php');
exit;
