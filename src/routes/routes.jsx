import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";

import PrivateRoute from "./PrivateRoute";



import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Home from "../components/Home/Home";
import AllMovies from "../pages/AllMovies";
import MyCollectionPage from "../pages/MyCollectionPage";




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
                path: "/allMovies",
                element: <AllMovies/>
            },
            {
                path: "/myCollection",
                element: <PrivateRoute>
                    <MyCollectionPage/>
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
           
            
           
            
           
        ]
    }
])
export default router;