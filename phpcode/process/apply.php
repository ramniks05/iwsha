<?php
require_once dirname(__DIR__) . '/includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('apply.php');
}

// Load enabled fields to know which ones to capture
$fieldConfig = jsonRead('form-config.json');
$fields = array_filter($fieldConfig, fn($f) => $f['enabled'] ?? true);

$data = [];
$errors = [];

foreach ($fields as $f) {
    $id    = $f['id'];
    $value = trim($_POST[$id] ?? '');
    if (($f['required'] ?? false) && $value === '') {
        $errors[] = $f['label'] . ' is required.';
    }
    $data[$id] = $value;
}

if (!empty($errors)) {
    flash('apply_error', implode(' | ', $errors));
    redirect('apply.php');
}

// Basic email validation
$email = $data['email'] ?? '';
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    flash('apply_error', 'Please enter a valid email address.');
    redirect('apply.php');
}

// Save application
$applications = jsonRead('applications.json');
$application  = array_merge($data, [
    'id'           => 'app_' . uniqid(),
    'status'       => 'new',
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip'           => $_SERVER['REMOTE_ADDR'] ?? '',
]);
$applications[] = $application;
jsonWrite('applications.json', $applications);

// Optional: send notification email (uncomment & configure SMTP to enable)
// mail(CONTACT_EMAIL, 'New Scholarship Application', json_encode($data, JSON_PRETTY_PRINT));

flash('apply_success', 'Thank you, ' . ($data['studentName'] ?? 'student') . '! Your application has been submitted. Our team will contact you within 7–10 working days.');
redirect('apply.php');
