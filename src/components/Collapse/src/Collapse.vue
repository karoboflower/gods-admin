<template>
  <div :class="prefixCls" @click="toggleCollapse">
    <Icon
      :size="18"
      :icon="collapse ? 'vi-ant-design:menu-unfold-outlined' : 'vi-ant-design:menu-fold-outlined'"
      :color="color"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { propTypes } from '@/utils/propTypes';
import { useDesign } from '@/hooks/web/useDesign';

defineProps({
  color: propTypes.string.def(''),
});

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('collapse');

const appStore = useAppStore();

const collapse = computed(() => appStore.getCollapse);

const toggleCollapse = () => {
  const collapsed = unref(collapse);
  appStore.setCollapse(!collapsed);
};
</script>
