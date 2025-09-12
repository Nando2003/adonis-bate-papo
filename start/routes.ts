import router from '@adonisjs/core/services/router'

router.on('/').render('home').as('home')

router.get('/login', '#controllers/auth_controller.showLogin').as('login')
router.post('/login', '#controllers/auth_controller.login').as('login.post')

router.get('/register', '#controllers/auth_controller.showRegister').as('register')
router.post('/register', '#controllers/auth_controller.register').as('register.post')
