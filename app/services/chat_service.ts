import Chat from '#models/chat'
import Message from '#models/message'
import User from '#models/user'
import { Socket } from 'socket.io'

export default class ChatService {
  constructor(private userId: number) {}

  async joinRoom(socket: Socket, chatId: number) {
    const userEntity = await User.find(this.userId)
    const chatEntity = await Chat.find(chatId)
    if (!userEntity || !chatEntity) return

    await userEntity.load('profile')
    await chatEntity.load('members')
    const isMember = chatEntity.members.some((member) => member.id !== userEntity.profile.id)
    if (!isMember) return

    socket.join(chatId.toString())
  }

  async leaveRoom(socket: Socket, chatId: number) {
    socket.leave(chatId.toString())
  }

  async sendMessage(socket: Socket, chatId: number, content: string) {
    const userEntity = await User.find(this.userId)
    const chatEntity = await Chat.find(chatId)
    if (!userEntity || !chatEntity) return

    await userEntity.load('profile')
    await chatEntity.load('members')
    const isMember = chatEntity.members.some((member) => member.id !== userEntity.profile.id)
    if (!isMember) return
    console.log('sendMessage', { chatId, content })

    const message = await Message.create({
      chatId: chatEntity.id,
      senderId: userEntity.profile.id,
      content,
    })

    const messageResponse = {
      displayName: userEntity.profile.displayName,
      handle: userEntity.profile.handle,
      content: message.content,
      createdAt: message.createdAt.toISO(),
    }

    socket.to(chatId.toString()).emit('newMessage', messageResponse)
    socket.emit('newMessage', messageResponse)
  }
}
