import { Button, Input, Typography } from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup, PopupDelete } from "../../../components";
import {
  handleApiDelete,
  handleApiEdit,
  handleApiGetItem,
} from "../../../services";
import { IRoomType, initIRoomType } from "../../../types";

export const RoomTypeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomType, setRoomType] = useState<IRoomType>(initIRoomType);

  const [openCreate, setOpenCreate] = useState(false);
  const changePopupCreate = () => setOpenCreate(!openCreate);

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = () => setOpenDelete(!openDelete);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setRoomType((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await handleApiEdit("room_type/update", roomType);
      navigate("/dashboard/room-type/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    try {
      const roomType = await handleApiGetItem(`room_type/edit/${id}`);
      setRoomType(roomType);
    } catch (error) {
      //
    }
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
              name="name"
              label="Name"
              value={roomType?.name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Limit</Typography>
            <Select
              name="count"
              label="Limit"
              value={`${roomType?.count}`}
              onChange={handleChange}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Price</Typography>
            <Input
              name="price"
              type="text"
              label="Price"
              value={roomType?.price}
              onChange={handleChange}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={changePopupCreate} className="h-10">
          Submit
        </Button>
        <Button onClick={handleClear} className="bg-blue-gray-700 h-10">
          Clear
        </Button>
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
