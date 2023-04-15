import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database!');
    await prisma.$disconnect();
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

testConnection();

export default prisma;
