/**
 * Produces the export-ready serialization of a rendered SLD SVG: clones the
 * source (never mutating it), pins a monochrome black-on-white palette, strips
 * the editor-only interaction chrome, and pretty-prints the result to a string.
 *
 * This is the SLD "SVG out" capability — it encodes intimate knowledge of how
 * the viewer builds its SVG (which nodes are editing chrome, how colour is
 * themed), so it is owned by the viewer (its sole caller via `exportableSvg()`).
 * It performs no I/O; deciding to package the string as a file is a separate,
 * higher-level concern (see `downloadSvg`).
 */
export declare function serializeForExport(svg: Element): string;
/**
 * Packages an already-serialized SVG string as a file and triggers a browser
 * download. This is a pure environment/output side-effect with no SLD or
 * rendering knowledge — isolated here so the "file sink" can later move to the
 * host plugin (or be swapped for the File System Access API, clipboard, etc.)
 * without touching the viewer.
 */
export declare function downloadSvg(content: string, filename: string): void;
