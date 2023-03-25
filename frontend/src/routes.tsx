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
import { BookingList, Home, RoomList, UserList } from "./pages/dashboard";
import BookingCreate from "./pages/dashboard/booking/create";
import BookingEdit from "./pages/dashboard/booking/edit";
import RoomCreate from "./pages/dashboard/room/create";
import RoomEdit from "./pages/dashboard/room/edit";
import RoomTypeCreate from "./pages/dashboard/room_type/create";
import RoomTypeEdit from "./pages/dashboard/room_type/edit";
import RoomTypeList from "./pages/dashboard/room_type/list";
import UserCreate from "./pages/dashboard/user/create";
import UserEdit from "./pages/dashboard/user/edit";

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
        name: "dashboard",
        path: "home",
        element: <Home />,
      },
      {
        name: "user list",
        path: "user/list",
        element: <UserList />,
      },
      {
        name: "user create",
        path: "user/create",
        element: <UserCreate />,
      },
      {
        name: "user edit",
        path: "user/edit",
        element: <UserEdit />,
      },
      {
        name: "Room list",
        path: "room/list",
        element: <RoomList />,
      },
      {
        name: "Room create",
        path: "room/create",
        element: <RoomCreate />,
      },
      {
        name: "Room edit",
        path: "room/edit",
        element: <RoomEdit />,
      },
      {
        name: "Booking list",
        path: "booking/list",
        element: <BookingList />,
      },
      {
        name: "Room create",
        path: "booking/create",
        element: <BookingCreate />,
      },
      {
        name: "Room edit",
        path: "booking/edit",
        element: <BookingEdit />,
      },
      {
        name: "Room Type list",
        path: "room-type/list",
        element: <RoomTypeList />,
      },
      {
        name: "Room Type create",
        path: "room-type/create",
        element: <RoomTypeCreate />,
      },
      {
        name: "Room Type edit",
        path: "room-type/edit",
        element: <RoomTypeEdit />,
      },
    ],
  },

  {
    layout: "sidebar",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "User",
        path: "user/list",
        element: <UserList />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Room Type",
        path: "room-type/list",
        element: <RoomTypeList />,
      },
      {
        icon: <HomeModernIcon {...icon} />,
        name: "Room",
        path: "room/list",
        element: <RoomList />,
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Booking",
        path: "booking/list",
        element: <BookingList />,
      },
    ],
  },
];

export default routes;
