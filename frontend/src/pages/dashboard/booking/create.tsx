import { Button, Input, Typography } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiGetList, handleApiCreate } from "../../../services";
import { IRoom, initBodyBooking, initBodyClient } from "../../../types";

export const BookingCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [listRoom, setListRoom] = useState([]);

  const [bodyClient, setBodyClient] = useState(initBodyClient);
  const [bodyBooking, setBodyBooking] = useState(initBodyBooking);

  const handleChangeBodyClient = (event: any) => {
    const { name, value } = event.target;
    setBodyClient((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeBodyBooking = (event: any) => {
    const { name, value } = event.target;
    setBodyBooking((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await handleApiCreate("client/create", bodyClient);
      const client_id = response.id;
      const updatedBodyBooking = {
        ...bodyBooking,
        client_id: client_id,
      };

      await handleApiCreate("booking/create", updatedBodyBooking);
      navigate("/dashboard/booking/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setBodyClient(initBodyClient);
    setBodyBooking(initBodyBooking);
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

    fetchGetListRoom();
  }, []);

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room</Typography>
            <Select
              className="w-full h-10"
              name="room_id"
              value={bodyBooking.room_id}
              onChange={handleChangeBodyBooking}
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
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input
              type="text"
              label="Name"
              name="name"
              value={bodyClient.name}
              onChange={handleChangeBodyClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              name="email"
              value={bodyClient.email}
              onChange={handleChangeBodyClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              label="Identity Number"
              name="identity_number"
              value={bodyClient.identity_number}
              onChange={handleChangeBodyClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input
              type="text"
              label="Phone"
              name="phone"
              value={bodyClient.phone}
              onChange={handleChangeBodyClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input
              type="date"
              label="Check In"
              name="check_in"
              value={bodyBooking.check_in}
              onChange={handleChangeBodyBooking}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input
              type="date"
              label="Check out"
              name="check_out"
              value={bodyBooking.check_out}
              onChange={handleChangeBodyBooking}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={handleOpen} className="h-10">
          Submit
        </Button>
        <Button onClick={handleClear} className="bg-blue-gray-700 h-10">
          Clear
        </Button>
      </div>
      <Popup
        desc="Booking Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default BookingCreate;
