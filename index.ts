// Annotate
type Age = number;
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}
interface GreetPerson {
    (person: Person): void;
}

// Declare
const myName: string = 'John Doe';
const myAge: Age = 21;
let myPerson: Person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
};

// Execute
// console.log(`Hello, my name is ${myName}! I am ${myAge} years old!`);

const greetPerson: GreetPerson = (person: Person) => {
    console.log(
        `Hello, my name is ${person.firstName} ${person.lastName}! I am ${person.age} years old!`
    );
};
// greetPerson(myPerson);

// Prisma
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new user
const addNewUser = async (email: string): Promise<void> => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
            },
        });
        console.log(newUser);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.error(
                    'There is a unique constraint violation, a new user cannot be created with this email.'
                );
            }
        }
        // throw e;
    }
};

// Create a new todo
const addNewTodo = async (email: string, title: string): Promise<void> => {
    const newTodo = await prisma.todo.create({
        data: {
            title,
            user: {
                connect: {
                    email,
                },
            },
        },
    });
    console.log(newTodo);
};

// Read all todos
const readAllTodos = async (email: string): Promise<void> => {
    const todos = await prisma.todo.findMany({
        where: {
            user: {
                email,
            },
        },
    });
    console.log(todos);
};

// Command line arguments
const args = process.argv.slice(2);
type Commands = '--user' | '--todo' | '--read';
const command: Commands = args[0] as Commands;
const user: string = args[1];

switch (command) {
    case '--user':
        await addNewUser(user);
        break;
    case '--todo':
        const title: string = args[2];
        if (title) await addNewTodo(user, title);
        break;
    case '--read':
        await readAllTodos(user);
        break;
    default:
        console.error(
            'You must provide a valid command: ---user | ---todo | --read'
        );
        break;
}
