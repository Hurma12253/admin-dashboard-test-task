import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import { userSignin, loginFailure } from '../Store/actions/userActions'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	progress: {
		position: 'absolute',
		width: '100%'
	}
}))

const Signin = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { loading, error } = useSelector((state: IRootState) => state.user)

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const emailHandler = (e: any) => {
		setEmail(e.target.value)
	}

	const passwordHandler = (e: any) => {
		setPassword(e.target.value)
	}

	const submitHandler = (e: any) => {
		e.preventDefault()

		if (!email || !password) {
			return dispatch(loginFailure({message: 'Invalid data!'}))
		}

		dispatch(userSignin({ email, password }))
	}

	return (
		<>
			<CssBaseline />
			<div className={classes.paper}>
				{loading && <LinearProgress className={classes.progress} />}
				{error && <Alert style={{width:'100%'}} severity="error">{error}</Alert>}
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={email}
						onChange={emailHandler}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={passwordHandler}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={submitHandler}
						disabled={loading}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="signin">Forgot password?</Link>
						</Grid>
						<Grid item>
							<Link to="/signup">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</>
	)
}

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link to="/">HurmaRC</Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default Signin
