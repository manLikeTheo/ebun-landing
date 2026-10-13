import { readFileSync, writeFileSync } from 'node:fs';

const colors = JSON.parse(readFileSync(new URL('../brand/colors.json', import.meta.url), 'utf8'));
const aliases = {
  ink: 'background', 'ink-2': 'surface', 'ink-3': 'surfaceRaised', 'ink-deep': 'deep',
  gold: 'gold', 'gold-lt': 'goldLight', 'gold-dk': 'goldDark', 'gold-bronze': 'goldBronze',
  'gold-champagne': 'goldChampagne', amber: 'amber', 'amber-hover': 'amberHover',
  cream: 'text', muted: 'textMuted', 'muted-strong': 'textSecondary',
};
const lines = ['/* Generated from brand/colors.json. Run npm run brand:tokens. */', ':root {'];
for (const [name, hex] of Object.entries(colors)) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`Invalid color: ${name}`);
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',');
  lines.push(`  --sendebun-${name}: ${hex};`, `  --sendebun-${name}-rgb: ${rgb};`);
}
for (const [alias, name] of Object.entries(aliases)) {
  lines.push(`  --${alias}: var(--sendebun-${name});`, `  --${alias}-rgb: var(--sendebun-${name}-rgb);`);
}
lines.push('}', '');
const css = lines.join('\n');
const destination = new URL('../brand/tokens.css', import.meta.url);
if (process.argv.includes('--check')) {
  // Git may check text files out as CRLF on Windows; that is not token drift.
  if (readFileSync(destination, 'utf8').replace(/\r\n/g, '\n') !== css) throw new Error('Brand tokens are out of sync. Run npm run brand:tokens.');
  console.log('Brand CSS matches colors.json.');
} else {
  writeFileSync(destination, css);
  console.log('Generated brand/tokens.css.');
}
