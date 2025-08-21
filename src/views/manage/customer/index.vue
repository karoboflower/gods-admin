<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />
    <div class="pt-4">
      <div class="bg-white p-4">
        <div class="mb-4">
          <base-button type="primary" @click="handleAdd">新增客服</base-button>
        </div>
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

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />
    <template #footer>
      <base-button v-if="actionType !== 'detail'" type="primary" :loading="saveLoading" @click="save">
        保存
      </base-button>
      <base-button @click="dialogVisible = false">关闭</base-button>
    </template>
  </Dialog>
</template>

<script setup lang="tsx">
import type { CrudSchema } from '@/hooks/web/useCrudSchemas';
import type { CustomerServiceResponse, CustomerServiceUpdateRequest, CustomerServiceCreateRequest, CustomerServiceRequest, CityOption } from '@/types/manage/customer-service.api';
import { getCustomerServiceList, createCustomerService, updateCustomerService } from '@/api/manage';
import { getCityList } from '@/api/city';
import { useTable } from '@/hooks/web/useTable';
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas';
import { formatToDate } from '@/utils/dateUtil';
import Write from './components/write.vue';
import { ElMessage, ElMessageBox, ElTag } from 'element-plus';

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const { Result: res } = await getCustomerServiceList({
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

const searchParams = ref<CustomerServiceRequest>();
const setSearchParams = (params: CustomerServiceRequest) => {
  searchParams.value = params;
  getList();
};

// 城市选项
const cityOptions = ref<CityOption[]>([]);
getCityList({
  page: 1,
  limit: 1000,
}).then(({Result: res}) => {
  cityOptions.value = res?.data.map((item) => ({
    label: item.name,
    value: item.id,
  })) || [];
});

// 对话框
const dialogVisible = ref(false);
const dialogTitle = ref('');
const actionType = ref<'add' | 'edit' | 'detail'>('add');
const currentRow = ref<CustomerServiceResponse>();
const writeRef = ref();

const handleAdd = () => {
  actionType.value = 'add';
  currentRow.value = undefined;
  dialogTitle.value = '新增客服';
  dialogVisible.value = true;
};

const handleEdit = (row: CustomerServiceResponse) => {
  actionType.value = 'edit';
  currentRow.value = row;
  dialogTitle.value = '编辑客服';
  dialogVisible.value = true;
};

const handleChangeStatus = async (row: CustomerServiceResponse) => {
  const newStatus = row.status === 0 ? 1 : 0;
  const text = newStatus === 0 ? '启用' : '禁用';
  
  try {
    await ElMessageBox.confirm(`确定要${text}该客服吗？`, '确认', {
      type: 'warning',
    });

    await updateCustomerService({
      id: row.id,
      status: newStatus,
    });

    ElMessage.success(`${text}成功`);
    getList();
  } catch (error) {
    console.log('取消操作');
  }
};

// 保存
const saveLoading = ref(false);
const save = async () => {
  const writeForm = unref(writeRef);
  const formData = await writeForm?.submit();
  if (!formData) return;

  saveLoading.value = true;
  try {
    if (actionType.value === 'add') {
      await createCustomerService(formData as CustomerServiceCreateRequest);
      ElMessage.success('创建成功');
    } else {
      await updateCustomerService({
        ...formData,
        id: currentRow.value?.id,

      } as CustomerServiceUpdateRequest);
      ElMessage.success('更新成功');
    }
    dialogVisible.value = false;
    getList();
  } catch (error) {
    console.error('保存失败:', error);
  } finally {
    saveLoading.value = false;
  }
};

// 表格配置
const crudSchemas: CrudSchema[] = [
  // {
  //   field: 'id',
  //   label: 'ID',
  //   table: {
  //     width: '100px',
  //   },
  //   form: {
  //     hidden: true,
  //   },
  //   search: {
  //     hidden: true,
  //   },
  // },
    {
    field: 'nickname',
    label: '客服昵称',
    search: {
      component: 'Input',
      componentProps: {
        placeholder: '请输入客服昵称',
      },
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: '请输入客服昵称',
      },
    },
  },
  {
    field: 'phone',
    label: '手机号',
    search: {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
    },
  },
 {
    field: 'city_id',
    label: '城市',
    search: {
      component: 'Select',
      componentProps: {
        style: { width: '200px' },
        placeholder: '请选择城市',
        clearable: true,
        options: cityOptions,
      },
    },
    form: {
      component: 'Select',
      componentProps: {
        placeholder: '请选择城市',
        clearable: true,
        options: cityOptions,
      },
    },
    table: {
      slots: {
        default: ({ row }) => {
          const city = cityOptions.value.find((item) => item.value === String(row?.city_id));
          return city ? city.label : '';
        },
      },
    },
  },

  {
    field: 'status',
    label: '状态',
    table: {
      slots: {
        default: ({ row }) => (
          <ElTag type={row.status === 0 ? 'success' : 'danger'}>
            {row.status === 0 ? '正常' : '禁用'}
          </ElTag>
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
    field: 'remark',
    label: '备注',
    table: {
      width: '200px',
    },
    search: {
      hidden: true,
    },
    form: {
      component: 'Input',
      componentProps: {
        type: 'textarea',
        placeholder: '请输入备注',
        rows: 3,
      },
        colProps: {
        span: 24,
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
      hidden: true,
    },
  },
  {
    field: 'action',
    label: '操作',
    table: {
      width: '160px',
      slots: {
        default: ({ row }) => (
          <div class="flex gap-2">
            <base-button type="primary" size="small" onClick={() => handleEdit(row)}>
              编辑
            </base-button>
            <base-button
              type={row.status === 0 ? 'danger' : 'success'}
              size="small"
              onClick={() => handleChangeStatus(row)}
            >
              {row.status === 0 ? '禁用' : '启用'}
            </base-button>
          </div>
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

const { allSchemas } = useCrudSchemas(crudSchemas);
</script>
