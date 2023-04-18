import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  HomeIcon,
  HomeModernIcon,
  TableCellsIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "./pages/auth";
import {
  Home,
  BookingList,
  BookingCreate,
  BookingEdit,
  RoomList,
  RoomCreate,
  RoomEdit,
  UserList,
  UserCreate,
  UserEdit,
  RoomTypeCreate,
  RoomTypeEdit,
  RoomTypeList,
  Checkout,
} from "./pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "user/list/",
        element: <UserList />,
      },
      {
        path: "user/create/",
        element: <UserCreate />,
      },
      {
        path: "user/edit/:id/",
        element: <UserEdit />,
      },
      {
        path: "room/list/",
        element: <RoomList />,
      },
      {
        path: "room/create/",
        element: <RoomCreate />,
      },
      {
        path: "room/edit/:id/",
        element: <RoomEdit />,
      },
      {
        path: "booking/list/",
        element: <BookingList />,
      },
      {
        path: "booking/create/",
        element: <BookingCreate />,
      },
      {
        path: "booking/edit/:id/",
        element: <BookingEdit />,
      },
      {
        path: "room-type/list/",
        element: <RoomTypeList />,
      },
      {
        path: "room-type/create/",
        element: <RoomTypeCreate />,
      },
      {
        path: "room-type/edit/:id/",
        element: <RoomTypeEdit />,
      },
      {
        path: "checkout/:id/",
        element: <Checkout />,
      },
    ],
  },

  {
    layout: "sidebar",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "home/",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "User",
        path: "user/list/",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Room Type",
        path: "room-type/list/",
      },
      {
        icon: <HomeModernIcon {...icon} />,
        name: "Room",
        path: "room/list/",
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Booking",
        path: "booking/list/",
      },
    ],
  },
];

export const API = {
  REFRESH_TOKEN: "refresh_token",
  SIGN_UP: "auth/register",
  SIGN_IN: "/auth/login",
  LOGOUT: "auth/logout",
};

export default routes;
