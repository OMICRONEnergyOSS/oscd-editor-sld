export declare function isIedReferenceElement(element: Element): boolean;
export declare function iedReferences(root: XMLDocument | Element): Element[];
/** Returns SLD IED references whose target IED no longer exists. */
export declare function unresolvedIedReferences(root: XMLDocument | Element): Element[];
export declare function resolveIed(referencedIed: Element): Element | null;
