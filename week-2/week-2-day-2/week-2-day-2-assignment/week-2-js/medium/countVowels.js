/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let count = 0;
  str = str.toLowerCase();
  for (let x of str) {
    if (x === "a" || x === "e" || x === "i" || x === "o" || x === "u") {
      count++;
    }
  }
  return count;
}

module.exports = countVowels;
