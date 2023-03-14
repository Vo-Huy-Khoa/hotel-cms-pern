import { Routes, Route } from "react-router-dom";
import { Navbar, Sidenav } from "../widgets/layout";
import routes from "../routes";

export function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-blue-gray-50/50 ">
      <Sidenav routes={routes} />
      <div className="p-4 xl:ml-80">
        <Navbar />
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
      </div>
    </div>
  );
}
