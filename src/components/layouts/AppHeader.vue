<template>
  <header class="rounded-[15px] bg-white" style="box-shadow: 0px 3px 6px #7086a40d">
    <div class="mx-auto px-4 sm:px-4 lg:px-5">
      <nav class="flex h-16 items-center justify-between lg:h-[77px]">
        <!-- Left -->
        <div class="flex">
          <!-- Sidebar Toggle -->
          <button @click="toggleSidebar" type="button"
            class="me-5 inline-flex items-center rounded-lg text-sm text-[#344767] hover:text-[#2C2FBC] sm:block md:block lg:hidden">
            <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>

          <!-- User Info -->
          <div class="flex items-center gap-3">
            <div v-if="loading" class="flex items-center gap-3">
              <div class="h-[45px] w-[45px] animate-pulse rounded bg-gray-200"></div>
              <div class="flex flex-col">
                <div class="h-4 w-24 animate-pulse rounded bg-gray-200 mb-1"></div>
                <div class="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            <div v-else-if="user" class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="hidden sm:block">
                <div
                  class="flex h-[45px] w-[45px] items-center justify-center rounded-[5px] border-0 bg-[#F9FAFB] font-bold text-[#344767]"
                  style="box-shadow: 0px 3px 6px #00000029">
                  <p>{{ getAvatarLabel(user.name) }}</p>
                </div>
              </div>

              <!-- Greeting + Email -->
              <div>
                <div class="relative flex flex-col justify-start sm:flex-row">
                  <p class="m-0 p-0 text-[12px] font-bold text-[#344767] sm:text-[18px]">
                    {{ 'Hi, ' + user.name + '!' }}
                  </p>
                </div>
                <p class="-mt-[1px] hidden text-[12px] font-medium text-[#344767] sm:block">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right -->
        <div>
          <div class="flex items-center gap-3">
            <button @click="logout"
              class="rounded-lg bg-[#2C2FBC] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f2296] transition"
              :disabled="loading">
              <span v-if="loading">Loading...</span>
              <span v-else>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/auth'

// Simple avatar initials
const getAvatarLabel = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const toggleSidebar = () => console.log('Sidebar toggled (dummy)')

const router = useRouter()
const authStore = useAuthenticationStore()
const loading = ref(true)

const user = computed(() => authStore.userAccount)

const logout = async () => {
  try {
    loading.value = true
    await authStore.logout?.()
    router.push('/auth/login')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    await authStore.fetchUser?.() // fetch user from API
  } catch (error) {
    console.error('Fetch user error:', error)
  } finally {
    loading.value = false
  }
})
</script>
