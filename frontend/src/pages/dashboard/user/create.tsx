import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";

export const UserCreate = () => {
  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User name</Typography>
            <Input name="user_name" label="username"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Full name</Typography>
            <Input name="full_name" label="fullname"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Email</Typography>
            <Input type="email" name="email" label="Email"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Password</Typography>
            <Input type="password" name="email" label="password"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Identity Number</Typography>
            <Input
              type="text"
              name="identity_number"
              label="identity number"
            ></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Phone</Typography>
            <Input type="text" name="phone" label="phone"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Role</Typography>
            <Select label="Role">
              <Option>Admin</Option>
              <Option>User</Option>
            </Select>
          </div>
        </form>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-16 ">
        <Button className="h-10">Submit</Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
    </aside>
  );
};

export default UserCreate;
