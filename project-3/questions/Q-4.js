function rotateFromK(arr, k) {
    const n = arr.length;
    k = k % n; 

    return arr.slice(k).concat(arr.slice(0, k));
}

let arr = [1, 2, 3, 4, 5, 6];
let k = 2;
let rotated = rotateFromK(arr, k);

console.log(rotated);