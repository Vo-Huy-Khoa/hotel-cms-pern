import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

export function Sidenav({ brandImg, brandName, routes }: any) {
  return (
    <aside
      className=" bg-gradient-to-br from-blue-gray-800 to-blue-gray-900
      fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0"
    >
      <div className="border-white/20">
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography variant="h6" color={"white"}>
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, pages }: any) => {
          return (
            layout === "dashboard" &&
            pages.map((route: any, key: number) => {
              return (
                <ul key={key} className="mb-4 flex flex-col gap-1">
                  <li key={route.name}>
                    <NavLink to={`/dashboard/${route.path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          className="flex items-center gap-4 px-4 capitalize text-white"
                          fullWidth
                        >
                          {route.icon}
                          <Typography className="font-medium capitalize">
                            {route.name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </ul>
              );
            })
          );
        })}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Admin",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
