import '../../../src/App.css';
import superIkonka from '../../assets/logo.jpg';
import CreateEvent from '../createEvent/CreateEvent';
import DeleteEvent from '../deleteEvent/DeleteEvent';
import UpdateEvent from '../updateEvent/UpdateEvent';
import PrivateRoute from '../route/PrivateRoute';

function HomePage() {
    return (
        <div>
            <h2>Super moder planer</h2>
            <img src={superIkonka} width={200} alt="ale fajna ikonka" />
            <hr></hr>
            <PrivateRoute > <CreateEvent /> </PrivateRoute>
            <hr></hr>
            <PrivateRoute > <UpdateEvent /> </PrivateRoute>
           
            <hr></hr>
            <PrivateRoute > <DeleteEvent /> </PrivateRoute>
        </div>
    )
}

export default HomePage;
