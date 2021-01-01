import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Header from '../Components/Header'
import HomeScreen from '../Screens/HomeScreen'

export const useProtectedRoutes = (logged: boolean, admin?: boolean) => {
	if (!logged) {
		return (
			<>
				<Header />
				<Container maxWidth='lg'>
					<Switch>
						<Route exact path="/" component={HomeScreen} />
					</Switch>
				</Container>
			</>
		)
	}
}
