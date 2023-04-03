import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
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
  const [user, setUser] = useState<IUser>();

  const [openCreate, setOpenCreate] = useState(false);
  const changePopupCreate = () => setOpenCreate(!openCreate);

  const [openDelete, setOpenDelete] = useState(false);
  const changePopupDelete = () => setOpenDelete(!openDelete);

  const userNameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const full_name = fullNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const status = statusRef.current?.querySelector("input")?.value || "1";
    // const password = passwordRef.current?.querySelector("input")?.value || "";

    const body = {
      id,
      user_name,
      full_name,
      email,
      status,
      // password,
    };

    await handleApiEdit("user/update", body);
    navigate("/dashboard/user/list");
  };

  const handleDelete = async () => {
    await handleApiDelete(`user/delete/${id}`);
    navigate("/dashboard/user/list");
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
              defaultValue={user?.full_name}
              ref={fullNameRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input
              label="User Name"
              defaultValue={user?.user_name}
              ref={userNameRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              defaultValue={user?.email}
              ref={emailRef}
            ></Input>
          </div>
          {/* <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input
              type="password"
              label="Email"
              defaultValue={user?.password}
              ref={passwordRef}
            ></Input>
          </div> */}
          {/* <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select label="Role">
              <Option value="0">Disable</Option>
              <Option value="1">Enable</Option>
            </Select>
          </div> */}
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button className="h-10" onClick={changePopupCreate}>
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
        desc="User Delete"
        open={openDelete}
        onClose={changePopupDelete}
        submit={handleDelete}
      />
    </aside>
  );
};

export default UserEdit;
