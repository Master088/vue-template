<template>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
    <div
      v-for="n in count"
      :key="n"
      class="group relative flex h-[100px] animate-pulse items-center rounded-[10px] bg-gray-200 px-3 py-2"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 8
  }
})
</script>
