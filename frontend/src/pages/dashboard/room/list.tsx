import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Chip,
} from "@material-tailwind/react";
import { Select, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { handleApiGetList, handleApiSearch } from "../../../services";
import Pagination from "../../../widgets/layout/panigation";
import moment from "moment";
import { IRoom, IRoomType } from "../../../types";

export function RoomList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [listRoomType, setListRoomType] = useState([]);

  const totalRow: number = listRoom.length;
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    room_type_id: "",
    name: "",
    status: "",
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
      const response = await handleApiSearch("room/search", formData);
      setListRoom(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setFormData({
      room_type_id: "",
      name: "",
      status: "",
    });
    try {
      const listRoom = await handleApiGetList("room");
      setListRoom(listRoom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchGetListRoom() {
      try {
        const listRoom = await handleApiGetList("room");
        setListRoom(listRoom);
      } catch (error) {
        // Handle errors
      }
    }
    async function getRoomType() {
      try {
        const listRoomType = await handleApiGetList("room_type");
        setListRoomType(listRoomType);
      } catch (error) {
        // Handle errors
      }
    }

    getRoomType();
    fetchGetListRoom();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          Room
        </Typography>
        <NavLink to="/dashboard/room/create">
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
              Search Box
            </Typography>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">
                  Room Type
                </Typography>
                <Select
                  className="h-10"
                  name="room_type_id"
                  onChange={handleChange}
                  value={`${formData?.room_type_id}`}
                >
                  {listRoomType.map((type: IRoomType, index) => {
                    return (
                      <MenuItem key={index} value={`${type?.id}`}>
                        {type?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">name</Typography>
                <Input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">
                  Status
                </Typography>
                <Select
                  className="h-10"
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
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
                  "Room Type",
                  "name",
                  "description",
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
              {listRoom
                .slice(page * 10 - 10, page * 10)
                .map((room: IRoom, key) => {
                  const className = "py-3 px-5 border-b border-blue-gray-50";
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {room?.id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          color="blue-gray"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {room?.roomType?.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <NavLink to={`/dashboard/room/edit/${room?.id}/`}>
                          <Typography className=" font-semibold">
                            {room.name}
                          </Typography>
                        </NavLink>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {room?.description}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={room.status ? "green" : "blue-gray"}
                          value={room.status ? "yes" : "no"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {moment(room?.created_at).format("YYYY-MM-DD")}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {moment(room?.updated_at).format("YYYY-MM-DD")}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
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

export default RoomList;
