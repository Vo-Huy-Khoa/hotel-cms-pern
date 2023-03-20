import jwt from "jsonwebtoken";

const createToken = (user: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const payload = { id: user.id, username: user.username };
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: "120s" });
  } catch (error) {
    console.error(error);
  }

  return token;
};

const refreshToken = (data: any, token: string) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  let payload = { username: data.username };
  try {
    token = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
  }

  return token;
};

export { createToken, refreshToken };
