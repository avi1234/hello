let greet: string = "hi hi";

console.log(greet);

let user = {name: "AA", age: 35};

console.log(user.name);

let userId: number = 45454; //number is both int and float

function addTwo(num: number = 0): number {
    return num + 2;
}

let loginUser = (username: string, email: string, isPaid: boolean = false): boolean => {
    return false;
}

let students = ["Juan", "Mor", "John"]

//return value in arrow functions is right after the input
students.map((student, index): number => {
    console.log(`${student} is here!`);
    return index;
})

//when a function return "never" probably always throws excption
function throwError(msg: string): never {
    throw new Error(`[ERROR] ${msg}`);
}

// #### types
type User = {
    readonly _id: string
    name: string
    email?: string
    isActive?: boolean
}

type Student = User & {
    finalGrade?: number,
}

function createUser(name: string): User {
    let user: User = {
        _id: "aaa",
        name: name,
    }
    user.isActive = true
    return user
}

function makeStudent(user: User): Student {
    let stu: Student = user
    stu.finalGrade = 100
    return stu
}

// #### arrays
// both are same!
const ages: number[] = [2,4,5,6.2]
const ages2: Array<number> = [2,4,5,6.2]

// #### union
let myVal: number | boolean = false
myVal = 33
const myArray: (string | number)[] = ['a','b',3]
const myArray2: Array<string | number> = ['a','b',3]

// #### tuples
const creditCard: [string, number, number, number] = ["John Do", 2222234234243, 1027, 567]
// tuples can be problematic, you can still use array methods such as "push"

// #### enums - best practive to put const before (less js code)
const enum Colors {
    RED = 'FFF', BLUE = 'HGGF', WHITE = 'DDGDFG'
}

const colorChoice = Colors.RED

export {};

// #### interfaces
interface Animal {
    name: string,
    walk(steps: number): boolean,
}

interface Animal {
    age: number,
}

interface Dog extends Animal {
    bark(): void,
}

let dog1: Dog = {
    name: "didi",
    age: 4,
    walk: function(steps: number): boolean {
        console.log(`🐶 has just walked ${steps} steps.`)
        return true
    },
    bark: function(): void {
        console.log(`🐶 woff woff`)
    },
}

dog1.walk(4)
dog1.bark()