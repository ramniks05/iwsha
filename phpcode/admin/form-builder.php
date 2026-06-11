<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
requireAdmin();

$fields  = jsonRead('form-config.json');
$success = flash('fb_success');
$error   = flash('fb_error');

// ── Handle Actions ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    // Toggle enabled
    if ($action === 'toggle') {
        $id = $_POST['field_id'] ?? '';
        foreach ($fields as &$f) {
            if ($f['id'] === $id) $f['enabled'] = !($f['enabled'] ?? true);
        }
        unset($f);
        jsonWrite('form-config.json', $fields);
        flash('fb_success', 'Field updated.');
        header('Location: ' . BASE_URL . '/admin/form-builder.php'); exit;
    }

    // Delete custom field
    if ($action === 'delete') {
        $id = $_POST['field_id'] ?? '';
        $filtered = array_values(array_filter($fields, fn($f) => $f['id'] !== $id || ($f['isDefault'] ?? false)));
        jsonWrite('form-config.json', $filtered);
        flash('fb_success', 'Field deleted.');
        header('Location: ' . BASE_URL . '/admin/form-builder.php'); exit;
    }

    // Reorder (move up/down)
    if ($action === 'move') {
        $id  = $_POST['field_id'] ?? '';
        $dir = $_POST['dir'] ?? 'up';
        $idx = array_search($id, array_column($fields, 'id'));
        if ($idx !== false) {
            $swap = $dir === 'up' ? $idx - 1 : $idx + 1;
            if (isset($fields[$swap])) {
                [$fields[$idx], $fields[$swap]] = [$fields[$swap], $fields[$idx]];
                foreach ($fields as $i => &$f) $f['order'] = $i;
                unset($f);
                jsonWrite('form-config.json', $fields);
            }
        }
        flash('fb_success', 'Field reordered.');
        header('Location: ' . BASE_URL . '/admin/form-builder.php'); exit;
    }

    // Reset to defaults
    if ($action === 'reset') {
        $defaults = json_decode(file_get_contents(dirname(__DIR__) . '/data/form-config.json'), true);
        // Restore only default fields
        $def = array_filter($defaults, fn($f) => $f['isDefault'] ?? false);
        jsonWrite('form-config.json', array_values($def));
        flash('fb_success', 'Form reset to defaults.');
        header('Location: ' . BASE_URL . '/admin/form-builder.php'); exit;
    }

    // Add custom field
    if ($action === 'add_field') {
        $label = trim($_POST['label'] ?? '');
        $type  = $_POST['type'] ?? 'text';
        $section = $_POST['section'] ?? 'personal';
        $placeholder = trim($_POST['placeholder'] ?? '');
        $required = isset($_POST['required']) ? true : false;
        $halfWidth = isset($_POST['halfWidth']) ? true : false;
        $options = trim($_POST['options'] ?? '');

        if ($label === '') {
            flash('fb_error', 'Field label is required.');
            header('Location: ' . BASE_URL . '/admin/form-builder.php'); exit;
        }

        $id = 'custom_' . preg_replace('/[^a-z0-9_]/', '_', strtolower($label)) . '_' . time();
        $newField = [
            'id'          => $id,
            'label'       => $label,
            'type'        => in_array($type, ['text','number','email','tel','select','textarea']) ? $type : 'text',
            'icon'        => 'check',
            'placeholder' => $placeholder,
            'required'    => $required,
            'section'     => in_array($section, ['personal','education','support']) ? $section : 'personal',
            'halfWidth'   => $halfWidth,
            'options'     => $type === 'select' ? array_values(array_filter(array_map('trim', explode("\n", $options)))) : [],
            'enabled'     => true,
            'isDefault'   => false,
            'order'       => count($fields),
        ];
        $fields[] = $newField;
        foreach ($fields as $i => &$f) $f['order'] = $i;
        unset($f);
        jsonWrite('form-config.json', $fields);
        flash('fb_success', 'Custom field "' . $label . '" added.');
        header('Location: ' . BASE_URL . '/admin/form-builder.php#manage'); exit;
    }
}

// Sort by order
usort($fields, fn($a,$b) => ($a['order']??0) <=> ($b['order']??0));

$sectionLabels = ['personal'=>'Personal Details','education'=>'Education Details','support'=>'Support Request'];
$adminPageTitle = 'Form Builder';
include dirname(__DIR__) . '/includes/admin-sidebar.php';
?>

<div class="admin-inner-page">
  <div class="admin-inner-header">
    <div>
      <h1>Scholarship Form Builder</h1>
      <p>Add, enable/disable and reorder fields. Changes apply live on the scholarship form.</p>
    </div>
    <a href="<?= BASE_URL ?>/apply.php" target="_blank" rel="noreferrer" class="admin-back-btn">Preview Form ↗</a>
  </div>

  <div class="admin-body">

    <?php if ($success): ?>
    <div class="form-alert form-alert--success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 15.01 9 12.01"/></svg><?= e($success) ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
    <div class="form-alert form-alert--error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg><?= e($error) ?></div>
    <?php endif; ?>

    <!-- Stats row -->
    <div class="fb-stats">
      <?php
      $total   = count($fields);
      $enabled = count(array_filter($fields, fn($f) => $f['enabled'] ?? true));
      $custom  = count(array_filter($fields, fn($f) => !($f['isDefault'] ?? false)));
      $disabled = $total - $enabled;
      ?>
      <div class="fb-stat"><strong><?= $total ?></strong><span>Total Fields</span></div>
      <div class="fb-stat fb-stat--green"><strong><?= $enabled ?></strong><span>Active Fields</span></div>
      <div class="fb-stat fb-stat--orange"><strong><?= $custom ?></strong><span>Custom Fields</span></div>
      <div class="fb-stat fb-stat--muted"><strong><?= $disabled ?></strong><span>Disabled</span></div>
    </div>

    <!-- Add field -->
    <section class="admin-form-card">
      <h2 class="admin-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" stroke-linecap="round"/></svg>
        Add Custom Field
      </h2>
      <form method="POST" class="admin-form fb-add-form" novalidate>
        <input type="hidden" name="action" value="add_field" />
        <div class="admin-form-grid">
          <div class="admin-field">
            <label for="fb_label">Field Label *</label>
            <input id="fb_label" name="label" placeholder="e.g. Date of Birth" required />
          </div>
          <div class="admin-field">
            <label for="fb_type">Field Type</label>
            <select id="fb_type" name="type" id="fbTypeSelect">
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="select">Dropdown</option>
              <option value="textarea">Textarea</option>
            </select>
          </div>
          <div class="admin-field">
            <label for="fb_section">Section</label>
            <select id="fb_section" name="section">
              <option value="personal">Personal Details</option>
              <option value="education">Education Details</option>
              <option value="support">Support Request</option>
            </select>
          </div>
          <div class="admin-field">
            <label for="fb_placeholder">Placeholder</label>
            <input id="fb_placeholder" name="placeholder" placeholder="Hint text inside the field" />
          </div>
          <div class="admin-field admin-field--full fb-options-row" id="optionsRow" style="display:none">
            <label for="fb_options">Options (one per line)</label>
            <textarea id="fb_options" name="options" rows="4" placeholder="Option 1&#10;Option 2&#10;Option 3"></textarea>
          </div>
          <div class="admin-field" style="display:flex;align-items:center;gap:1.5rem;padding-top:.5rem">
            <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-weight:600;font-size:.84rem">
              <input type="checkbox" name="required" style="width:16px;height:16px" /> Required
            </label>
            <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-weight:600;font-size:.84rem">
              <input type="checkbox" name="halfWidth" style="width:16px;height:16px" /> Half Width
            </label>
          </div>
        </div>
        <div class="admin-form-footer">
          <button type="submit" class="btn-primary">Add Field</button>
        </div>
      </form>
    </section>

    <!-- Manage fields -->
    <div class="admin-list-card" id="manage">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.25rem">
        <h2 class="admin-section-title" style="margin:0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h5M7 13h8M7 17h4" stroke-linecap="round"/></svg>
          Current Fields
        </h2>
        <form method="POST" onsubmit="return confirm('Reset all fields to defaults? Custom fields will be removed.')">
          <input type="hidden" name="action" value="reset" />
          <button type="submit" class="admin-delete-btn" style="font-size:.8rem">↺ Reset to Defaults</button>
        </form>
      </div>

      <?php foreach (['personal','education','support'] as $sec):
        $secFields = array_values(array_filter($fields, fn($f) => ($f['section'] ?? 'personal') === $sec));
        if (empty($secFields)) continue;
      ?>
      <div class="fb-section-group">
        <h3 class="fb-section-label"><?= $sectionLabels[$sec] ?? $sec ?></h3>
        <?php foreach ($secFields as $idx => $f):
          $enabled = $f['enabled'] ?? true;
        ?>
        <div class="fb-field-row <?= $enabled ? '' : 'fb-field-row--disabled' ?>">
          <div class="fb-field-drag">
            <form method="POST" style="display:contents">
              <input type="hidden" name="action" value="move" />
              <input type="hidden" name="field_id" value="<?= e($f['id']) ?>" />
              <input type="hidden" name="dir" value="up" />
              <button type="submit" class="fb-move-btn" <?= $idx === 0 ? 'disabled' : '' ?> title="Move up">↑</button>
            </form>
            <form method="POST" style="display:contents">
              <input type="hidden" name="action" value="move" />
              <input type="hidden" name="field_id" value="<?= e($f['id']) ?>" />
              <input type="hidden" name="dir" value="down" />
              <button type="submit" class="fb-move-btn" <?= $idx === count($secFields)-1 ? 'disabled' : '' ?> title="Move down">↓</button>
            </form>
          </div>
          <div class="fb-field-info">
            <strong><?= e($f['label']) ?></strong>
            <span class="fb-meta">
              <?= e(strtoupper($f['type'] ?? 'text')) ?>
              · <?= $f['halfWidth'] ? 'Half' : 'Full' ?> width
              <?php if ($f['required'] ?? false): ?> · <em>Required</em><?php endif; ?>
              <?php if (!($f['isDefault'] ?? false)): ?> · <span class="uni-custom-tag">Custom</span><?php endif; ?>
            </span>
          </div>
          <div class="fb-field-actions">
            <!-- Toggle enabled -->
            <form method="POST" style="display:inline">
              <input type="hidden" name="action" value="toggle" />
              <input type="hidden" name="field_id" value="<?= e($f['id']) ?>" />
              <button type="submit" class="admin-action-btn <?= $enabled ? 'admin-action-btn--active' : '' ?>">
                <?= $enabled ? '✓ Enabled' : '✗ Disabled' ?>
              </button>
            </form>
            <!-- Delete (custom only) -->
            <?php if (!($f['isDefault'] ?? false)): ?>
            <form method="POST" style="display:inline" onsubmit="return confirm('Delete this field?')">
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="field_id" value="<?= e($f['id']) ?>" />
              <button type="submit" class="admin-delete-btn">Delete</button>
            </form>
            <?php endif; ?>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<script>
  const typeSelect = document.getElementById('fbTypeSelect');
  const optRow = document.getElementById('optionsRow');
  if (typeSelect && optRow) {
    typeSelect.addEventListener('change', () => {
      optRow.style.display = typeSelect.value === 'select' ? 'block' : 'none';
    });
  }
</script>

<?php include dirname(__DIR__) . '/includes/admin-footer.php'; ?>
