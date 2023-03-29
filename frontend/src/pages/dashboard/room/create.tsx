import {
  Button,
  Input,
  Select,
  Typography,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiCreate } from "../../../services";

export const RoomCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const roomTypeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const room_type = roomTypeRef.current?.querySelector("input")?.value || "";
    const name = nameRef.current?.querySelector("input")?.value || "";
    const description = descRef.current?.querySelector("input")?.value || "";
    const image = imageRef.current?.querySelector("input")?.value || "1";

    const body = {
      room_type,
      name,
      description,
      image,
    };

    await handleApiCreate("room/create", body);
    navigate("/dashboard/room/list");
  };

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room Type</Typography>
            <Select label="Room Type" ref={roomTypeRef}>
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input label="Name" ref={nameRef}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Description</Typography>
            <Textarea label="Description" ref={descRef}></Textarea>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Image</Typography>
            <Input type="file" label="Image" ref={imageRef}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Role</Typography>
            <Select label="Role" ref={statusRef}>
              <Option>Admin</Option>
              <Option>User</Option>
            </Select>
          </div>
        </form>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={handleOpen} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <Popup
        desc="User Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />{" "}
    </aside>
  );
};

export default RoomCreate;
