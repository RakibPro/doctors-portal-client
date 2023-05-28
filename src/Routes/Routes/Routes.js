import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import Appointment from '../../Pages/Appointment/Appointment';
import Testimonial from '../../Pages/Home/Testimonial/Testimonial';
import Contact from '../../Pages/Home/Contact/Contact';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/appointment',
                element: <Appointment />,
            },
            {
                path: '/reviews',
                element: <Testimonial />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
]);
