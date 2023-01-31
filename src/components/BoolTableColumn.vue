<script setup lang='ts'>
import type { TableColumnCtx } from 'element-plus'
import { ElTableColumn } from 'element-plus'
import type { PaperItem } from '../PaperItem'

const props = defineProps<{
  prop: string
  label: string
  filtration: boolean
}>()

const emit = defineEmits<{
  (e: 'changeFilter'): void
}>()

const formatter = (row: PaperItem, column: TableColumnCtx<PaperItem>) => {
  return row[column.property as keyof PaperItem] ? '✅' : '❌'
}
</script>

<template>
  <ElTableColumn
    :prop="props.prop" :label="props.label" width="75"
    :formatter="formatter"
  >
    <template #header>
      <div @click="emit('changeFilter')">
        {{ props.label }}
      </div>
    </template>
    <!-- <template #default="scope">
      {{ scope.row[props.prop] ? '✅' : "❌" }}
    </template> -->
  </ElTableColumn>
</template>
