/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import { viteMockServe } from 'vite-plugin-mock';
import type { Plugin } from 'vite';
export function configMockPlugin(env, isBuild: boolean) {
  const mockPlugin: Plugin =  viteMockServe({
            ignore: /^_/,
            mockPath: 'mock',
            localEnabled: !isBuild,
            prodEnabled: isBuild,
            injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
  })
  return mockPlugin;
}
