import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiCreate } from "../../../services";
import { initIRoomType } from "../../../types";

export const RoomTypeCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const [values, setValues] = useState(initIRoomType);

  const handleChange = (e: any) => {
    const { name, value } = e.target ? e.target : { name: "count", value: e };
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      return newValues;
    });
  };

  const handleSubmit = async () => {
    await handleApiCreate("room_type/create", values);
    navigate("/dashboard/room-type/list");
  };

  const handleClear = () => {
    setValues(initIRoomType);
  };
  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Limit</Typography>
            <Select
              name="count"
              label="Limit"
              value={values.count}
              onChange={handleChange}
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
              name="price"
              type="text"
              label="Price"
              value={values.price}
              onChange={handleChange}
            ></Input>
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
        desc="Room Type Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default RoomTypeCreate;
