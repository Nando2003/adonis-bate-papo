import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  redirectTo = '/'

  async handle(ctx: HttpContext, next: NextFn) {
    if (await ctx.auth.check()) {
      return ctx.response.redirect(this.redirectTo, true)
    }
    return next()
  }
}
