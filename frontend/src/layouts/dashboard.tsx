import { Routes, Route } from "react-router-dom";
import { Footer, Sidebar } from "../widgets/layout";
import routes from "../routes";

export function Dashboard() {
  return (
    <div className="relative min-h-screen w-full">
      <header>
        <Sidebar />
      </header>
      <main>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
