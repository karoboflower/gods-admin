import Table from './src/Table.vue';
import type { ElTable } from 'element-plus';
import type { TableColumn, TableSetProps } from './src/types';

export type { Pagination, TableColumn, TableProps, TableSetProps, TableSlotDefault } from './src/types';

export interface TableExpose {
  setProps: (props: Recordable) => void;
  setColumn: (columnProps: TableSetProps[]) => void;
  addColumn: (column: TableColumn, index?: number) => void;
  delColumn: (field: string) => void;
  elTableRef: ComponentRef<typeof ElTable>;
}

export { Table };
