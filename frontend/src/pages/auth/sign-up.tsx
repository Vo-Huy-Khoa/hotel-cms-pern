import { Button, Input, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export function SignUp() {
  return (
    <section className="bg-white w-96 flex flex-col gap-4 p-10 rounded-lg">
      <h1 className="text-center">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
      </h1>
      <form className="flex flex-col gap-4" action="">
        <div className="flex flex-col gap-1">
          <Typography>Email</Typography>
          <Input name="email" label="Email" />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>User Name</Typography>
          <Input name="username" label="Username" />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <Input name="password" label="Password" />
        </div>
        <Button color="blue">Create an account</Button>
        <div className="text-center">
          <Typography>Or sign up with</Typography>
        </div>
        <Button className="h-10" variant="gradient">
          Continue with Facebook
        </Button>
        <Button color="light-blue">Continue with Twitter</Button>
        <Typography color="gray" className="mt-4 text-center">
          Already have an account?
          <NavLink
            to="/auth/sign-in"
            className="font-medium text-blue-500 transition-colors "
          >
            &nbsp;Sign In
          </NavLink>
        </Typography>
      </form>
    </section>
  );
}
