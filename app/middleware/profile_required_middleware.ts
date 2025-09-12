import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ProfileRequiredMiddleware {
  redirectTo = '/profiles/create'

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.request.url() === this.redirectTo) {
      return next()
    }

    const user = ctx.auth.user as any

    if (user) {
      await user.load('profile')

      if (!user.profile) {
        return ctx.response.redirect(this.redirectTo, true)
      }
    }

    await next()
  }
}
