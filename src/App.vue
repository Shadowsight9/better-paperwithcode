<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElButton, ElLink, ElRow, ElTable, ElTableColumn } from 'element-plus'
import type { PaperItem, PaperResponse } from './PaperItem'
import BoolTableColumn from './components/BoolTableColumn.vue'

const props = defineProps<{
  filterName: string
  filterValue: string
}>()

const paperList = ref<PaperItem[]>([])
const filteredList = computed(() => paperList.value.filter(item => item.has_code))
const isSelectFiltered = ref(false)

let url: string | null = `/api/internal/papers/?${props.filterName}=${props.filterValue}&page=1&ordering=-pubyear%2C-pubmonth%2C-pubday`

async function fetchPaperList(url: string): Promise<PaperResponse> {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  return response.json()
}

async function initData(maxLoop = 10) {
  paperList.value = []
  for (let i = 0; i < maxLoop; i++)
    await getOneLoopData()
}

async function getOneLoopData() {
  if (!url)
    return
  const res = await fetchPaperList(url)
  paperList.value.push(...res.results)
  url = res.next || null
}

initData(2)
</script>

<template>
  <ElRow>
    <ElButton @click="getOneLoopData()">
      Add More
    </ElButton>
  </ElRow>
  <ElTable :data="isSelectFiltered ? filteredList : paperList" :default-sort="{ prop: 'publication_date', order: 'descending' }" style="width: 100%">
    <ElTableColumn prop="title" label="Title" min-width="270" fixed>
      <template #default="scope">
        <ElLink :href="scope.row.url" target="_blank">
          {{ scope.row.title }}
        </ElLink>
      </template>
    </ElTableColumn>

    <BoolTableColumn prop="has_code" label="code" :filtration="true" @change-filter="isSelectFiltered = !isSelectFiltered" />
    <BoolTableColumn prop="has_models" label="model" :filtration="false" />
    <BoolTableColumn prop="has_results" label="result" :filtration="false" />

    <ElTableColumn prop="publication_date" sortable label="publication date" />
  </ElTable>
</template>

<style scoped>

</style>
