<template>
  <Form :schema="formSchema" @register="formRegister" :rules="rules" />
</template>

<script setup lang="ts">
import type { FormSchema } from '@/components/Form';
import type { CustomerServiceResponse } from '@/types/manage/customer-service.api';
import { useValidator } from '@/hooks/web/useValidator';
import { useForm } from '@/hooks/web/useForm';

const { required, phone, maxlength } = useValidator();

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<CustomerServiceResponse>>,
    default: () => null,
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
});

const rules = reactive({
  nickname: [required(), maxlength(50)],
  phone: [required(), phone()],
  city_id: [required()],
});

const { formRegister, formMethods } = useForm();
const { setValues, getFormData, getElFormExpose } = formMethods;

const submit = async () => {
  const elForm = await getElFormExpose();
  const valid = await elForm?.validate().catch((err) => {
    console.log(err);
  });
  if (valid) {
    const formData = await getFormData();
    return formData;
  }
};

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return;
    setValues(currentRow);
  },
  {
    deep: true,
    immediate: true,
  },
);

defineExpose({
  submit,
});
</script>
