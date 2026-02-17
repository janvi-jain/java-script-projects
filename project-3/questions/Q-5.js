let arr = [5, 3, 8, 4]

let element = 8;
let flag = false
for (let i = 0 ; i <= arr.length ; i++) {
    if (element == arr[i]) {
        flag = true
    }
}

if (flag == true) {
    console.log("The element is present in array..." );
} else {
    console.log("The element is not present in array..." );
}

console.log(`The Index of Element : ${arr.indexOf(element)}`);