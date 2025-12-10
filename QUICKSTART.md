# 快速入門指南

## 第一次使用

### 步驟 1：安裝依賴
```powershell
cd d:\WEB
npm install
```

### 步驟 2：啟動服務器
```powershell
npm start
```

你應該會看到：
```
Server is running on http://localhost:3000
```

### 步驟 3：在瀏覽器中打開
打開你的瀏覽器並訪問：
```
http://localhost:3000
```

## 項目功能演示

### 首頁 (Home)
- 展示一個吸引人的 Hero 部分
- 包含歡迎訊息和 CTA 按鈕
- 有 GSAP 動畫效果

### 作品集頁面 (Portfolio)
1. **新增作品表單**
   - 標題：作品的名稱
   - 描述：作品的詳細說明
   - 技術：使用的技術 (逗號分隔)
   - 圖片：上傳預覽圖
   - 連結：(可選) 指向作品的 URL

2. **作品展示**
   - 卡片式排版
   - 懸停效果
   - 刪除按鈕

### 聯絡頁面 (Contact)
1. **聯絡表單**
   - 名字
   - 郵箱
   - 主題
   - 訊息內容

2. **訊息管理**
   - 查看所有訊息
   - 標記為已讀
   - 刪除訊息

## 文件上傳

上傳的圖片會保存在：
```
d:\WEB\Public\upload\
```

## 資料庫

NeDB 資料庫文件位置：
```
d:\WEB\data\
├── portfolios.db  (作品集)
└── messages.db    (訊息)
```

## API 測試 (使用 Postman 或 curl)

### 獲取所有作品
```bash
curl http://localhost:3000/api/portfolios
```

### 新增訊息
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "張三",
    "email": "zhangsan@example.com",
    "subject": "合作機會",
    "message": "我對你的作品很感興趣"
  }'
```

## 常見問題

**Q: 能否更改端口？**
A: 編輯 `.env` 文件，修改 `PORT` 值

**Q: 如何重置資料？**
A: 刪除 `data/` 目錄中的 `.db` 文件，然後重啟服務器

**Q: 如何部署到生產環境？**
A: 將項目上傳到伺服器，設置 `NODE_ENV=production`，確保依賴已安裝

## 支持的瀏覽器

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 下一步建議

1. 自定義導航欄品牌名稱和顏色
2. 添加你自己的作品數據
3. 修改 Hero 部分的背景色
4. 添加更多動畫效果
5. 考慮添加認證功能（需要更多代碼）

---

祝你使用愉快！如有問題，請檢查終端輸出中的錯誤訊息。
