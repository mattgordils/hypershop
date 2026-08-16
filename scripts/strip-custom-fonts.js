#!/usr/bin/env node
/**
 * Strip (or restore) the merchant-uploaded custom-font feature.
 *
 * The Shopify Theme Store prohibits custom fonts ("All fonts must use the
 * setting type font_picker" / "Custom fonts aren't accepted."), so this feature
 * must be physically absent from a Theme Store submission — a runtime toggle is
 * not enough because reviewers read the schema and Liquid source.
 *
 * STORE_BUILD only affects webpack (JS/CSS), never Liquid, so we strip the
 * Liquid/JSON here instead.
 *
 *   node scripts/strip-custom-fonts.js            # strip (backs up first)
 *   node scripts/strip-custom-fonts.js --restore  # restore from backup
 *
 * See README-custom-fonts.md for the full workflow.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(root, 'snippets', 'theme-settings.liquid'),
  path.join(root, 'config', 'settings_schema.json'),
];
const backupDir = path.join(__dirname, '.custom-fonts-backup');

const START = 'CUSTOM_FONTS_START';
const END = 'CUSTOM_FONTS_END';
const rel = (f) => path.relative(root, f);

function restore() {
  if (!fs.existsSync(backupDir)) {
    console.error('No backup found at scripts/.custom-fonts-backup — nothing to restore.');
    process.exit(1);
  }
  for (const file of TARGETS) {
    const bak = path.join(backupDir, path.basename(file));
    if (fs.existsSync(bak)) {
      fs.copyFileSync(bak, file);
      console.log(`Restored ${rel(file)}`);
    }
  }
  fs.rmSync(backupDir, { recursive: true, force: true });
  console.log('✓ Custom-font feature restored.');
}

function strip() {
  fs.mkdirSync(backupDir, { recursive: true });
  for (const file of TARGETS) {
    fs.copyFileSync(file, path.join(backupDir, path.basename(file)));
  }

  // theme-settings.liquid — remove the CUSTOM_FONTS_START…END region (inclusive).
  const liquidFile = TARGETS[0];
  const liquidBefore = fs.readFileSync(liquidFile, 'utf8');
  const region = new RegExp(`\\n?[^\\n]*${START}[\\s\\S]*?${END}[^\\n]*`, 'g');
  const liquidAfter = liquidBefore.replace(region, '');
  if (liquidAfter === liquidBefore) {
    console.warn(`WARNING: no ${START}…${END} region found in ${rel(liquidFile)}`);
  }
  fs.writeFileSync(liquidFile, liquidAfter);

  // settings_schema.json — drop the setting DEFINITION lines whose "id" starts
  // with a custom-font prefix (custom_font_… URL fields and the use_uploaded_font_…
  // toggles). Lines that only REFERENCE those ids in visible_if survive because
  // the match requires the "id": prefix, so the surviving font_picker rules keep
  // their visible_if — which safely evaluates to "true" (i.e. picker visible)
  // when the referenced toggle is missing (nil != true = true). The leading-comma
  // JSON style ensures removing entries keeps the file valid.
  const schemaFile = TARGETS[1];
  const stripIdPattern = /"id"\s*:\s*"(custom_font_|use_uploaded_font_)/;
  // Also strip visible_if attributes that reference the toggles we're removing —
  // otherwise the surviving font_picker lines fail theme-check's ValidVisibleIf
  // (variable-not-found) after strip, which can trip up Theme Store review.
  const stripVisibleIfPattern = /\s*,\s*"visible_if"\s*:\s*"[^"]*use_uploaded_font_[^"]*"/g;
  const lines = fs.readFileSync(schemaFile, 'utf8').split('\n');
  const kept = lines
    .filter((l) => !stripIdPattern.test(l))
    .map((l) => l.replace(stripVisibleIfPattern, ''));
  const removed = lines.length - kept.length;
  const schemaAfter = kept.join('\n');
  JSON.parse(schemaAfter); // fail loudly if we produced invalid JSON
  fs.writeFileSync(schemaFile, schemaAfter);

  console.log(`Stripped ${START}…${END} region from ${rel(liquidFile)}`);
  console.log(`Removed ${removed} custom-font setting line(s) from ${rel(schemaFile)}`);
  console.log('✓ Store-safe state ready. Run "npm run restore:custom-fonts" when done pushing.');
}

if (process.argv.includes('--restore')) restore();
else strip();
