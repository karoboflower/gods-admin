  
      /**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { resolve } from 'node:path';
export function configi18nPlugin() {
  const plugin =  VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')],
      })
  return plugin;
}
