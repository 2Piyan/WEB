# 🚀 快速參考卡 - 項目啟動指令

## ⚡ 最快啟動 (3 步)

```powershell
cd d:\WEB
npm install
npm start
```

然後訪問: **http://localhost:3000**

---

## 📋 完整命令列表

| 命令 | 功能 | 說明 |
|------|------|------|
| `npm install` | 安裝依賴 | 首次使用必須執行 |
| `npm start` | 啟動服務器 | 監聽 http://localhost:3000 |
| `npm run init` | 初始化數據 | 添加示例作品和訊息 |
| `npm run dev` | 開發模式 | 與 start 相同 |

---

## 📂 項目文件概覽

### 源代碼文件
```
server.js              Express API 服務器 (186 行)
Public/index.html      主 HTML 頁面 (280 行)
Public/js/app.js       Vue 3 應用邏輯 (181 行)
Public/css/style.css   全局樣式表 (413 行)
```

### 配置和數據
```
package.json           NPM 配置
.env                   環境變量
init-data.js           初始化腳本
data/                  NeDB 數據庫目錄
```

### 文檔
```
README.md              完整功能文檔
QUICKSTART.md          快速開始指南
DEPLOYMENT.md          部署和配置指南
PROJECT_SUMMARY.md     項目完成報告
VERIFICATION.md        驗證檢查清單
```

---

## 🎯 核心功能速查

### 新增作品
1. 進入「作品集」頁面
2. 填寫標題、描述、技術
3. 上傳圖片 (可選)
4. 點擊「新增作品」

### 發送訊息
1. 進入「聯絡我」頁面
2. 填寫名字、郵箱、主題、訊息
3. 點擊「發送訊息」

### 管理訊息
- 點擊「標記為已讀」標記消息
- 點擊「刪除」刪除消息

---

## 🔗 重要 URL

| URL | 功能 |
|-----|------|
| http://localhost:3000 | 首頁 |
| http://localhost:3000/api/portfolios | 獲取所有作品 |
| http://localhost:3000/api/messages | 獲取所有訊息 |

---

## 📁 目錄結構

```
d:\WEB/
├── 配置
│   ├── .env
│   ├── package.json
│   └── init-data.js
├── 后端
│   └── server.js
├── 前端 (Public/)
│   ├── index.html
│   ├── js/app.js
│   ├── css/style.css
│   └── upload/  (上傳文件)
├── 數據 (data/)
│   ├── portfolios.db
│   └── messages.db
└── 文檔
    ├── README.md
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    ├── PROJECT_SUMMARY.md
    └── VERIFICATION.md
```

---

## 🆘 常見問題快解

**Q: 無法啟動服務器**
A: 確保執行了 `npm install`

**Q: 端口已被佔用**
A: 編輯 `.env` 更改 `PORT=3000` 為其他端口

**Q: 找不到資料庫文件**
A: 正常情況，運行后會自動創建在 `data/` 目錄

**Q: 圖片無法上傳**
A: 檢查 `Public/upload/` 目錄是否存在

**Q: 頁面空白**
A: 打開瀏覽器控制台 (F12) 檢查錯誤信息

---

## 🎨 自定義要點

### 修改標題
編輯 `index.html` 的 `<title>` 標籤

### 修改導航欄品牌
編輯 `index.html` 中的：
```html
<a class="navbar-brand" href="#">我的作品集</a>
```

### 修改顏色主題
編輯 `css/style.css` 的 `:root` 變量

### 修改頁面內容
直接編輯 `index.html` 中的相應區塊

---

## 💻 系統要求

- Node.js 12.0+
- npm 6.0+
- 500 MB 磁盤空間
- 任何現代瀏覽器

---

## 📊 項目統計

| 項目 | 數量 |
|------|------|
| 總文件數 | 12 |
| 總代碼行數 | 1,200+ |
| 核心文件 | 4 |
| API 端點 | 8 |
| Vue 組件 | 3 |
| 動畫效果 | 5 |

---

## 🌟 已實現功能

✅ 三個動態頁面  
✅ Bootstrap 5 響應式排版  
✅ Vue 3 數據綁定  
✅ GSAP 動畫效果  
✅ NeDB 數據庫  
✅ 圖片上傳  
✅ 訊息管理  
✅ 完整 API  

---

## 🚀 下一步

1. 運行 `npm install && npm start`
2. 訪問 http://localhost:3000
3. 添加你的作品和信息
4. 自定義顏色和內容
5. 部署到線上服務器

---

## 📞 技術支持

查看相應的文檔文件：
- 功能問題 → `README.md`
- 啟動問題 → `QUICKSTART.md`
- 部署問題 → `DEPLOYMENT.md`
- 項目詳情 → `PROJECT_SUMMARY.md`

---

**祝你使用愉快！** 🎉
