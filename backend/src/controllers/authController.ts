import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createToken, refreshToken } from '../middleware/token';
import jwt from 'jsonwebtoken';
import prisma from '../configs';
import { IUser } from '../types';

class authController {
  async register(req: Request, res: Response) {
    try {
      const { full_name, user_name, email } = req.body;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);
      const user = await prisma.users.create({
        data: {
          full_name,
          user_name,
          email,
          password,
        },
      });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user: IUser | null = (await prisma.users.findFirst({
        where: {
          email: email,
        },
      })) as unknown as IUser;

      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Invalid user_name or password' });
        return;
      }

      const token = createToken(user) || '';
      const refreshTokenValue = refreshToken(user, token) || '';

      await prisma.users.update({
        where: { id: user.id },
        data: { refresh_token: refreshTokenValue },
      });

      res.status(200).json({
        user,
        token,
        refresh_token: refreshTokenValue,
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async refreshToken(req: Request, res: Response) {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
    const JWT_SECRET = process.env.JWT_SECRET || '';

    const { refresh_token, id } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (user.refresh_token !== refresh_token) {
        return res.status(400).json({ message: 'Invalid refresh token' });
      }

      jwt.verify(
        refresh_token,
        REFRESH_TOKEN_SECRET,
        async (err: any, data: any) => {
          if (err) res.sendStatus(403);
          const accessToken = jwt.sign(
            { id: data.id, user_name: data.user_name, email: data.email },
            JWT_SECRET,
            { expiresIn: '604800000s' },
          );
          await prisma.users.update({
            where: { id: user.id },
            data: { refresh_token: accessToken },
          });
          return res.status(201).json({ refresh_token: accessToken });
        },
      );
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  async logout(req: Request, res: Response) {
    const id = req.body.id;

    try {
      const user = await prisma.users.findUnique({ where: { id } });

      if (!user) {
        res.status(401).json({ message: 'Invalid user_name or password' });
        return;
      }
      await prisma.users.update({
        where: { id: user.id },
        data: { refresh_token: '' },
      });

      res.status(201).json({ message: 'Logout successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Logout error!' });
    }
  }
}
export default new authController();
