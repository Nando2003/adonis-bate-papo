import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home route
router
  .on('/')
  .renderInertia('home')
  .as('home')
  .use([middleware.auth(), middleware.profileRequired()])

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

// Profile routes
router
  .get('/profiles/create', '#controllers/profiles_controller.showCreate')
  .as('profiles.create')
  .use([middleware.auth()])
router
  .post('/profiles', '#controllers/profiles_controller.store')
  .as('profiles.store')
  .use([middleware.auth()])
router
  .get('/profiles/:handle', '#controllers/profiles_controller.show')
  .as('profiles.show')
  .use([middleware.auth(), middleware.profileRequired()])

// Chat routes
router
  .get('/chats/:id', '#controllers/chats_controller.showChat')
  .as('chats.show')
  .use([middleware.auth(), middleware.profileRequired()])
router
  .post('/chats/one-on-one', '#controllers/chats_controller.storeOneOnOne')
  .as('chats.one-on-one')
  .use([middleware.auth(), middleware.profileRequired()])
router
  .post('/chats/group', '#controllers/chats_controller.storeGroup')
  .as('chats.group')
  .use([middleware.auth(), middleware.profileRequired()])
