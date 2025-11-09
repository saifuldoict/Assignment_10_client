import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";

import PrivateRoute from "./PrivateRoute";



import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Home from "../components/Home/Home";
import AllMovies from "../pages/AllMovies";
import MyCollectionPage from "../pages/MyCollectionPage";
import MyProfilePage from "../pages/MyProfilePage";
import ErrorPage from "../pages/ErrorPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import UpdateMoviePage from "../pages/UpdateMoviePage";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { 
                index: true,
                element: <Home/>
            },
            {
                path: "/movies",
                loader: () => fetch("http://localhost:5000/movies"),
                element: <AllMovies/>
            },
            {
                path: "/movies/:id",
                loader: ({params}) => fetch(`http://localhost:5000/movies/${params.id}`),
                element: <MovieDetailsPage/>

            },
            {
                path:"/my-profile",
                element:<MyProfilePage/>
            },
            {
                path: "/myCollection",
                element: <PrivateRoute>
                    <MyCollectionPage/>
                </PrivateRoute>
            },
            {
                path: "/movies/update/:id",
                loader: ({params}) => fetch(`http://localhost:5000/movies/update/${params.id}`),
                element: <PrivateRoute>
                    <UpdateMoviePage/>
                </PrivateRoute>
            },

           
           
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path:"/*",
                element:<ErrorPage/>
            }
           
            
           
            
           
        ]
    }
])
export default router;