const MAX = 99999999
const array = [...Array(MAX).keys()]

console.time()

// for (let i = 0; i < array.length; i++) {
//     array[i]--
// }

array.forEach((element, i) => {
    array[i]--
});

console.timeEnd()






// let a = 0
// let b = 0

// for (let i = 0; i < MAX; i++) {
//     b += 2
// }

// for (let i = 0; i < MAX; i++) {
//     b += 2
// }

// console.log(a);
// console.log(b);

// console.timeEnd()