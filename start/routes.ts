import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home route
router.on('/').renderInertia('home').as('home').use([middleware.auth()])

// Login routes
router.get('/login', '#controllers/auth_controller.showLogin').as('login').use([middleware.guest()])
router
  .post('/login', '#controllers/auth_controller.login')
  .as('login.post')
  .use([middleware.guest()])

// Register routes
router
  .get('/register', '#controllers/auth_controller.showRegister')
  .as('register')
  .use([middleware.guest()])
router
  .post('/register', '#controllers/auth_controller.register')
  .as('register.post')
  .use([middleware.guest()])

// Logout route
router.post('/logout', '#controllers/auth_controller.logout').as('logout').use([middleware.auth()])
