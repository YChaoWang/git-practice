function fib(n) {
    // TODO: implement fibonacci
    if (n <=1 ) return n;
    return fib(n-1) + fib(n-2);
  }
  
  fib(0); // 0
  fib(1); // 1
  fib(5); // 5
  fib(10); // 55
  
