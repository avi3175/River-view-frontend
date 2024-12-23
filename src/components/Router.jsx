import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Menu from './Menu';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from "./Dashboard"
import AddRoom from './AddRoom';
import AdminSeeAllMenus from './AdminSeeAllMenus ';
import AdminSeeAllusers from './AdminSeeAllUsers '
import AdminSeeAllRooms from './AdminSeeAllRooms';
import MyBookedRooms from './MyBookedRooms';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "menu",
    element:<Menu></Menu>
  },
  {
    path:"signup",
    element:<SignUp></SignUp>
  },
  {
    path:"login",
    element:<Login></Login>
  },
  {
    path:"dash",
    element:<Dashboard></Dashboard>
  },
  {
    path:"goToAddRoom",
    element:<AddRoom></AddRoom>
  },
  {
    path:"AdminSeeAllMenus",
    element:<AdminSeeAllMenus></AdminSeeAllMenus>
  },
  {
    path:"AdminSeeAllUsers",
    element:<AdminSeeAllusers></AdminSeeAllusers>
  },
  {
    path:"AdminSeeAllRooms",
    element:<AdminSeeAllRooms></AdminSeeAllRooms>
  },
  {
    path:"myBookedRooms",
    element:<MyBookedRooms></MyBookedRooms>
  },
  {
    path:'review',
    element:<ReviewForm></ReviewForm>
  },
  {
    path:"seeReviews",
    element:<ReviewList></ReviewList>
  }
]);
