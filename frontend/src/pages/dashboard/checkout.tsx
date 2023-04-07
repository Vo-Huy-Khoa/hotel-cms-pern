import { Button, Typography, Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBooking, IClient, IRoom, IRoomType } from "../../types";
import { handleApiEdit, handleApiGetItem } from "../../services";
import moment from "moment";

export const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking>();
  const [client, setClient] = useState<IClient>();
  const [room, setRoom] = useState<IRoom>();
  const [roomType, setRoomType] = useState<IRoomType>();
  const date1 = moment(booking?.check_in);
  const date2 = moment(booking?.check_out);
  const diffInDays = date2.diff(date1, "days");
  const price = Number(roomType?.price);
  const convertPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const totalPrice = price * diffInDays;
  const convertTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleCheckout = async () => {
    const body = {
      id,
      room_id: room?.id,
      client_id: client?.id,
      check_in: booking?.check_in,
      check_out: booking?.check_out,
      total_price: price,
      status: "false",
    };
    await handleApiEdit("booking/update", body);
    navigate("/dashboard/booking/list");
  };

  useEffect(() => {
    async function getItem() {
      const booking = await handleApiGetItem(`booking/edit/${id}`);
      const client = await handleApiGetItem(`client/edit/${booking.client_id}`);
      const room = await handleApiGetItem(`room/edit/${booking.room_id}`);
      const roomType = await handleApiGetItem(
        `room_type/edit/${room.room_type_id}`
      );
      setClient(client);
      setBooking(booking);
      setRoom(room);
      setRoomType(roomType);
    }
    getItem();
  }, [id]);
  return (
    <aside className="grid grid-cols-custom h-screen rounded-lg">
      <section className="bg-blue-gray-700 h-full flex flex-col items-center gap-16 p-24">
        {/* <Typography color="white" variant="h2">
          CMS Hotel
        </Typography> */}
        <img src="/img/checkout_booking.png" alt="avatar" className="w-48" />
        <Typography color="white" variant="h2">
          Thank you!
        </Typography>
      </section>
      <section className="bg-white h-full p-6 flex flex-col gap-2">
        <Typography className="" variant="h4">
          Summary
        </Typography>
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <div className="flex flex-row justify-between ">
            <Typography className="">Name: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {client?.name}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Room: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {room?.name}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Price: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {convertPrice}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Check in: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {moment(booking?.check_in).format("YYYY-MM-DD")}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Check out: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {moment(booking?.check_in).format("YYYY-MM-DD")}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Total day: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {diffInDays}
            </Typography>
          </div>
          <div className="flex flex-row justify-between  ">
            <Typography className="">Total money: </Typography>
            <Typography className="font-semibold text-blue-gray-600">
              {convertTotalPrice}
            </Typography>
          </div>
          <Button className="mt-2" onClick={handleCheckout}>
            Submit
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default Checkout;
