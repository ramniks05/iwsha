<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Scholarships & Donations';
include __DIR__ . '/includes/header.php';
?>

<div class="scholarships-page">

  <!-- Page Hero -->
  <section class="page-hero page-hero--short">
    <img src="<?= asset('img/graduation-success.png') ?>" alt="" class="page-hero-bg" />
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Scholarships &amp; Donations</h1>
      <p>Financial support for students and a way for kind hearts to give back — together we empower futures.</p>
    </div>
  </section>

  <!-- Hub Cards -->
  <div class="scholarships-hub-grid">
    <a href="<?= url('apply.php') ?>" class="scholarships-hub-card">
      <span class="scholarships-hub-card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="48" height="48">
          <path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/>
          <path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/>
        </svg>
      </span>
      <h2>Apply for Scholarship</h2>
      <p>Submit your application for financial support to pursue your dream of education in India or abroad.</p>
      <span class="scholarships-hub-card-link">Start Application →</span>
    </a>

    <a href="<?= url('donate.php') ?>" class="scholarships-hub-card scholarships-hub-card--donate">
      <span class="scholarships-hub-card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="48" height="48">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </span>
      <h2>Make a Donation</h2>
      <p>Support underserved students with a secure UPI donation. Every rupee creates an opportunity for a brighter future.</p>
      <span class="scholarships-hub-card-link">Donate Now →</span>
    </a>
  </div>

</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
