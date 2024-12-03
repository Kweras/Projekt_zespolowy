import '../../../src/App.css';
import PrivateRoute from '../route/PrivateRoute';
import EventsContainer from '../eventsContainer/EventsContainer';

function HomePage() {
	return (
		<div>
			<h2>Super modern planer</h2>
			{/*<PrivateRoute> <EventsContainer /> </PrivateRoute> */}
		</div>
	)
}

export default HomePage;
