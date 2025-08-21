/**
 * @description 不展示总条数，动态计算总条数
 * @returns
 */
export function getListTotal(query: object, dataLength: number) {
  if (dataLength === query.pageSize) {
    return query.pageSize * query.currentPage + 1;
  }
  return query.pageSize * query.currentPage;
}
