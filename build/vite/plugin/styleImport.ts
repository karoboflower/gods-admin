
import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name: string) => {
          name = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${name}.css`;
        },
        resolveComponent: (name: string) => {
          return `element-plus/lib/${name}`;
        },
      },
    ],
  });
  return styleImportPlugin;
}
