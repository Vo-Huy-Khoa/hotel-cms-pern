import { SignIn, SignUp } from "../pages/auth";
import { Home, Profile, Notification } from "../pages/dashboard";

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      {
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        name: "notification",
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
