import { Button, Input, Typography } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup, PopupDelete } from "../../../components";
import {
  handleApiGetList,
  handleApiDelete,
  handleApiEdit,
  handleApiGetItem,
} from "../../../services";
import {
  IBooking,
  IClient,
  IRoom,
  initBodyClient,
  initBooking,
} from "../../../types";

export const BookingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openCreate, setOpenCreate] = useState(false);
  const changePopupCreate = useCallback(
    () => setOpenCreate((prev) => !prev),
    []
  );

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = useCallback(
    () => setOpenDelete((prev) => !prev),
    []
  );

  const [booking, setBooking] = useState<IBooking>(initBooking);
  const [listRoom, setListRoom] = useState([]);
  const [client, setClient] = useState<IClient>(initBodyClient);

  const handleDelete = async () => {
    await handleApiDelete(`booking/delete/${id}`);
    navigate("/dashboard/booking/list");
  };

  const handleChangeBooking = (event: any) => {
    const { name, value } = event.target;
    setBooking((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeClient = (event: any) => {
    const { name, value } = event.target;
    setClient((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await handleApiEdit("client/update", client);
      const updatedBodyBooking = {
        ...booking,
      };
      await handleApiEdit("booking/update", updatedBodyBooking);
      navigate("/dashboard/booking/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    try {
      const booking = await handleApiGetItem(`booking/edit/${id}`);
      const client = await handleApiGetItem(`client/edit/${booking.client_id}`);
      setBooking(booking);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getItem() {
      const booking = await handleApiGetItem(`booking/edit/${id}`);
      const client = await handleApiGetItem(`client/edit/${booking.client_id}`);
      setBooking(booking);
      setClient(client);
    }
    getItem();
  }, [id]);

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
      <div className="flex flex-row items-center justify-end my-6">
        <Button className="w-24" color="red" onClick={changePopupDelete}>
          Delete
        </Button>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room</Typography>
            {listRoom.length > 0 && booking && (
              <Select
                className="w-full h-10"
                value={`${booking?.room_id}`}
                name="room_id"
                onChange={handleChangeBooking}
              >
                {listRoom.map((room: IRoom, index) => {
                  return (
                    <MenuItem key={index} value={`${room.id}`}>
                      {room.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">name</Typography>
            <Input
              type="text"
              label="name"
              value={client?.name}
              name="name"
              onChange={handleChangeClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              value={client?.email}
              name="email"
              onChange={handleChangeClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              label="Identity Number"
              value={client?.identity_number}
              name="identity_number"
              onChange={handleChangeClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input
              type="text"
              label="Phone"
              value={client?.phone}
              name="phone"
              onChange={handleChangeClient}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input
              type="date"
              label="Check In"
              value={
                booking?.check_in
                  ? new Date(booking.check_in).toISOString().split("T")[0]
                  : ""
              }
              name="check_in"
              onChange={handleChangeBooking}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input
              type="date"
              label="Check out"
              value={
                booking?.check_out
                  ? new Date(booking.check_out).toISOString().split("T")[0]
                  : ""
              }
              name="check_out"
              onChange={handleChangeBooking}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={changePopupCreate} className="h-10">
          Submit
        </Button>
        <Button onClick={handleClear} className="bg-blue-gray-700 h-10">
          Clear
        </Button>
      </div>
      <Popup
        title="Popup Edit"
        desc="User Edit"
        open={openCreate}
        onClose={changePopupCreate}
        submit={handleSubmit}
      />
      <PopupDelete
        title="Popup Delete"
        desc="Booking Delete"
        open={openDelete}
        onClose={changePopupDelete}
        submit={handleDelete}
      />
    </aside>
  );
};

export default BookingEdit;
