let arr = [4, 2, 9, 7, 0, 1, 5]

let sortArr = arr.sort((a, b) => a - b)

console.log("Second smallest number : ",sortArr[1])
console.log("Second largest  number : ",sortArr[sortArr.length - 2])
