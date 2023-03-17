import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Chip,
  CardFooter,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getUsers } from "../../../services";

export function UserList() {
  const [listUser, setListUser] = useState([]);
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const handleVisibleSearch = () => {
    setVisibleSearch(!isVisibleSearch);
  };

  useEffect(() => {
    async function fetchGetListUser() {
      try {
        const listUser = await getUsers();
        setListUser(listUser);
      } catch (error) {
        // Handle errors
      }
    }

    fetchGetListUser();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          User List
        </Typography>
        <NavLink to="/dashboard/user/create">
          <Button className="w-24">Create</Button>
        </NavLink>
      </div>
      <div
        className="flex flex-row items-center gap-1 cursor-pointer w-20"
        onClick={handleVisibleSearch}
      >
        <MagnifyingGlassIcon
          strokeWidth={3}
          className="h-4 w-4 text-black-500 cursor-pointer"
        />
        <Typography className="font-medium capitalize">Search</Typography>
      </div>
      {isVisibleSearch && (
        <div className="h-60 bg-white rounded-lg p-6 flex flex-col justify-between">
          <div className="flex flex-row items-center gap-1">
            <XMarkIcon
              strokeWidth={3}
              className="h-4 w-4 text-black-500 cursor-pointer"
              onClick={handleVisibleSearch}
            />
            <Typography className="font-medium capitalize">
              Handle search
            </Typography>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Name</Typography>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Email</Typography>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Role</Typography>
              <Select>
                <Option>Admin</Option>
                <Option>User</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Status</Typography>
              <Select>
                <Option>Enable</Option>
                <Option>Disable</Option>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <Button>Search</Button>
            <Button className=" bg-blue-gray-700">Cancel</Button>
          </div>
        </div>
      )}
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "id",
                  "avatar",
                  "full name",
                  "email",
                  "role",
                  "date create",
                  "date update",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listUser.map(
                (
                  {
                    id,
                    avatar,
                    full_name,
                    email,
                    role,
                    created_at,
                    updated_at,
                  },
                  key
                ) => {
                  const className = "py-3 px-5 border-b border-blue-gray-50";
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={avatar} alt={full_name} size="sm" />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          <NavLink to="/dashboard/user/edit">
                            {full_name}
                          </NavLink>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={role === 1 ? "green" : "blue-gray"}
                          value={role === 1 ? "admin" : "user"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {created_at}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {updated_at}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <NavLink
                  to="#"
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  aria-current="page"
                  className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </NavLink>
              </li>
            </ul>
          </nav>
          <Typography className="font-medium">
            Showing 9 to 50 of {listUser.length} entries
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserList;
