<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-[10px] font-medium text-[#344767] sm:text-[11px]">
        Copyright @{{ date }} Phocal Productions. All Rights Reserved. Powered by
        <a
          href="https://www.motivit.com/"
          target="_blank"
          class="font-medium text-[#2C2FBC] hover:font-semibold"
          >MotivIT</a
        >
      </p>
    </div>
    <div class="flex items-center justify-center space-x-1 text-center">
      <p class="text-[10px] font-medium text-[#344767] sm:text-[11px]">
        Code with
        <span><font-awesome-icon icon="fa-solid fa-heart" class="h-3 w-3 text-[#2C2FBC]" /></span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const date = ref(new Date().getFullYear())
</script>
<style scoped></style>
