import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";

export function SignUp() {
  return (
    <section className="w-96 flex flex-col gap-4">
      <h1 className="text-center">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
      </h1>
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
        <Button variant="gradient">Continue with Facebook</Button>
        <Button color="light-blue">Continue with Twitter</Button>
        <Typography color="gray" className="mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="font-medium text-blue-500 transition-colors ">
            Sign In
          </a>
        </Typography>
      </form>
    </section>
  );
}
