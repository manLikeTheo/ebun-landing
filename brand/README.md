# SendEbun colour profile

Version 1 — forest, amber and ivory. Approved landing-page direction, October 2026.

## Files to take to the main platform

- `colors.json` is the source of truth: portable hex colours for web, mobile and design tools.
- `tokens.css` is the generated, framework-independent CSS custom-property version.
- `../scripts/brand-tokens.mjs` regenerates CSS from JSON. Keep it if you want the same workflow.
- The landing-page `tailwind.config.ts` shows the Tailwind v3 mapping.

Copy these files into the main platform and import `tokens.css` once in its global entry point. Do not copy this landing page's layouts, business logic or Tailwind configuration wholesale. Map the colours to the platform's existing semantic tokens.

After changing `colors.json`, run `npm run brand:tokens`. Run `npm run brand:check` to detect stale generated CSS. Do not edit `tokens.css` by hand.

## Palette and intended roles

| Token | Hex | Use |
| --- | --- | --- |
| background | #091C17 | Main forest-black canvas |
| surface | #10271F | Cards, forms and modal surfaces |
| surfaceRaised | #17382C | Elevated surfaces and card hover |
| deep | #071711 | Footer and dark navigation |
| amber | #FFAE00 | Primary actions and the Ebun wordmark accent |
| amberHover | #FFBF38 | Primary-action hover |
| gold | #E4B454 | Editorial highlights, icons and secondary actions |
| goldLight | #F0CB7C | Focus rings and highlighted links |
| goldDark | #BE9649 | Subdued decorative gold |
| goldBronze | #68542E | Decorative only; not body text |
| goldChampagne | #F3E2BC | Reveal highlights |
| text | #F5F1E7 | Main text on dark backgrounds |
| textSecondary | #C1CDC3 | Descriptions and secondary text |
| textMuted | #ABBEB1 | Supporting labels on dark backgrounds |
| error | #F0A295 | Error messages; accompany with text |
| success | #91C9A7 | Success states; accompany with text |
| logoGreen | #004B35 | Approximate supporting logo green on light surfaces |

These are UI theme values, not certified colour samples from an original vector logo or a print ICC profile. The supplied raster logo has tonal variation. Retain the original artwork and request a vector master before specifying print colours or Pantone equivalents.

## Usage rules

1. Let forest surfaces dominate. Use amber for important actions, not large background panels.
2. Use dark `background` text on amber buttons. Never use ivory or white button text on amber.
3. Gold is separate from amber: headings and secondary details use gold; primary buttons use amber.
4. Keep body copy opaque and readable. Lower-opacity gold borders are decorative, not sufficient by themselves to identify form fields or focus states.
5. Pair errors, success and selection with text or an icon; never rely on colour alone.
6. Keep the existing hero video and motion. Colour changes do not require new page layouts.

Calculated WCAG contrast ratios for solid colours (not a full accessibility audit):

| Foreground / background | Ratio |
| --- | --- |
| text / background | 15.64:1 |
| textMuted / surfaceRaised | 6.55:1 |
| gold / background | 9.21:1 |
| background / amber | 9.50:1 |
| text / amber — do not use | 1.65:1 |

Opacity, gradients, images, disabled states and small text need their own checks.

## Framework-independent example

```css
@import './brand/tokens.css';

.platform-page {
  background: var(--sendebun-background);
  color: var(--sendebun-text);
}
.platform-card { background: var(--sendebun-surface); }
.platform-primary-button {
  background: var(--sendebun-amber);
  color: var(--sendebun-background);
}
.platform-primary-button:hover { background: var(--sendebun-amberHover); }
.platform-primary-button:focus-visible {
  outline: 2px solid var(--sendebun-goldLight);
  outline-offset: 4px;
}
```

The CSS also exports legacy aliases such as `--ink`, `--cream` and `--gold` for existing landing-page components. New platform code should favour semantic `--sendebun-*` variables.

## Typography and logo

- Cormorant Garamond: editorial headings; DM Sans: interface text, buttons and forms.
- Original supplied artwork: `public/brand/sendebun-logo-original.png`.
- `BrandLogo.tsx` frames the original symbol on a light tile alongside a cream/amber text wordmark, as approved in the preview. It does not recolour or redraw the original image.
- `app/icon.tsx` uses the same symbol crop for the browser tab.
- Use the original green lettering on light surfaces. Do not put dark-green lettering directly on the forest background.

## Scope

This profile is applied to the landing page, waitlist and survey in this repository. Copying the profile alone will not restyle a separate platform: its existing components must be mapped to these tokens. Payments, gift-delivery logic, database keys and storage identifiers are not part of this theme change.
