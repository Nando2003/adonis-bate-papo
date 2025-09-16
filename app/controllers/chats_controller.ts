import Chat from '#models/chat'
import type { HttpContext } from '@adonisjs/core/http'
import { ChatType } from '../enums/chat_type.js'
import { storeChatGroupValidator } from '#validators/store_chat_group'
import Profile from '#models/profile'
import { storeChatOneOnOneValidator } from '#validators/store_chat_one_on_one'

export default class ChatsController {
  async showChat(ctx: HttpContext) {
    const params = ctx.params
    const chatId = params.id as string | undefined
    const userEntity = await ctx.auth.authenticate()

    if (!chatId) {
      return ctx.inertia.render('errors/not_found')
    }

    const chatEntity = await Chat.query().where('id', chatId).first()

    if (!chatEntity) {
      return ctx.inertia.render('errors/not_found')
    }

    await chatEntity.load('members')
    const isMember = chatEntity.members.every((member) => member.id !== userEntity.profile.id)

    if (isMember) {
      return ctx.inertia.render('errors/not_found')
    }

    interface ChatResponse {
      id: number
      name: string
    }

    const chatName =
      chatEntity.type === ChatType.ONE_ON_ONE
        ? chatEntity.members.find((member) => member.id !== userEntity.profile.id)?.displayName
        : chatEntity.name || null

    if (!chatName) {
      return ctx.inertia.render('errors/not_found')
    }

    const chatResponse: ChatResponse = { id: chatEntity.id, name: chatName }
    return ctx.inertia.render('chat', { chat: chatResponse })
  }

  async storeGroup(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(storeChatGroupValidator)
    const userEntity = await ctx.auth.authenticate()

    try {
      const profileIds = await Promise.all(
        payload.memberHandles.map(async (handle) => {
          const profileEntity = await Profile.query().where('handle', handle).first()

          if (!profileEntity) {
            throw new Error(`Profile with handle "${handle}" not found`)
          }

          return profileEntity.id
        })
      )
      profileIds.push(userEntity.profile.id)

      const chatEntity = await Chat.create({
        name: payload.name,
        type: ChatType.GROUP,
      })

      await chatEntity.related('members').attach(profileIds)
      return ctx.response.redirect(`/chats/${chatEntity.id}`)
    } catch (error) {
      ctx.session.flash('error', (error as Error).message)
      return ctx.response.redirect('back')
    }
  }

  async storeOneOnOne(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(storeChatOneOnOneValidator)
    const userEntity = await ctx.auth.authenticate()

    try {
      const profileEntity = await Profile.query().where('handle', payload.memberHandler).first()

      if (!profileEntity) {
        throw new Error(`Profile with handle "${payload.memberHandler}" not found`)
      }

      if (profileEntity.id === userEntity.profile.id) {
        throw new Error('Cannot create a one-on-one chat with yourself')
      }

      const existingChat = await Chat.query()
        .where('type', ChatType.ONE_ON_ONE)
        .whereHas('members', (query) => {
          query.where('profile_id', userEntity.profile.id)
        })
        .whereHas('members', (query) => {
          query.where('profile_id', profileEntity.id)
        })
        .first()

      if (existingChat) {
        return ctx.response.redirect(`/chats/${existingChat.id}`)
      }

      const chatEntity = await Chat.create({
        type: ChatType.ONE_ON_ONE,
      })

      await chatEntity.related('members').attach([userEntity.profile.id, profileEntity.id])
      return ctx.response.redirect(`/chats/${chatEntity.id}`)
    } catch (error) {
      ctx.session.flash('error', (error as Error).message)
      return ctx.response.redirect('back')
    }
  }
}
