import {
  Button,
  Input,
  Typography,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { MenuItem, Select } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup, PopupDelete } from "../../../components";
import {
  handleApiGetList,
  handleApiDelete,
  handleApiEdit,
  handleApiGetItem,
} from "../../../services";
import { IRoom, IRoomType, initRoom } from "../../../types";

export const RoomEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState<IRoom>(initRoom);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const changePopupEdit = useCallback(
    () => setOpenPopupEdit((prev) => !prev),
    []
  );

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = () => setOpenDelete(!openDelete);

  const [listRoomType, setListRoomType] = useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRoom((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await handleApiEdit("room/update", room);
      navigate("/dashboard/room/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    async function getItem() {
      const room = await handleApiGetItem(`room/edit/${id}`);
      setRoom(room);
    }
    getItem();
  };

  const handleDelete = async () => {
    try {
      await handleApiDelete(`room/delete/${id}`);
      navigate("/dashboard/room/list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getItem() {
      const room = await handleApiGetItem(`room/edit/${id}`);
      setRoom(room);
    }
    getItem();
  }, [id]);
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
      <div className="flex flex-row items-center justify-end my-6">
        <Button className="w-24" color="red" onClick={changePopupDelete}>
          Delete
        </Button>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room Type</Typography>
            {listRoomType.length > 0 && room && (
              <Select
                className="w-full h-10"
                name="room_type_id"
                value={`${room?.room_type_id}`}
                onChange={handleChange}
              >
                {listRoomType.map((type: IRoomType, index) => {
                  return (
                    <MenuItem key={index} value={`${type.id}`}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Name</Typography>
            <Input
              label="Name"
              value={room?.name}
              onChange={handleChange}
              name="name"
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Description</Typography>
            <Textarea
              label="Description"
              value={room?.description}
              onChange={handleChange}
              name="description"
            ></Textarea>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select
              className="w-full h-10"
              value={`${room?.status}`}
              onChange={handleChange}
              name="status"
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button onClick={changePopupEdit} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <Popup
        title="Popup Edit"
        desc="User Edit"
        open={openPopupEdit}
        onClose={changePopupEdit}
        submit={handleSubmit}
      />
      <PopupDelete
        title="Popup Delete"
        desc="Room Delete"
        open={openDelete}
        onClose={changePopupDelete}
        submit={handleDelete}
      />
    </aside>
  );
};

export default RoomEdit;
