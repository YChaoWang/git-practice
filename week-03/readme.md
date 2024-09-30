什麼是 AWS Region, AZ (availability zones)
AWS 雲端基礎設施是以區域(Region)與可用區域(Available Zone)為中心來建置的。區域(Region)是世界上有多個可用區域的實體位置。可用區域由一或多個分散的資料中心(Data Center)所組成，每一個AZ就是一個可獨立運作的資料中心都有備援電源、聯網和連線能力，且置放在不同的機構。
- AWS Region: 
    - 各個Region為獨立的地理區域
    - 每個Region皆設計為與其他區域隔離。如此可達到最高的容錯能力與穩定性
    - 檢視資源：當檢視資源時，只會看到與指定的區域繫結的資源。這是因為區域彼此隔離，而且AWS不會自動跨區域複寫資源。
    - 為何要有多個AWS Region? 參考 <https://ithelp.ithome.com.tw/m/articles/10315419>
        - 高可用性：AWS 旨在實現高可用性，因此它在不同地理區域中提供了多個數據中心，以確保您的應用程式在單一區域發生故障時能夠繼續運行。

        - 法規合規性：AWS 遵守各種全球性的法規和合規性標準，這使得客戶可以根據其需求選擇特定地理區域以滿足法規要求。

        - 低延遲：選擇靠近您的用戶的地理區域可以降低延遲，提供更好的性能
- AZ (availability zones):
    - 每個AWS Region內包含多個AZ(Availability Zones)，每個 AZ 是一個獨立的大機房。
    - AZ code: 通常是Region code + 一位英文字母，例如
        ```us-west-2a```、```us-west-2b```
        - 但每個帳號看到的AZ code代表的機房其實不一定相同 
            -> 用AZ ID 可以確定是否一樣
    - 特點
        - 容錯容忍性：可用區的分離性確保了即使一個可用區出現故障，應用程式仍然可以在其他可用區中運行。

        - 數據複製：AWS 提供了多種方式來在不同可用區之間複製數據，以實現數據的冗餘性和高可用性。

        - 多區部署：為實現更高的容錯容忍性，有些應用程式會在多個地理區域中的多個可用區部署，以確保即使整個地理區域發生故障，應用程式仍然可用
如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？
- 在選擇前我們應該考慮以下幾點
    <details>
  <summary>1. 延遲與效能 (Latency & Performance)</summary>
  
  距離使用者最近：選擇離你的主要用戶群或系統最近的 Region，可以最大限度減少網路延遲，提升應用程序的效能。
  邊緣節點 (Edge locations)：對於需要內容分發（例如使用 CloudFront 的 CDN），我會查看邊緣節點的分佈位置，並選擇靠近這些節點的 Region。

  如何決策：

  - 測試不同 Region 的延遲，可以使用 AWS 提供的工具或 ping 測試。
  - 檢查 AWS Edge locations，確保內容分發能快速抵達目標用戶。
</details>

<details>
  <summary>2. 成本 (Cost)</summary>

  不同的 AWS Region 之間，服務價格有差異。有些 Region 的資源價格相對便宜，尤其是像 EC2、S3 和 RDS 等服務。
  數據傳輸費用：Region 間的數據傳輸費用也有所不同，因此如果你的架構涉及多個 Region 之間的大量數據傳輸，則應該選擇數據傳輸成本較低的 Region。

  如何決策：

  - 比較你所需服務在不同 Region 的定價，AWS 提供詳細的 Region 定價表。
  - 根據你的應用程式需求，評估不同服務的數據傳輸費用。
</details>

<details>
  <summary>3. 合規與數據主權 (Compliance & Data Residency)</summary>

  法律要求：某些國家或地區有法律規定，要求用戶的數據必須存儲在特定地區內。例如，歐盟的 GDPR 規定數據必須存放在 EU 內，這時應選擇 AWS 歐盟區的 Region。
  數據主權：選擇符合本地數據主權要求的 Region，避免違規的風險。

  如何決策：

  - 了解所在行業或用戶所在國家/地區的法律規範，例如 GDPR 或 HIPAA 合規要求。
  - 使用 AWS 的 合規性指南 檢查不同 Region 的合規性。
</details>

<details>
  <summary>4. 可用性 (Availability of Services)</summary>

  服務可用性：AWS 的某些新服務或功能只在特定的 Region 首先推出。如果你需要使用某個特定的服務，則應檢查該服務是否在目標 Region 可用。
  可用區域 (Availability Zones)：一些 Region 內的可用區域數量較多，能夠提供更高的冗餘和容錯能力。

  如何決策：

  - 使用 AWS Regional Services List 檢查所需的服務是否在目標 Region 可用。
  - 選擇有足夠可用區域支持高可用性架構的 Region。
</details>

<details>
  <summary>5. 災難恢復 (Disaster Recovery)</summary>

  地理冗餘：在某些架構中，會使用多個地理位置來實現災難恢復 (DR) 策略。選擇彼此之間足夠距離的 Region，能夠減少同一自然災害或故障對所有服務的影響。
  跨 Region 數據備份：如果需要跨 Region 備份，則應選擇兩個彼此距離合適且成本合理的 Region。

  如何決策：

  - 根據系統的恢復時間目標 (RTO) 和恢復點目標 (RPO)，設計合適的災難恢復策略，並選擇合適的主備 Region。
</details>

<details>
  <summary>6. 市場需求與擴展性 (Market Demand & Scalability)</summary>

  如果你的業務重點是在某個特定市場，應該選擇該市場附近的 AWS Region，以便降低網路延遲並增強用戶體驗。
  擴展性：某些 Region 的資源需求高峰期時可能出現資源不足或價格波動的情況，這時需要考慮選擇那些資源供應更穩定的 Region。

  如何決策：

  - 評估你的市場位置和擴展計劃，選擇能夠支持未來增長需求的 Region。
</details>

<details>
  <summary>7. 區域擁堵或限制 (Region Congestion or Limitations)</summary>

  某些熱門的 Region 可能經常處於高負載狀態，導致服務延遲或性能問題。
  預算和配額限制：AWS 在不同 Region 對某些服務有配額限制，例如 EC2 實例的啟動數量等，應考慮是否會影響你的擴展需求。
</details>

<details>
  <summary>8. 個人偏好</summary>

  在選擇 Region 時，有時可能會根據個人的偏好和熟悉程度來做決定，這取決於你的經驗和對特定地區的信任感。
</details>
