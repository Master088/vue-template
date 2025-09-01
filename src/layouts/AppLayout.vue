<template>
  <!-- Loading Screen -->
  <div v-if="isLoading" class="absolute inset-0 z-[99999] flex items-center justify-center">
    <LottieLoading />
  </div>

  <div class="flex h-screen overflow-hidden bg-[#f7f9faff] p-4 md:p-3 2xl:p-4">
    <AppSideBar />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden pr-3">
      <AppHeader />
      <main>
        <div class="mx-auto pr-1">
          <router-view :key="$route.path"></router-view>
        </div>
      </main>

      <footer class="mt-auto py-4">
        <AppFooter />
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import AppHeader from '@/components/layouts/AppHeader.vue'
import AppSideBar from '@/components/layouts/AppSideBar.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'

import LottieLoading from '@/components/animationLoading/Loading.vue'
import emitter from '@/utils/eventBus.js'


const isLoading = ref(false)
// const route = useRoute()


const showLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    // router.go()
  }, 3000)
}

// Listen for loading trigger
onMounted(() => {
  emitter.on('showLoading', showLoading)
})

// Cleanup event listener
onUnmounted(() => {
  emitter.off('showLoading', showLoading)
})
</script>

<style scoped></style>
