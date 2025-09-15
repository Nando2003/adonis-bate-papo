<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <header class="px-6 py-4 border-b">
        <h1 class="text-lg font-semibold text-gray-700">
          {{ chat?.name ?? 'Chat' }}
        </h1>
      </header>

      <main ref="messagesWrap" class="p-6 max-h-[60vh] overflow-y-auto bg-sand-2">
        <div v-if="!chat || !chat.message || chat.message.length === 0" class="text-center text-sm text-gray-500 py-12">
          Ainda não há mensagens — comece a conversa!
        </div>
      </main>
      <div class="space-y-4">

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm, usePage } from '@inertiajs/vue3'
import DefaultLayout from '../layouts/default_layout.vue'
import { computed } from 'vue'

defineOptions({ layout: DefaultLayout })

interface MessageItem {
  displayName: string
  content: string
  createdAt: string
}

interface ChatData {
  name: string
  message: MessageItem[]
}

interface User {
  profile: {
    displayName: string
    handle: string
  }
}

const page = usePage()
const chat = computed(() => page.props.chat as ChatData)
const user = computed(() => (page.props.user as User))

</script>