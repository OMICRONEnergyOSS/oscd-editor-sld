import { sldThemeTokens } from '../theme.js';

// SLD theme tokens the artifacts consume via `style="…: var(--oscd-sld-…)"`.
// The export is monochrome by spec, so every token is pinned to black ink on a
// white surface (overriding the live theme) — the diagram markup keeps its
// var() references and just resolves to black/white once serialised.

/**
 * Pins the SLD tokens to a fixed black-on-white palette on the exported root so
 * the SVG is self-contained and monochrome regardless of the live theme. The
 * diagram markup keeps its `var()` references unchanged; surface resolves to
 * white, ink (`color` → `currentColor` symbols) and every other token to black.
 */
function forceMonochromeTokens(clone: Element): void {
  const declarations = [
    'color: black;',
    '--md-sys-color-surface: white;',
    '--md-sys-color-on-surface: black;',
  ];

  sldThemeTokens.forEach(token => declarations.push(`${token}: black;`));

  const style = clone.ownerDocument.createElementNS(
    'http://www.w3.org/2000/svg',
    'style',
  );
  style.textContent = `:root { ${declarations.join(' ')} }`;
  clone.insertBefore(style, clone.firstChild);
}

function cleanXML(element: Element): void {
  const cl = element.classList;

  if (
    cl.contains('handle') ||
    cl.contains('preview') ||
    cl.contains('port') ||
    (cl.contains('label') && cl.contains('container'))
  ) {
    element.remove();
    return;
  }

  if (cl.contains('voltagelevel') || cl.contains('bay')) {
    element.querySelector('rect')?.remove();
  }

  Array.from(element.childNodes).forEach((child) => {
    if (child.nodeType === 8) {
      element.removeChild(child);
    }

    if (child.nodeType === 1) {
      cleanXML(child as Element);
    }
  });
}

function downloadBlob(blob: Blob, filename: string): void {
  const a = document.createElement('a');

  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 5000);
}

/**
 * Produces the export-ready serialization of a rendered SLD SVG: clones the
 * source (never mutating it), pins a monochrome black-on-white palette, strips
 * the editor-only interaction chrome and whitespace-only text nodes, then
 * serializes the result to a string.
 *
 * This is the SLD "SVG out" capability — it encodes intimate knowledge of how
 * the viewer builds its SVG (which nodes are editing chrome, how colour is
 * themed), so it is owned by the viewer (its sole caller via `exportableSvg()`).
 * It performs no I/O; deciding to package the string as a file is a separate,
 * higher-level concern (see `downloadSvg`).
 */
export function serializeForExport(svg: Element): string {
  const exportedSvg = svg.cloneNode(true) as Element;

  forceMonochromeTokens(exportedSvg);
  cleanXML(exportedSvg);

  return new XMLSerializer().serializeToString(exportedSvg);
}

/**
 * Packages an already-serialized SVG string as a file and triggers a browser
 * download. This is a pure environment/output side-effect with no SLD or
 * rendering knowledge — isolated here so the "file sink" can later move to the
 * host plugin (or be swapped for the File System Access API, clipboard, etc.)
 * without touching the viewer.
 */
export function downloadSvg(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'application/xml' });

  downloadBlob(blob, filename);
}
