import {
  Card,
  CardBody,
  Typography,
  Chip,
  Button,
  Input,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { handleApiGetList, handleApiSearch } from "../../../services";
import Pagination from "../../../widgets/layout/panigation";
import { IUser } from "../../../types";
import moment from "moment";

export function UserList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listUser, setListUser] = useState<IUser[]>([]);
  const totalRow: number = listUser.length;
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }
  const handleVisibleSearch = () => {
    setVisibleSearch(!isVisibleSearch);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await handleApiSearch("user/search", formData);
      setListUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setFormData({
      full_name: "",
      email: "",
    });
    try {
      const listUser = await handleApiGetList("user");
      setListUser(listUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchGetListUser() {
      try {
        const listUser = await handleApiGetList("user");
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
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-row items-center gap-1">
            <XMarkIcon
              strokeWidth={3}
              className="h-4 w-4 text-black-500 cursor-pointer"
              onClick={handleVisibleSearch}
            />
            <Typography className="font-medium capitalize">
              Search Box
            </Typography>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Name</Typography>
                <Input
                  name="full_name"
                  label="Name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Email</Typography>
                <Input
                  type="email"
                  name="email"
                  label="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <Button type="submit">Search</Button>
              <Button onClick={handleClearSearch} className=" bg-blue-gray-700">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "id",
                  "full name",
                  "email",
                  "status",
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
              {listUser
                .slice(page * 10 - 10, page * 10)
                .map(
                  (
                    { id, full_name, email, status, created_at, updated_at },
                    key
                  ) => {
                    const className = "py-3 px-5 border-b border-blue-gray-50";
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            <NavLink to={`/dashboard/user/edit/${id}/`}>
                              {full_name}
                            </NavLink>
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={status == "1" ? "green" : "blue-gray"}
                            value={status == "1" ? "yes" : "no"}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {moment(created_at).format("YYYY-MM-DD")}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {moment(updated_at).format("YYYY-MM-DD")}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
        <Pagination
          page={page}
          totalRow={totalRow}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
}

export default UserList;
