import { Request, Response } from 'express';
import prisma from '../configs';

class roomController {
  async getAll(req: Request, res: Response) {
    try {
      const rooms = await prisma.rooms.findMany({
        select: {
          id: true,
          roomType: { select: { name: true } },
          name: true,
          description: true,
          image: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: { id: 'desc' },
      });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const count = await prisma.rooms.count();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { room_type_id, name, description, image, status } = req.body;
      const newStatus = status === 'true' ? true : false;

      const room = await prisma.rooms.create({
        data: {
          room_type_id: parseInt(room_type_id),
          name,
          description,
          image,
          status: newStatus,
        },
      });

      res.status(201).json(room);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room = await prisma.rooms.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(202).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { room_type_id, name, status } = req.body;
      const rooms = await prisma.rooms.findMany({
        select: {
          id: true,
          roomType: { select: { name: true } },
          name: true,
          description: true,
          image: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          AND: [
            name ? { name: { contains: name, mode: 'insensitive' } } : {},
            room_type_id
              ? { room_type_id: { equals: parseInt(room_type_id, 10) } }
              : {},
            status ? { status: status } : {},
          ],
        },
        orderBy: { id: 'desc' },
      });
      res.status(202).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, room_type_id, name, description, image, status } = req.body;

      const updatedRoom = await prisma.rooms.update({
        where: { id },
        data: {
          room_type_id: parseInt(room_type_id),
          name,
          description,
          image,
          status,
        },
      });

      if (!updatedRoom) {
        return res.status(404).json({ error: 'rooms not found' });
      }

      res.status(202).json({ message: 'rooms updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRoom = await prisma.rooms.delete({
        where: { id: parseInt(id) },
      });

      res.status(202).json(deletedRoom);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new roomController();
