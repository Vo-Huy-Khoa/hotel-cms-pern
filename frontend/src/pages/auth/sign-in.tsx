import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
export function SignIn() {
  return (
    <section className="bg-white w-96 flex flex-col gap-4 p-10 rounded-lg">
      <div className="text-center">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
      </div>
      <form className="flex flex-col gap-4" action="">
        <div className="flex flex-col gap-1">
          <Typography>User Name</Typography>
          <Input name="username" label="Username" />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <Input name="password" label="Password" />
        </div>
        <Button color="blue">Sign In</Button>
        <div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center "
              >
                I agree the
                <a href="#" className="font-medium transition-colors">
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
        </div>
        <Button className="h-10" variant="gradient">
          Continue with Facebook
        </Button>
        <Button color="light-blue">Continue with Twitter</Button>
        <Typography color="gray" className="mt-4 text-center">
          Already have an account?
          <NavLink
            to="/auth/sign-up"
            className="font-medium text-blue-500 transition-colors "
          >
            Sign Up
          </NavLink>
        </Typography>
      </form>
    </section>
  );
}
