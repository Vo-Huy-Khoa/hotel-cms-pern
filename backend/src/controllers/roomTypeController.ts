import prisma from '../configs';
import { Request, Response } from 'express';

class room_typesController {
  async getAll(req: Request, res: Response) {
    try {
      const room_types = await prisma.room_types.findMany({
        orderBy: { id: 'desc' },
      });
      res.status(200).json(room_types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const count = await prisma.room_types.count();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, count, price } = req.body;
      const room_types = await prisma.room_types.create({
        data: { name, count, price },
      });
      res.status(201).json(room_types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Create Room Type Fail!' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room_types = await prisma.room_types.findUnique({
        where: { id: parseInt(id) },
      });
      if (!room_types) {
        return res.status(404).json({ error: 'room_types not found' });
      }
      res.status(202).json(room_types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { name, count, price } = req.body;
      const room_types = await prisma.room_types.findMany({
        where: {
          AND: [
            name ? { name: { contains: name, mode: 'insensitive' } } : {},
            count ? { count: { gte: parseInt(count, 10) } } : {},
            price ? { price: { equals: parseFloat(price) } } : {},
          ],
        },
      });
      res.status(202).json(room_types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name, count, price } = req.body;
      const room_types = await prisma.room_types.update({
        where: { id: parseInt(id) },
        data: { name, count, price },
      });
      if (!room_types) {
        return res.status(404).json({ error: 'room_types not found' });
      }
      res.status(202).json({ message: 'room_types updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteRoomType = await prisma.room_types.delete({
        where: { id: parseInt(id) },
      });
      res.status(202).json(deleteRoomType);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new room_typesController();
