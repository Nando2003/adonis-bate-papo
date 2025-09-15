import vine from '@vinejs/vine'

export const storeChatGroupValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    memberHandles: vine.array(vine.string().minLength(3).maxLength(100)).minLength(1),
  })
)
