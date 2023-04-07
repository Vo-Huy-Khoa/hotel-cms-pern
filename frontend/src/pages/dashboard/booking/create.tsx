import { Button, Input, Typography } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiGetList, handleApiCreate } from "../../../services";
import { IRoom, initBodyBooking, initBodyClient } from "../../../types";

export const BookingCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const [listRoom, setListRoom] = useState<IRoom[]>([]);
  const [clientFormData, setClientFormData] = useState(initBodyClient);
  const [bookingFormData, setBookingFormData] = useState(initBodyBooking);

  const handleClientFormDataChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setClientFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleBookingFormDataChange = useCallback((event: any) => {
    const { name, value } = event.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await handleApiCreate("client/create", clientFormData);
      const client_id = response.id;
      const updatedBookingFormData = {
        ...bookingFormData,
        client_id,
      };

      await handleApiCreate("booking/create", updatedBookingFormData);
      navigate("/dashboard/booking/list");
    } catch (error) {
      console.log(error);
    }
  }, [clientFormData, bookingFormData, navigate]);

  const handleClear = useCallback(() => {
    setClientFormData(initBodyClient);
    setBookingFormData(initBodyBooking);
  }, []);

  const fetchListRoom = useCallback(async () => {
    try {
      const listRoom = await handleApiGetList("room");
      setListRoom(listRoom);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchListRoom();
  }, [fetchListRoom]);

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room</Typography>
            <Select
              className="w-full h-10"
              name="room_id"
              onChange={handleBookingFormDataChange}
              value={bookingFormData.room_id}
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
              value={clientFormData.name}
              onChange={handleClientFormDataChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              name="email"
              value={clientFormData.email}
              onChange={handleClientFormDataChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              label="Identity Number"
              name="identity_number"
              value={clientFormData.identity_number}
              onChange={handleClientFormDataChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input
              type="text"
              label="Phone"
              name="phone"
              value={clientFormData.phone}
              onChange={handleClientFormDataChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input
              type="date"
              label="Check In"
              name="check_in"
              value={bookingFormData.check_in}
              onChange={handleBookingFormDataChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input
              type="date"
              label="Check out"
              name="check_out"
              value={bookingFormData.check_out}
              onChange={handleBookingFormDataChange}
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
