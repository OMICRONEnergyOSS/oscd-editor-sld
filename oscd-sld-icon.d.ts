import { type SVGTemplateResult, type TemplateResult } from 'lit';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
/**
 * SLD-specific icon registry.
 *
 * Lookup order: SLD_ICONS → SCL_ICONS (via OscdIcon) → Material Symbols.
 * When the icon consolidation discussion concludes, these entries can be
 * merged into SCL_ICONS and this component replaced with plain OscdIcon.
 */
export declare const SLD_ICONS: Record<string, SVGTemplateResult>;
/**
 * Icon component for the SLD editor.
 *
 * Checks {@link SLD_ICONS} first, then falls back to `OscdIcon` which
 * handles SCL_ICONS → Material Symbols.
 *
 * Usage is identical to `<oscd-icon>`:
 * ```html
 * <oscd-sld-icon>sld_move</oscd-sld-icon>   <!-- SLD icon -->
 * <oscd-sld-icon>gooseIcon</oscd-sld-icon>   <!-- SCL icon (fallback) -->
 * <oscd-sld-icon>edit</oscd-sld-icon>        <!-- Material (fallback) -->
 * ```
 */
export declare class OscdSldIcon extends OscdIcon {
    private _sldName;
    private _sldObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _updateSldName;
    protected render(): TemplateResult<1>;
}
