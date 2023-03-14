import { Button, Typography } from "@material-tailwind/react";

export const UserEdit = () => {
  return (
    <aside>
      {" "}
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          User List
        </Typography>
        <Button className="w-24" color="red">
          Delete
        </Button>
      </div>
    </aside>
  );
};

export default UserEdit;
