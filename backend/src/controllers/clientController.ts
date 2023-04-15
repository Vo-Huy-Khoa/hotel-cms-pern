import prisma from '../configs';
import { Request, Response } from 'express';

class clientController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const clients = await prisma.clients.findMany({
        orderBy: {
          id: 'desc',
        },
      });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const count = await prisma.clients.count();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, identity_number, phone } = req.body;
      const client = await prisma.clients.create({
        data: {
          name,
          email,
          identity_number,
          phone,
        },
      });
      res.status(201).json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await prisma.clients.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(202).json(client);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name, email, identity_number, phone } = req.body;
      const client = await prisma.clients.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          email,
          identity_number,
          phone,
        },
      });
      if (!client) {
        return res.status(404).json({ error: 'clients not found' });
      }
      res.status(202).json({ message: 'clients updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await prisma.clients.delete({
        where: {
          id: Number(id),
        },
      });
      if (!client) {
        return res.status(404).json({ error: 'clients not found' });
      }
      res.status(202).json({ message: 'clients deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new clientController();
