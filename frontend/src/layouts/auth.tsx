import { Footer } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

export const Auth = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4"></div>
      {/* Map routes and their associated components to the Routes component */}
      <Routes>
        {routes.map(({ layout, pages }) => {
          return (
            layout === "auth" &&
            pages.map(({ path, element }) => {
              return <Route key={1} path={path} element={element} />;
            })
          );
        })}
      </Routes>
      {/* Render the Footer with absolute positioning properties */}
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
};
