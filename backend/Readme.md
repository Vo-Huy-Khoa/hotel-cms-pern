init project: npm init -y
dependencies:
npm install express dotenv @types/cors bcrypt body-parser dotenv express jsonwebtoken mongoose morgan @types/bcrypt @types/jsonwebtoken rimraf
devDependencies:
npm i -D typescript @types/express @types/node concurrently nodemon

config file ts: npx tsc --init

https://clients.cloudclusters.io/

3. Setting prisma:
   Generate a new Prisma schema with the following command:

```bash
npx prisma init
```

This will create a prisma directory containing a schema.prisma file.

Update the schema.prisma file to define your database schema:

```json
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String
  content String
  author  User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

6. Update the package.json file to include the following scripts:

```json
"scripts": {
  "prisma": "npx prisma"
}
```

```bash
yarn prisma generate
```

7. migrate table

```bash
yarn prisma migrate dev
```
