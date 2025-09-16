import AuthSocketMiddleware from '#middleware/auth_socket_middleware'
import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'
import ChatService from '#services/chat_service'

export let io: Server

app.ready(async () => {
  io = new Server(server.getNodeServer(), {
    cors: { origin: true, credentials: true },
  })

  io.use(async (socket, next) => {
    const middleware = new AuthSocketMiddleware()
    await middleware.handle(socket, next)
  })

  io.on('connection', (socket) => {
    const userId = socket.data.userId as number
    const chatService = new ChatService(userId)

    socket.on('joinRoom', async (chatId: number) => {
      await chatService.joinRoom(socket, chatId)
    })

    socket.on('leaveRoom', async (chatId: number) => {
      await chatService.leaveRoom(socket, chatId)
    })

    socket.on('sendMessage', async (data: { chatId: number; content: string }) => {
      const { chatId, content } = data
      await chatService.sendMessage(socket, chatId, content)
    })
  })

  io.engine.on('connection_error', (err) => {
    console.error('[ws] connection_error', err.code, err.message)
  })
})
