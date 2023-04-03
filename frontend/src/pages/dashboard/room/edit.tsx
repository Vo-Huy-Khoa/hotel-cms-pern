import {
  Button,
  Input,
  Select,
  Typography,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "../../../components";
import { getData, handleApiEdit, handleApiGetItem } from "../../../services";
import { IRoom, IRoomType } from "../../../types";

export const RoomEdit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();
  const [room, setRoom] = useState<IRoom>();

  const [listRoomType, setListRoomType] = useState([]);
  const [room_type_id, setRoomType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const name = nameRef.current?.querySelector("input")?.value || "";
    const description = descRef.current?.querySelector("textarea")?.value || "";
    const image = imageRef.current?.querySelector("input")?.value || "1";

    const body = {
      id,
      room_type_id,
      name,
      description,
      image,
      status,
    };

    await handleApiEdit("room/update", body);
    navigate("/dashboard/room/list");
  };

  useEffect(() => {
    async function getItem() {
      const room = await handleApiGetItem(`room/edit/${id}`);
      setRoom(room);
      setStatus(room?.status?.toString());
      setRoomType(room?.room_type_id);
    }
    getItem();
  }, [id]);
  useEffect(() => {
    async function getRoomType() {
      try {
        const listRoomType = await getData("room_type");
        setListRoomType(listRoomType);
      } catch (error) {
        // Handle errors
      }
    }

    getRoomType();
  }, []);

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room Type</Typography>
            {listRoomType.length > 0 && room && (
              <Select
                label="Room Type"
                onChange={(value) => setRoomType(value)}
                value={`${room?.room_type_id}`}
              >
                {listRoomType.map((type: IRoomType, index) => {
                  return (
                    <Option key={index} value={`${type.id}`}>
                      {type.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input label="Name" ref={nameRef} defaultValue={room?.name}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Description</Typography>
            <Textarea
              label="Description"
              ref={descRef}
              defaultValue={room?.description}
            ></Textarea>
          </div>
          {/* <div className="flex flex-row gap-6">
            <Typography className="w-32">Image</Typography>
            <Input
              type="file"
              label="Image"
              ref={imageRef}
              defaultValue={room?.image}
            ></Input>
          </div> */}
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select
              label="Status"
              onChange={(value) => setStatus(value)}
              value={`${room?.status}`}
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
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
        desc="Room Edit"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default RoomEdit;
