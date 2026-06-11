<?php
require_once dirname(__DIR__) . '/includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('contact.php');
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    flash('contact_error', 'Name, email and message are required.');
    redirect('contact.php');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    flash('contact_error', 'Please enter a valid email address.');
    redirect('contact.php');
}

$messages = jsonRead('messages.json');
$messages[] = [
    'id'           => 'msg_' . uniqid(),
    'name'         => $name,
    'email'        => $email,
    'phone'        => $phone,
    'subject'      => $subject,
    'message'      => $message,
    'status'       => 'new',
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip'           => $_SERVER['REMOTE_ADDR'] ?? '',
];
jsonWrite('messages.json', $messages);

// Optional: mail(CONTACT_EMAIL, 'New Contact Message: ' . $subject, "$name\n$email\n\n$message");

flash('contact_success', 'Thank you, ' . $name . '! Your message has been received. We\'ll get back to you shortly.');
redirect('contact.php');
