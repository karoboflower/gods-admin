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
import type { WithdrawResponse, WithdrawRequest } from '@/types/manage/withdraw.api';
import { ElMessageBox } from 'element-plus';
import { getWithdrawList, auditWithdraw } from '@/api/manage';
import { useTable } from '@/hooks/web/useTable';
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas';
import { formatToDate } from '@/utils/dateUtil';
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const { Result: res } = await getWithdrawList({
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

const searchParams = ref<WithdrawRequest>();
const setSearchParams = (params: WithdrawRequest) => {
  searchParams.value = params;
  getList();
};
const crudSchemas: CrudSchema[] = [
  {
    field: 'cuebuddy.username',
    label: '用户名称',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入用户名称' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'cuebuddy.real_name',
    label: '真实姓名',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入真实姓名' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'user.phone',
    label: '手机号',
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
    field: 'cuebuddy.alipay',
    label: '支付宝账号',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'order_amount',
    label: '提现金额',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'order_no',
    label: '订单号',
    table: {
      width: '200px',
    },
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'audit_status',
    label: '审核状态',
    table: {
      slots: {
        default: ({ row }) => {
          const statusMap = {
            1: { label: '待审核', type: 'warning' },
            2: { label: '审核通过', type: 'success' },
            3: { label: '审核不通过', type: 'danger' },
          };
          return (
            <el-tag key={row.audit_status} type={statusMap[row.audit_status]?.type}>
              {statusMap[row.audit_status]?.label}
            </el-tag>
          );
        },
      },
    },
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
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
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'action',
    label: '操作',
    width: '150px',
    table: {
      fixed: 'right' as const,
      align: 'center' as const,
      slots: {
        default: ({ row }) => (
          <>
            {row.audit_status === 1 && (
              <>
                <base-button type="text" onClick={() => onWithdraw(row, 1)}>
                  通过
                </base-button>
                <base-button type="text" onClick={() => onWithdraw(row, 0)}>
                  拒绝
                </base-button>
              </>
            )}
          </>
        ),
      },
    },
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
];

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas);
const onWithdraw = async (row: WithdrawResponse, type: number) => {
  if (type === 1) {
    try {
      await ElMessageBox.confirm('确定审核通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      await auditWithdraw(row.id,{ audit_status: 2 });
      ElMessage.success('审核成功');
      getList();
    } catch (e) {
      // 用户取消或接口异常
    }
  } else {
    try {
      const { value } = await ElMessageBox.prompt('拒绝原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '拒绝原因不能为空',
      });
      await auditWithdraw(row.id,{ audit_status: 3, refuse_reason: value });
      ElMessage.success('审核成功');
      getList();
    } catch (e) {
      // 用户取消或接口异常
    }
  }
};
</script>
