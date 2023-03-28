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
import { handleEdit, handleGetItem } from "../../../services";
import { IUser } from "../../../types";

export const UserEdit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();

  const userNameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const full_name = fullNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const status = statusRef.current?.querySelector("input")?.value || "1";
    const password = passwordRef.current?.querySelector("input")?.value || "";

    const body = {
      user_name,
      full_name,
      email,
      status,
      password,
    };

    await handleEdit("update", body);
    navigate("/dashboard/user/list");
  };

  useEffect(() => {
    async function getUser() {
      const user = await handleGetItem(`user/edit/${id}`);
      setUser(user);
    }
    getUser();
  }, [id]);

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Full name</Typography>
            <Input
              label="Full Name"
              value={user?.full_name}
              ref={fullNameRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input
              label="User Name"
              value={user?.user_name}
              ref={userNameRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              value={user?.email}
              ref={emailRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input
              type="password"
              label="Email"
              value={user?.password}
              ref={passwordRef}
            ></Input>
          </div>
          {/* <div className="flex flex-row gap-6">
            <Typography className="w-32">Status</Typography>
            <Select label="Role">
              <Option value="0">Disable</Option>
              <Option value="1">Enable</Option>
            </Select>
          </div> */}
        </form>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button className="h-10" onClick={handleOpen}>
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <Popup
        title="Popup Edit"
        desc="User Edit"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default UserEdit;
