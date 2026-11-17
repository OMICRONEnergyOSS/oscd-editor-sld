[![Tests](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-editor-sld)

# oscd-editor-sld

An [OpenSCD](https://openscd.org) plugin for designing IEC 61850 single line
diagrams (SLDs), together with the reusable web components it is built from.

## What is this?

This is an [OpenSCD](https://openscd.org) plugin. Start up a demo server with `npm run start` and see for yourself!

## Using this package in your project

Install from npm:

```bash
npm install @omicronenergy/oscd-editor-sld
```

The package publishes three entry points plus a shared helper module:

| Import | Exported member | Use it for |
| --- | --- | --- |
| `@omicronenergy/oscd-editor-sld` | `OscdEditorSld` (default) | The full OpenSCD editor plugin (toolbar, IED import, namespace enforcement). |
| `@omicronenergy/oscd-editor-sld/sld-editor.js` | `SldEditor` | The interactive editor canvas on its own. |
| `@omicronenergy/oscd-editor-sld/sld-substation-viewer.js` | `SldSubstationViewer` | A read-only diagram of a single `Substation`. |
| `@omicronenergy/oscd-editor-sld/foundations.js` | types & helpers (`Point`, `EqType`, `sldNs`, edit builders, …) | Building integrations around the components. |

These components use
[`@open-wc/scoped-elements`](https://open-wc.org/docs/development/scoped-elements/),
so you need the scoped custom element registry polyfill loaded **once** in your
app, and — because the library deliberately does not self-register — you pick the
tag name yourself:

```js
// Load once, before defining any scoped-element component.
import '@webcomponents/scoped-custom-element-registry';

import { SldSubstationViewer } from '@omicronenergy/oscd-editor-sld/sld-substation-viewer.js';

customElements.define('sld-substation-viewer', SldSubstationViewer);

const doc = new DOMParser().parseFromString(sclText, 'application/xml');
const viewer = document.createElement('sld-substation-viewer');
viewer.doc = doc;
viewer.substation = doc.querySelector(':root > Substation');
viewer.docVersion = 1;
viewer.showLabels = true;
viewer.showIeds = true;
document.body.appendChild(viewer);
```

`SldEditor` is wired the same way; it emits `oscd-edit-v2`
([`@openscd/oscd-api`](https://www.npmjs.com/package/@openscd/oscd-api)) events
that the embedding application is expected to apply to the document. See
[`demo/viewer-demo.html`](demo/viewer-demo.html) and
[`demo/editor-demo.html`](demo/editor-demo.html) for complete, runnable
examples, and [ARCHITECTURE.md](ARCHITECTURE.md) for how the viewer and editor
tiers cooperate.

### Additional substation resize validation

Set `SldEditor.validateSubstationResize` to a synchronous callback receiving
`(substation, width, height, dimension)`, where dimensions are numbers and
`dimension` is `'width'` or `'height'`. It runs on input changes and Resize.
Return a non-empty string to show an inline error and block resizing; otherwise,
built-in validation applies.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

> This demo plugin does nothing much that could be tested as it relies exclusively on built-in browser components to do its job. We therefore currently have no tests. If you find something that could be tested, please feel free!

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Theming

The diagram's colours are exposed as `--oscd-editor-sld-*` CSS custom properties
that fall back to the OpenSCD shell theme. See [THEMING.md](THEMING.md) for the
full list of override hooks and what they affect.

&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
