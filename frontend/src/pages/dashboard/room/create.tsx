import {
  Button,
  Input,
  Select,
  Typography,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiGetList, handleApiCreate } from "../../../services";
import { IRoomType } from "../../../types";

export const RoomCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [room_type_id, setRoomType] = useState<string | undefined>(undefined);
  const [listRoomType, setListRoomType] = useState([]);
  const [status, setStatus] = useState<string | undefined>("1");

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const name = nameRef.current?.querySelector("input")?.value || "";
    const description = descRef.current?.querySelector("textarea")?.value || "";
    const image = imageRef.current?.querySelector("input")?.value || "true";

    const body = {
      room_type_id,
      name,
      description,
      image,
      status,
    };

    await handleApiCreate("room/create", body);
    navigate("/dashboard/room/list");
  };

  useEffect(() => {
    async function getRoomType() {
      try {
        const listRoomType = await handleApiGetList("room_type");
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
            <Select label="Room Type" onChange={(value) => setRoomType(value)}>
              {listRoomType.map((type: IRoomType, index) => {
                return (
                  <Option key={index} value={type.id.toString()}>
                    {type.name}
                  </Option>
                );
              })}
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
          {/* <div className="flex flex-row gap-6">
            <Typography className="w-32">Image</Typography>
            <Input type="file" label="Image" ref={imageRef}></Input>
          </div> */}
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select
              label="Status"
              onChange={(value) => setStatus(value)}
              value="true"
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
        desc="Room Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default RoomCreate;
