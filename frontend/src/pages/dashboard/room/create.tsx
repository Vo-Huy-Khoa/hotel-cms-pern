import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiGetList, handleApiCreate } from "../../../services";
import { IRoomType, initRoom } from "../../../types";

export const RoomCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const [listRoomType, setListRoomType] = useState([]);
  const [values, setValues] = useState(initRoom);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newValue = name === "status" ? value === "true" : value;
    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
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
              className="w-full h-10"
              name="room_type_id"
              value={values.room_type_id.toString()}
              onChange={handleChange}
            >
              {listRoomType.map((roomType: IRoomType, index) => {
                return (
                  <MenuItem key={index} value={roomType.id.toString()}>
                    {roomType.name}
                  </MenuItem>
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
              className="w-full h-10"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
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
