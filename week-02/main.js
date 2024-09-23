// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from './stack.js';

// main.js
import Stack from './stack.js';

let stack = new Stack();
stack.print();

stack.push(5);
stack.push(8);
stack.print();

console.log(stack.pop()); // 8
console.log(stack.peek()); // 5
console.log(stack.isEmpty()); // false
console.log(stack.size()); // 1
stack.clear();
console.log(stack.isEmpty()); // true

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？
// 可以測試邊界情況，例如在空的 stack 上呼叫 pop 和 peek，
// 以及在 stack 中加入大量元素來測試其效能。