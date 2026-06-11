<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Home';
include __DIR__ . '/includes/header.php';

$serviceIcons = [
    'scholarship' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/><path d="M8 14l-2 3M16 14l2 3" stroke-linecap="round"/></svg>',
    'coaching'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    'digital'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4" stroke-linecap="round"/></svg>',
    'career'      => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
    'skills'      => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/><path d="M13 2v7h7M9 13h6M9 17h4" stroke-linecap="round"/></svg>',
    'girls'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M12 16v6M9 19h6" stroke-linecap="round"/><path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" stroke-linecap="round"/></svg>',
    'exams'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h5M7 13h8M7 17h4" stroke-linecap="round"/></svg>',
    'community'   => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round"/></svg>',
    'library'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    'mentorship'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
];

$services = [
    ['icon'=>'scholarship','title'=>'Scholarship Programs','text'=>'Financial assistance and merit-based scholarships for deserving students pursuing education in India and abroad.','cta'=>'Apply Now','link'=>'apply.php','accent'=>'#2563EB'],
    ['icon'=>'coaching','title'=>'Free Coaching Support','text'=>'Complimentary academic coaching for students who need extra guidance to excel in school and competitive paths.','cta'=>'Learn More','link'=>'programs.php','accent'=>'#0891B2'],
    ['icon'=>'digital','title'=>'Digital Learning Initiative','text'=>'Access to online learning tools, virtual classrooms, and technology-enabled education for remote communities.','cta'=>'Learn More','link'=>'programs.php','accent'=>'#4F46E5'],
    ['icon'=>'career','title'=>'Career Counseling','text'=>'Professional guidance to help students choose the right courses, careers, and university pathways.','cta'=>'Get Guidance','link'=>'contact.php','accent'=>'#2563EB'],
    ['icon'=>'skills','title'=>'Skill Development Training','text'=>'Workshops and training programs that build employability, communication, and leadership skills.','cta'=>'Learn More','link'=>'programs.php','accent'=>'#0D9488'],
    ['icon'=>'girls','title'=>'Girls Education Support','text'=>'Dedicated initiatives empowering girls with scholarships, mentorship, and safe learning opportunities.','cta'=>'Apply Now','link'=>'apply.php','accent'=>'#DB2777'],
    ['icon'=>'exams','title'=>'Competitive Exam Preparation','text'=>'Structured support for entrance exams, study plans, and mock tests for higher education aspirants.','cta'=>'Learn More','link'=>'programs.php','accent'=>'#2563EB'],
    ['icon'=>'community','title'=>'Community Awareness Programs','text'=>'Outreach campaigns promoting education rights, welfare schemes, and parent engagement in communities.','cta'=>'Learn More','link'=>'contact.php','accent'=>'#059669'],
    ['icon'=>'library','title'=>'E-Library Access','text'=>'Digital library resources, study materials, and reference content available to registered students.','cta'=>'Learn More','link'=>'programs.php','accent'=>'#0891B2'],
    ['icon'=>'mentorship','title'=>'Student Mentorship Program','text'=>'One-on-one mentoring from educators and alumni to build confidence and long-term academic success.','cta'=>'Apply Now','link'=>'apply.php','accent'=>'#2563EB'],
];

$countries = [
    ['code'=>'CH','name'=>'Switzerland','focus'=>'Engineering, Science & Research','img'=>'country-switzerland.png'],
    ['code'=>'IT','name'=>'Italy','focus'=>'Arts, Medicine & Cultural Heritage','img'=>'country-italy.png'],
    ['code'=>'CA','name'=>'Canada','focus'=>'Technology, Business & Health Sciences','img'=>'canada.jpg'],
    ['code'=>'US','name'=>'California, USA','focus'=>'Silicon Valley & Innovation Hubs','img'=>'california.jpg'],
    ['code'=>'BE','name'=>'Belgium','focus'=>'Research-driven Graduate Programs','img'=>'belgium.jpg'],
];

$testimonials = [
    ['name'=>'Riya Sharma, ETH Zürich','text'=>'IWSHA made studying abroad a reality. The scholarship process was smooth and the counseling was exceptional.','img'=>'student-1.jpg'],
    ['name'=>'Arjun Mehta, University of Toronto','text'=>'Without IWSHA\'s support, I could never have afforded to apply abroad. They guided me at every step.','img'=>'student-2.jpg'],
    ['name'=>'Priya Nair, Indian University Assist','text'=>'The mentorship and financial aid helped me get into AIIMS. Forever grateful to the IWSHA team.','img'=>'student-3.jpg'],
];
?>

<div class="home">

<!-- ══ Hero Section ══════════════════════════════════════════════ -->
<section class="hero-premium" aria-label="Hero">
  <div class="hero-premium-bg" aria-hidden="true">
    <div class="hero-premium-gradient"></div>
    <div class="hero-premium-mesh"></div>
    <div class="hero-premium-grid"></div>
    <span class="hero-orb hero-orb--1"></span>
    <span class="hero-orb hero-orb--2"></span>
    <span class="hero-orb hero-orb--3"></span>
  </div>

  <div class="hero-premium-inner">
    <div class="hero-premium-content">
      <span class="hero-premium-eyebrow">
        <span class="hero-premium-dot" aria-hidden="true"></span>
        <?= ORG_SOCIETY ?>
      </span>
      <h1 class="hero-premium-headline">
        Opening doors to
        <span class="hero-premium-gradient-text"> global &amp; Indian </span>
        universities
      </h1>
      <p class="hero-premium-sub"><?= ORG_HERO_DESC ?></p>

      <div class="hero-premium-cta">
        <a href="<?= url('apply.php') ?>" class="btn btn-premium btn-premium--primary">Apply for Scholarship</a>
        <a href="<?= url('donate.php') ?>" class="btn btn-premium btn-premium--secondary">Donate Now</a>
      </div>

      <a href="<?= url('programs.php') ?>" class="hero-premium-link">Explore Programs <span aria-hidden="true">→</span></a>

      <div class="hero-trust-badges">
        <div class="hero-trust-badge">
          <span class="hero-trust-badge-icon">✓</span>
          <div><strong>Registered Trust</strong><span><?= ORG_REG ?></span></div>
        </div>
        <div class="hero-trust-badge">
          <span class="hero-trust-badge-icon">✓</span>
          <div><strong>Welfare Focused</strong><span>100% student welfare</span></div>
        </div>
        <div class="hero-trust-badge">
          <span class="hero-trust-badge-icon">✓</span>
          <div><strong>Global Reach</strong><span>5+ countries</span></div>
        </div>
      </div>
    </div>

    <div class="hero-premium-visual" aria-hidden="true">
      <div class="hero-3d-stage">
        <div class="hero-3d-ring hero-3d-ring--outer"></div>
        <div class="hero-3d-ring hero-3d-ring--inner"></div>
        <div class="hero-glass-frame">
          <div class="hero-glass-frame-inner">
            <img src="<?= asset('img/hero-abroad.png') ?>" alt="Students at international university campus" />
            <div class="hero-glass-shine"></div>
          </div>
        </div>
        <div class="hero-float hero-float--stats hero-glass-card">
          <span class="hero-float-icon">🎓</span>
          <div><strong>500+</strong><span>Students Guided</span></div>
        </div>
        <div class="hero-float hero-float--countries hero-glass-card">
          <span class="hero-float-icon">🌍</span>
          <div><strong>5+</strong><span>Countries</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="hero-stats-panel hero-glass-card">
    <div class="hero-stat hero-stat--highlight">
      <strong id="visitorCount">1,820</strong><span>Website Visitors</span>
    </div>
    <div class="hero-stat"><strong>500+</strong><span>Students Guided</span></div>
    <div class="hero-stat"><strong>5+</strong><span>Countries</span></div>
    <div class="hero-stat"><strong>100%</strong><span>Welfare Focused</span></div>
  </div>

  <button type="button" class="hero-scroll-indicator" aria-label="Scroll to content" onclick="document.getElementById('about').scrollIntoView({behavior:'smooth'})">
    <span class="hero-scroll-mouse"><span class="hero-scroll-wheel"></span></span>
    <span class="hero-scroll-label">Scroll</span>
  </button>
</section>

<!-- ══ About Section ════════════════════════════════════════════ -->
<section class="about-premium" id="about" aria-labelledby="about-heading">
  <div class="about-premium-bg" aria-hidden="true">
    <span class="about-float about-float--1"></span>
    <span class="about-float about-float--2"></span>
    <span class="about-float about-float--3"></span>
  </div>
  <div class="about-premium-inner">
    <div class="about-premium-visual about-animate">
      <div class="about-premium-image-wrap">
        <img src="<?= asset('img/students-library.png') ?>" alt="Students learning together at IWSHA Foundation" />
        <div class="about-premium-image-overlay" aria-hidden="true"></div>
        <div class="about-premium-image-badge">
          <span class="about-badge-icon" aria-hidden="true">🎓</span>
          <div><strong>500+</strong><span>Students Empowered</span></div>
        </div>
      </div>
      <div class="about-premium-image-accent" aria-hidden="true"></div>
    </div>
    <div class="about-premium-content">
      <span class="about-premium-label about-animate">About Our Mission</span>
      <h2 id="about-heading" class="about-premium-title about-animate">Who We Are</h2>
      <p class="about-premium-lead about-animate"><?= ORG_ABOUT_DESC ?></p>
      <ul class="about-highlights">
        <li class="about-highlight about-animate" style="--about-delay:0.08s">
          <span class="about-highlight-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/></svg></span>
          <div><strong>Empowering Students</strong><p>Scholarships for children who need it most.</p></div>
        </li>
        <li class="about-highlight about-animate" style="--about-delay:0.18s">
          <span class="about-highlight-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/><path d="M13 2v7h7M9 13h6M9 17h4" stroke-linecap="round"/></svg></span>
          <div><strong>Skill Development</strong><p>Training for modern careers and digital learning.</p></div>
        </li>
        <li class="about-highlight about-animate" style="--about-delay:0.28s">
          <span class="about-highlight-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="5"/><path d="M3 21l3-6h12l3 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13v4" stroke-linecap="round"/></svg></span>
          <div><strong>Scholarship &amp; Mentorship</strong><p>Financial aid and guidance at every step.</p></div>
        </li>
      </ul>
      <a href="<?= url('programs.php') ?>" class="about-premium-cta about-animate">Learn More <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<!-- ══ Countries ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-head">
    <span class="section-label">Study Abroad</span>
    <h2>Countries We Support</h2>
    <p>Overseas education pathways tailored for every student's ambition.</p>
  </div>
  <div class="country-grid">
    <?php foreach ($countries as $c): ?>
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

<!-- ══ Services Section ══════════════════════════════════════════ -->
<section class="ewp-services" aria-labelledby="ewp-services-heading">
  <div class="ewp-wave ewp-wave--top" aria-hidden="true">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none">
      <path d="M0,32 C360,0 720,48 1080,24 C1260,12 1380,20 1440,28 L1440,0 L0,0 Z" fill="#f4f6f9"/>
    </svg>
  </div>
  <div class="ewp-services-bg" aria-hidden="true">
    <div class="ewp-services-gradient"></div>
    <div class="ewp-services-pattern"></div>
    <span class="ewp-float-shape ewp-float-shape--1"></span>
    <span class="ewp-float-shape ewp-float-shape--2"></span>
    <span class="ewp-float-shape ewp-float-shape--3"></span>
  </div>
  <div class="ewp-services-inner">
    <header class="ewp-header">
      <span class="ewp-label">Education Welfare Program</span>
      <h2 id="ewp-services-heading">Our Services for Student Success</h2>
      <p>IWSHA FOUNDATION delivers trusted education welfare initiatives that transform lives through scholarships, coaching, and career support.</p>
    </header>

    <div class="ewp-impact" id="ewpImpact">
      <div class="ewp-stat" style="--ewp-delay:0s"><strong>500+</strong><span>Students Supported</span></div>
      <div class="ewp-stat" style="--ewp-delay:0.1s"><strong>10+</strong><span>Welfare Programs</span></div>
      <div class="ewp-stat" style="--ewp-delay:0.2s"><strong>5+</strong><span>Countries Reached</span></div>
      <div class="ewp-stat" style="--ewp-delay:0.3s"><strong>100%</strong><span>Welfare Focused</span></div>
    </div>

    <div class="ewp-timeline" id="ewpTimeline">
      <div class="ewp-timeline-track" aria-hidden="true"><span class="ewp-timeline-progress"></span></div>
      <ol class="ewp-timeline-steps">
        <?php
        $steps = [
          ['01','Identify & Assess','Reach underserved students and evaluate their educational needs.','0s'],
          ['02','Guide & Support','Provide counseling, scholarships, and personalized academic guidance.','0.15s'],
          ['03','Train & Empower','Deliver coaching, skills training, and digital learning resources.','0.3s'],
          ['04','Transform Lives','Help students achieve careers, higher education, and lasting success.','0.45s'],
        ];
        foreach ($steps as $s): ?>
        <li class="ewp-timeline-step" style="--ewp-step-delay:<?= $s[3] ?>">
          <span class="ewp-timeline-dot"><?= $s[0] ?></span>
          <div><strong><?= e($s[1]) ?></strong><p><?= e($s[2]) ?></p></div>
        </li>
        <?php endforeach; ?>
      </ol>
    </div>

    <div class="ewp-grid">
      <?php foreach ($services as $i => $svc): ?>
      <article class="ewp-card" style="--ewp-accent:<?= $svc['accent'] ?>;--ewp-delay:<?= ($i * 0.06) ?>s">
        <span class="ewp-card-glow" aria-hidden="true"></span>
        <span class="ewp-card-shine" aria-hidden="true"></span>
        <div class="ewp-card-icon" aria-hidden="true"><?= $serviceIcons[$svc['icon']] ?? '' ?></div>
        <h3><?= e($svc['title']) ?></h3>
        <p><?= e($svc['text']) ?></p>
        <a href="<?= url($svc['link']) ?>" class="ewp-card-cta"><?= e($svc['cta']) ?> <span aria-hidden="true">→</span></a>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ══ Wave Divider ══════════════════════════════════════════════ -->
<section class="wave-divider" aria-label="Inspirational quote" id="waveDivider">
  <div class="wave-divider-wrap">
    <svg class="wave-divider-shape" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,65 L1440,0 L0,0 Z" fill="currentColor"/>
    </svg>
    <span class="wave-divider-float" style="left:10%;top:20%" aria-hidden="true">🎓</span>
    <span class="wave-divider-float" style="left:30%;top:60%" aria-hidden="true">📖</span>
    <span class="wave-divider-float" style="left:60%;top:25%" aria-hidden="true">✨</span>
    <span class="wave-divider-float" style="left:80%;top:55%" aria-hidden="true">🌍</span>
    <div class="wave-divider-content">
      <span class="wave-divider-mark" aria-hidden="true">"</span>
      <blockquote><p>Education is the foundation of empowerment and change.</p></blockquote>
      <cite>IWSHA FOUNDATION</cite>
    </div>
  </div>
</section>

<!-- ══ Feature Split (Universities) ════════════════════════════ -->
<div class="section feature-split feature-split--after-wave">
  <div class="feature-text">
    <span class="section-label">Universities</span>
    <h2>Partner Institutions &amp; Indian Universities</h2>
    <p>We connect students with leading global universities and India's premier institutions — from ETH Zurich to IITs.</p>
    <ul class="feature-list">
      <li>Admission &amp; scholarship counseling</li>
      <li>Document &amp; visa preparation support</li>
      <li>Indian university fee support programs</li>
    </ul>
    <a href="<?= url('programs.php') ?>" class="btn btn-primary">View All Universities</a>
  </div>
  <div class="feature-images">
    <img src="<?= asset('img/university-global.png') ?>" alt="Global university campus" class="feature-img-main" loading="lazy" />
    <img src="<?= asset('img/students-library.png') ?>" alt="Students studying in library" class="feature-img-sub" loading="lazy" />
  </div>
</div>

<!-- ══ Testimonials ══════════════════════════════════════════════ -->
<div class="section">
  <div class="section-head">
    <span class="section-label">Success Stories</span>
    <h2>What Our Students Say</h2>
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

<!-- ══ CTA Section ═══════════════════════════════════════════════ -->
<section class="cta-section">
  <img src="<?= asset('img/graduation-success.png') ?>" alt="" class="cta-bg" aria-hidden="true" />
  <div class="cta-overlay"></div>
  <div class="cta-content">
    <h2>Ready to Start Your Education Journey?</h2>
    <p>Apply for a scholarship or donate to support underserved yet ambitious students.</p>
    <div class="hero-btns">
      <a href="<?= url('apply.php') ?>" class="btn btn-primary">Apply Now</a>
      <a href="<?= url('donate.php') ?>" class="btn btn-accent">Donate</a>
    </div>
  </div>
</section>

</div><!-- /.home -->

<script>
// Visitor counter
(function(){
  try {
    var key = 'scholarship_visitor_count', skey = 'scholarship_visitor_session_counted';
    var count = parseInt(localStorage.getItem(key)||'1820', 10);
    if (!sessionStorage.getItem(skey)) { count++; localStorage.setItem(key, count); sessionStorage.setItem(skey,'1'); }
    var el = document.getElementById('visitorCount');
    if (el) el.textContent = count.toLocaleString();
  } catch(e){}
})();

// Intersection observers for animations
(function(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('about-animate--visible'); io.unobserve(e.target); }
    });
  },{threshold:0.08});
  document.querySelectorAll('.about-animate').forEach(function(el){ io.observe(el); });

  var ewpIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        document.getElementById('ewpImpact').classList.add('ewp-impact--active');
        document.getElementById('ewpTimeline').classList.add('ewp-timeline--active');
        ewpIo.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  var ewp = document.querySelector('.ewp-impact');
  if(ewp) ewpIo.observe(ewp);

  var cardIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('ewp-card--visible'); cardIo.unobserve(e.target); } });
  },{threshold:0.08});
  document.querySelectorAll('.ewp-card').forEach(function(el){ cardIo.observe(el); });

  var waveEl = document.getElementById('waveDivider');
  if(waveEl){
    var wio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('wave-divider--visible'); wio.unobserve(e.target); } });
    },{threshold:0.15});
    wio.observe(waveEl);
  }
})();
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
