import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(name, import.meta.url), 'utf8');

test('portfolio has both project cards and project-media placeholders', () => {
  assert.equal(existsSync(new URL('index.html', import.meta.url)), true);
  assert.equal(existsSync(new URL('styles.css', import.meta.url)), true);

  const page = read('index.html');
  assert.match(page, /<title>Yiyang Ruan \| Engineering Portfolio<\/title>/);
  assert.match(page, /Calibration Stage Project/);
  assert.match(page, /USDOT/);
  assert.match(page, /class="project-figure"/);
  assert.match(page, /Project figure to be added/);
  assert.match(page, /Demo UI link coming soon/);
  assert.match(page, /href="styles\.css"/);
});

test('stylesheet has a mobile layout and keyboard focus treatment', () => {
  assert.equal(existsSync(new URL('styles.css', import.meta.url)), true);

  const styles = read('styles.css');
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(styles, /:focus-visible/);
});

test('README has exactly the two required sections', () => {
  assert.equal(existsSync(new URL('README.md', import.meta.url)), true);

  const headings = read('README.md').match(/^## .+$/gm) ?? [];
  assert.deepEqual(headings, ['## Significance and method', '## Repository structure']);
});

test('page uses a restrained academic navigation and section-based project layout', () => {
  const page = read('index.html');
  const styles = read('styles.css');

  assert.match(page, /<header class="site-header">/);
  assert.match(page, /<nav class="site-nav" aria-label="Primary">/);
  assert.match(page, /href="#about">About<\/a>/);
  assert.match(page, /href="#calibration-stage">Calibration Stage<\/a>/);
  assert.match(page, /href="#usdot">USDOT<\/a>/);
  const aboutIndex = page.indexOf('<section class="about-section" id="about"');
  const calibrationIndex = page.indexOf('<section class="project-section" id="calibration-stage"');
  const usdotIndex = page.indexOf('<section class="project-section" id="usdot"');
  assert.ok(aboutIndex >= 0 && aboutIndex < calibrationIndex && calibrationIndex < usdotIndex);
  assert.match(page, /About placeholder/);
  assert.match(styles, /\.site-header/);
  assert.match(styles, /\.project-section/);
  assert.match(styles, /border-top: 1px solid var\(--line\)/);
  assert.doesNotMatch(styles, /box-shadow/);
  assert.doesNotMatch(styles, /linear-gradient/);
});

test('page includes an accessible profile side panel with contact placeholders', () => {
  const page = read('index.html');
  const styles = read('styles.css');

  assert.match(page, /<aside class="profile-panel" aria-labelledby="profile-title">/);
  assert.match(page, /class="selfie-placeholder"[^>]*>Selfie placeholder<\/div>/);
  assert.match(page, /<section class="contact-block" aria-labelledby="contact-title">/);
  assert.match(page, /id="contact-title">Contact<\/h3>/);
  assert.match(page, /Location placeholder/);
  assert.match(page, /mailto:email@example\.com/);
  assert.match(styles, /\.page-layout/);
  assert.match(styles, /\.profile-panel/);
  assert.match(styles, /@media \(max-width: 900px\)/);
});
