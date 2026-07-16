import { LitElement } from 'lit';
import { SldEditor } from './sld-editor.js';
import { SldToolbar } from './toolbar/sld-toolbar.js';
import SldMigrationNotice from './sld-migration-notice.js';
declare const OscdEditorSld_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
export default class OscdEditorSld extends OscdEditorSld_base {
    static scopedElements: {
        'sld-editor': typeof SldEditor;
        'sld-toolbar': typeof SldToolbar;
        'sld-migration-notice': typeof SldMigrationNotice;
    };
    doc: XMLDocument;
    docVersion: number;
    gridSize: number;
    get nsp(): string;
    templateElements: Record<string, Element>;
    inAction: boolean;
    private _showLabels;
    get showLabels(): boolean;
    private _showIeds;
    get showIeds(): boolean;
    sldEditor?: SldEditor;
    zoomIn(): void;
    zoomOut(): void;
    startBayTypicalPlacing({ bayTypical, ieds, }: {
        bayTypical: Element;
        ieds: Element[];
    }): Promise<void>;
    willUpdate(changedProperties: Map<string, unknown>): void;
    convertSldAttributes(): void;
    /**
     * Intercepts `oscd-edit-v2` events bubbling up from the editor and toolbar and,
     * when the edit writes SLD-layout content to a document that does not yet
     * declare the namespace, re-emits it with the declaration prepended (one
     * undoable commit). Re-dispatching on the root — an ancestor of both children
     * — means the replacement never re-enters this listener, so no loop guard is
     * needed. This is the single place that enforces the namespace for child
     * edits; the root's own edits (insertIed, convertSldAttributes) apply it
     * directly at their dispatch sites.
     */
    private normalizeEditsWithSldNS;
    private handleInAction;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};
