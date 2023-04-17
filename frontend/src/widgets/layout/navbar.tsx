import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setVisibility } from "../../redux/actions";
import { RootState } from "../../redux/reducers/rootReducer";
import { IUser } from "../../types";
import { Logout } from "@mui/icons-material";
import { handleApiLogout } from "../../services";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user: IUser = JSON.parse(sessionStorage.getItem("user") || "");
  const [layout, page, actions] = pathname.split("/").filter((el) => el !== "");
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.currentVisibility);

  const handleSideBar = () => {
    dispatch(setVisibility(!isVisible));
  };

  const handleLogout = async () => {
    await handleApiLogout();
    navigate("/auth/sign-in");
  };
  return (
    <MTNavbar
      color={"transparent"}
      className={"rounded-xl transition-all py-0 px-0"}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${"mt-1"}`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              {page}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {actions}
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <Bars3Icon
              onClick={handleSideBar}
              strokeWidth={3}
              className="h-6 w-6 text-blue-gray-500"
            />
          </IconButton>
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            {user?.full_name}
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  Settings
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                className="flex items-center gap-3"
              >
                <Logout className="h-5 w-5 text-blue-gray-500" />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  Logout
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </MTNavbar>
  );
}
