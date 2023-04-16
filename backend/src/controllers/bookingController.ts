import prisma from '../configs';
import { Request, Response } from 'express';
import { Booking, SearchQuery } from '../types';

class bookingController {
  async getAll(req: Request, res: Response) {
    try {
      const bookings = await prisma.bookings.findMany({
        select: {
          id: true,
          client_id: true,
          room_id: true,
          room: {
            select: {
              name: true,
            },
          },
          client: {
            select: {
              name: true,
            },
          },
          check_in: true,
          check_out: true,
          total_price: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          status: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async totalMoney(req: Request, res: Response) {
    try {
      const total = await prisma.bookings.aggregate({
        _sum: {
          total_price: true,
        },
      });
      res.status(200).json({ sum: total });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async countCheckIn(req: Request, res: Response) {
    try {
      const count = await prisma.bookings.count({
        where: {
          check_in: new Date().toISOString().slice(0, 10),
        },
      });
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async countCheckOut(req: Request, res: Response) {
    try {
      const count = await prisma.bookings.count({
        where: {
          check_out: new Date().toISOString().slice(0, 10),
        },
      });
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { room_id, client_id, check_in, check_out, total_price } = req.body;
      const checkIn = new Date(check_in);
      const checkOut = new Date(check_out);

      const booking = await prisma.bookings.create({
        data: {
          room_id: parseInt(room_id),
          client_id: client_id,
          check_in: checkIn,
          check_out: checkOut,
          total_price,
          status: true,
        },
      });
      res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await prisma.bookings.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(202).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { room_id, name, check_in, check_out }: SearchQuery = req.body;
      const where: any = { status: true, room: {}, client: {} };

      if (room_id) where.room.id = { equals: parseInt(room_id, 10) };
      if (name) where.client.name = { contains: name, mode: 'insensitive' };
      if (check_in) where.check_in = new Date(check_in);
      if (check_out) where.check_out = new Date(check_out);

      const bookings = await prisma.bookings.findMany({
        where,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          client_id: true,
          room_id: true,
          total_price: true,
          check_in: true,
          check_out: true,
          created_at: true,
          updated_at: true,
          room: { select: { name: true } },
          client: { select: { name: true } },
        },
      });

      res.status(202).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        id,
        room_id,
        client_id,
        check_in,
        check_out,
        total_price,
        status,
      } = req.body;
      const booking = await prisma.bookings.update({
        where: { id: id },
        data: {
          room_id: room_id,
          client_id: client_id,
          check_in: check_in ? new Date(check_in) : null,
          check_out: check_out ? new Date(check_out) : null,
          total_price: total_price,
          status: status,
        },
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(202).json({ message: 'Booking updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await prisma.bookings.delete({
        where: { id: parseInt(id) },
      });
      res.status(202).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new bookingController();
