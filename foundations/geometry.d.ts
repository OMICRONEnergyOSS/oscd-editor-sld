/**
 * Pure rectangle and point math.
 *
 * All functions here operate on numeric tuples (Rect, Point) with no
 * knowledge of DOM Elements or SCL structure.
 */
export type Point = [number, number];
export type Rect = [number, number, number, number];
export declare function contains([x1, y1, w1, h1]: Rect, [x2, y2, w2, h2]: Rect): boolean;
export declare function overlaps([x1, y1, w1, h1]: Rect, [x2, y2, w2, h2]: Rect): boolean;
export declare function distance([x1, y1]: Point, [x2, y2]: Point): number;
export declare function findIntersection(p1: Point, p2: Point, lp1: Point, lp2: Point): Point;
/**
 * Extend a connection path with a newly committed waypoint while the user is
 * drawing a connection.
 *
 * A connection path is the list of orthogonal waypoints running from the source
 * terminal to the cursor. Its *final* point is provisional: it tracks the live
 * cursor so the in-progress segment can be previewed as the user moves the
 * mouse. Committing a waypoint is therefore not a plain append — the provisional
 * last point must first be **replaced** by `corner` (the now-fixed bend where
 * the previewed segment turns), and only then are the new live endpoints
 * (`rest`) appended so the path keeps tracking the cursor from the new bend.
 *
 * The result is normalised with {@link cleanPath}, which drops any duplicate or
 * collinear points the new bend may have introduced.
 *
 * @param path - the current connection path
 * @param corner - the fixed bend that replaces the provisional last waypoint
 * @param rest - the new live endpoint(s) extending the path past the bend
 * @returns the extended, normalised path
 */
export declare function extendConnectPointPaths(path: Point[], corner: Point, ...rest: Point[]): Point[];
/**
 * The single 90° bend that keeps an orthogonal connection path going from its
 * last committed waypoint toward a `target` point.
 *
 * A connection path's last two points play two distinct roles. `lastFixed`
 * (second-to-last) is the **anchor** the bend is drawn from — the returned
 * `corner` reuses one of its coordinates. The final, `provisional` point is used
 * **only** to reveal the orientation of the segment that arrived at `lastFixed`
 * (by comparing their x's); its coordinates are never used directly. A single
 * point could not tell us that orientation, hence both are needed.
 *
 * The path leaves `lastFixed` continuing in that **same** orientation, then
 * bends once at `corner` to line up with the `target`:
 *
 * ```text
 *   last segment horizontal          last segment vertical
 *   ───▶ lastFixed                    lastFixed
 *              │ (turn down)               └────▶ corner ─▶ target
 *              ▼                        (keep going, then turn across)
 *         corner ──▶ target
 * ```
 *
 * @param path - the current connection path (needs at least its last two points)
 * @param target - the point the bent path should line up with
 * @returns the bend `corner`
 */
export declare function elbowCorner(path: Point[], target: Point): Point;
/**
 * Compute the live "elbow" that previews the in-progress segment of a
 * connection as it follows the cursor.
 *
 * The bend is {@link elbowCorner} toward the target. The target is the bare
 * `cursor`, unless it hovers a snap target that supplies its own `far` approach
 * point and `near` terminal endpoint (the preview then runs
 * `corner → far → near`; without a snap target `far` and `near` are both the
 * cursor, i.e. the `far → near` stub has zero length).
 *
 * The returned `corner`, `far`, `near` are exactly the points
 * {@link extendConnectPointPaths} commits on click, so the preview and the
 * committed geometry cannot drift apart.
 *
 * @param path - the current connection path (needs at least its last two points)
 * @param cursor - the live cursor position
 * @param snap - optional snap-target endpoints (`far` approach, then `near` terminal)
 * @returns the bend `corner` and the `far`/`near` endpoints of the preview
 */
export declare function connectPreviewElbow(path: Point[], cursor: Point, snap?: {
    near: Point;
    far: Point;
}): {
    corner: Point;
    far: Point;
    near: Point;
};
export declare function cleanPath(path: Point[]): void;
