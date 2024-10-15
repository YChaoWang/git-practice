# Linux 檔案目錄結構,觀看影片 Linux Directories Explained in 100 Seconds  或其他資料,試著回答:

- `/etc` 是什麼的縮寫？這裡通常都放哪些檔案？
    - **縮寫含義**: 早期意指 "Editable Text Configuration"（可編輯的文本配置）。
    - **用途**: `/etc` 目錄存放系統的全域性配置檔案，這些檔案控制系統和各種應用程式的運行行為。
    - **常見的配置檔**:
        - `/etc/nginx/`: Nginx 的配置檔案。
        - `/etc/ssh/`: SSH 服務的配置檔案。

- `/var`這裡通常都放哪些檔案？
    - **縮寫含義**: "Variable"，表示變動的數據。
    - **用途**: `/var` 目錄存放系統運行過程中變動的數據，例如日誌、臨時檔案、郵件隊列等。
    - **常見的子目錄**:
        - `/var/log/`: 系統和應用程式的日誌檔案。
        - `/var/tmp/`: 臨時檔案目錄。
        - `/var/lib/`: 應用程式數據目錄（例如 MySQL 的數據）。

- `/boot`這裡通常都放哪些檔案？
    - **縮寫含義**: 系統啟動（boot）相關。
    - **用途**: `/boot` 目錄存放系統啟動所需的檔案，包括 Linux 核心和引導載入程式的配置檔案。
    - **常見的檔案**:
    - `vmlinuz`: 壓縮的 Linux 核心檔案。
    - `initrd.img`: 用於引導時的虛擬檔案系統。
    - `grub/`: GRUB 引導程式的配置檔案。

- `$PATH` 環境變數的作用是什麼？
    - **用途**: `$PATH` 是一個環境變數，用來指定系統執行指令時搜索可執行檔案的目錄路徑列表。
    - **運作原理**: 當你在終端中輸入一個指令，系統會按照 `$PATH` 中的路徑依次查找該指令的執行檔案。如果找到，系統便會運行該檔案；如果未找到，則會報 `command not found` 錯誤。
    - **常見的 `$PATH` 路徑**:
    - `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

- `which` 指令的作用？
    - **作用**: `which` 用於查找某個指令在 `$PATH` 環境變數指定的目錄中的具體位置。
    - **使用方式**: 當你不確定某個指令在哪裡執行時，可以使用 `which` 查詢它的路徑。
    - **範例**:
    ```bash
    which python

### 1. instance public IP `13.210.161.184`
    - 可以輸入<http://13.210.161.184/>
# 環境設置與概念介紹

### 2. 什麼是 instance type?
- **定義**: Instance type 是 AWS EC2 提供的虛擬機類型，根據 CPU、內存、存儲和網絡性能的需求，選擇適合的計算資源。
- **範例**: `t2.micro` 是一個免費使用層級的 instance type，適合小型應用或測試環境。

### 3. 什麼是 Nginx？
- **定義**: Nginx 是一款高效能的 HTTP 和反向代理伺服器，亦可用作郵件代理伺服器。
- **用途**:
  - **靜態文件伺服器**: 快速傳遞靜態資源（如圖片、CSS、JavaScript）。
  - **反向代理伺服器**: 將請求轉發到後端伺服器，負載均衡，隱藏內部網絡架構。
  - **默認使用round-robin 算法**:將按照server在upstream中的位置,有序訪問上游服務。
  - **SSL/TLS終止**: 管理 HTTPS 加密，簡化後端伺服器配置。
- **特性**:
  - 高效能，能夠處理大量的並發連接。
  - 輕量級，佔用系統資源少。

### 4. pm2 套件是什麼？
- **定義**: PM2 是一款 Node.js 應用的進程管理工具，方便部署和管理應用。
- **用處**:
  - 自動重啟應用以防止崩潰。
  - 支援應用的日誌管理。
  - 提供集群模式，充分利用多核 CPU。
  
#### 4.1 如果不是使用 pm2，使用的是哪一個？
- **選擇**: 我使用的是 `forever`，這是一款同樣用於 Node.js 應用的進程管理工具，能持續運行應用並避免崩潰。
- **用途**: `forever` 提供了簡單的命令行介面來啟動、停止和重啟應用。
- **選擇原因**: 簡單易用且功能足夠，但 PM2 提供更強大的功能，考慮未來可能會轉向 PM2。

### 5. 步驟 9 中提到的 `proxy` 是什麼意思？
- **定義**: Proxy 是一種中介服務，轉發客戶端的請求到後端伺服器。
- **用途**: 通過 Nginx 作為反向代理，可以將請求轉發到 Express Web Server，提供額外的安全性和負載均衡。

#### 5.1 提示 `Reverse proxy` vs `Forward Proxy`
- **Forward Proxy**: 客戶端通過代理伺服器訪問外部網絡，隱藏客戶端的 IP 地址。
- **Reverse Proxy**: 客戶端的請求被轉發到後端伺服器，隱藏內部伺服器的架構，常用於負載均衡和安全管理。

### 6. 在 readme 中提供步驟 9 的 Nginx 設定檔
    - 設定檔分別位於 `/etc/nginx/nginx.conf`和`/etc/nginx/sites-available/default`
    1. `/etc/nginx/nginx.conf` 為全局配置檔案，主要負責 Nginx 的全局設定
        - 主要設定: 控制 Nginx 的行為，如 worker process 的數量、日誌的位置、錯誤頁面的處理方式等。
        - 全局參數: 影響所有虛擬主機的行為，如全局的時間限制、緩存策略等
        - 載入其他設定檔: 可以include其他子設定檔(ex. `/etc/nginx/sites-available` 下的虛擬主機配置檔)
        - 可以見`/week-04/nginx.conf`
    2. `/etc/nginx/sites-available/default`為虛擬主機配置檔案，用於定義具體的網站或應用伺服器的配置，適用於單個網站或應用的訪問和代理設置
        - `/etc/nginx/sites-available/default`跟 `/etc/nginx/sites-enabled/default`的差異？
        -  `/etc/nginx/sites-enabled/default`這個檔案實際上是從 `sites-available/default` 中創建的符號連結。當 Nginx 啟動時，它會讀取 `sites-enabled/` 目錄中的配置檔，並加載 `default` 的配置
            - `/etc/nginx/sites-enabled/`這個目錄包含所有已啟用的虛擬主機配置檔，這些配置是 Nginx 實際會加載和運行。通常這裡的配置檔不直接進行編輯，而是由 `sites-available/` 中的配置檔通過符號連結加入
                - 符號連結的具體操作範例： 
                    `sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled`
                    兩者之間的連結：通過符號連結（ln -s）將 sites-available/ 中的配置檔鏈接到 sites-enabled/ 以啟用配置，預設的 default 配置在這兩個目錄中都是一致的，只是 sites-enabled/ 是一個指向 sites-available/ 的連結
            - 如何確認是否產生符號連結？
                - 檢查 `/etc/nginx/sites-enabled/default` 是否是一個符號鏈結
                    `ls -l /etc/nginx/sites-enabled/`
                - 如果是符號連結，會看到如以下結果
                    `default -> /etc/nginx/sites-available/default`
### 7. Security Group 是什麼？用途為何？有什麼設定原則嗎？
    Security Group 是 AWS 的一種虛擬防火牆，用來控制 EC2 實例的網路流量。它用來定義哪些入站（inbound）和出站（outbound）流量可以通過，類似於網路安全政策的集合。
    - 用途：
        1. 控制 EC2 實例的訪問權限，保護它免受未經授權的訪問。
        2. 可設定允許或拒絕特定 IP 位址或網段的連接。
        3. 可以依據 TCP 或 UDP 協議，設定允許的端口範圍（如 HTTP 的 80 端口、HTTPS 的 443 端口、SSH 的 22 端口等）。
    - 設定原則：
        1. 最小權限原則：只開啟需要使用的端口，避免暴露不必要的端口。
        2. 具體限制來源：對於 SSH 連接，可以設定只允許來自指定 IP 位址的連接，增加安全性。
        3. 入站與出站規則分開管理：根據具體需求，分別設定入站和出站流量的規則。
            舉例：
                如果你只需要 HTTP 訪問，則僅開放 80 端口的入站流量。
                SSH 連接可設限為只允許來自某個特定 IP 位址的流量
#### 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？

**`sudo`** 是 Linux 系統中的一個指令，代表 "superuser do"，意思是讓一般使用者以超級使用者（root）權限執行指令。

#### 為什麼需要加上 `sudo`？
- **安全性**：系統的某些操作需要高權限來避免誤操作，這樣可以保護系統的核心部分不被非授權或意外更改。例如，修改系統配置檔案、安裝軟體、重新啟動系統服務等操作都需要以 root 身份進行。
- **資源限制**：一般使用者無法訪問或修改系統的某些資源或檔案，`sudo` 提供了一個臨時取得管理員權限的方式。

#### 什麼時候不需要加上 `sudo`？
- **使用者擁有權限的操作**：如果是使用者自己的檔案或資料夾，或者是系統允許使用者執行的應用程式和任務，就不需要使用 `sudo`。例如，查看檔案內容、運行使用者已安裝的應用程式等。
- **避免過度使用管理員權限**：避免在不必要的情況下使用 `sudo`，以減少系統的風險和潛在錯誤。

小結論: `sudo` 是為了提升使用者權限來完成需要管理員權限的操作，但不是所有操作都需要，具體情況取決於任務對系統資源的需求。


### 9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？

#### Nginx 的 Log 檔案位置
Nginx 預設會將日誌檔案記錄在以下兩個位置：
- **存取日誌（Access Log）**: `/var/log/nginx/access.log`
- **錯誤日誌（Error Log）**: `/var/log/nginx/error.log`

這些路徑可以在 Nginx 的配置檔案中找到，具體在 `/etc/nginx/nginx.conf` 檔案中有相關設定。

#### 怎麼找到 Nginx 的 Log 檔案？
你可以透過以下方式確認 Nginx 日誌檔案的位置：
1. **檢查 Nginx 配置檔**：打開 `/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-enabled/default` 檔案，查看其中的 `access_log` 和 `error_log` 設定。
   ```bash
   sudo nano /etc/nginx/nginx.conf
#### 怎麼看 Nginx 的 Log?
1. 查看存取日誌(Access Log):
    ```bash
    sudo tail -f /var/log/nginx/access.log
2. 查看錯誤日誌(Error Log):
    ```bash
    sudo tail -f /var/log/nginx/error.log
### 10. 其他你在過程中遭遇的問題，有找到解答就記錄下來，沒有可以把問題放著，下次上課討論。如果沒有遇到任何問題，也可以回答「無」
**問題會再更新**
### 11. 列出完成本作業時參考的資料
### 12. (optional) 如果你很初學，不放心自己的過程是否正確，可以紀錄過程，我會盡量幫忙看
