3. `npm install express` 
    1. 觀察 package.json 的變化
        Ans: package.json 被更新，多了
        ```json
        "dependencies": {
        "express": "^4.x.x"
        }

    2. 觀察 node_modules 裡面有什麼
        - 裡面包含Express和它所有相關的dependencies

- package.json 中的 dependencies 與 devDependencies 分別是什麼
  - ```dependencies```: 專案執行時必需要的依賴套件，可以用`npm install` 來自動安裝這些套件。
  - ```devDependencies```: 是在開發過程中所使用的依賴套件，但在實際部署應用程式時不會需要。通常是一些工具或是開發時使用的輔助工具，例如測試框架或是編譯工具等等。
    - 舉例：如果開發時使用```eslint```來檢查程式碼，則他會被列為```devDependencies```，因為只有在開發過程中被使用。
- package.json 中的 scripts 這個區塊怎麼用？
    - `scripts` 區塊允許你定義一些自動化指令，這些指令可以使用 ```npm run <script-name>``` 來執行。常見的例子包括啟動伺服器、執行測試、構建應用等。範例如下：
        ```json
        "scripts": {
            "start": "node app.js",  // 啟動應用程式
            "test": "echo \"Error: no test specified\" && exit 1",  // test指令
            "build": "webpack --config webpack.config.js"  // build指令
        }
        ```
        - - 寫好script後要如何執行?
            - - 要執行 `start` 指令，只需在終端機輸入 `npm start`
            - - 其他指令可以用 `npm run <script-name>` 來執行，例如 `npm run build`

- Port number 要怎麼以環境變數來設定？
    - - 可以以環境變數設定server的port number，避免port寫死在程式碼中
    1. 在 `.env`檔案中設定環境變數
        ```bash
        PORT=3000
        ```
    2. 在`app.js`中使用`process.env.PORT`來取得環境變數：
        ```js
        const express = require('express');
        const app = express();
        const port = process.env.PORT || 3000;  // 默認值為 3000，如果沒有設定環境變數
        app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
        });
        ```
    3. 使用`dotenv`來讀取`.env`檔案 若沒有dotenv這個package，記得先安裝
        ```bash
        npm install dotenv
        ```
    4. 在`app.js`中引入`dotenv`:
        ```js
        require('dotenv').config();
        ```

- 關於哪些檔案應該要被放上 github repo 這個問題，描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？
    - 應該上傳的檔案：

        - 原始碼檔案：所有的程式碼、設定檔案、package.json 應該被上傳。
        - README.md：對專案的描述、如何使用、以及相關文件的說明。
    - 不應該上傳的檔案：

        - node_modules：這個資料夾包含所有安裝的依賴套件，這些可以通過 npm install 重新生成，因此沒有必要上傳。
        - 敏感資料：像是 .env 檔案中的環境變數，可能包含 API 密鑰等敏感資料，因此應該在 .gitignore 中忽略。
        - 暫存檔案：例如 IDE 產生的檔案，臨時的 build 檔案等，也應該被忽略
        - 專案執行後產生的大型資料：例如圖片、分析結果的csv檔等等
- 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？
    - `require`屬於JavaScript引用模組的(CJS-CommonJS):
        - Node.js 傳統上使用CommonJS 模組系統。使用`require`來引入模組，用`module.exports`來導出。
        - 使用方式：
            ```js
            const express = require('express');
            module.exports = someFunction;
            ```
    - `import/export`屬於JavaScript引用模組的(ESM-ECMAScript Modules):
        - ESM 是JavaScript 標準的模組系統，使用 `import` 來引入模組，使用 `export` 來導出
        - 使用方式：
            ```js
            import express from 'express';
            export default someFunction;
            ```
    - 如何決定使用哪一種？
        - ESM 是現代 JavaScript 的標準，並且已經被廣泛支持。Node.js 從 v12 開始也支持 ESM。
        - 若想在 Node.js 中使用 ESM，需要將檔案的副檔名改為 .`mjs`，或者在 `package.json` 中設置 `"type": "module"`。

進階題:

- [localhost](http://localhost) 是什麼？
    - `localhost` 是指當前的計算機主機，它指向 IP 地址 `127.0.0.1`，通常用來在本地測試應用程式，而不是通過網際網路
- `curl` 是什麼？查查看怎麼用 curl 來測試網路連線？常用參數有哪些？
    `curl` 是一個用於從命令列進行資料傳輸的工具，特別適用於 HTTP 請求。它可以用來測試伺服器的回應。範例：

    - 使用 `curl` 測試 HTTP 連線：
    ```bash
    curl http://localhost:3000/
    ```

    - 常用參數：
        - `-X <HTTP_METHOD>`：指定 HTTP 方法（如 GET, POST, DELETE）。
        - `-d <DATA>`：用來傳送數據，在 POST 請求中常用。
        - `-H <HEADER>`：設置 HTTP 標頭。
        - `-i`：顯示 HTTP 回應的 header。
        - `-v`：顯示詳細的請求和回應過程。
    - 參考範例：
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/
    ```