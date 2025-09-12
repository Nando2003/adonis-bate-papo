import User from '#models/user'
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.query().where('email', email).first()

    if (user) {
      const isPasswordValid = await user.verifyPassword(password)

      if (isPasswordValid) {
        await auth.use('web').login(user)
        return response.redirect('/')
      }
    }

    session.flash('error', 'Invalid email or password')
    return response.redirect('/login')
  }

  async register({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(registerValidator)
    await User.create({ email, password })
    return response.redirect('/login')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
