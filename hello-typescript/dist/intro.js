"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let greet = "hi hi";
console.log(greet);
let user = { name: "AA", age: 35 };
console.log(user.name);
let userId = 45454; //number is both int and float
function addTwo(num = 0) {
    return num + 2;
}
let loginUser = (username, email, isPaid = false) => {
    return false;
};
let students = ["Juan", "Mor", "John"];
//return value in arrow functions is right after the input
students.map((student, index) => {
    console.log(`${student} is here!`);
    return index;
});
//when a function return "never" probably always throws excption
function throwError(msg) {
    throw new Error(`[ERROR] ${msg}`);
}
function createUser(name) {
    let user = {
        _id: "aaa",
        name: name,
    };
    user.isActive = true;
    return user;
}
function makeStudent(user) {
    let stu = user;
    stu.finalGrade = 100;
    return stu;
}
// #### arrays
// both are same!
const ages = [2, 4, 5, 6.2];
const ages2 = [2, 4, 5, 6.2];
// #### union
let myVal = false;
myVal = 33;
const myArray = ['a', 'b', 3];
const myArray2 = ['a', 'b', 3];
// #### tuples
const creditCard = ["John Do", 2222234234243, 1027, 567];
const colorChoice = "FFF" /* Colors.RED */;
let dog1 = {
    name: "didi",
    age: 4,
    walk: function (steps) {
        console.log(`🐶 has just walked ${steps} steps.`);
        return true;
    },
    bark: function () {
        console.log(`🐶 woff woff`);
    },
};
dog1.walk(4);
dog1.bark();
