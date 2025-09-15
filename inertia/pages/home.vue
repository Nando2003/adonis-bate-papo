<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-11">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-500">
          Search for your friends' handlers and start a <span class="text-pink-300">chat</span>
        </h2>
      </div>

      <form class="space-y-6">
        <div class="flex rounded-md shadow-sm">
          <input
            type="text"
            v-model="searchForm.handle"
            placeholder="Enter the handle of your friend"
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
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/vue3'
import { onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import DefaultLayout from '../layouts/default_layout.vue'

defineOptions({
  layout: DefaultLayout,
})

const searchForm = useForm({
  handle: '',
})

let socket: Socket | null = null

onMounted(() => {
  socket = io('/')

  socket.on('welcome', (message: string) => {
    console.log(message)
  })
})
onUnmounted(() => {
  if (socket) socket.disconnect()
})
</script>
