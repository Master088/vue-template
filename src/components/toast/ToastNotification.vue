<template>
  <!-- Toast Notification -->
  <div
    v-if="toastStore.isVisible"
    id="toast-top-right"
    class="fixed right-5 top-5 z-50 w-full max-w-xs items-center rounded-lg px-4 pb-5 text-gray-500 shadow"
    :class="[toastStore.type === 'success' ? 'bg-[#48c435ff]' : 'bg-red-500']"
    role="alert"
  >
    <div class="mb-3 flex items-center border-b py-3 pr-2">
      <span class="me-2"
        ><font-awesome-icon
          :icon="toastStore.type === 'success' ? 'fa-check' : 'fa-xmark'"
          class="h-5 w-5 text-white"
      /></span>
      <span class="mb-1 text-[14px] font-normal capitalize text-white">{{ toastStore.type }}</span>
      <button
        type="button"
        @click="closeToast"
        class="-mx-1.5 -my-1.5 ms-auto inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-white"
        data-dismiss-target="#toast-top-right"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.8"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
    <div class="text-[10px] text-white">
      <p>{{ toastStore.message }}</p>
    </div>
  </div>
  <!-- End Toast Notification -->
</template>
<script setup>
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()

function closeToast() {
  toastStore.isVisible = false
}
</script>
<style></style>
