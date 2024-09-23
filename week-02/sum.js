// ary: number array
// 一、用 Recursion 實作 sum
function sum(ary) {
    if (ary.length === 0) return 0; // 如果陣列為空，回傳 0
    return ary[0] + sum(ary.slice(1)); // 傳入去掉第一個元素後剩餘的部分
}

console.log(sum([1, 5, 3, 2])); // 11

// 二、用 JavaScript 的 reduce 實作 sum
function sum(ary) {
    // 1. 初始值為 0
    // 2. 將陣列中的每個元素(currentValue)加到累加器(accumulator)上 
    return ary.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

console.log(sum([1, 5, 3, 2])); // 11

// 三、用 JavaScript 的 forEach 實作 sum
function sum(ary) {
    let total = 0;
    ary.forEach(element => {
        total += element;
    });
    return total;
}

console.log(sum([1, 5, 3, 2])); // 11

// 四、用 JavaScript 的 eval 搭配 join 實作 sum
function sum(ary) {
    // 1. 將陣列(ary)的元素用 + 串接成數學運算式：在此範例中 [1, 5, 3, 2] -> "1+5+3+2"
    // 2. 用 eval 計算數學運算式的值
    return eval(ary.join('+'));
}

console.log(sum([1, 5, 3, 2])); // 11


// 五、用 JavaScript 的 Math.sum 實作 sum
function sum(ary) {
    return Math.sum(...ary);
}

console.log(sum([1, 5, 3, 2])); // 11

// (optional) 挑戰題: 如果 sum 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
// 一、用高斯求和公式 實作 sum
function sum(n) {
    return n * (n + 1) / 2;
}

console.log(sum(5)); // 15

// 二、用 Recursion 實作 sum
function sum(n) {
    if (n <= 1) return n;
    return n + sum(n - 1);
}

console.log(sum(5)); // 15

/* 
Q: 更多寫法? 
思路： 想到前面想到前面是以number array 進行計算 
因此把n的值轉換成陣列 再利用陣列特性進行計算
由n去得到陣列的方法:
<方法一>
將n轉成字串後，用split分割成陣列
<方法二>
使用Array.from() 去生成數字陣列，陣列的length為n
*/
// 三、將 n 轉成字串後，用 split 分割成陣列，
// 再用 reduce 實作 sum
function sum_to_array_reduce(n) {
    return n.toString().split('').reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
}

console.log(sum_to_array_reduce(5)); // 15

// 四、使用 Array.from() 去生成數字陣列，陣列的 length 為 n
// 再用 reduce 實作 sum
function sum(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
}

console.log(sum(10)); // 55





