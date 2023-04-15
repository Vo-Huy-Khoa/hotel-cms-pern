import { Button, Input, Typography } from "@material-tailwind/react";
import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../../components";
import { handleApiCreate } from "../../../services";

export const UserCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const [values, setValues] = useState({
    full_name: "",
    user_name: "",
    email: "",
    password: "",
    status: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "status" ? value === "true" : value;

    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const handleSubmit = async () => {
    try {
      await handleApiCreate("user/create", values);
      navigate("/dashboard/user/list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setValues({
      full_name: "",
      user_name: "",
      email: "",
      password: "",
      status: true,
    });
  };

  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Full name</Typography>
            <Input
              label="Full Name"
              name="full_name"
              value={values.full_name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input
              label="User Name"
              name="user_name"
              value={values.user_name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input
              type="password"
              label="Password"
              name="password"
              value={values.password}
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
        desc="User Create"
        open={open}
        onClose={handleOpen}
        submit={handleSubmit}
      />
    </aside>
  );
};

export default UserCreate;
