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
}
