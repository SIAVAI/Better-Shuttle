import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import Error from "./Components/Error";

import Home from "./Pages/Home/Home";

import Rentals from "./Pages/Rental/Rentals.jsx";
import AddCar from "./Pages/AddCar";
import ShowAllCar from "./Pages/ShowAllCar";
import AddService from "./Pages/AddService";
import ShowAllService from "./Pages/ShowAllService";
import AddRentCar from "./Pages/AddRentCar";
import ShowAllRentCar from "./Pages/ShowAllRentCar";

import Showroom from "./Pages/Showroom/Showroom";
import Services from "./Pages/Services/Services.jsx";
import Login from "./Pages/Auth/Login";
import Reg from "./Pages/Auth/Reg";
import CarDetails from "./Pages/Showroom/CarDetails.jsx";
import SingleRentCar from "./Pages/Rental/SingleRentCar.jsx";
import Profile from "./Pages/Profile.jsx";
import EditShowroom from "./Pages/EditShowroom.jsx";
import EditService from "./Pages/EditService.jsx";
import EditRental from "./Pages/EditRental.jsx";
import SingleService from "./Pages/Services/SingleService.jsx";
import ProtectedRoute from "./Protected/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/showroom",
        element: (
          <ProtectedRoute>
            <Showroom></Showroom>
          </ProtectedRoute>
        ),
      },
      {
        path: "/service",
        element: (
          <ProtectedRoute>
            <Services></Services>
          </ProtectedRoute>
        ),
      },
      {
        path: "/rental",
        element: (
          <ProtectedRoute>
            <Rentals></Rentals>
          </ProtectedRoute>
        ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/reg",
        element: <Reg></Reg>,
      },
      {
        path: "/add-car",
        element: <AddCar></AddCar>,
      },
      {
        path: "/show-all-cars",
        element: <ShowAllCar></ShowAllCar>,
      },
      {
        path: "/add-service",
        element: <AddService></AddService>,
      },
      {
        path: "/show-all-services",
        element: <ShowAllService></ShowAllService>,
      },
      {
        path: "/add-rent-car",
        element: <AddRentCar></AddRentCar>,
      },
      {
        path: "/show-all-rent-car",
        element: <ShowAllRentCar></ShowAllRentCar>,
      },

      {
        path: "/user/:email",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/user/${params.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        },
        element: <Profile></Profile>,
      },
      {
        path: "/car-details/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/showroom/cars/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        },
        element: <CarDetails />,
      },
      {
        path: "/service-details/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/services/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        },
        element: <SingleService />,
      },
      {
        path: "/rental/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/rental/car/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        },
        element: <SingleRentCar></SingleRentCar>,
      },
      {
        path: "/edit-car/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/showroom/cars/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        },
        element: <EditShowroom />,
      },
      {
        path: "/edit-service/:id",
        element: <EditService />,
      },
      {
        path: "/edit-rental/:id",
        element: <EditRental />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster />
    </AuthProvider>
  </StrictMode>
);
