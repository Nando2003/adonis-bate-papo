import vine from '@vinejs/vine'

export const storeChatOneOnOneValidator = vine.compile(
  vine.object({
    memberHandler: vine.string().minLength(3).maxLength(100),
  })
)
