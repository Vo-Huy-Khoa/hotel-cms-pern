import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";

import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { handleApiGetList, handleApiSearch } from "../../../services";
import Pagination from "../../../widgets/layout/panigation";
import moment from "moment";
import { IRoomType } from "../../../types";

export function RoomTypeList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listRoomType, setListRoomType] = useState([]);
  const [listRoomTypeSearch, setRoomTypeSearch] = useState([]);
  const totalRow: number = listRoomType.length;
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    count: "",
    price: "",
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

  const handleSearch = async (event: any) => {
    event.preventDefault();
    try {
      const response = await handleApiSearch("room_type/search", formData);
      setListRoomType(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setFormData({
      name: "",
      count: "",
      price: "",
    });
    try {
      const listRoomType = await handleApiGetList("room_type");
      setListRoomType(listRoomType);
    } catch (error) {
      setListRoomType([]);
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchGetRoomType() {
      try {
        const listRoomType = await handleApiGetList("room_type");
        setListRoomType(listRoomType);
        setRoomTypeSearch(listRoomType);
      } catch (error) {
        // Handle errors
      }
    }

    fetchGetRoomType();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          Room Type
        </Typography>
        <NavLink to="/dashboard/room-type/create">
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
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Count</Typography>
                <Select
                  className="h-10"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                >
                  {listRoomTypeSearch.length > 0 &&
                    listRoomTypeSearch.map((type: IRoomType, index) => {
                      return (
                        <MenuItem key={index} value={`${type.count}`}>
                          {type.count}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Price</Typography>
                <Select
                  className="h-10"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                >
                  {listRoomTypeSearch.length > 0 &&
                    listRoomTypeSearch.map((type: IRoomType, index) => {
                      return (
                        <MenuItem key={index} value={`${type.price}`}>
                          {type.price}
                        </MenuItem>
                      );
                    })}
                </Select>
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
                  "name",
                  "count",
                  "price",
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
              {listRoomType.length > 0 &&
                listRoomType
                  .slice(page * 10 - 10, page * 10)
                  .map(
                    (
                      { id, name, count, price, created_at, updated_at },
                      key
                    ) => {
                      const className =
                        "py-3 px-5 border-b border-blue-gray-50";
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
                              <NavLink to={`/dashboard/room-type/edit/${id}/`}>
                                {name}
                              </NavLink>
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {count}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {price}
                            </Typography>
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

export default RoomTypeList;
