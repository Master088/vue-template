<template>
  <tr v-for="rowIndex in rows" :key="rowIndex" class="border-b bg-white">
    <td v-for="colIndex in columns" :key="colIndex" class="px-6 py-4">
      <div class="h-4 animate-pulse rounded-[3px] bg-gray-200"></div>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  rows: {
    type: Number,
    required: true
  },
  columns: {
    type: Number,
    required: true
  }
})
</script>
