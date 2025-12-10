# 部署和配置指南

## 完整項目設置

### 第一次設置

```powershell
# 1. 進入項目目錄
cd d:\WEB

# 2. 安裝所有依賴
npm install

# 3. (可選) 初始化示例數據
npm run init

# 4. 啟動服務器
npm start
```

## 依賴列表

已安裝的包：
- `express` (4.18.2) - Web 框架
- `cors` (2.8.5) - 跨域資源共享
- `multer` (1.4.5-lts.1) - 文件上傳
- `nedb-promises` (5.1.0) - 資料庫
- `dotenv` (16.0.3) - 環境變量

前端庫 (通過 CDN)：
- Vue 3 (全局構建)
- Bootstrap 5.3.0
- GSAP 3.12.2
- Axios

## 配置說明

### .env 文件

```env
PORT=3000
NODE_ENV=development
```

**PORT**: 服務器監聽的端口
**NODE_ENV**: 運行環境 (development/production)

## 目錄結構說明

```
d:\WEB/
├── .env                      # 環境配置
├── init-data.js              # 初始數據腳本
├── package.json              # 項目清單
├── QUICKSTART.md             # 快速開始指南
├── README.md                 # 完整文檔
├── server.js                 # Express 伺服器 (~180 行)
├── data/                     # NeDB 資料庫
│   ├── portfolios.db         # 作品集
│   └── messages.db           # 訊息
└── Public/                   # 前端應用
    ├── index.html            # 主頁面 (~280 行)
    ├── css/
    │   └── style.css         # 樣式 (~400 行)
    ├── js/
    │   └── app.js            # Vue 應用 (~220 行)
    ├── img/                  # 圖片目錄
    └── upload/               # 上傳文件
```

## 主要功能詳解

### 1. 作品集管理

**新增作品**
```javascript
POST /api/portfolios
Content-Type: multipart/form-data

- title: 作品標題
- description: 作品描述
- technologies: JSON 陣列
- link: 作品 URL (可選)
- image: 圖片文件 (可選)
```

**獲取作品**
```
GET /api/portfolios
GET /api/portfolios/:id
```

**更新作品**
```javascript
PUT /api/portfolios/:id
Content-Type: multipart/form-data
```

**刪除作品**
```
DELETE /api/portfolios/:id
```

### 2. 訊息管理

**發送訊息**
```javascript
POST /api/messages
Content-Type: application/json

{
  "name": "訪客名字",
  "email": "訪客郵箱",
  "subject": "主題",
  "message": "訊息內容"
}
```

**獲取訊息**
```
GET /api/messages        // 按日期倒序
```

**標記為已讀**
```
PUT /api/messages/:id
```

**刪除訊息**
```
DELETE /api/messages/:id
```

### 3. 文件上傳

- 存儲位置: `Public/upload/`
- 自動重命名: `{fieldname}-{timestamp}-{random}.{ext}`
- 支持格式: 所有 MIME 類型
- 大小限制: 無 (可在 multer 配置中設置)

### 4. 動畫效果 (GSAP)

**頁面載入動畫**
- 導航欄從上方滑入
- 頁腳從下方滑入

**頁面切換動畫**
- 新頁面淡入並向上滑動
- 持續時間: 500ms

**卡片動畫**
- 作品卡片按順序顯示
- 錯差延遲: 100ms
- 懸停時向上平移 10px

## 資料庫詳解

### NeDB 特點

- NoSQL 文檔資料庫
- 純 JavaScript 實現
- 自動 ID 生成 (_id)
- 支持非同步操作 (Promises)
- 自動持久化到文件

### 資料模式

**Portfolio**
```javascript
{
  _id: "自動生成",
  title: "作品標題",
  description: "詳細描述",
  technologies: ["Vue", "JavaScript"],
  link: "https://...",
  imageUrl: "/upload/...",
  createdAt: Date,
  updatedAt: Date
}
```

**Message**
```javascript
{
  _id: "自動生成",
  name: "訪客名字",
  email: "郵箱",
  subject: "主題",
  message: "內容",
  createdAt: Date,
  read: false
}
```

## 開發工作流

### 啟動開發服務器
```powershell
npm start
# 或
npm run dev
```

服務器會監聽 `http://localhost:3000`

### 實時編輯

編輯以下文件時無需重啟服務器：
- `Public/css/style.css` - 直接刷新頁面
- `Public/js/app.js` - 直接刷新頁面
- `Public/index.html` - 直接刷新頁面

編輯以下文件時需要重啟服務器：
- `server.js` - API 更改
- `.env` - 環境變量

### 調試技巧

1. **瀏覽器開發者工具**
   - F12 或 右鍵 > 檢查
   - 查看 Console 標籤了解錯誤

2. **服務器日誌**
   - 檢查終端輸出
   - API 調用會顯示在 Network 標籤

3. **資料庫驗證**
   - NeDB 文件是純文本，可以直接檢查
   - 位置: `data/*.db`

## 生產環境準備

### 環境變量設置

編輯 `.env`:
```env
PORT=8080
NODE_ENV=production
```

### 運行服務器

```powershell
npm start
```

### 性能優化建議

1. **CDN 用法** - 使用 CDN 加載外部庫 (已配置)
2. **資源壓縮** - Express 已內置 gzip 支持
3. **資料庫索引** - 可在需要時添加
4. **圖片優化** - 考慮使用圖片壓縮

## 常見操作

### 重置資料

刪除資料庫文件：
```powershell
Remove-Item d:\WEB\data\*.db -Force
```

然後重啟服務器，再運行：
```powershell
npm run init
```

### 更改端口

編輯 `.env` 文件，更改 `PORT` 值

### 檢查安裝的包

```powershell
npm list
```

### 更新依賴

```powershell
npm update
```

### 清除快取

```powershell
npm cache clean --force
```

## 安全提示

⚠️ **注意事項**：

1. 不要在生產環境使用默認密鑰
2. 考慮添加文件上傳驗證
3. 實施輸入檢驗和清理
4. 定期備份 `data/` 目錄
5. 在公開部署前更改敏感信息

## 故障排除

### 問題 1: "Port 3000 already in use"

**解決方案**：
```powershell
# 找到使用端口 3000 的進程
Get-NetTCPConnection -LocalPort 3000

# 或更改 .env 中的 PORT
```

### 問題 2: 文件上傳失敗

**檢查清單**：
1. `Public/upload/` 目錄是否存在
2. 目錄是否有寫入權限
3. 文件大小是否超過限制

### 問題 3: 資料庫錯誤

**解決方案**：
1. 檢查 `data/` 目錄是否存在
2. 確保有讀寫權限
3. 刪除損壞的 `.db` 文件並重新啟動

### 問題 4: API 404 錯誤

**檢查**：
1. 服務器是否正在運行 (`npm start`)
2. 請求的 URL 是否正確
3. 檢查瀏覽器 Network 標籤

## 聯絡和支持

如有問題，請：
1. 檢查終端輸出和錯誤信息
2. 查看瀏覽器控制台
3. 驗證網路連接
4. 確保所有依賴已正確安裝

---

**最後更新**: 2025-12-04
