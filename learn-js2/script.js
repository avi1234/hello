let variableName = 'welcome';

variableName = 'hello';

console.log(variableName);

// single line comment

/*
multi
line
comment
*/

const name = 'Jane';
const backticks = `hello ${name}. 2 + 2 = ${2+2}`;

console.log(backticks);
console.log(typeof backticks);

const isCool = false;

if(isCool){
    console.log("you're cool!");
} else if(name === 'Kate') {
    console.log("no...");
} else {
    console.log("bye");
}

// NaN - not a number. is a type of number which represent error in doing operation with other types.

// null - special value that represents 'nothing'

// undefined - value is not assigned. default value.

// undefined - variable declared but not assined. null is something the dev explicitly defined.

// Primitives - string, number, boolean, 
// Objects  - 

const person = {
    name: 'John',
    age: 25
};
console.log(person);
console.log(typeof person);
console.log(person.name);

const arr = [1,2,3,4];
console.log(arr);

// == != check value not type (not recomended)
// === !== check both value and type

// && || !

// functions

//function declaration
function square(number) {
    return number * number;
}

console.log(square(5));

//function expression
const myFunction = function(number) { return number + 1; }

//an Arrow function *preferred way*
const myFunction2 = (number) => { 
    console.log('hihi');
    return number + 2;
}

// most times we use Arrow functions except when we need to 
// use the "this" keyword and than we use function declaration

const myFunction3 = number => number + 2;

console.log(myFunction(3));
console.log(myFunction2(3));
console.log(myFunction3(3));

//API and dom manipulation
const changeDogImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(data => data.json())
    .then(data => {
        document.getElementById('dog-image').src = data.message;
        console.log("🐶 how how, new dog arrived");
    } )
};

changeDogImage();

const dogButton = document.getElementById('dog-button');

dogButton.onclick = (e) => {
    changeDogImage();
    dogButton.innerHTML += " 🐶";
};

// promise

const promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        let isReady = [true,false][Math.floor(Math.random() * 2)];
        isReady ? resolve('🧟‍♂️ soup is ready') : reject('❌ oh no soup today...');
    }, 1000)
});

promise1.then( value => console.log(value)).catch(err => console.log(err));

// async await
//rules - 
// 1. must create a function
// 2. preffered over promises
// 3. use try/catch to handle errors

const getFunCatFact = async () => console.log('🐱',(await (await fetch('https://catfact.ninja/fact')).json()).fact);

getFunCatFact();

// classes

class Car {
    constructor(name, color, topSpeed=120) {
        this.name = name;
        this.color = color;
        this.topSpeed = topSpeed;
        this.totalKM = 0;
    }

    drive(km = 5){
        if(km<0) {
            throw "🫢 km cannot be negative";
        }
        this.totalKM += km;
        console.log(`🚗 congrats, your ${this.name} drove ${km} km to total of ${this.totalKM} km!`);
    }
}

const myCar = new Car('tesla', 'white', 150);
const myCar2 = new Car('honda', 'red');

myCar.drive();
myCar.drive(20);

Car.prototype.driveLikeCrazy = function(){
    for(i=0;i<3;i++) {
        console.log("🚙🚙WOHOOOOOOOO🚙🚙");
        this.drive(100);
    }
}

myCar2.driveLikeCrazy();

//addEventListener

document.addEventListener('keydown', function(e){
    document.getElementById('playground-div').innerHTML += e.key;
});

// inheritance
class Person {
    talk() {
        return 'Talking';
    }
}

Person.prototype.talk = function() {
    return '🧚‍♂️ Talking 2.0';
}

class FamilyMember extends Person {
    love() {
        return "🤍";
    }
}

const son = new FamilyMember();
console.log(son.talk()," ",son.love());

// closures
