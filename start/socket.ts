import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

export let io: Server

app.ready(async () => {
  io = new Server(server.getNodeServer(), {
    cors: { origin: true, credentials: true },
  })

  io.use(async (socket, next) => {})

  io.on('connection', (socket) => {
    socket.emit('welcome', 'Welcome to AdonisJS + Socket.io')
  })

  io.engine.on('connection_error', (err) => {
    console.error('[ws] connection_error', err.code, err.message)
  })
})
