import { Button, Input, Typography } from "@material-tailwind/react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleApiRegister } from "../../services";

export function SignUp() {
  const navigate = useNavigate();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    const full_name = fullNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const password = passwordRef.current?.querySelector("input")?.value || "";
    const body = {
      full_name: full_name,
      email: email,
      user_name: user_name,
      password: password,
    };
    try {
      await handleApiRegister(body);
      navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-white w-96 flex flex-col gap-4 p-10 rounded-xl">
      <h1 className="text-center">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Typography>Full Name</Typography>
          <Input label="Full Name" ref={fullNameRef} />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Email</Typography>
          <Input type="email" label="Email" ref={emailRef} />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>User Name</Typography>
          <Input label="Username" ref={userNameRef} />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <Input type="password" label="Password" ref={passwordRef} />
        </div>
        <Button onClick={handleSignUp} color="blue">
          Create an account
        </Button>
        <Typography color="gray" className="mt-4 text-center">
          Already have an account?
          <NavLink
            to="/auth/sign-in"
            className="font-medium text-blue-500 transition-colors "
          >
            &nbsp;Sign In
          </NavLink>
        </Typography>
      </div>
    </section>
  );
}
