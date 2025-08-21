<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />
    <div class="pt-4">
      <div class="bg-white p-4">
        <Table
          v-model:page-size="pageSize"
          v-model:current-page="currentPage"
          :columns="allSchemas.tableColumns"
          :data="dataList"
          :loading="loading"
          :pagination="{
            total,
          }"
          @register="tableRegister"
        />
      </div>
    </div>
  </ContentWrap>
</template>

<script setup lang="tsx">
import type { CrudSchema } from '@/hooks/web/useCrudSchemas';
import type { OrderRequest } from '@/types/manage/order.api';
import { getOrderList } from '@/api/manage';
import { useTable } from '@/hooks/web/useTable';
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas';
import { formatToDate } from '@/utils/dateUtil';

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const { Result: res } = await getOrderList({
      limit: unref(pageSize),
      page: unref(currentPage),
      ...unref(searchParams),
    });
    return {
      list: res.data,
      total: res.total,
    };
  },
});
const { loading, dataList, total, currentPage, pageSize } = tableState;
const { getList } = tableMethods;

const searchParams = ref<OrderRequest>();
const setSearchParams = (params: OrderRequest) => {
  searchParams.value = params;
  if (params.created_at) {
    params.rangeTime = `${formatToDate(params.created_at[0])},${formatToDate(params.created_at[1])}`;
  }
  getList();
};
const crudSchemas: CrudSchema[] = [
  {
    field: 'orderNo',
    label: '订单号',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入订单号' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'tutorName',
    label: '助教名称',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入助教名称' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'tutorPhone',
    label: '助教手机号',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入手机号' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'userName',
    label: '用户名称',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'userPhone',
    label: '用户手机号',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'wxPaymentNo',
    label: '微信支付流水号',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'address',
    label: '下单地址',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'type',
    label: '订单类型',
    table: {
      slots: {
        default: ({ row }) => (row.type === 1 ? '加时订单' : '预约订单'),
      },
    },
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'order_status',
    label: '订单状态',
    table: {
      slots: {
        default: ({ row }) => {
          const statusMap = {
            1: { text: '待支付', type: 'warning' },
            2: { text: '进行中', type: 'info' },
            3: { text: '待评价', type: 'success' },
            4: { text: '已完成', type: 'success' },
            9: { text: '已取消', type: 'danger' },
          };
          return (
            <el-tag key={row.order_status} type={statusMap[row.order_status]?.type}>
              {statusMap[row.order_status]?.text}
            </el-tag>
          );
        },
      },
    },
    form: {
      hidden: true,
    },
    search: {
      component: 'Select',

      componentProps: {
        style: {
          width: '160px',
        },
        options: [
          { label: '待支付', value: 1 },
          { label: '进行中', value: 2 },
          { label: '待评价', value: 3 },
          { label: '已完成', value: 4 },
          { label: '已取消', value: 9 },
        ],
      },
    },
  },
  {
    field: 'created_at',
    label: '创建时间',
    table: {
      width: '180px',
      slots: {
        default: ({ row }) => formatToDate(row.created_at),
      },
    },
    form: {
      hidden: true,
    },
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
      },
    },
  },
];

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas);
</script>
