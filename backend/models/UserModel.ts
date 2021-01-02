import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUserSchema extends Document {
	firstname: string
	lastname: string
	patronymic: string
	login: string
	password: string
	role?: 'default' | 'admin'
	matchPassword?: (password: string) => boolean
}

const userSchema = new Schema(
	{
		firstname: {
			required: true,
			type: String,
		},
		lastname: {
			required: true,
			type: String,
		},
		patronymic: {
			required: true,
			type: String,
		},
		login: {
			required: true,
			type: String,
		},
		password: {
			required: true,
			type: String,
		},
		role: {
			required: false,
			type: String,
			default: 'default',
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.matchPassword = function (password: string) {
	return bcrypt.compareSync(password, this.password)
}

userSchema.pre<IUserSchema>('save', function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	this.password = bcrypt.hashSync(this.password, 10)

	return next()
})

export default model<IUserSchema>('User', userSchema)
