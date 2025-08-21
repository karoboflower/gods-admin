/**
 * @description: 生成class name
 */
export const useDesign = () => {
  const scssVariables = {
    namespace: 'v',
    elNamespace: 'el',
  };
  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${scssVariables.namespace}-${scope}`;
  };

  return {
    variables: scssVariables,
    getPrefixCls,
  };
};
