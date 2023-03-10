import { Routes, Route } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../widgets/layout";
import routes from "../routes";

export function Dashboard() {
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      // icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/home",
      // icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      // icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      // icon: ArrowRightOnRectangleIcon,
    },
  ];
  return (
    <div className="min-h-screen bg-blue-gray-50/50 flex">
      <div className="w-1/5 h-screen">
        <Sidebar routes={routes} />
      </div>
      <div className="w-4/5 bg-white h-screen">
        <div>
          <Navbar />
        </div>
        <Routes>
          {routes.map(({ layout, pages }) => {
            return (
              layout === "dashboard" &&
              pages.map(({ path, element }) => {
                return <Route key={1} path={path} element={element} />;
              })
            );
          })}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
