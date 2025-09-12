<template>
  <div class="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold uppercase">
          <span class="text-gray-500">bate</span>
          <span class="text-pink-300"> papo</span>
        </h2>
        <p class="text-gray-500">Start chatting with your friends</p>
      </div>

      <div
        v-if="props.error"
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300 text-center"
      >
        {{ props.error }}
      </div>

      <form @submit.prevent="loginRequest" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="loginForm.email"
            placeholder="email@example.com"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="loginForm.password"
            placeholder="********"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />

          <a href="/register" class="text-sm text-pink-300 hover:underline"
            >Don't have an account? Register</a
          >
        </div>

        <button
          type="submit"
          :disabled="loginForm.processing"
          class="w-full flex justify-center py-2 px-4 border rounded-md bg-pink-300 text-white font-semibold hover:bg-white hover:text-pink-300 hover:border-pink-300 disabled:cursor-not-allowed"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/vue3'

const props = defineProps<{ error?: string }>()

const loginForm = useForm({
  email: '',
  password: '',
})

const loginRequest = () => {
  loginForm.post('/login')
}
</script>
