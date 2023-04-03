import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup, PopupDelete } from "../../../components";
import {
  handleApiDelete,
  handleApiEdit,
  handleApiGetItem,
} from "../../../services";
import { IRoomType } from "../../../types";

export const RoomTypeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomType, setRoomType] = useState<IRoomType>();
  const [openCreate, setOpenCreate] = useState(false);
  const changePopupCreate = () => setOpenCreate(!openCreate);

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = () => setOpenDelete(!openDelete);

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
  const handleDelete = async () => {
    await handleApiDelete(`room_type/delete/${id}`);
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
      <div className="flex flex-row items-center justify-end my-6">
        <Button className="w-24" color="red" onClick={changePopupDelete}>
          Delete
        </Button>
      </div>
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
        <Button onClick={changePopupCreate} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
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
        desc="Room Type Delete"
        open={openDelete}
        onClose={changePopupDelete}
        submit={handleDelete}
      />
    </aside>
  );
};

export default RoomTypeEdit;
