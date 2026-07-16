import type { EditV2 } from '@openscd/oscd-api';
/** Builds edits to remove a connectivity node or busbar and its dependent terminal references. */
export declare function removeNode(node: Element): EditV2[];
/** Builds edits to move an element to a new parent and repair affected connectivity paths. */
export declare function reparentElement(element: Element, parent: Element): EditV2[];
/** Builds edits to detach a terminal or neutral point and heal orphaned connectivity geometry. */
export declare function removeTerminal(terminal: Element): EditV2[];
/** Returns a unique name for an element under a parent, preserving its current name when possible. */
export declare function uniqueName(element: Element, parent: Element): string;
