function doJob(job, time, cb) {
    setTimeout(() => {
      // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
      let now = new Date();
      cb(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
  }
  
  let now = new Date();
  console.log(`開始工作 at ${now.toISOString()}`);
  
  // 按順序執行工作 利用巢狀的方式 刷牙 -> 吃早餐 -> 寫功課 -> 吃午餐
  doJob('刷牙', 1000, function (data) {
    console.log(data);
  
    doJob('吃早餐', 3000, function (data) {
      console.log(data);
  
      doJob('寫功課', 1000, function (data) {
        console.log(data);
  
        doJob('吃午餐', 2000, function (data) {
          console.log(data);
        });
      });
    });
  });
  
  