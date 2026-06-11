<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Apply for Scholarship';

// Load form config
$formFields = jsonRead('form-config.json');
$enabledFields = array_filter($formFields, fn($f) => !empty($f['enabled']));
usort($enabledFields, fn($a,$b) => ($a['order']??0) <=> ($b['order']??0));

// Group by section
$sections = [];
foreach ($enabledFields as $f) {
    $sections[$f['section']][] = $f;
}
$sectionLabels = [
    'personal'  => ['label'=>'Personal Information', 'icon'=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/></svg>'],
    'education' => ['label'=>'Education Details', 'icon'=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/></svg>'],
    'support'   => ['label'=>'Support Details', 'icon'=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'],
];

$fieldIcons = [
    'user'      => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/></svg>',
    'users'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    'phone'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    'mail'      => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    'age'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/></svg>',
    'education' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/></svg>',
    'globe'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    'rupee'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    'message'   => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
];

$flash = flash('apply_success');
include __DIR__ . '/includes/header.php';
?>

<div class="form-page">

  <section class="page-hero page-hero--short">
    <img src="<?= asset('img/graduation-success.png') ?>" alt="" class="page-hero-bg" />
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Apply for Scholarship</h1>
      <p><?= ORG_HERO_DESC ?></p>
    </div>
  </section>

  <div class="form-page-body">

    <?php if ($flash): ?>
    <div class="flash-alert flash-alert--success" role="status">✓ <?= e($flash) ?></div>
    <?php endif; ?>

    <section class="modern-form-shell" aria-labelledby="scholarship-form-title">
      <header class="modern-form-header">
        <div class="modern-form-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="28" height="28">
            <path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/>
            <path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h2 id="scholarship-form-title">Scholarship Application</h2>
          <p>Apply for a scholarship to pursue education in India or abroad. Fill all fields carefully.</p>
        </div>
      </header>

      <form class="modern-form" method="POST" action="<?= url('process/apply.php') ?>">

        <?php foreach ($sections as $sKey => $fields):
          $sl = $sectionLabels[$sKey] ?? ['label'=>ucfirst($sKey),'icon'=>''];
          $rows = [];
          $i = 0;
          while ($i < count($fields)) {
            $f = $fields[$i];
            if (!empty($f['halfWidth']) && isset($fields[$i+1]) && !empty($fields[$i+1]['halfWidth'])) {
              $rows[] = [$f, $fields[$i+1]];
              $i += 2;
            } else {
              $rows[] = [$f];
              $i++;
            }
          }
        ?>
        <div class="modern-form-section">
          <h3 class="modern-form-section-title"><?= $sl['icon'] ?> <?= e($sl['label']) ?></h3>
          <?php foreach ($rows as $row): ?>
          <?php if (count($row) === 2): ?>
          <div class="modern-form-row">
            <?php foreach ($row as $f): ?>
            <?php include __DIR__ . '/includes/form-field.php'; ?>
            <?php endforeach; ?>
          </div>
          <?php else: ?>
          <?php $f = $row[0]; include __DIR__ . '/includes/form-field.php'; ?>
          <?php endif; ?>
          <?php endforeach; ?>
        </div>
        <?php endforeach; ?>

        <label class="modern-form-check">
          <span class="modern-form-check-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <input type="checkbox" name="consent" required />
          <span>I agree to be contacted by IWSHA FOUNDATION regarding my application.</span>
        </label>

        <div class="modern-form-actions">
          <button type="submit" class="modern-form-btn modern-form-btn--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Application
          </button>
        </div>
      </form>
    </section>

  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
