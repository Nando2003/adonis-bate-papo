import AuthSocketMiddleware from '#middleware/auth_socket_middleware'
import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

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
    console.log(`[ws] user connected: ${userId}`)
  })

  io.engine.on('connection_error', (err) => {
    console.error('[ws] connection_error', err.code, err.message)
  })
})
