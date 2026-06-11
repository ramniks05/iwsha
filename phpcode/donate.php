<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Donate to IWSHA';
$flash = flash('donate_success');
include __DIR__ . '/includes/header.php';
?>

<div class="form-page">

  <section class="page-hero page-hero--short">
    <img src="<?= asset('img/welfare-scholarship.png') ?>" alt="" class="page-hero-bg" />
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Donate to IWSHA</h1>
      <p><?= ORG_FOOTER_MISSION ?></p>
    </div>
  </section>

  <div class="form-page-body form-page-body--wide">

    <?php if ($flash): ?>
    <div class="flash-alert flash-alert--success" role="status">✓ <?= e($flash) ?></div>
    <?php endif; ?>

    <section class="modern-form-shell" aria-labelledby="donation-form-title">
      <header class="modern-form-header">
        <div class="modern-form-header-icon modern-form-header-icon--donate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="28" height="28">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <div>
          <h2 id="donation-form-title">Make a Donation</h2>
          <p>Your donation helps underserved yet ambitious students access quality education. Every rupee makes a difference.</p>
        </div>
      </header>

      <div class="modern-form-layout">
        <form class="modern-form" method="POST" action="<?= url('process/donate.php') ?>" id="donationForm">

          <div class="modern-form-section">
            <h3 class="modern-form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/></svg>
              Donor Details
            </h3>

            <label class="modern-field">
              <span class="modern-field-label">Full Name <span class="modern-field-required">*</span></span>
              <div class="modern-field-control modern-field-control--icon">
                <span class="modern-field-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M3 21s1-4 9-4 9 4 9 4" stroke-linecap="round"/></svg></span>
                <input type="text" name="name" placeholder="Your full name" required />
              </div>
            </label>

            <div class="modern-form-row">
              <label class="modern-field">
                <span class="modern-field-label">Email <span class="modern-field-required">*</span></span>
                <div class="modern-field-control modern-field-control--icon">
                  <span class="modern-field-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                  <input type="email" name="email" placeholder="you@email.com" required />
                </div>
              </label>
              <label class="modern-field">
                <span class="modern-field-label">Phone</span>
                <div class="modern-field-control modern-field-control--icon">
                  <span class="modern-field-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></span>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" />
                </div>
              </label>
            </div>
          </div>

          <div class="modern-form-section">
            <h3 class="modern-form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Donation Amount
            </h3>

            <label class="modern-field">
              <span class="modern-field-label">Amount (₹) <span class="modern-field-required">*</span></span>
              <div class="modern-field-control modern-field-control--icon">
                <span class="modern-field-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
                <input type="number" name="amount" id="donationAmount" placeholder="1000" min="1" required value="1000" oninput="updateAmount(this.value)" />
              </div>
            </label>

            <div class="modern-amount-chips">
              <button type="button" class="chip-btn" onclick="setAmount(500)">₹500</button>
              <button type="button" class="chip-btn active" onclick="setAmount(1000)">₹1,000</button>
              <button type="button" class="chip-btn" onclick="setAmount(5000)">₹5,000</button>
            </div>
          </div>

          <div class="modern-form-section">
            <h3 class="modern-form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="16" height="16"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Message (Optional)
            </h3>
            <label class="modern-field">
              <span class="modern-field-label">Message</span>
              <div class="modern-field-control modern-field-control--icon">
                <span class="modern-field-icon" style="top:0.95rem;transform:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>
                <textarea name="message" placeholder="A note of encouragement..." rows="3"></textarea>
              </div>
            </label>
          </div>

          <div class="modern-form-actions">
            <button type="submit" class="modern-form-btn modern-form-btn--orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              Submit Donation
            </button>
          </div>
        </form>

        <!-- Pay Card -->
        <aside class="modern-pay-card">
          <div class="modern-pay-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
            <h3>Scan to Pay</h3>
          </div>
          <div class="modern-pay-qr">
            <!-- QR code SVG placeholder (replace with actual QR) -->
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="160" height="160">
              <rect x="5" y="5" width="38" height="38" rx="4" fill="none" stroke="#052c65" stroke-width="4"/>
              <rect x="13" y="13" width="22" height="22" rx="2" fill="#052c65"/>
              <rect x="57" y="5" width="38" height="38" rx="4" fill="none" stroke="#052c65" stroke-width="4"/>
              <rect x="65" y="13" width="22" height="22" rx="2" fill="#052c65"/>
              <rect x="5" y="57" width="38" height="38" rx="4" fill="none" stroke="#052c65" stroke-width="4"/>
              <rect x="13" y="65" width="22" height="22" rx="2" fill="#052c65"/>
              <rect x="57" y="57" width="6" height="6" fill="#052c65"/>
              <rect x="69" y="57" width="6" height="6" fill="#052c65"/>
              <rect x="81" y="57" width="14" height="6" fill="#052c65"/>
              <rect x="57" y="69" width="14" height="6" fill="#052c65"/>
              <rect x="57" y="81" width="6" height="14" fill="#052c65"/>
              <rect x="69" y="81" width="26" height="6" fill="#052c65"/>
              <rect x="89" y="69" width="6" height="12" fill="#052c65"/>
            </svg>
          </div>
          <p class="modern-pay-amount">₹<span id="displayAmount">1,000</span></p>
          <p class="modern-pay-upi">UPI: <strong><?= ORG_UPI_ID ?></strong></p>
          <p class="modern-pay-note"><?= ORG_BANK_NAME ?> · A/c <?= ORG_ACCOUNT ?> · IFSC: <?= ORG_IFSC ?></p>
        </aside>
      </div><!-- /.modern-form-layout -->

    </section>
  </div>
</div>

<script>
function setAmount(val) {
  document.getElementById('donationAmount').value = val;
  document.getElementById('displayAmount').textContent = val.toLocaleString('en-IN');
  document.querySelectorAll('.chip-btn').forEach(function(b){
    b.classList.toggle('active', parseInt(b.textContent.replace(/[^0-9]/g,'')) === val);
  });
}
function updateAmount(val) {
  var n = parseInt(val) || 0;
  document.getElementById('displayAmount').textContent = n.toLocaleString('en-IN');
  document.querySelectorAll('.chip-btn').forEach(function(b){
    b.classList.toggle('active', parseInt(b.textContent.replace(/[^0-9]/g,'')) === n);
  });
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
