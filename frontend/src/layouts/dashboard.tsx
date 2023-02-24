import React from "react";
import { Footer } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

export function Dashboard() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4"></div>
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
  );
}
