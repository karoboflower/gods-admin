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
import type { UserRequest } from '@/types/manage/user.api';
import { getUserList } from '@/api/manage';
import { useTable } from '@/hooks/web/useTable';
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas';

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const { Result: res } = await getUserList({
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

const searchParams = ref<UserRequest>();
const setSearchParams = (params: UserRequest) => {
  searchParams.value = params;
  getList();
};
const crudSchemas: CrudSchema[] = [
  {
    field: 'username',
    label: '用户名',
    table: {},
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入用户名' },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'nickname',
    label: '昵称',
    table: {},
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'avatar',
    label: '头像',
    table: {
      slots: {
        default: ({ row }) => (
          <el-image
            src={row.avatar}
            fit="cover"
            style={{ width: '60px', height: '60px' }}
            preview-teleported
            preview-src-list={[row.avatar]}
          />
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
  {
    field: 'gender',
    label: '性别',
    table: {
      slots: {
        default: ({ row }) => (row.gender === 0 ? '男' : '女'),
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
    field: 'phone',
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
    field: 'created_at',
    label: '创建时间',
    table: {
      slots: {
        default: ({ row }) => (row.created_at ? new Date(row.created_at).toLocaleString() : ''),
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
</script>
