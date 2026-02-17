let str = "I love programming very much"

let arr =  str.split(" ");

let word = arr[0];

for (let i = 0 ; i < arr.length ; i++) {
    if (arr[i].length > word.length) {
        word = arr[i];
    }
}


console.log("Sentence : ",str);
console.log("The longest Word in the Sentence is : ",word);