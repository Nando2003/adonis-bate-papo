<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-semibold text-pink-300">
          {{ profile.displayName }}
        </h2>
        <p class="text-sm text-gray-400">
          @{{ profile.handle }}
        </p>

        <button 
          :disabled="isOwner"
          :aria-disabled="isOwner"
          @click="startChatting"
          class="w-full flex justify-center mt-5 py-2 px-4 border rounded-md bg-pink-300 text-white font-semibold hover:bg-white hover:text-pink-300 hover:border-pink-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-pink-300 disabled:hover:text-white">
          Start Chatting
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import DefaultLayout from '../layouts/default_layout.vue'

defineOptions({ layout: DefaultLayout })

interface Profile {
  displayName: string
  handle: string
}

interface User {
  profile: {
    displayName: string
    handle: string
  }
}

const page = usePage()
const user = computed(() => page.props.user as User)
const profile = computed(() => page.props.profile as Profile)

const isOwner = computed(() => {
  const userHandle = user.value?.profile?.handle
  const profileHandle = profile.value?.handle
  return !!userHandle && userHandle === profileHandle
})

const startChatting = () => {
  if (isOwner.value) return
  const url = '/chats/one-on-one'
  const data = {
    memberHandler: profile.value.handle,
  }
  router.post(url, data)
}
</script>