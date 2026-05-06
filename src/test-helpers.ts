/**
 * Shared test utilities for computing viewport positions from SVG grid
 * coordinates. These helpers dynamically resolve pixel positions based on
 * the SVG element's bounding rect and viewBox, eliminating cross-browser
 * failures caused by hardcoded pixel offsets.
 */

/**
 * Return the `#sld` SVG element from a SldSubstationEditor shadow root.
 */
export function findSubstationSvgRoot(
  substationEditor: Element,
): SVGSVGElement {
  const svg =
    substationEditor.shadowRoot!.querySelector<SVGSVGElement>('svg#sld');
  if (!svg) {
    throw new Error('Could not find svg#sld in SldSubstationEditor');
  }
  return svg;
}

/**
 * Convert a grid cell position to browser viewport pixel coordinates.
 * Targets the center of the cell so that `Math.floor(svgX)` yields
 * the correct integer grid position.
 */
export function gridPosToViewportCoords(
  svg: SVGSVGElement,
  gx: number,
  gy: number,
): [number, number] {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [
    Math.floor(rect.left + ((gx + 0.5 - vb.x) / vb.width) * rect.width),
    Math.floor(rect.top + ((gy + 0.5 - vb.y) / vb.height) * rect.height),
  ];
}

/**
 * Convert SCL label storage coordinates (lx, ly) to browser viewport
 * pixel coordinates. Inverts the component's label storage formula:
 *   lx = mouseX2 - 0.5,  ly = mouseY2 + 0.5
 * to determine where to click so the label ends up at (lx, ly).
 */
export function sclLabelToViewportCoords(
  svg: SVGSVGElement,
  lx: number,
  ly: number,
): [number, number] {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  const svgX = lx + 0.5;
  const svgY = ly - 0.5;
  return [
    Math.round(rect.left + ((svgX - vb.x) / vb.width) * rect.width),
    Math.round(rect.top + ((svgY - vb.y) / vb.height) * rect.height),
  ];
}

/**
 * Convert exact SVG coordinates to browser viewport pixel coordinates.
 * Use when half-grid precision (mouseX2/mouseY2) matters, e.g. for
 * connection vertex placement.
 */
export function svgToViewportCoords(
  svg: SVGSVGElement,
  svgX: number,
  svgY: number,
): [number, number] {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [
    Math.round(rect.left + ((svgX - vb.x) / vb.width) * rect.width),
    Math.round(rect.top + ((svgY - vb.y) / vb.height) * rect.height),
  ];
}

// ─── Frequently used grid coordinate pairs ───────────────────────────────────

/** Position of the VoltageLevel in voltageLevelDocString (x=1, y=1) */
export const vlOrigin: [number, number] = [1, 1];

/** Bottom-right resize target for VL from vlOrigin to w=8, h=7 */
export const vlResizeBR: [number, number] = [8, 7];

/** Standard top-left corner for placing new elements (VL, bay, bus bar) */
export const placeTL: [number, number] = [5, 3];

/** Standard bottom-right resize corner from placeTL giving w=7, h=8 */
export const placeBR: [number, number] = [11, 10];

/** Equipment position in equipmentDocString (x=4, y=4) */
export const eqPos: [number, number] = [4, 4];

/** Common target for equipment move/copy (x=3, y=3) */
export const eqTarget: [number, number] = [3, 3];
