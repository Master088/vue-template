<template>
  <div class="relative flex h-screen w-full items-center justify-center">
    <div class="flex min-h-screen flex-col items-center justify-center p-4">
      <!-- Video Background -->
      <video
        autoplay
        loop
        muted
        playsinline
        class="absolute left-0 top-0 z-0 h-full w-full object-cover"
      >
        <source :src="videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Lottie Animation -->
      <div class="relative z-10 -mt-8 md:-mt-10">
        <DotLottieVue autoplay loop :src="lottieSrc" />
        <p class="-mt-[30px] text-center text-[12px] font-medium text-[#FFFFFF]">
          {{ loadingText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

// Props for dynamic content
const props = defineProps({
  videoSrc: {
    type: String,
    default: new URL('@/assets/videos/LoginVideoBG.mp4', import.meta.url).href
  },
  lottieSrc: {
    type: String,
    default: new URL('@/assets/lottie/4248.json', import.meta.url).href
  },
  loadingText: {
    type: String,
    default: 'Hang on while we wrap things up for you...'
  }
})
</script>

<style scoped></style>
