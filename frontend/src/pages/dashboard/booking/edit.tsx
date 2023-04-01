import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "../../../components";
import { getData, handleApiCreate, handleApiGetItem } from "../../../services";
import { IBooking, IClient, IRoom } from "../../../types";

export const BookingEdit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [listRoom, setListRoom] = useState([]);
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking>();
  const [client, setClient] = useState<IClient>();

  const roomRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const identityRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const room = roomRef.current?.querySelector("input")?.value || "";
    const name = nameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const identity_number =
      identityRef.current?.querySelector("input")?.value || "";
    const phone = phoneRef.current?.querySelector("input")?.value || "";
    const check_in = checkInRef.current?.querySelector("input")?.value || "";
    const check_out = checkOutRef.current?.querySelector("input")?.value || "";

    const bodyClient = {
      name,
      email,
      identity_number,
      phone,
    };
    const response = await handleApiCreate("client/create", bodyClient);
    const user_id = response.data.id;
    const bodyBooking = {
      room_id: room,
      user_id,
      check_in,
      check_out,
    };
    await handleApiCreate("booking/create", bodyBooking);
    navigate("/dashboard/booking/list");
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
        const listRoom = await getData("room");
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
            <Select label="Room" ref={roomRef}>
              {listRoom.map((room: IRoom, index) => {
                return <Option key={index}>{room?.name}</Option>;
              })}
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">name</Typography>
            <Input
              type="text"
              label="name"
              ref={nameRef}
              defaultValue={client?.name}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              ref={emailRef}
              defaultValue={client?.email}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              label="Identity Number"
              ref={identityRef}
              defaultValue={client?.identity_number}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input
              type="text"
              label="Phone"
              ref={phoneRef}
              defaultValue={client?.phone}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input
              type="date"
              label="Check In"
              ref={checkInRef}
              defaultValue={booking?.check_in}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input
              type="date"
              label="Check out"
              ref={checkOutRef}
              defaultValue={booking?.check_out}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={handleOpen} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <Popup
        title="Popup Edit"
        desc="Booking Edit"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default BookingEdit;
