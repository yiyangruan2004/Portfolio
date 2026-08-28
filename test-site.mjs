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
