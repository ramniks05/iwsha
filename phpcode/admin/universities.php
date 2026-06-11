<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();

$universities = jsonRead('universities.json');
$success = flash('uni_success');
$error   = flash('uni_error');

// Handle delete
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $id  = trim($_POST['delete_id']);
    $uni = array_filter($universities, fn($u) => $u['id'] === $id);
    if (!empty($uni) && !(array_values($uni)[0]['isDefault'] ?? false)) {
        $universities = array_values(array_filter($universities, fn($u) => $u['id'] !== $id));
        jsonWrite('universities.json', $universities);
        flash('uni_success', 'University removed successfully.');
    } else {
        flash('uni_error', 'Cannot delete a default university. You can only delete custom-added ones.');
    }
    header('Location: ' . BASE_URL . '/admin/universities.php');
    exit;
}

// Handle add
$formErrors = [];
$formData   = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_uni'])) {
    $formData = [
        'name'       => trim($_POST['name'] ?? ''),
        'shortName'  => trim($_POST['shortName'] ?? ''),
        'country'    => trim($_POST['country'] ?? ''),
        'countryCode'=> strtoupper(trim($_POST['countryCode'] ?? '')),
        'location'   => trim($_POST['location'] ?? ''),
        'tagline'    => trim($_POST['tagline'] ?? ''),
        'overview'   => trim($_POST['overview'] ?? ''),
        'programs'   => trim($_POST['programs'] ?? ''),
        'requirements'=> trim($_POST['requirements'] ?? ''),
        'highlights' => trim($_POST['highlights'] ?? ''),
        'fees'       => trim($_POST['fees'] ?? ''),
        'deadline'   => trim($_POST['deadline'] ?? ''),
        'website'    => trim($_POST['website'] ?? ''),
        'image'      => '',
    ];

    // Handle image upload
    if (!empty($_FILES['uni_image']['tmp_name'])) {
        $file     = $_FILES['uni_image'];
        $allowed  = ['image/jpeg','image/png','image/webp'];
        $maxBytes = 2 * 1024 * 1024; // 2 MB
        if (!in_array($file['type'], $allowed)) {
            $formErrors['image'] = 'Only JPG, PNG and WebP images are allowed.';
        } elseif ($file['size'] > $maxBytes) {
            $formErrors['image'] = 'Image must be under 2 MB.';
        } else {
            $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = 'uni_' . uniqid() . '.' . $ext;
            $dest     = dirname(__DIR__) . '/assets/img/' . $filename;
            if (move_uploaded_file($file['tmp_name'], $dest)) {
                $formData['image'] = $filename;
            } else {
                $formErrors['image'] = 'Failed to save image. Check folder permissions.';
            }
        }
    }
    if ($formData['name'] === '')    $formErrors['name']     = 'University name is required.';
    if ($formData['country'] === '') $formErrors['country']  = 'Country is required.';
    if ($formData['location'] === '') $formErrors['location'] = 'Location is required.';

    if (empty($formErrors)) {
        $slug = slugify($formData['name']);
        // ensure unique slug
        $existing = array_column($universities, 'slug');
        $base = $slug; $n = 2;
        while (in_array($slug, $existing)) $slug = $base . '-' . $n++;

        $newUni = [
            'id'          => 'custom_' . uniqid(),
            'slug'        => $slug,
            'name'        => $formData['name'],
            'shortName'   => $formData['shortName'] ?: $formData['name'],
            'location'    => $formData['location'],
            'country'     => $formData['country'],
            'countryCode' => $formData['countryCode'] ?: '🌍',
            'tagline'     => $formData['tagline'],
            'overview'    => $formData['overview'],
            'programs'    => array_values(array_filter(array_map('trim', explode("\n", $formData['programs'])))),
            'requirements'=> array_values(array_filter(array_map('trim', explode("\n", $formData['requirements'])))),
            'highlights'  => [],
            'fees'        => $formData['fees'],
            'deadline'    => $formData['deadline'],
            'website'     => $formData['website'],
            'image'       => $formData['image'],
            'isDefault'   => false,
        ];
        $universities[] = $newUni;
        jsonWrite('universities.json', $universities);
        flash('uni_success', 'University "' . $newUni['name'] . '" added successfully.');
        header('Location: ' . BASE_URL . '/admin/universities.php');
        exit;
    }
}

$adminPageTitle = 'Manage Universities';
include dirname(__DIR__) . '/includes/admin-sidebar.php';
?>

<div class="admin-inner-page">
  <div class="admin-inner-header">
    <div>
      <h1>Manage Universities</h1>
      <p>Add, preview and remove university listings. Custom entries can be deleted; default ones can only be hidden.</p>
    </div>
    <a href="<?= BASE_URL ?>/" target="_blank" rel="noreferrer" class="admin-back-btn">View Programs ↗</a>
  </div>

  <div class="admin-body">

    <?php if ($success): ?>
    <div class="form-alert form-alert--success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 15.01 9 12.01"/></svg><?= e($success) ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
    <div class="form-alert form-alert--error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg><?= e($error) ?></div>
    <?php endif; ?>

    <!-- Add form -->
    <section class="admin-form-card">
      <h2 class="admin-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" stroke-linecap="round"/></svg>
        Add New University
      </h2>
      <form method="POST" enctype="multipart/form-data" class="admin-form" novalidate>
        <input type="hidden" name="save_uni" value="1" />
        <div class="admin-form-grid">
          <div class="admin-field <?= isset($formErrors['name']) ? 'admin-field--error' : '' ?>">
            <label for="name">University Name *</label>
            <input id="name" name="name" placeholder="e.g. Harvard University" value="<?= e($formData['name'] ?? '') ?>" />
            <?php if (isset($formErrors['name'])): ?><span class="admin-error"><?= e($formErrors['name']) ?></span><?php endif; ?>
          </div>
          <div class="admin-field">
            <label for="shortName">Short Name</label>
            <input id="shortName" name="shortName" placeholder="e.g. Harvard" value="<?= e($formData['shortName'] ?? '') ?>" />
          </div>
          <div class="admin-field <?= isset($formErrors['country']) ? 'admin-field--error' : '' ?>">
            <label for="country">Country *</label>
            <input id="country" name="country" placeholder="e.g. United States" value="<?= e($formData['country'] ?? '') ?>" />
            <?php if (isset($formErrors['country'])): ?><span class="admin-error"><?= e($formErrors['country']) ?></span><?php endif; ?>
          </div>
          <div class="admin-field">
            <label for="countryCode">Country Code / Flag</label>
            <input id="countryCode" name="countryCode" placeholder="e.g. US or 🇺🇸" maxlength="8" value="<?= e($formData['countryCode'] ?? '') ?>" />
          </div>
          <div class="admin-field admin-field--full <?= isset($formErrors['location']) ? 'admin-field--error' : '' ?>">
            <label for="location">Location *</label>
            <input id="location" name="location" placeholder="e.g. Cambridge, Massachusetts, USA" value="<?= e($formData['location'] ?? '') ?>" />
            <?php if (isset($formErrors['location'])): ?><span class="admin-error"><?= e($formErrors['location']) ?></span><?php endif; ?>
          </div>
          <div class="admin-field admin-field--full">
            <label for="tagline">Tagline</label>
            <input id="tagline" name="tagline" placeholder="One-line summary shown on the card" value="<?= e($formData['tagline'] ?? '') ?>" />
          </div>
          <div class="admin-field admin-field--full">
            <label for="overview">Overview</label>
            <textarea id="overview" name="overview" rows="3" placeholder="Short overview paragraph…"><?= e($formData['overview'] ?? '') ?></textarea>
          </div>
          <div class="admin-field admin-field--full">
            <label for="programs">Programs (one per line)</label>
            <textarea id="programs" name="programs" rows="4" placeholder="BSc Computer Science&#10;MSc Data Science"><?= e($formData['programs'] ?? '') ?></textarea>
          </div>
          <div class="admin-field admin-field--full">
            <label for="requirements">Requirements (one per line)</label>
            <textarea id="requirements" name="requirements" rows="4" placeholder="Minimum 80% in 12th&#10;IELTS 6.5+"><?= e($formData['requirements'] ?? '') ?></textarea>
          </div>
          <div class="admin-field">
            <label for="fees">Fees &amp; Aid Info</label>
            <input id="fees" name="fees" placeholder="e.g. ₹50,000/year — IWSHA aid available" value="<?= e($formData['fees'] ?? '') ?>" />
          </div>
          <div class="admin-field">
            <label for="deadline">Application Deadline</label>
            <input id="deadline" name="deadline" placeholder="e.g. December 15" value="<?= e($formData['deadline'] ?? '') ?>" />
          </div>
          <div class="admin-field admin-field--full">
            <label for="website">Website URL</label>
            <input id="website" name="website" type="url" placeholder="https://university.edu" value="<?= e($formData['website'] ?? '') ?>" />
          </div>
          <div class="admin-field admin-field--full <?= isset($formErrors['image']) ? 'admin-field--error' : '' ?>">
            <label for="uni_image">University Image <span style="color:var(--muted);font-weight:400">(JPG/PNG/WebP, max 2MB)</span></label>
            <input id="uni_image" name="uni_image" type="file" accept="image/jpeg,image/png,image/webp"
              style="padding:.55rem;background:#f8fafc;border:1.5px dashed var(--border);border-radius:10px;font:inherit;font-size:.85rem;cursor:pointer;width:100%" />
            <?php if (isset($formErrors['image'])): ?><span class="admin-error"><?= e($formErrors['image']) ?></span><?php endif; ?>
          </div>
        </div>
        <div class="admin-form-footer">
          <button type="submit" class="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save University
          </button>
        </div>
      </form>
    </section>

    <!-- Listed universities -->
    <div class="admin-list-card">
      <h2 class="admin-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke-linejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" stroke-linecap="round"/></svg>
        All Universities (<?= count($universities) ?>)
      </h2>
      <div class="admin-uni-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width:52px"></th><th>Name</th><th>Location</th><th>Country</th><th>Type</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($universities as $uni): ?>
            <tr>
              <td>
                <?php if (!empty($uni['image'])): ?>
                <img src="<?= BASE_URL ?>/assets/img/<?= e($uni['image']) ?>" alt=""
                  style="width:42px;height:42px;object-fit:cover;border-radius:8px;display:block" />
                <?php else: ?>
                <div style="width:42px;height:42px;border-radius:8px;background:var(--bg);border:1px solid var(--border);display:grid;place-items:center;font-size:1.2rem">
                  <?= mb_substr($uni['countryCode'] ?? '🌍', 0, 2) ?>
                </div>
                <?php endif; ?>
              </td>
              <td>
                <a href="<?= BASE_URL ?>/university.php?slug=<?= urlencode($uni['slug']) ?>" target="_blank" class="admin-table-link">
                  <?= e($uni['shortName'] ?? $uni['name']) ?>
                </a>
              </td>
              <td><?= e($uni['location']) ?></td>
              <td><?= e($uni['country']) ?></td>
              <td>
                <?php if ($uni['isDefault'] ?? false): ?>
                  <span class="admin-tag admin-tag--default">Default</span>
                <?php else: ?>
                  <span class="admin-tag admin-tag--custom">Custom</span>
                <?php endif; ?>
              </td>
              <td>
                <a href="<?= BASE_URL ?>/university.php?slug=<?= urlencode($uni['slug']) ?>" class="admin-action-btn" target="_blank">Preview</a>
                <?php if (!($uni['isDefault'] ?? false)): ?>
                <form method="POST" style="display:inline" onsubmit="return confirm('Remove this university?')">
                  <input type="hidden" name="delete_id" value="<?= e($uni['id']) ?>" />
                  <button type="submit" class="admin-delete-btn">Delete</button>
                </form>
                <?php endif; ?>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<?php include dirname(__DIR__) . '/includes/admin-footer.php'; ?>
