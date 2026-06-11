<?php
require_once dirname(__DIR__) . '/includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('donate.php');
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$amount  = trim($_POST['amount'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $amount === '') {
    flash('donate_error', 'Name, email and amount are required.');
    redirect('donate.php');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    flash('donate_error', 'Please enter a valid email address.');
    redirect('donate.php');
}

// Save donation record alongside messages
$messages = jsonRead('messages.json');
$messages[] = [
    'id'           => 'donation_' . uniqid(),
    'name'         => $name,
    'email'        => $email,
    'phone'        => $phone,
    'subject'      => 'Donation — ₹' . $amount,
    'message'      => $message,
    'amount'       => $amount,
    'type'         => 'donation',
    'status'       => 'new',
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip'           => $_SERVER['REMOTE_ADDR'] ?? '',
];
jsonWrite('messages.json', $messages);

flash('donate_success', 'Thank you for your generous donation, ' . $name . '! Please complete payment via UPI/bank transfer and confirm with us on WhatsApp.');
redirect('donate.php');
