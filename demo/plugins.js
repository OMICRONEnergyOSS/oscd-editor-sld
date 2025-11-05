import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';
import OscdBackgroundWizardEvents from '@omicronenergy/oscd-background-wizard-events/oscd-background-wizard-events.js';

import OscdEditorSLD from '../oscd-editor-sld.js';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-menu-save', OscdMenuSave);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);
customElements.define('oscd-background-editv1', OscdBackgroundWizardEvents);

customElements.define('oscd-editor-sld', OscdEditorSLD);

export const plugins = {
  menu: [
    {
      name: 'Open File',
      translations: { de: 'Datei öffnen' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save File',
      translations: { de: 'Datei speichern' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
    },
  ],
  editor: [
    {
      name: 'Single Line Diagram',
      translations: {
        de: 'Single Line Diagram',
      },
      icon: 'add_box',
      tagName: 'oscd-editor-sld',
    },
  ],
  background: [
    {
      name: 'EditV1 Events Listener',
      tagName: 'oscd-background-editv1',
      icon: 'none',
      requireDoc: true,
    },
    {
      name: 'Background Plugin for Wizard Events',
      tagName: 'oscd-background-wizard-events',
      icon: 'none',
      requireDoc: true,
    },
  ],
};
