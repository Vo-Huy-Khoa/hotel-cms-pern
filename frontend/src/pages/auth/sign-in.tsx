import { Button, Input, Typography } from "@material-tailwind/react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogin } from "../../services";
export function SignIn() {
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignIn = async () => {
    const user_name = userNameRef.current?.querySelector("input")?.value || "";
    const password = passwordRef.current?.querySelector("input")?.value || "";
    const body = {
      user_name: user_name,
      password: password,
    };
    try {
      await handleLogin(body);
      navigate("/dashboard/home");
    } catch (error) {
      console.log(error);
    }
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
          <Input label="Username" value="khoavh" ref={userNameRef} />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <Input type="password" label="Password" value="1" ref={passwordRef} />
        </div>
        <Button onClick={handleSignIn} color="blue">
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
