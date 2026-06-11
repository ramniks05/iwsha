<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
adminLogout();
header('Location: ' . BASE_URL . '/admin/login.php');
exit;
