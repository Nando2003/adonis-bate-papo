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
    if (!user) {
      session.flash('error', 'Usuário não encontrado')
      return response.redirect().back()
    }

    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
      session.flash('error', 'Credenciais inválidas')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async register({ request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(registerValidator)

    const existingUser = await User.query().where('email', email).first()
    if (existingUser) {
      session.flash('error', 'Usuário já existe')
      return response.redirect().back()
    }

    await User.create({ email, password })
    session.flash('success', 'Usuário registrado com sucesso!')
    return response.redirect('/login')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
