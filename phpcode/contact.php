<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Contact Us';

$mapQuery = urlencode(ORG_ADDRESS . ', ' . ORG_ADDRESS2);
$whatsappUrl = 'https://wa.me/919876543210?text=' . rawurlencode('Hello IWSHA Foundation, I would like to know more about your scholarship programs.');

include __DIR__ . '/includes/header.php';
?>

<div class="contact-page">

  <!-- Page Hero -->
  <section class="page-hero page-hero--short">
    <img src="<?= asset('img/students-library.png') ?>" alt="" class="page-hero-bg" />
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Contact Us</h1>
      <p>Reach us for admissions, scholarships, and welfare support.</p>
    </div>
  </section>

  <!-- Contact Layout -->
  <section class="contact-layout">

    <!-- Info Card -->
    <div class="contact-info-card">
      <img src="<?= asset('img/welfare-scholarship.png') ?>" alt="IWSHA Foundation team" class="contact-photo" loading="lazy" />
      <h2>Get In Touch</h2>
      <ul class="contact-list">
        <li>
          <span>📍</span>
          <div>
            <strong>Office Address</strong>
            <p><?= e(ORG_ADDRESS) ?></p>
            <p><?= e(ORG_ADDRESS2) ?></p>
          </div>
        </li>
        <li>
          <span>📞</span>
          <div>
            <strong>Phone</strong>
            <a href="tel:<?= ORG_PHONE_TEL ?>"><?= e(ORG_PHONE) ?></a>
          </div>
        </li>
        <li>
          <span>✉️</span>
          <div>
            <strong>Email</strong>
            <a href="mailto:<?= ORG_EMAIL ?>"><?= e(ORG_EMAIL) ?></a>
          </div>
        </li>
        <li>
          <span>🕐</span>
          <div>
            <strong>Office Hours</strong>
            <p><?= ORG_HOURS ?></p>
          </div>
        </li>
      </ul>

      <a href="<?= $whatsappUrl ?>" class="contact-whatsapp-btn" target="_blank" rel="noreferrer noopener">
        Chat on WhatsApp
      </a>

      <div class="contact-social">
        <a href="https://facebook.com/iwshafoundation" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://instagram.com/iwshafoundation" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://twitter.com/iwshafoundation" target="_blank" rel="noreferrer">X / Twitter</a>
        <a href="https://youtube.com/@iwshafoundation" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://linkedin.com/company/iwshafoundation" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>

    <!-- Map Card -->
    <div class="contact-map-card">
      <h2>Find Us on Map</h2>
      <p class="map-address"><?= e(ORG_ADDRESS) ?>, <?= e(ORG_ADDRESS2) ?></p>
      <div class="map-wrap">
        <iframe
          title="Office Location"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=<?= $mapQuery ?>&output=embed"
        ></iframe>
      </div>
    </div>

  </section>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
