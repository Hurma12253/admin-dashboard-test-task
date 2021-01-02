declare namespace NodeJS {
	interface ProcessEnv {
		MONGO_URI: string
		JWT_SECRET: string
	}
}

declare namespace Express{
	interface Request{
		_id: string
        role: 'admin' | 'default'
	}
}
