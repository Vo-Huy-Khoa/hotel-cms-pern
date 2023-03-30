import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiEdit, handleApiGetItem } from "../../../services";
import { IBooking } from "../../../types";

export const BookingEdit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking>();

  const userNameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const full_name = fullNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const status = statusRef.current?.querySelector("input")?.value || "1";

    const body = {
      user_name,
      full_name,
      email,
      status,
    };

    await handleApiEdit("update", body);
    navigate("/dashboard/booking/list");
  };

  useEffect(() => {
    async function getItem() {
      const booking = await handleApiGetItem(`booking/edit/${id}`);
      setBooking(booking);
    }
    getItem();
  }, [id]);
  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User</Typography>
            <Select label="User">
              <Option>Admin</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room</Typography>
            <Select label="Room">
              <Option>Admin</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input
              type="date"
              label="Check In"
              defaultValue={booking?.check_in}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input
              type="date"
              label="Check out"
              defaultValue={booking?.check_out}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button className="h-10">Submit</Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <Popup
        desc="User Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default BookingEdit;
