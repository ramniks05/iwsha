<?php
// Expects $f (field config array) and $fieldIcons (array of icon SVGs)
$iconSvg = $fieldIcons[$f['icon']] ?? '';
$req     = !empty($f['required']);
$type    = $f['type'] ?? 'text';
?>
<label class="modern-field">
  <span class="modern-field-label">
    <?= e($f['label']) ?>
    <?php if ($req): ?><span class="modern-field-required">*</span><?php endif; ?>
  </span>
  <div class="modern-field-control<?= $iconSvg ? ' modern-field-control--icon' : '' ?>">
    <?php if ($iconSvg): ?>
    <span class="modern-field-icon" aria-hidden="true"><?= $iconSvg ?></span>
    <?php endif; ?>

    <?php if ($type === 'textarea'): ?>
    <textarea
      name="<?= e($f['id']) ?>"
      placeholder="<?= e($f['placeholder'] ?? '') ?>"
      <?= $req ? 'required' : '' ?>
      rows="4"
    ></textarea>

    <?php elseif ($type === 'select'): ?>
    <select name="<?= e($f['id']) ?>" <?= $req ? 'required' : '' ?>>
      <option value="" disabled selected><?= e($f['placeholder'] ?? 'Select...') ?></option>
      <?php foreach ($f['options'] ?? [] as $opt): ?>
      <option value="<?= e($opt) ?>"><?= e($opt) ?></option>
      <?php endforeach; ?>
    </select>

    <?php else: ?>
    <input
      type="<?= e($type) ?>"
      name="<?= e($f['id']) ?>"
      placeholder="<?= e($f['placeholder'] ?? '') ?>"
      <?= $req ? 'required' : '' ?>
    />
    <?php endif; ?>
  </div>
</label>
