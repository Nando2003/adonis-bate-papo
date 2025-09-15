<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-11">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-500">
          Search for your friends' handlers and start a <span class="text-pink-300">chat</span>
        </h2>
      </div>

      <div
        v-if="props.error"
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300 text-center"
      >
        {{ props.error }}
      </div>

      <form @submit.prevent="searchRequest" class="space-y-2">
        <div class="flex rounded-md shadow-sm">
          <input
            type="text"
            v-model="searchForm.handle"
            placeholder="Enter the handle of your friend without @"
            required
            class="block w-full px-4 py-3 border border-gray-300 rounded-none rounded-l-md focus:outline-none focus:border-pink-300"
          />
          <button
            type="submit"
            :disabled="searchForm.processing"
            class="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-r-md bg-pink-300 text-white font-semibold hover:bg-pink-400 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
        <p v-if="searchForm.errors.handle" class="mt-1 text-sm text-red-600">
          {{ searchForm.errors.handle }}
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm, router } from '@inertiajs/vue3'
import DefaultLayout from '../layouts/default_layout.vue'
import { watch } from 'vue'

defineOptions({ layout: DefaultLayout })
const searchForm = useForm({ handle: '' })

const props = defineProps<{ error?: string }>()
const handleRegex = /^[a-z0-9_]+$/

watch(
  () => searchForm.handle,
  (newValue) => {
    if (newValue === '') {
      searchForm.clearErrors('handle')
    } else if (!handleRegex.test(newValue)) {
      searchForm.setError('handle', 'The handler must contain lowercase letters, numbers, and underscores (_)')
    } else if (searchForm.errors.handle) {
      searchForm.clearErrors('handle')
    }
  }
)

const searchRequest = () => {
  const handle = (searchForm.handle || '').trim()
  const url = `/profiles/${encodeURIComponent(handle)}`

  router.get(url, {}, {
    preserveState: true,
    preserveScroll: true,
  })
}

</script>
