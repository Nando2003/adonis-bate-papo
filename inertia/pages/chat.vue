<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <header class="px-6 py-4 border-b">
        <h1 class="text-lg font-semibold text-gray-700">
          {{ chat?.name ?? 'Chat' }}
        </h1>
      </header>

      <main ref="messagesWrap" class="p-6 max-h-[60vh] overflow-y-auto bg-sand-2">
        <div v-if="loading">Carregando...</div>
        <div v-else>
          <div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
            <span class="font-bold">{{ msg.displayName }}</span>: {{ msg.content }}
            <span class="text-xs text-gray-400 ml-2">{{ msg.createdAt }}</span>
          </div>
        </div>
        <div class="space-y-4">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="newMessage"
              type="text"
              class="flex-1 border rounded px-2 py-1"
              placeholder="Digite sua mensagem..."
            />
            <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded">Enviar</button>
          </form>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

defineOptions({ layout: DefaultLayout })

interface ChatData {
  id: number 
  name: string 
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

interface Message {
  content: string
  createdAt: string
  displayName: string
  handle: string
}

const messages = ref<Message[]>([])
const loading = ref(false)
const newMessage = ref('')

const fetchMessages = async () => {
  loading.value = true
  try {
    const res = await fetch(`/messages/${chat.value.id}`)
    if (res.ok) {
      const data = await res.json()
      messages.value = data.messages
      console.log(data)
    }
  } finally {
    loading.value = false
  }
}

let socket: Socket | null = null

const joinChat = async () => {
  socket = io('/')

  socket.on('connect', () => {
    if (!socket) return
    socket.emit('joinRoom', chat.value.id)
  })

  socket.on('newMessage', (msg: Message) => {
    messages.value.unshift(msg)
  })
}

const sendMessage = async () => {
  if (!socket || !newMessage.value.trim()) return
  socket.emit('sendMessage', {
    chatId: chat.value.id,
    content: newMessage.value,
  })
  newMessage.value = ''
} 

const disconnectChat = () => {
  if (!socket) return
  socket.emit('leaveChat', { chatId: chat.value.id })
  socket.disconnect()
  socket = null
}

onMounted(() => {
  fetchMessages()
  joinChat()
  sendMessage()
})

onUnmounted(() => {
  disconnectChat()
})
</script>