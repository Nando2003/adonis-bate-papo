<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold uppercase text-gray-500">
          Create your <span class="text-pink-300">profile</span>
        </h2>
        <p class="text-gray-500">Fill in the details below to create your profile</p>
      </div>

      <form @submit.prevent="profileStoreRequest" class="space-y-6" autocomplete="off">
        <div class="space-y-2">
          <label for="displayName" class="block text-sm font-medium text-gray-700"
            >Display Name</label
          >
          <input
            id="displayName"
            type="text"
            v-model="profileForm.displayName"
            placeholder="Your display name"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div class="space-y-2">
          <label for="handle" class="block text-sm font-medium text-gray-700">Handle</label>
          <input
            id="handle"
            type="text"
            v-model="profileForm.handle"
            placeholder="Your handle (e.g., yourhandle)"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <p id="handle-helper" class="mt-1 text-sm text-gray-500">The handler must contain lowercase letters, numbers, and underscores (_).</p>
          <p v-if="profileForm.errors.handle" class="mt-1 text-sm text-red-600">
            {{ profileForm.errors.handle }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="profileForm.processing"
          class="w-full flex justify-center py-2 px-4 border rounded-md bg-pink-300 text-white font-semibold hover:bg-white hover:text-pink-300 hover:border-pink-300 disabled:cursor-not-allowed"
        >
          Create Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/vue3'
import DefaultLayout from '../layouts/default_layout.vue'
import { watch } from 'vue'

defineOptions({
  layout: DefaultLayout,
})

const profileForm = useForm({
  displayName: '',
  handle: '',
})

const handleRegex = /^[a-z0-9_]+$/

watch(() => profileForm.handle, (newValue) => {
  if (newValue === '') {
    profileForm.clearErrors('handle')
  } else if (!handleRegex.test(newValue)) {
    profileForm.setError('handle', 'This handle contains a forbidden word.')
  } else if (profileForm.errors.handle) {
    profileForm.clearErrors('handle')
  }
})

const profileStoreRequest = () => {
  profileForm.post('/profiles')
}
</script>
