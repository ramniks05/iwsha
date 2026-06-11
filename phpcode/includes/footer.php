</main>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand-block">
      <div class="footer-brand">
        <img src="<?= asset('img/iwsha-logo.png') ?>" alt="" />
        <div>
          <strong><?= ORG_NAME ?></strong>
          <p><?= ORG_SOCIETY ?></p>
          <span><?= ORG_REG ?></span>
          <span class="footer-address"><?= CONTACT_ADDRESS ?></span>
        </div>
      </div>
      <p class="footer-mission"><?= ORG_FOOTER_MISSION ?></p>
      <div class="footer-social">
        <?php foreach ($GLOBALS['socialLinks'] as $s): ?>
          <a href="<?= e($s['url']) ?>" target="_blank" rel="noreferrer"
             class="social-link" aria-label="<?= e($s['name']) ?>"
             style="--sl-color:<?= e($s['color']) ?>"><?= e($s['icon']) ?></a>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="footer-col">
      <h4>Quick Links</h4>
      <a href="<?= url() ?>">Home</a>
      <a href="<?= url('programs.php') ?>">Programs</a>
      <a href="<?= url('scholarships.php') ?>">Scholarships</a>
      <a href="<?= url('donate.php') ?>">Donate</a>
      <a href="<?= url('contact.php') ?>">Contact Us</a>
    </div>

    <div class="footer-col">
      <h4>Contact Us</h4>
      <a href="tel:<?= CONTACT_PHONE_RAW ?>"><?= CONTACT_PHONE ?></a>
      <a href="mailto:<?= CONTACT_EMAIL ?>"><?= CONTACT_EMAIL ?></a>
      <span><?= CONTACT_ADDRESS ?></span>
      <a href="<?= WHATSAPP_URL ?>" class="footer-whatsapp-link" target="_blank" rel="noreferrer">💬 Chat on WhatsApp</a>
    </div>

    <div class="footer-col footer-donate-qr-col">
      <h4>Donate &amp; Support</h4>
      <p style="font-size:0.82rem;color:var(--muted);margin:0 0 0.75rem;">Scan to donate via UPI / QR</p>
      <div class="footer-qr-placeholder">
        <svg viewBox="0 0 80 80" fill="none" style="width:80px;height:80px;opacity:0.3">
          <rect x="5" y="5" width="30" height="30" rx="3" stroke="currentColor" stroke-width="3"/>
          <rect x="45" y="5" width="30" height="30" rx="3" stroke="currentColor" stroke-width="3"/>
          <rect x="5" y="45" width="30" height="30" rx="3" stroke="currentColor" stroke-width="3"/>
          <rect x="12" y="12" width="16" height="16" fill="currentColor"/>
          <rect x="52" y="12" width="16" height="16" fill="currentColor"/>
          <rect x="12" y="52" width="16" height="16" fill="currentColor"/>
          <rect x="52" y="52" width="6" height="6" fill="currentColor"/>
          <rect x="63" y="52" width="6" height="6" fill="currentColor"/>
          <rect x="52" y="63" width="6" height="6" fill="currentColor"/>
          <rect x="63" y="63" width="6" height="6" fill="currentColor"/>
        </svg>
        <p style="font-size:0.7rem;margin:0.4rem 0 0;color:var(--muted)">UPI QR Code</p>
      </div>
      <a href="<?= url('donate.php') ?>" class="btn-primary" style="margin-top:0.75rem;display:inline-block;font-size:0.82rem;padding:0.55rem 1rem">Donate Now →</a>
    </div>
  </div>

  <div class="footer-bottom-bar">
    <p class="footer-copy">© <?= date('Y') ?> IWSHA FOUNDATION. All rights reserved.</p>
    <div class="footer-bottom-social">
      <?php foreach ($GLOBALS['socialLinks'] as $s): ?>
        <a href="<?= e($s['url']) ?>" target="_blank" rel="noreferrer"
           class="social-link" aria-label="<?= e($s['name']) ?>"
           style="--sl-color:<?= e($s['color']) ?>"><?= e($s['icon']) ?></a>
      <?php endforeach; ?>
    </div>
  </div>
</footer>

</div><!-- /.app -->
<script src="<?= asset('js/main.js') ?>"></script>
</body>
</html>
