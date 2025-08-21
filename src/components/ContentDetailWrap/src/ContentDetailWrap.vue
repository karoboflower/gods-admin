<template>
  <div class="relative" :class="[`${prefixCls}-container`]">
    <ElCard class="mb-20px" :class="[`${prefixCls}-body`]" shadow="never">
      <div class="mb-20px pb-20px" style="border-bottom: 1px solid var(--el-border-color)">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';
import { propTypes } from '@/utils/propTypes';
import { useDesign } from '@/hooks/web/useDesign';

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
});

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('content-detail-wrap');
</script>
