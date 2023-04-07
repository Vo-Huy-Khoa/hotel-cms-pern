import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "../../../components";
import {
  handleApiDelete,
  handleApiEdit,
  handleApiGetItem,
} from "../../../services";
import { IUser } from "../../../types";
import { PopupDelete } from "../../../components/CustomPopupDelete";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<IUser>({
    id: 1,
    full_name: "",
    user_name: "",
    email: "",
    password: "",
    status: "",
    created_at: "",
    updated_at: "",
  });

  const [openEdit, setOpenEdit] = useState(false);
  const changePopupEdit = () => setOpenEdit(!openEdit);

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = () => setOpenDelete(!openDelete);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await handleApiEdit("user/update", user);
      navigate("/dashboard/user/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    try {
      const user = await handleApiGetItem(`user/edit/${id}`);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await handleApiDelete(`user/delete/${id}`);
      navigate("/dashboard/user/list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      const user = await handleApiGetItem(`user/edit/${id}`);
      setUser(user);
    }
    getUser();
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
            <Typography className="w-32">Full name</Typography>
            <Input
              label="Full Name"
              name="full_name"
              value={user?.full_name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input
              label="User Name"
              name="user_name"
              value={user?.user_name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              name="email"
              value={user?.email}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input
              type="password"
              label="Password"
              name="password"
              value={user?.password}
              onChange={handleChange}
            ></Input>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button className="h-10" onClick={changePopupEdit}>
          Submit
        </Button>
        <Button onClick={handleClear} className="bg-blue-gray-700 h-10">
          Clear
        </Button>
      </div>
      <Popup
        title="Popup Edit"
        desc="User Edit"
        open={openEdit}
        onClose={changePopupEdit}
        submit={handleSubmit}
      />
      <PopupDelete
        title="Popup Delete"
        desc="User Delete"
        open={openDelete}
        onClose={changePopupDelete}
        submit={handleDelete}
      />
    </aside>
  );
};

export default UserEdit;
