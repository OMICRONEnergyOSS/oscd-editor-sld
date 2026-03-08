import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';
import OscdBackgroundWizardEvents from '@omicronenergy/oscd-background-wizard-events/oscd-background-wizard-events.js';
import OscdEditorSource from '@omicronenergy/oscd-editor-source';
import OscdEditorSld from '../dist/oscd-editor-sld.js';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-menu-save', OscdMenuSave);
customElements.define('oscd-editor-source', OscdEditorSource);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);
customElements.define(
  'oscd-background-wizard-events',
  OscdBackgroundWizardEvents
);

customElements.define('oscd-editor-sld', OscdEditorSld);

export const plugins = {
  menu: [
    {
      name: 'Open project',
      translation: {
        de: 'Project öffnen',
      },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save project',
      translation: {
        de: 'Projekt speichern',
      },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
    },
    {
      name: 'Import IED',
      translation: {
        de: 'Projekt speichern',
      },
      icon: 'snippet_folder',
      active: true,
      requireDoc: true,
      src: 'https://openenergytools.github.io/scl-editor/plugins/scl-import-ied/scl-import-ied.js',
    },
  ],
  editor: [
    {
      name: 'SLD',
      translations: {
        de: 'SLD',
      },
      icon: 'add_box',
      active: true,
      tagName: 'oscd-editor-sld',
    },
    {
      name: 'Source Editor',
      translations: { de: 'Source Editor' },
      icon: 'code',
      requireDoc: true,
      tagName: 'oscd-editor-source',
    },
  ],
  background: [
    {
      name: 'EditV1 Events Listener',
      icon: 'none',
      requireDoc: true,
      tagName: 'oscd-background-editv1',
    },
    {
      name: 'Wizard dialog Events Listener',
      icon: 'none',
      requireDoc: true,
      tagName: 'oscd-background-wizard-events',
    },
  ],
};
