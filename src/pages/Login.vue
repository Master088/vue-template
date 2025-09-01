<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Welcome Back
            </h2>

            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">
                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FontAwesomeIcon :icon="faEnvelope" />
                        </span>
                        <input v-model="email" type="email" required placeholder="you@example.com"
                            class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FontAwesomeIcon :icon="faLock" />
                        </span>
                        <input v-model="password" type="password" required placeholder="••••••••"
                            class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                <!-- Remember Me -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" v-model="rememberMe"
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span class="text-sm text-gray-600">Remember me</span>
                    </label>
                    <router-link to="/auth/forgot-password" class="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </router-link>
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    :disabled="loading">
                    <FontAwesomeIcon v-if="loading" :icon="faSpinner" class="animate-spin mr-2" />
                    <span>{{ loading ? 'Logging in...' : 'Login' }}</span>
                </button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'

const authStore = useAuthenticationStore()
const router = useRouter()

const email = ref('duatin08@gmail.com')
const password = ref('Admin12345@')
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    errorMessage.value = ''
    loading.value = true
    try {
        await authStore.login({
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value,
        })
        router.push({ name: 'Dashboard' })
    } catch (err) {
        errorMessage.value =
            err?.response?.data?.message || 'Invalid credentials, please try again.'
    } finally {
        loading.value = false
    }
}
</script>
