import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { PopupCreate } from "../../../components";

export const UserCreate = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const userNameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const indentifyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const handleCreateUser = () => {
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const full_name = fullNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const role = roleRef.current?.querySelector("input")?.value || "0";
    const status = statusRef.current?.querySelector("input")?.value || "0";
  };

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input name="user_name" label="User Name" ref={userNameRef}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Full name</Typography>
            <Input name="full_name" label="Full Name" ref={userNameRef}></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              name="email"
              label="Email"
              ref={emailRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input
              type="password"
              name="email"
              label="Password"
              ref={passwordRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              name="identity_number"
              label="Identity number"
              ref={indentifyRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input
              type="text"
              name="phone"
              label="Phone"
              ref={phoneRef}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Role</Typography>
            <Select label="Role" ref={userNameRef}>
              <Option>Admin</Option>
              <Option>User</Option>
            </Select>
          </div>
        </form>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-16 ">
        <Button onClick={handleOpen} className="h-10">
          Submit
        </Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
      <PopupCreate open={open} onClose={handleOpen} />
    </aside>
  );
};

export default UserCreate;
