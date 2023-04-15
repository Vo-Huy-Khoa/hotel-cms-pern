-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "check_in" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_types" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "user_name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
