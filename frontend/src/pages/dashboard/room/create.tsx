import {
  Button,
  Input,
  Select,
  Typography,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiGetList, handleApiCreate } from "../../../services";
import { IRoomType, initRoom } from "../../../types";

export const RoomCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [listRoomType, setListRoomType] = useState([]);
  const [values, setValues] = useState(initRoom);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await handleApiCreate("room/create", values);
      navigate("/dashboard/room/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setValues(initRoom);
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
            <Select
              label="Room Type"
              name="room_type_id"
              value={values.room_type_id}
              onChange={handleChange}
            >
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
            <Input
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Description</Typography>
            <Textarea
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
            ></Textarea>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
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
        <Button onClick={handleClear} className="bg-blue-gray-700 h-10">
          Clear
        </Button>
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
