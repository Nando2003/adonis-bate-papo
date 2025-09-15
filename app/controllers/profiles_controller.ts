import Profile from '#models/profile'
import { storeProfileValidator } from '#validators/store_profile'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async showCreate({ inertia, auth, response }: HttpContext) {
    const user = auth.user

    if (user) {
      await user.load('profile')

      if (user.profile) {
        return response.redirect('/')
      }
    }

    return inertia.render('create_profile')
  }

  async store({ request, auth, response }: HttpContext) {
    const { displayName, handle } = await request.validateUsing(storeProfileValidator)

    if (!auth.user) {
      return response.unauthorized()
    }

    if (auth.user.profile) {
      return response.conflict('Profile already exists')
    }

    await Profile.create({
      displayName,
      handle,
      userId: auth.user.id,
    })

    return response.redirect('/')
  }

  async show(ctx: HttpContext) {
    const { params } = ctx
    const handle = params.handle as string | undefined

    if (!handle) {
      ctx.session.flash('error', 'Handle is required')
      return ctx.response.redirect('/')
    }

    const profile = await Profile.query().where('handle', handle).first()

    if (!profile) {
      ctx.session.flash('error', `Profile with handle "${handle}" not found`)
      return ctx.response.redirect('/')
    }

    const profileData = {
      displayName: profile.displayName,
      handle: profile.handle,
    }

    return await ctx.inertia.render('profile', { profile: profileData })
  }
}
