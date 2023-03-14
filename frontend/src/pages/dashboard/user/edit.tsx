import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

export const UserEdit = () => {
  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-28">User name</Typography>
            <Input name="username" label="Username"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-28">Email</Typography>
            <Input type="email" name="email" label="Email"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-28">Role</Typography>
            <Select label="Role">
              <Option>Admin</Option>
              <Option>User</Option>
            </Select>
          </div>
        </form>
      </div>
      <div className=" fixed left-10 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-16 ">
        <Button className="h-10">Submit</Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
    </aside>
  );
};

export default UserEdit;
