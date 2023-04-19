import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleApiLogin } from "../../services";
import { EyeIcon } from "@heroicons/react/24/solid";
export function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

  const handleTypeChange = () => {
    setTypePassword(typePassword === "text" ? "password" : "text");
  };
  const handleSignIn = async () => {
    const email = emailRef.current?.querySelector("input")?.value || "";
    const password = passwordRef.current?.querySelector("input")?.value || "";
    const body = {
      email: email,
      password: password,
    };
    try {
      const sessionData = await handleApiLogin(body);
      sessionStorage.setItem("token", sessionData.token);
      sessionStorage.setItem("refresh_token", sessionData.refresh_token);
      sessionStorage.setItem("user", sessionData.user);
      setIsErrorLogin(false);
      navigate("/dashboard/home");
    } catch (error) {
      setIsErrorLogin(true);
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
          <Typography>Email</Typography>
          <Input
            type="email"
            label="Email"
            defaultValue="khoavh@gmail.com"
            ref={emailRef}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Typography>Password</Typography>
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type={typePassword}
              label="Password"
              defaultValue="1"
              ref={passwordRef}
            />
            <EyeIcon
              onClick={handleTypeChange}
              width="20px"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded cursor-pointer"
            />
          </div>
        </div>
        {isErrorLogin && (
          <Alert color="red">Invalid User Name or Password</Alert>
        )}
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
