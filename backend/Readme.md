# Setup Backend:

You can do this by following these steps:
<br/><br/>

## I. Setup project:

<br/>

```bash
 cd backend
```

<br/>

### 1. Init NPM project:

```bash
 npm init -y
```

<br/>

### 2. Install Typescript:

```bash
npm i -D typescript @types/express @types/node
```

<br/>

### 3. Config file typescript:

```bash
 npx tsc --init
```

<br/>
### 4. Install dependencies:

```bash
npm install dotenv bcrypt body-parser dotenv nodemon mongoose
```

<br/><br/>

## II. Setup file:

### 1. Config file .env:

```env
PORT=3001
DATABASE_URL=postgres://khoavh:IkjpG8MWJGdpVV74Jt6y2xk098SQqrFr@dpg-cg839nvdvk4ljrg2cpi0-a.singapore-postgres.render.com/cms_17st
```

<br/>
### 2. Setting prisma:

- Generate a new Prisma schema with the following command:

```bash
npx prisma init
```

<br/>
### 3. This will create a prisma directory containing a schema.prisma file.

- Update the schema.prisma file to define your database schema:

```prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model users {
  id            Int      @id @default(autoincrement())
  user_name     String?  @db.VarChar(50)
  full_name     String?  @db.VarChar(60)
  email         String?  @db.VarChar(100)
  password      String?  @db.VarChar(255)
  status        Boolean? @default(true)
  refresh_token String?  @db.VarChar(255)
  created_at    DateTime @default(now()) @db.Timestamp
  updated_at    DateTime @default(now()) @db.Timestamp
}

model clients {
  id              Int        @id @default(autoincrement())
  name            String?    @db.VarChar(60)
  email           String?    @db.VarChar(100)
  identity_number String?    @db.VarChar(15)
  phone           String?    @db.VarChar(12)
  created_at      DateTime   @default(now()) @db.Timestamp
  updated_at      DateTime   @default(now()) @db.Timestamp
  Booking         bookings[]
}

model room_types {
  id         Int      @id @default(autoincrement())
  name       String?  @db.VarChar(255)
  count      Decimal? @db.Decimal
  price      Decimal? @db.Decimal
  created_at DateTime @default(now()) @db.Timestamp
  updated_at DateTime @default(now()) @db.Timestamp
  Room       rooms[]
}

model rooms {
  id           Int        @id @default(autoincrement())
  room_type_id Int
  name         String?    @db.VarChar(255)
  description  String?    @db.VarChar(255)
  image        String?    @db.VarChar(100)
  status       Boolean?   @db.Boolean
  created_at   DateTime   @default(now()) @db.Timestamp
  updated_at   DateTime   @default(now()) @db.Timestamp
  roomType     room_types @relation(fields: [room_type_id], references: [id])
  Booking      bookings[]
}

model bookings {
  id          Int       @id @default(autoincrement())
  room_id     Int
  client_id   Int
  check_in    DateTime? @db.Date
  check_out   DateTime? @db.Date
  total_price Float?
  status      Boolean?  @db.Boolean
  created_at  DateTime  @default(now()) @db.Timestamp
  updated_at  DateTime  @default(now()) @db.Timestamp
  room        rooms     @relation(fields: [room_id], references: [id])
  client      clients   @relation(fields: [client_id], references: [id])
}

```

<br/>

### 4. Update the package.json file to include the following scripts:

```json
"scripts": {
  "prisma": "npx prisma"
}
```

```bash
yarn prisma generate
```

<br/>

### 5. migrate table:

```bash
yarn prisma migrate dev
```

<br/>

### 6. Create file db.ts:

```javascript
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
```

### 7. Create a new file called "server.ts" in the root directory of your project.

```javascript
import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connect from './db.ts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
```

<br/>

### 8. Config file package.json:

```json
  "scripts": {
    "dev": "npx ts-node ./src/server.ts",
    "build": "rimraf ./build && tsc",
    "start": "npm run build && node ./build/server.js",
    "product": "node ./build/server.js"
  }
```

<br/><br/>

## III. Run project:

```bash
npm run dev
```
