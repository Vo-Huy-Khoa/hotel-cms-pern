import { Props } from "react-apexcharts";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

export const Auth = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <Routes>
        {routes.map(({ layout, pages }) => {
          return (
            layout === "auth" &&
            pages.map(({ path, element }: Props) => {
              return <Route key={1} path={path} element={element} />;
            })
          );
        })}
      </Routes>
    </div>
  );
};
