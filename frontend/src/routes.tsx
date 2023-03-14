import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  HomeIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "./pages/auth";
import { Home, UserList } from "./pages/dashboard";
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
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user list",
        path: "user/list",
        element: <UserList />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user create",
        path: "user/create",
        element: <UserCreate />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user edit",
        path: "user/edit",
        element: <UserEdit />,
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
        name: "user list",
        path: "user/list",
        element: <UserList />,
      },
    ],
  },
];

export default routes;
