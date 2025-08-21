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

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />
    <template #footer>
      <BaseButton v-if="actionType !== 'detail'" type="primary" :loading="saveLoading" @click="save"> 保存 </BaseButton>
      <BaseButton @click="dialogVisible = false">关闭</BaseButton>
    </template>
  </Dialog>
</template>

<script setup lang="tsx">
import type { CrudSchema } from '@/hooks/web/useCrudSchemas';
import type { CoachResponse, CoachRequest } from '@/types/manage/coach.api';
import { getCoachList, updateCoach, changeTutorWeight } from '@/api/manage';
import { getCityList } from '@/api/city';
import { useTable } from '@/hooks/web/useTable';
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas';
import { formatToDate } from '@/utils/dateUtil';
import Write from './components/write.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const {Result: res}= await getCoachList({
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

const searchParams = ref<CoachRequest>();
const setSearchParams = (params: CoachRequest) => {
  searchParams.value = params;
  if(params.city_id) {
    searchParams.value.city_id = Number(params.city_id);
  }
  getList();
};
const cityOptions = ref<{ label: string; value: number }[]>([]);
getCityList({
  page: 1,
  limit: 100,
}).then(({Result: res}) => {
  cityOptions.value = res?.data.map((item) => ({
        label: item.name,
        value: item.id,
  }));
});
const crudSchemas: CrudSchema[] = [
  {
    field: 'index',
    label: '序号',
    type: 'index',
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
    detail: {
      hidden: true,
    },
  },
  {
    field: 'username',
    label: '昵称',
    table: {},
    form: {
      hidden: true,
    },
    search: {
      component: 'Input',
      componentProps: { placeholder: '请输入昵称' },
    },
  },
  {
    field: 'realName',
    label: '真实姓名',
    table: {
        width: '120px',
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
    search: {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
    },
    table: {
      width: '120px',
    },
    form: {
      hidden: true,
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
    table: {
      slots: {
        default: ({ row }) => {
          const city = cityOptions.value.find((item) => item.value === row.city_id);
          return city ? city.name : '';
        },
      },
    },
    form: {
      hidden: true,
    },
  },
  {
    field: 'price',
    label: '单价',
    table: {},
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'alipay',
    label: '支付宝账号',
    table: {
      width: '120px',
    },
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'weight',
    label: '权重',
    table: {},
    form: {
      component: 'InputNumber',
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'weights',
    label: '体重(kg)',
    table: {},
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'height',
    label: '身高(cm)',
    table: {},
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'label',
    label: '标签',
    table: {
      width: '200px',
      slots: {
        default: ({ row }) =>
          row.label
            ? row.label.split(',').map((item: string, idx: number) => (
                <div>
                  <el-tag key={idx}>{item}</el-tag>
                </div>
              ))
            : '',
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
    field: 'business_status',
    label: '营业状态',
    table: {
      width: '120px',
      slots: {
        default: ({ row }) => (
          <el-tag type={row.business_status === -1 ? 'success' : 'danger'}>
            {row.business_status === 1 ? '营业中' : '休息中'}
          </el-tag>
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
    field: 'backImage',
    label: '身份证照片',
    table: {
      width: '100px',
      slots: {
        default: ({ row: { frontImage, backImage } }) => {
          return frontImage ? (
            <el-image
              src={frontImage}
              fit="cover"
              style={{ width: '60px', height: '60px' }}
              preview-teleported
              preview-src-list={[frontImage, backImage]}
            />
          ) : (
            <span>-</span>
          );
        },
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
    field: 'recommend',
    label: '是否优选',
    table: {
      slots: {
        default: ({ row }) => (
          <el-tag type={row.recommend === 1 ? 'success' : 'danger'}>{row.recommend === 1 ? '是' : '否'}</el-tag>
        ),
      },
    },
    form: {
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        style: 'width: 120px',
        options: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 0,
          },
        ],
      },
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'audit_status',
    label: '审核状态',
    table: {
      width: '120px',
      slots: {
        default: ({ row }) => {
          const statusMap = {
            1: { text: '待审核', type: 'warning' },
            2: { text: '审核通过', type: 'success' },
            3: { text: '审核不通过', type: 'danger' },
          };
          const config = statusMap[row.audit_status] || { text: '', type: '' };
          return <el-tag type={config.type}>{config.text}</el-tag>;
        },
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
    table: {},
    form: {
      hidden: true,
    },
    search: {
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
    form: {
      hidden: true,
    },
    search: {
      hidden: true,
    },
  },
  {
    field: 'action',
    width: '250px',
    label: '操作',
    search: {
      hidden: true,
    },
    form: {
      hidden: true,
    },
    table: {
    fixed: 'right',
      align: 'center',

      slots: {
        default: ({ row }) => {
          return (
            <>
              <base-button type="text" onClick={() => onEditPrice(row)}>
                修改价格
              </base-button>
              <base-button type="text" onClick={() => action(row, 'edit')}>
                权重
              </base-button>
              {row.audit_status === 1 && (
                <>
                  <base-button type="text" onClick={() => onChangeState(row, 1)}>
                    通过
                  </base-button>
                  <base-button type="text" onClick={() => onChangeState(row, 0)}>
                    拒绝
                  </base-button>
                </>
              )}
            </>
          );
        },
      },
    },
  },
];

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas);

const dialogVisible = ref(false);
const dialogTitle = ref('');

const currentRow = ref<CoachResponse | null>(null);
const actionType = ref('');

const action = (row: CoachResponse, type: string) => {
  dialogTitle.value = '修改';
  actionType.value = type;
  currentRow.value = row;
  dialogVisible.value = true;
};
const writeRef = ref<ComponentRef<typeof Write>>();

const saveLoading = ref(false);

const save = async () => {
  const write = unref(writeRef);
  const formData = await write?.submit();
  if (formData) {
    saveLoading.value = true;
    try {
      if (currentRow.value?.id) {
        await changeTutorWeight({
          id: formData.id,
          weight: formData.weight,
          recommend: formData.recommend,
        });
        ElMessage.success('编辑成功');
      }
      dialogVisible.value = false;
      currentPage.value = 1;
      getList();
    } catch {
      ElMessage.error('操作失败');
    } finally {
      saveLoading.value = false;
    }
  }
};
const onChangeState = async (row: CoachResponse, type: number) => {
  if (type === 1) {
    try {
      await ElMessageBox.confirm('确定审核通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      await updateCoach({ id: row.id, audit_status: 2 });
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
      await updateCoach({ id: row.id, audit_status: 3, remark: value });
      ElMessage.success('审核成功');
      getList();
    } catch (e) {
      // 用户取消或接口异常
    }
  }
};

const onEditPrice = async (row: CoachResponse) => {
  try {
    const { value } = await ElMessageBox.prompt('请输入价格', '价格修改', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /\S/,
      inputValue: String(row.price),
      inputErrorMessage: '价格不能为空',
    });
    await updateCoach({ id: row.id, price: Number(value) });
    ElMessage.success('修改成功');
    getList();
  } catch (e) {
    // 用户取消或接口异常
  }
};
</script>
