let arr = [4, 2, 9, 7, 0, 1, 5]
let prime = [];

for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (num < 2) continue;

    let isPrime = true;

    for (let j = 2; j <= num / 2; j++) {
        if (num % j === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime == true) {
        prime.push(num);
    }
}

console.log("Array : ", arr)
console.log("Prime Numbers from Array  : ", prime)
