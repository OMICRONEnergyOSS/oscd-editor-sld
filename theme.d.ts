/**
 * Themeable colour tokens for the SLD editor.
 *
 * The model mirrors `@omicronenergy/oscd-shell` (see its THEMING.md):
 *
 * 1. **Foundation palette** — our internal `--oscd-base03 … --oscd-base3`,
 *    `--oscd-primary`, `--oscd-secondary`, `--oscd-error`/`--oscd-warning` are
 *    initialised from the host's public `--oscd-theme-*` tokens, falling back
 *    to the documented oscd-shell defaults. This makes the plugin pick up a
 *    distro's theme when embedded in the shell, yet still render sensibly when
 *    used standalone (where the shell's tokens are absent).
 *
 * 2. **SLD brand palette** — `--oscd-sld-red|yellow|blue`, the diagram's own
 *    identity colours, overridable via the public `--oscd-editor-sld-*` hooks.
 *
 * 3. **SLD semantic tokens** — what the components actually consume, named for
 *    their role and each resolving (public hook → brand/foundation token) so
 *    they can be retuned individually or swept via the palette.
 *
 * Generic surfaces and text are *not* given bespoke SLD tokens: components
 * reference the standard `--md-sys-color-*` variables directly, with a
 * foundation-token fallback for standalone use.
 *
 * Included in each top-level component's `static styles` so the tokens resolve
 * the same whether a component is used inside the editor or on its own; custom
 * properties inherit through shadow DOM, so an override set above any of them
 * still wins.
 */
/**
 * Every colour token declared by {@link sldThemeStyles}. The export serialiser
 * pins each one's runtime-resolved value onto the exported SVG root so the
 * standalone file's `var()` references keep their (possibly distro-themed)
 * values. Kept here as the single source of truth next to the declarations —
 * an all-or-nothing dump; a few unused tokens cost nothing and beat curating.
 */
export declare const sldThemeTokens: string[];
export declare const sldThemeStyles: import("lit").CSSResult;
