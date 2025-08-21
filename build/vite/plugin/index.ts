import vueVite from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import windiCSS from 'vite-plugin-windicss';

// 自定义插件配置
import { configHmrPlugin } from './hmr';
import { configSvgIconsPlugin } from './svgSprite';
//import { configStyleImportPlugin } from './styleImport';
import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configPwaConfig } from './pwa';
import DefineOptions from 'unplugin-vue-define-options/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { configi18nPlugin } from './i18n';
import {configMockPlugin} from './mock';
import { env } from 'process';
export function createVitePlugins(viteEnv, isBuild: boolean) {
  const { VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,VITE_USE_MOCK } = viteEnv;

  const vitePlugins = [
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
        { axios: [['default', 'axios']] },
      ],
      dts: 'types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // 修正为官方推荐的 json 文件名
        globalsPropValue: true, // Default `true`
      },
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver(), IconsResolver()],
    }),
    vueVite(),
    vueJsx(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS() as any);

  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy

  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    );

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild) as any);

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  vitePlugins.push(DefineOptions());

  // vite-plugin-style-import
  //vitePlugins.push(configStyleImportPlugin());

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE) as any);

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv) as any);
  }
  vitePlugins.push(configi18nPlugin());
  if(VITE_USE_MOCK === true) {
    vitePlugins.push(configMockPlugin(env, isBuild));
  }
  return vitePlugins;
}
