import { createBrowserRouter, Outlet } from 'react-router'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import AllHabits from '../pages/AllHabits'
import AddHabit from '../pages/AddHabit'
import HabitDetails from '../pages/HabitDetails'
import UpdateHabit from '../pages/UpdateHabit'
import MyHabits from '../pages/MyHabits'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "auth",
                element: <Outlet />,
                children: [
                    {
                        path: "register",
                        element: <Signup />
                    },
                    {
                        path: "login",
                        element: <Signin />
                    }
                ]
            },
            {
                path: 'habits',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <AllHabits />
                    },
                    {
                        path: 'add',
                        element: <PrivateRoute><AddHabit /></PrivateRoute>
                    },
                    {
                        path: ':id',
                        element: <HabitDetails />
                    },
                    {
                        path: ':id/edit',
                        element: <PrivateRoute><UpdateHabit /></PrivateRoute>
                    }
                ]
            },
            {
                path: 'my-habits',
                element: <PrivateRoute><MyHabits /></PrivateRoute>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router
