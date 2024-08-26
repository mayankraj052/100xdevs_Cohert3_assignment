/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase(); //str1.toLowerCase() -> return new string not make changes in  str1 that's why we use =
  str2 = str2.toLowerCase();
  if(str1.length != str2.length){
    return false;
  }
  let counter={};
  for(let l of str1){
    counter[l] = (counter[l] || 0)+1;
  }
  for(let item of str2){
    if(!counter[item]){
      return false;
    }
    counter[item] -=1;
  }
  return true;
}
/*
length check(for both strings)
count the character of string (you can use map {h:1,e:1,l:2,0:1}) check in 2 string if present then substract in count of first string
 */

module.exports = isAnagram;
