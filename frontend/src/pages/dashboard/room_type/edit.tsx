import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { PopupCreate } from "../../../components";

export const RoomTypeEdit = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const nameRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleCreateUser = () => {
    const full_name = nameRef.current?.querySelector("input")?.value || "";
    const limit = limitRef.current?.querySelector("input")?.value || "";
    const price = priceRef.current?.querySelector("input")?.value || "";
  };

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input label="Name" ref={nameRef}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Limit</Typography>
            <Select label="Limit" ref={limitRef}>
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Price</Typography>
            <Input type="text" label="Price" ref={priceRef}></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={handleOpen} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <PopupCreate open={open} onClose={handleOpen} />
    </aside>
  );
};

export default RoomTypeEdit;
