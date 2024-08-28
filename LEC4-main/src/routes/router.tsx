import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Cards from "./Cards/Cards";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Error from "./Error/Error";
import Card from "./Card/Card";
import FavCards from "./FavCards/FavCards";
import CreateCard from "./CreateCard/CreateCard";
import MyCards from "./MyCards/MyCards";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Cards /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/cards", element: <Cards /> },
            { path: "/cards/:id", element: <Card /> },
            { path: "/FavCards", element: <FavCards /> },
            { path: "/CreateCard/:id", element: <CreateCard /> },
            { path: "/CreateCard", element: <CreateCard /> },
            { path: "/MyCards", element: <MyCards /> },
        ],
    },
]);