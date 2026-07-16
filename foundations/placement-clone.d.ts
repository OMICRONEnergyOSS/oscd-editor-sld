/**
 * Placement-clone construction.
 *
 * Building the stand-alone preview copy for a copy-placement is an edit-model
 * concern (UUID reassignment, connectivity pruning), not a rendering one: the
 * view merely decides *that* a copy should happen (e.g. shift-click) and emits
 * a `copy` placement intent; the editor calls this to construct the clone. It
 * therefore lives outside the viewer-safe `sld-placement.ts` (which holds only
 * the read-only placement/resize validation rules).
 */
/**
 * Deep-clones an SCL element into a stand-alone preview copy suitable for
 * placement: it strips IED references from containers, prunes connectivity to
 * foreign elements, and assigns fresh terminal/vertex UUIDs so the clone can be
 * positioned without colliding with the source topology.
 */
export declare function copyElementForPlacement(element: Element, nsp: string): Element;
