import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { setVisibility } from "../../redux/actions";
import { Props } from "react-apexcharts";

export function Sidenav({ brandImg, brandName, routes }: Props) {
  const { pathname } = useLocation();
  const [layout, page, actions] = pathname.split("/").filter((el) => el !== "");

  const currentURL = `${page}/${actions}`;
  const isVisible = useSelector((state: RootState) => state.currentVisibility);
  const dispatch = useDispatch();

  const handleSideBar = () => {
    dispatch(setVisibility(!isVisible));
  };
  return (
    <aside
      className={`bg-gray-900 ${isVisible ? "translate-x-0" : "-translate-x-80"}
      fixed inset-0 z-50 h-[calc(100vh-0px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 -translate-x-80`}
    >
      <div className="border-white/20">
        <Link
          to="/dashboard/home"
          className="flex items-center gap-4 py-6 px-8"
        >
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
          <XMarkIcon
            onClick={handleSideBar}
            strokeWidth={2.5}
            className="h-5 w-5 text-white"
          />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, pages }: Props) => {
          return (
            layout === "sidebar" &&
            pages.map((route: Props, key: number) => {
              return (
                <ul key={key} className="mb-4 flex flex-col gap-1">
                  <li key={route.name}>
                    <NavLink to={`/dashboard/${route.path}`}>
                      <Button
                        variant={
                          route.path.includes(`${page}/`) ? "gradient" : "text"
                        }
                        className="flex items-center gap-4 px-4 capitalize text-white"
                        fullWidth
                      >
                        {route.icon}
                        <Typography className="font-medium capitalize">
                          {route.name}
                        </Typography>
                      </Button>
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
