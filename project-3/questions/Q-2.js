let str1 = "hello"
let str2 = "world"

if(str1.length != str2.length) {
    console.log("The strings are not Anagrams");
} else {
    let sortStr1 = str1.split('').sort().join('')
    let sortStr2 = str2.split('').sort().join('')
    
    if (sortStr1 == sortStr2) {
        console.log("The strings are Anagrams");
    }else {
        console.log("The strings are not Anagrams");
    }

}



