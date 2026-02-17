let str = "Hello World !"
let vowel = 0;
let Consonant = 0;

str = str.toLowerCase()

for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    if (ch >= 'a' && ch <= 'z') {
        if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
            vowel++;
        } else {
            Consonant++;
        }
    }
}

console.log("Word or Sentence : ",str);
console.log("Vowels : ",vowel);
console.log("Consonants : ",Consonant);