import { Button, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export function Sidebar({ routes }: any) {
  return (
    <aside className="h-full bg-gray-200">
      <div className="m-4">
        {routes.map(({ layout, title, pages }: any, key: number) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <Typography variant="small">{title}</Typography>
            </li>
            {pages.map(({ icon, name, path }: any) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={"blue-gray"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}
