import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../configs';

class userController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.users.findMany({ orderBy: { id: 'desc' } });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const count = await prisma.users.count();
      res.status(200).json(count);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        user_name,
        full_name,
        email,
        password: oldPassword,
        status,
      } = req.body;
      const password = await bcrypt.hash(oldPassword, 10);
      const user = await prisma.users.create({
        data: {
          user_name,
          full_name,
          email,
          password,
          status,
        },
      });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(202).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { full_name, email } = req.body;
      const users = await prisma.users.findMany({
        where: {
          full_name: {
            contains: full_name,
            mode: 'insensitive',
          },
          email: {
            contains: email,
            mode: 'insensitive',
          },
        },
      });
      res.status(202).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, user_name, full_name, email, status } = req.body;
      const updatedUser = await prisma.users.update({
        where: {
          id,
        },
        data: {
          user_name,
          full_name,
          email,
          status,
        },
      });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.users.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({ message: 'User delete successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new userController();
