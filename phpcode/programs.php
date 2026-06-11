<?php
require_once __DIR__ . '/includes/config.php';
$universities = jsonRead('universities.json');

$uniImages = [
  'eth-zurich'    => 'country-switzerland.png',
  'unibo'         => 'country-italy.png',
  'uoft'          => 'canada.jpg',
  'cal-hub'       => 'california.jpg',
  'ku-leuven'     => 'belgium.jpg',
  'indian-assist' => 'india-university.jpg',
];

$testimonials = [
    ['name'=>'Riya Sharma, ETH Zürich','text'=>'IWSHA made studying abroad a reality. The scholarship process was smooth and the counseling was exceptional.','img'=>'student-1.jpg'],
    ['name'=>'Arjun Mehta, University of Toronto','text'=>'Without IWSHA\'s support, I could never have afforded to apply abroad. They guided me at every step.','img'=>'student-2.jpg'],
    ['name'=>'Priya Nair, Indian University Assist','text'=>'The mentorship and financial aid helped me get into AIIMS. Forever grateful to the IWSHA team.','img'=>'student-3.jpg'],
];

$pageTitle = 'Programs';
include __DIR__ . '/includes/header.php';
?>

<div class="programs-page">

  <!-- Page Hero -->
  <section class="page-hero">
    <img src="<?= asset('img/university-global.png') ?>" alt="" class="page-hero-bg" />
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Programs &amp; Universities</h1>
      <p>Overseas study pathways and admission support for leading universities — helping deserving students turn education dreams into success.</p>
    </div>
  </section>

  <!-- Destinations -->
  <div class="section">
    <div class="section-head">
      <span class="section-label">Destinations</span>
      <h2>Overseas Education Countries</h2>
      <p>Study abroad pathways tailored for Indian students across leading global destinations.</p>
    </div>
    <div class="country-grid">
      <?php
      $countries = [
        ['code'=>'CH','name'=>'Switzerland','focus'=>'Engineering, Science & Research','img'=>'country-switzerland.png'],
        ['code'=>'IT','name'=>'Italy','focus'=>'Arts, Medicine & Cultural Heritage','img'=>'country-italy.png'],
        ['code'=>'CA','name'=>'Canada','focus'=>'Technology, Business & Health Sciences','img'=>'canada.jpg'],
        ['code'=>'US','name'=>'California, USA','focus'=>'Silicon Valley & Innovation Hubs','img'=>'california.jpg'],
        ['code'=>'BE','name'=>'Belgium','focus'=>'Research-driven Graduate Programs','img'=>'belgium.jpg'],
        ['code'=>'IN','name'=>'India','focus'=>'IITs, NITs, AIIMS & Top Institutions','img'=>'india-university.jpg'],
      ];
      foreach ($countries as $c): ?>
      <article class="country-card">
        <img src="<?= asset('img/' . $c['img']) ?>" alt="<?= e($c['name']) ?>" loading="lazy" />
        <div class="country-card-body">
          <span class="country-code"><?= e($c['code']) ?></span>
          <h3><?= e($c['name']) ?></h3>
          <p><?= e($c['focus']) ?></p>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- University Partners -->
  <div class="section section--alt">
    <div class="section-head">
      <span class="section-label">Partners</span>
      <h2>University Details</h2>
      <p style="margin-top:0.35rem;font-size:0.88rem;color:var(--muted)">Click any card to view full details, programs, and how to apply.</p>
    </div>
    <div class="uni-grid">
      <?php foreach ($universities as $uni):
        $imgFile = $uni['image'] ?? ($uniImages[$uni['slug']] ?? null);
      ?>
      <a href="<?= url('university.php?slug=' . urlencode($uni['slug'])) ?>" class="uni-card uni-card--link">
        <?php if ($imgFile): ?>
        <img src="<?= asset('img/' . $imgFile) ?>" alt="<?= e($uni['shortName'] ?? $uni['name']) ?>" loading="lazy" />
        <?php endif; ?>
        <div class="uni-card-body">
          <span class="uni-location">📍 <?= e($uni['location']) ?></span>
          <h3><?= e($uni['shortName'] ?? $uni['name']) ?></h3>
          <p><?= e($uni['tagline'] ?? $uni['overview'] ?? '') ?></p>
          <span class="uni-card-cta">View Details →</span>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Testimonials -->
  <div class="section">
    <div class="section-head">
      <span class="section-label">Stories</span>
      <h2>Testimonials of Children</h2>
    </div>
    <div class="testimonial-grid">
      <?php foreach ($testimonials as $t): ?>
      <blockquote class="testimonial-card">
        <img src="<?= asset('img/' . $t['img']) ?>" alt="<?= e($t['name']) ?>" loading="lazy" />
        <p>"<?= e($t['text']) ?>"</p>
        <cite>— <?= e($t['name']) ?></cite>
      </blockquote>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="section-cta-inline">
    <p>Need scholarship or admission help?</p>
    <a href="<?= url('apply.php') ?>" class="btn btn-primary">Apply for Scholarship</a>
  </div>

</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
