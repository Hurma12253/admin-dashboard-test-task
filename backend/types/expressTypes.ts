import { Request as Req, Response as Res, NextFunction as Next } from 'express'

export interface Request extends Req {
	_id: string
	role: 'admin' | 'default'
}

export interface Response extends Res {}

export interface NextFunction extends Next {}
