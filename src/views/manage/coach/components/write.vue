<template>
  <Form :schema="formSchema" @register="formRegister" />
</template>

<script setup lang="ts">
import type { FormSchema } from '@/components/Form';
import type { CoachResponse } from '@/types/manage/coach.api';
import { useForm } from '@/hooks/web/useForm';

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<CoachResponse>>,
    default: () => null,
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
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
