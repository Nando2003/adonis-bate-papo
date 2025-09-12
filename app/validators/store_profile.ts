import vine from '@vinejs/vine'

export const storeProfileValidator = vine.compile(
  vine.object({
    displayName: vine.string().minLength(3).maxLength(200).trim(),
    handle: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .regex(/^[a-z0-9_]+$/)
      .unique({ table: 'profiles', column: 'handle' }),
  })
)
