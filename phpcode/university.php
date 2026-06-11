<?php
require_once __DIR__ . '/includes/config.php';
$universities = jsonRead('universities.json');
$slug = trim($_GET['slug'] ?? '');
$uni  = null;
foreach ($universities as $u) {
    if ($u['slug'] === $slug) { $uni = $u; break; }
}

$uniImages = [
  'eth-zurich'    => 'country-switzerland.png',
  'unibo'         => 'country-italy.png',
  'uoft'          => 'canada.jpg',
  'cal-hub'       => 'california.jpg',
  'ku-leuven'     => 'belgium.jpg',
  'indian-assist' => 'india-university.jpg',
];

if (!$uni) {
    $pageTitle = 'Not Found';
    include __DIR__ . '/includes/header.php';
    ?>
    <div class="uni-detail-notfound">
      <div class="uni-detail-notfound-inner">
        <span class="uni-detail-notfound-icon">🎓</span>
        <h2>University Not Found</h2>
        <p>The university you are looking for does not exist or has been removed.</p>
        <a href="<?= url('programs.php') ?>" class="btn btn-primary">← Back to Programs</a>
      </div>
    </div>
    <?php
    include __DIR__ . '/includes/footer.php';
    exit;
}

$heroImg  = $uni['image'] ?? ($uniImages[$uni['slug']] ?? null);
$applyLink = url('apply.php');
$pageTitle = e($uni['name']);
include __DIR__ . '/includes/header.php';
?>

<div class="uni-detail-page">

  <!-- Hero -->
  <div class="uni-detail-hero">
    <?php if ($heroImg): ?>
    <img src="<?= asset('img/' . $heroImg) ?>" alt="<?= e($uni['name']) ?>" class="uni-detail-hero-img" />
    <?php endif; ?>
    <div class="uni-detail-hero-overlay"></div>
    <div class="uni-detail-hero-content">
      <a href="<?= url('programs.php') ?>" class="uni-detail-back">← Back to Programs</a>
      <span class="uni-detail-country-badge"><?= e($uni['countryCode'] ?? '🌍') ?> · <?= e($uni['country']) ?></span>
      <h1><?= e($uni['name']) ?></h1>
      <p class="uni-detail-tagline"><?= e($uni['tagline'] ?? '') ?></p>
    </div>
  </div>

  <div class="uni-detail-body">

    <!-- Highlights strip -->
    <?php if (!empty($uni['highlights'])): ?>
    <div class="uni-detail-highlights">
      <?php foreach ($uni['highlights'] as $h): ?>
      <div class="uni-detail-highlight">
        <span class="uni-detail-highlight-icon"><?= e($h['icon']) ?></span>
        <strong><?= e($h['value']) ?></strong>
        <span><?= e($h['label']) ?></span>
      </div>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <!-- Main grid -->
    <div class="uni-detail-grid">
      <div class="uni-detail-main">

        <!-- Overview -->
        <?php if (!empty($uni['overview'])): ?>
        <section class="uni-detail-section">
          <h2 class="uni-detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg>
            Overview
          </h2>
          <p class="uni-detail-overview"><?= e($uni['overview']) ?></p>
        </section>
        <?php endif; ?>

        <!-- Programs -->
        <?php if (!empty($uni['programs'])): ?>
        <section class="uni-detail-section">
          <h2 class="uni-detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/></svg>
            Available Programs
          </h2>
          <ul class="uni-detail-programs">
            <?php foreach ($uni['programs'] as $p): ?>
            <li><span class="uni-detail-program-dot" aria-hidden="true"></span><?= e($p) ?></li>
            <?php endforeach; ?>
          </ul>
        </section>
        <?php endif; ?>

        <!-- Requirements -->
        <?php if (!empty($uni['requirements'])): ?>
        <section class="uni-detail-section">
          <h2 class="uni-detail-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M9 12l2 2 4-4M7 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2M9 4h6a2 2 0 010 4H9a2 2 0 010-4z"/></svg>
            Admission Requirements
          </h2>
          <ul class="uni-detail-requirements">
            <?php foreach ($uni['requirements'] as $r): ?>
            <li>
              <svg class="uni-detail-req-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <?= e($r) ?>
            </li>
            <?php endforeach; ?>
          </ul>
        </section>
        <?php endif; ?>

      </div><!-- /.uni-detail-main -->

      <!-- Sidebar -->
      <aside class="uni-detail-sidebar">
        <div class="uni-detail-info-card">
          <h3>Key Information</h3>
          <?php if (!empty($uni['location'])): ?>
          <div class="uni-detail-info-row">
            <span class="uni-detail-info-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Location
            </span>
            <span><?= e($uni['location']) ?></span>
          </div>
          <?php endif; ?>
          <?php if (!empty($uni['deadline'])): ?>
          <div class="uni-detail-info-row">
            <span class="uni-detail-info-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/></svg>
              Deadline
            </span>
            <span><?= e($uni['deadline']) ?></span>
          </div>
          <?php endif; ?>
          <?php if (!empty($uni['fees'])): ?>
          <div class="uni-detail-info-row">
            <span class="uni-detail-info-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Fees &amp; Aid
            </span>
            <span><?= e($uni['fees']) ?></span>
          </div>
          <?php endif; ?>
          <?php if (!empty($uni['website']) && str_starts_with($uni['website'], 'http')): ?>
          <a href="<?= e($uni['website']) ?>" target="_blank" rel="noreferrer" class="uni-detail-website-btn">
            Visit Official Website →
          </a>
          <?php endif; ?>
        </div>

        <div class="uni-detail-apply-card">
          <span class="uni-detail-apply-icon" aria-hidden="true">🎓</span>
          <h3>Ready to Apply?</h3>
          <p>IWSHA Foundation will guide you through every step — from documents to visa.</p>
          <a href="<?= $applyLink ?>" class="uni-detail-apply-btn">Apply for Scholarship</a>
          <a href="<?= url('contact.php') ?>" class="uni-detail-contact-btn">Talk to a Counselor</a>
        </div>
      </aside>
    </div><!-- /.uni-detail-grid -->
  </div><!-- /.uni-detail-body -->
</div><!-- /.uni-detail-page -->

<?php include __DIR__ . '/includes/footer.php'; ?>
