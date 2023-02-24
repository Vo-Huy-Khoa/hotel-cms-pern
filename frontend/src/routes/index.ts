import SignIn from "../pages/auth/sign-in";
import SignUp from "../pages/auth/sign-up";
import Home from "../pages/dashboard/home";
import Profile from "../pages/dashboard/profile";
const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "dashboard",
        path: "/home",
        element: Home,
      },
      {
        name: "profile",
        path: "/profile",
        element: Profile,
      },
      {
        name: "notifactions",
        path: "/notifactions",
        element: Notification,
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
        element: SignIn,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: SignUp,
      },
    ],
  },
];

export default routes;
