import Chat from '#models/chat'
import Message from '#models/message'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  async index(ctx: HttpContext) {
    const { chatId } = ctx.params
    const { lastMessageId } = ctx.request.qs()

    if (!chatId) {
      return ctx.response.badRequest('Chat ID is required')
    }

    const userEntity = await ctx.auth.authenticate()
    const chatEntity = await Chat.find(chatId)

    if (!chatEntity) {
      return ctx.response.notFound('Chat not found')
    }

    await chatEntity.load('members')
    const isMember = chatEntity.members.every((member) => member.id !== userEntity.profile.id)

    if (isMember) {
      return ctx.response.unauthorized('You are not a member of this chat')
    }

    let query = Message.query().where('chat_id', chatId)

    if (lastMessageId) {
      query = query.where('id', '<', lastMessageId)
    }

    const messages = await query.orderBy('created_at', 'desc').limit(20)

    const messagesResponse = await Promise.all(
      messages.map(async (message) => {
        await message.load('sender')

        return {
          content: message.content,
          createdAt: message.createdAt.toISO(),
          displayName: message.sender.displayName,
          handle: message.sender.handle,
        }
      })
    )

    return ctx.response.ok({ messages: messagesResponse })
  }
}
