import { Typography, Button, Input } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";

import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { handleApiGetList, handleApiSearch } from "../../../services";
import { IBooking, IRoom } from "../../../types";
import { BookingCard } from "../../../widgets/cards";

const initSearchBooking = {
  room_id: "",
  name: "",
  check_in: "",
  check_out: "",
};
export function BookingList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listBooking, setListBooking] = useState([]);
  const [listRoom, setListRoom] = useState([]);

  const [values, setValues] = useState(initSearchBooking);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleVisibleSearch = () => {
    setVisibleSearch(!isVisibleSearch);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await handleApiSearch("booking/search", values);
      setListBooking(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setValues(initSearchBooking);
    try {
      const response = await handleApiGetList("booking");
      setListBooking(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchGetlistBooking() {
      try {
        const listBooking = await handleApiGetList("booking");
        setListBooking(listBooking);
      } catch (error) {
        // Handle errors
      }
    }
    async function fetchGetListRoom() {
      try {
        const listRoom = await handleApiGetList("room");
        setListRoom(listRoom);
      } catch (error) {
        // Handle errors
      }
    }

    fetchGetListRoom();
    fetchGetlistBooking();
  }, []);

  return (
    <div className=" h-full mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          Booking
        </Typography>
        <NavLink to="/dashboard/booking/create">
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
                <Typography className="font-small capitalize">Room</Typography>
                <Select
                  className="h-10"
                  name="room_id"
                  value={values.room_id}
                  onChange={handleChange}
                >
                  {listRoom.map((room: IRoom, index) => {
                    return (
                      <MenuItem key={index} value={room.id.toString()}>
                        {room?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Name</Typography>
                <Input
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">
                  check in
                </Typography>
                <Input
                  name="check_in"
                  type="date"
                  label="Check In"
                  value={values.check_in}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">
                  check out
                </Typography>
                <Input
                  name="check_out"
                  type="date"
                  label="Check Out"
                  value={values.check_out}
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
      <div className=" mt-10 w-full h-full grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center">
        {listBooking.map((booking: IBooking, index: number) => {
          // eslint-disable-next-line react/jsx-key
          return <BookingCard booking={booking} index={index} />;
        })}
      </div>
    </div>
  );
}

export default BookingList;
