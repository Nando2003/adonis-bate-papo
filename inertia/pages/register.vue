<template>
  <div class="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold uppercase">
          <span class="text-gray-500">bate</span>
          <span class="text-pink-300"> papo</span>
        </h2>
        <p class="text-gray-500">Register to start chatting</p>
      </div>

      <form @submit.prevent="registerRequest" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="registerForm.email"
            placeholder="email@example.com"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <p v-if="registerForm.errors.email" class="mt-1 text-sm text-red-600">
            {{ registerForm.errors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="registerForm.password"
            placeholder="********"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <p v-if="registerForm.errors.password" class="mt-1 text-sm text-red-600">
            {{ registerForm.errors.password }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            id="passwordConfirmation"
            type="password"
            v-model="registerForm.passwordConfirmation"
            placeholder="********"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <p v-if="registerForm.errors.passwordConfirmation" class="mt-1 text-sm text-red-600">
            {{ registerForm.errors.passwordConfirmation }}
          </p>

          <a href="/login" class="text-sm text-pink-300 hover:underline"
            >Already have an account? Log in</a
          >
        </div>

        <button
          type="submit"
          :disabled="registerForm.processing"
          class="w-full flex justify-center py-2 px-4 border rounded-md bg-pink-300 text-white font-semibold hover:bg-white hover:text-pink-300 hover:border-pink-300 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/vue3'

const registerForm = useForm({
  email: '',
  password: '',
  passwordConfirmation: '',
})

const registerRequest = () => {
  registerForm.post('/register')
}
</script>
