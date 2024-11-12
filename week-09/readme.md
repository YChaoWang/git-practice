# Troubleshooting Lab - Web Server
- 把環境建立起來
- 可以透過 `curl` 或是用瀏覽器開啟 EC2 的 public IP 來確認是否修復完成

```bash
ssh -i {key} ubuntu@{public IP}

# 執行以下指令會看到什麼？
curl localhost 
```
Ans: 如下圖 
![curl_screenshot](/week-09/images/截圖%202024-11-07%20下午4.26.33.png)

接下來
```bash
# 透過 systemctl 啟動 nginx
sudo systemctl start nginx
```
發現如下圖

![start nginx](/week-09/images/截圖%202024-11-07%20下午4.27.12.png)

由截圖中的提示，我們可以去`systemctl status nginx.service`去查看更多資訊

ok，我們下該指令

![status nginx.service](/week-09/images/截圖%202024-11-07%20下午4.27.23.png)

可以看到很明顯的錯誤: [emerg] 2486#2486: unexpected ";" in /etc/nginx/nginx.conf:8

因此我們去/etc/nginx/nginx.conf的第8行將多出來的";"刪掉，然後再執行一次

```bash
# 透過 systemctl 啟動 nginx
sudo systemctl start nginx
# 透過 systemcl 查看 nginx 啟動的狀況
sudo systemctl status nginx
```

接下來可以看到成功將剛剛的錯誤解決，但仍有一些問題

![retype status nginx.service](/week-09/images/截圖%202024-11-07%20下午4.28.02.png)

沒關係，我們一步步來解決👨🏻‍💻


由圖中"[emerge] bind() to 0.0.0.0:80 failed (98: Address already in use)"發現應該是port 80造成的問題 可能是被nginx重複bind了
查詢 <https://serverfault.com/questions/308176/nginx-cant-bind-to-port-80-nothing-running-on-port-80>
發現應該是
執行
```bash 
sudo iptables -L
```
可以看到如下圖，有個tcp被REJECT
![sudo iptables](/week-09/images/截圖%202024-11-07%20下午4.28.37.png)

於是我們將這個tcp 刪掉

```bash
sudo iptables -D INPUT -p TCP --dport 80 -j REJECT
```
然後再看一次iptables
```bash 
sudo iptables -L
```

![sudo iptables -D](/week-09/images/截圖%202024-11-07%20下午4.29.49.png)


![errorlog](/week-09/images/截圖%202024-11-07%20下午4.30.50.png)

由圖中可以看到，裡面有 error_log 位於 /var/log/myweb/error.log

於是，我們將error_log的資訊印出來，幫助我們排除問題

執行
```bash
cat  /var/log/myweb/error.log
```
![cat error_log](/week-09/images/截圖%202024-11-07%20下午4.31.14.png)

發現還是有出現error，於是我們再檢查一次port 80是否仍被佔用
```bash
sudo lsof -i :80
```
可以看到port 80 被 PID 為 579 的 TCP 佔用，因此我們需要將他清除掉，才能讓port 80 不被佔用
執行 
```bash
sudo kill 579
```

然後再重複執行`sudo lsof -i :80`，發現沒有任何輸出，代表port 80 沒有被佔用了
再執行一次
```bash
# 透過 systemctl 啟動 nginx
sudo systemctl start nginx
# 透過 systemcl 查看 nginx 啟動的狀況
sudo systemctl status nginx
```
可以看到如下截圖
![success](/week-09/images/截圖%202024-11-07%20下午4.42.16.png)

成功執行，沒有任何錯誤

我們再執行一次
```bash
curl localhost
```
![curl localhost again](/week-09/images/截圖%202024-11-07%20下午4.42.22.png)

可以看到成功修復完成🎉