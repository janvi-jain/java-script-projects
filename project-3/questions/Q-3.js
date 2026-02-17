let arr = [5, 2, 9, 1, 5];


for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }   
    }
}

console.log("Array : ",arr);
console.log("Sorted Array : ",arr);