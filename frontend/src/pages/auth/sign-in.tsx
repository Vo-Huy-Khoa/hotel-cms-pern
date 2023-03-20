import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
export function SignIn() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/dashboard/home");
  };
  return (
    <section className="bg-white w-96 flex flex-col gap-4 p-10 rounded-xl">
      <div className="text-center">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
      </div>
      <form className="flex flex-col gap-4" action="">
        <div className="flex flex-col gap-1">
          <Typography>User Name</Typography>
          <Input name="username" label="Username" value="khoavh" />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <Input
            type="password"
            name="password"
            label="Password"
            value="123456"
          />
        </div>
        <Button onClick={handleLogin} color="blue">
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center">
          Already have an account?
          <NavLink
            to="/auth/sign-up"
            className="font-medium text-blue-500 transition-colors "
          >
            &nbsp;Sign Up
          </NavLink>
        </Typography>
      </form>
    </section>
  );
}
