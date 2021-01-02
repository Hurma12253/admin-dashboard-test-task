import { Request, Response } from 'express'
import User from '../models/UserModel'
import { createToken } from '../helpers/token'

class UserController {
	constructor() {}

	signup(req: Request, res: Response) {
		const { firstname, lastname, patronymic, login, password } = req.body

		User.findOne({ login })
			.then((user) => {
				if (user) {
					res.status(400).json({
						message: 'This user already exists!',
					})
				} else {
					User.create({
						firstname,
						lastname,
						patronymic,
						login,
						password,
					})
						.then((user) => {
							res.status(200).json({
								name: user.firstname,
								role: user.role,
								token: createToken({
									_id: user._id,
									role: user.role,
								}),
							})
						})
						.catch((error) => {
							res.status(400).json({ message: error })
						})
				}
			})
			.catch((err) => {
				res.status(400).json({ message: err })
			})
	}

	signin(req: Request, res: Response) {
		const { login, password } = req.body

		if (!login || !password) {
			return res.status(400).json({ message: 'Invalid credentials!' })
		}

		User.findOne({ login })
			.then((user) => {
				if (!user) {
					return res
						.status(400)
						.json({ message: 'This user doesnt exists!' })
				} else {
					if (!user.matchPassword(password)) {
						return res
							.status(400)
							.json({ message: 'Invalid password!' })
					} else {
						res.status(200).json({
							name: user.name,
							role: user.role,
							token: createToken({
								_id: user._id,
								role: user.role,
							}),
						})
					}
				}
			})
			.catch((error) => {
				res.status(400).json({ message: error })
			})
	}
}

export default UserController
