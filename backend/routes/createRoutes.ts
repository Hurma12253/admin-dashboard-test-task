import {Express} from 'express'
import {UserCtrl, AdminCtrl} from '../controllers'
import {auth} from '../middlewares/auth'

export const createRoutes = (app: Express) => {
    const UserController = new UserCtrl()
    const AdminController = new AdminCtrl()

    app.use(auth)

    app.post('/user/signup', UserController.signup)
    app.post('/user/signin', UserController.signin)

    app.get('/admin/getallusers', AdminController.getAllUsers)
}