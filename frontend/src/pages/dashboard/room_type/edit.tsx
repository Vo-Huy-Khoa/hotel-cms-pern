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
import { handleApiEdit, handleApiGetItem } from "../../../services";
import { IRoomType } from "../../../types";

export const RoomTypeEdit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();
  const [roomType, setRoomType] = useState<IRoomType>();

  const nameRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<string | undefined>(undefined);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const name = nameRef.current?.querySelector("input")?.value || "";
    const price = priceRef.current?.querySelector("input")?.value || "";

    const body = {
      id,
      name,
      count,
      price,
    };

    await handleApiEdit("room_type/update", body);
    navigate("/dashboard/room-type/list");
  };

  useEffect(() => {
    async function getItem() {
      const getRoomType = await handleApiGetItem(`room_type/edit/${id}`);
      setRoomType(getRoomType);
    }
    getItem();
  }, [id]);

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input
              label="Name"
              ref={nameRef}
              defaultValue={roomType?.name}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Limit</Typography>
            <Select
              label="Limit"
              onChange={(value) => setCount(value)}
              value={roomType?.count.toString()}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Price</Typography>
            <Input
              type="text"
              label="Price"
              ref={priceRef}
              defaultValue={roomType?.price}
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
      <Popup open={open} onClose={handleOpen} />
      <Popup
        title="Popup Edit"
        desc="Room Type Edit"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default RoomTypeEdit;
