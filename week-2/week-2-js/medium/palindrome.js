/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  // Remove all non-alphanumeric characters
  str = str.replace(/[^a-z0-9]/g, "");
  let s = [];
  for (let i = str.length - 1; i >= 0; i--) {
    s.push(str[i]);
  }
  if (str !== s.join("")) {
    return false;
  }
  return true;
}

module.exports = isPalindrome;
