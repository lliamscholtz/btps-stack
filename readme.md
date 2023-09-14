# Hackathon - 14/11/23

-   Bun (https://bun.sh/)
-   TypeScript (https://www.typescriptlang.org/)
-   Prisma (https://www.prisma.io/)
-   Supabase (https://supabase.com/)

## Bun

Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called `bun`​.

1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Initialize the project

```bash
bun init
```

3. Add a start and dev scripts to `package.json`

```json
"scripts": {
    "dev": "bun --watch index.ts",
    "start": "bun index.ts"
},
```

4. Start developing

```bash
bun dev
```

## TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

### Types

A `type` refers to a way of defining and describing the shape or structure of data.

```ts
// inline type
const myName: string = 'Bun';

// named type
type Age = number;
const myAge: Age = 21;
```

TypeScript provides several basic types and constructs for defining more complex types. Here are some of the fundamental types available:

```ts
let isBoolean: boolean = false;
let isDecimal: number = 1;
let isString: string = 'string';
let isArray: [] = [1, 2, 3];

let isTuple: [string, number] = ['string', 1];
let isTypeOption: string | number;
let isStringOption: 'hello' | 'world';
let isStringArray: string[] = ['hello', 'world'];
let isVoid: void; // represents the absence of a type.
```

### Interfaces

An `interface` is a way to define a contract or a blueprint for a type. It allows you to specify the structure that an object should have, including the names and types of its properties and the signatures of its methods.

```ts
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

let myPerson: Person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
};

interface GreetFunction {
    (name: string): string;
}

let greet: GreetFunction = function (name) {
    return `Hello, ${name}!`;
};

// inline type
let greet = (message: string): void => {
    console.log(message);
};
greet('Hello, World!');
```

### Advanced

```ts
// Generics
// Extends
// Cast one type to another type
```

## Supabase

Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.

1. [Create an account](https://supabase.com/)
2. Create a new project
3. Go to the settings page from the sidebar and navigate to the Database tab. You’ll find the database’s connection string with a placeholder for the password you provided when you created the project
4. Add this to an `.env` file

```
DATABASE_CONNECTION_STRING='postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-DB].supabase.co:5432/postgres'
```

Bun does not require any additional packages to read the `.env` file. You can sanity check this with:

```
console.log(Bun.env.DATABASE_CONNECTION_STRING);
```

## Prisma

Prisma is a server-side library that helps developers read and write data to the database in an intuitive, efficient and safe way.

🗒️ `For syntax highlighting, auto-completion and jump-to features you should install the Prisma extension in VSCode.`

1. Add the prisma package

```bash
bun i prisma -D
```

2. Initialize your project to scaffold prisma files

```bash
bunx prisma init
```

3. Update the `.env` file to include your Supabase connection string

4. Create a new `User` and `Todo` model in `prisma/schema.prisma`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  todos     Todo[]
}

model Todo {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  description String? // optional
  done      Boolean  @default(false)
  user      User    @relation(fields: [userId], references: [id])
  userId    Int
}
```

5. Run the migration

```bash
bunx prisma migrate dev --name init
```

6. Import `@prisma/client` and create and find a user.

```ts
// Create a new user
const newUser = await prisma.user.create({
    data: {
        email: 'hackathon@prisma.io',
    },
});
console.log(newUser);

// Read all users
const users = await prisma.user.findMany({
    where: {
        user: {
            email: 'hackathon@prisma.io',
        },
    },
});
console.log(users);
```

## Example

![BTPS Stack Example](/screenshots/bun-example.png)
