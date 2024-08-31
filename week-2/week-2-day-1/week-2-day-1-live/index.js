// let fName = "john";
// const age = 40;
// var  isStudent= true;
// let number = 42;             // Number
// let string = "Hello World";  // String
// let isActive = false;        // Boolean
// let numbers = [1, 2, 3];     // Array
// console.log(numbers)

const { readFile } = require("fs");

// let sum = 10 + 5;          // Arithmetic operator
// let isEqual = (10 === 10); // Comparison operator
// let isTrue = (true && false); // Logical operator

// Function declaration
// function greet(name) {
//     return "Hello, " + name;
// }

// // Function call
// let message = greet("John"); // "Hello, John"

// console.log(message)

// function sum(num1,num2){
//   return num1+num2;
// }
// console.log(sum(3,"5")) //35

// function checkVote(age){
//   if(age >18){
//     return true;
//   }
//   else{
//     return false;
//   }
// }
// console.log(checkVote(17))

// let num = 29;
// if(num %2 ==0){
//   console.log("even");
// }
// else{
//   console.log("ODD");
// }

// For loop
// for (let i = 0; i < 5; i++) {
//     console.log(i); // Outputs 0 to 4
// }
// console.log("fhfvch")
// While loop
// let j = 5;
// while (j != 0) {
//     console.log(j); // Outputs 0 to 4
//     j--
// }
// let sum =0;
//  for(let i = 1;i<=5;i++){
//     sum = sum + i;
//  }
// console.log(sum)

// #################################################
// object
// function greet(user){
//   let greetings = "";
//   for (let i = 0; i < user.name.length; i++) {
//     greetings += `My name is ${user.name[i]} and my age is ${user.age[i]}.\n`;
//   }
//   return greetings;
// }

// let user = {
//   name: ["Harkirat", "Mayank"],
//   age: [19, 20]
// }

// console.log(greet(user));

// Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21) Also tell the user if they are legal to vote or not

// function greetUser(user) {
//   // Determine the appropriate salutation based on gender
//   let salutation;
//   if (user.gender === "Male") {
//       salutation = "Mr.";
//   } else if (user.gender === "Female") {
//       salutation = "Mrs.";
//   } else {
//       salutation = "Mx.";
//   }

//   // Determine if the user is legal to vote (assuming 18 is the voting age)
//   let votingStatus = user.age >= 18 ? "You are legal to vote." : "You are not legal to vote yet.";

//   // Return the greeting message
//   return `Hi ${salutation} ${user.name}, your age is ${user.age}. ${votingStatus}`;
// }

// // Example usage
// let newUser = {
//   name: "Harkirat",
//   age: 21,
//   gender: "Male"
// };

// console.log(greetUser(newUser));
// #############################
// Arrays

// const users = ["harkirat", "raman", "diljeet"];
// const tatalUsers = users.length;
// const firstUser = users[0];
// console.log(tatalUsers)
// console.log(firstUser)

// function getEvenNumbers(arr) {
//   return arr.filter(function(number) {
//       return number % 2 === 0;
//   });
// }

// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let evenNumbers = getEvenNumbers(numbers);

// console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]

/*
 * create a function that takes an array of object as input, and return the users whose age > 18 and male.
 */

// function ass(arr) {
//   return users.filter(function (arr) {
//     return arr.gender === "male" && arr.age > 18;
//   });
// }
// let users = [
//   { name: "mayank", age: 21, gender: "male" },
//   { name: "Sanu", age: 12, gender: "male" },
//   { name: "Sanvi", age: 20, gender: "female" },
// ];
// let ans = ass(users);
// console.log(ans);

// ############ fs module(Synchronous)

const fs = require("fs");
let list = ["xyz.txt", "mayank.txt"];
for (let i of list) {
  let data = fs.readFileSync(i, "utf8");
  console.log(data);
}

//  ########## fs module Asynchronous

const fs = require("fs");

fs.readFile("xyz.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
}); // use this always

// // #### functional Argument
// // function div(a, b, c) {
// //   return a / b + c;
// // }
// // console.log(div(4, 2, 4));

const fs = require("fs");
function afterFileRead(err, contents) {
  console.log(contents);
}
fs.readFile("mayank.txt", "utf-8", afterFileRead);
fs.readFile("xyz.txt", "utf-8", afterFileRead);
console.log("!Done"); // first printed

// // function run() {
// //   console.log("I will run after 1s");
// // }

// // setTimeout(run, 1000);
// // console.log("I will run immedietely");

// // arrow function
// // let a= (x,y) =>{
// //   return x+y;
// // }
// // console.log(a(4,5));

// // implicit arrow function
// let add = (a,b) => ({name:"Mayank"});
// console.log(add(4,5));

// ################# map
// let map = new Map()
// map.set('In',"INDIA")
// map.set('Nl',"NEPAL")
// map.set('In',"INDIA")

// console.log(map);
// for(const [key,value] of map){
//   console.log(key,':-' ,value);
// }

// const myobj = {
//   js: "javascript",
//   cpp: "c++",
//   py: "python",
// };
// for (const key in myobj) {
//   console.log(`${key}`);
// }
//array -> for of
//object -> for in

//  for each loop
// const coding = ["js", "c++", "java", "python"];
// coding.forEach(function (item) {
//   console.log(item);
// });

// coding.forEach((item) => {
//   console.log(item);
// });
