let str = "nayan";
let reversedStr =  str.split("").reverse().join("");

console.log("Word : ",str);

if(str == reversedStr) {
    console.log("It is a palindrome....");
} else {
    console.log("It is not a palindrome....");
}



