import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

export const BookingEdit = () => {
  return (
    <aside className="min-h-screen w-full">
      <div className="bg-white rounded-lg">
        <form action="" method="post" className="flex flex-col gap-4 p-5">
          <div className="flex flex-row gap-6">
            <Typography className="w-32">User</Typography>
            <Select label="User">
              <Option>Admin</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Room</Typography>
            <Select label="Room">
              <Option>Admin</Option>
            </Select>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check In</Typography>
            <Input type="date" label="Check In"></Input>
          </div>
          <div className="flex flex-row gap-6">
            <Typography className="w-32">Check Out</Typography>
            <Input type="date" label="Check out"></Input>
          </div>
        </form>
      </div>
      <div className=" fixed left-0 bottom-0 w-full h-14 bg-gray-900  flex flex-row justify-end gap-6 items-center px-10 ">
        <Button className="h-10">Submit</Button>
        <Button className="bg-blue-gray-700 h-10">Clear</Button>
      </div>
    </aside>
  );
};

export default BookingEdit;
