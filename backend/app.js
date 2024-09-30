require('dotenv').config(); // 讀取 .env 檔案
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // 如果沒設定環境變數，預設使用 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
