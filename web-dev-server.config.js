// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

// const hmr = process.argv.includes('--hmr');

//Details & options: https://modern-web.dev/docs/dev-server/overview/
export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: './demo/',
  rootDir: './',
  // watch vs hmr:
  // Unfortunately hmr with Web Components is still a bit rough around the edges.
  // All attempts to use hmr resulted in poorer performance compared to regular watch mode.
  // Left the settings in place commented out to ease future attempts to try hmr again.
  /** Use regular watch mode if HMR is not enabled. */
  // watch: !hmr,
  watch: true,

  // plugins: [
  //   /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
  //   hmr &&
  //     //Details & options: https://open-wc.org/docs/development/hot-module-replacement/
  //     hmrPlugin({
  //       exclude: ['**/*/node_modules/**/*'],
  //       presets: [presets.lit],
  //     }),
  // ],
});
