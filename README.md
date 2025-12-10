# 我的作品集網站

一個使用 Vue 3、Bootstrap 5、GSAP 動畫和 NeDB 資料庫構建的現代作品集網站。

## 功能特性

✨ **三個動態頁面**
- 首頁：介紹和歡迎區域
- 作品集：展示和管理作品
- 聯絡：聯絡表單和訊息管理

🎨 **視覺效果**
- Bootstrap 5 響應式排版
- GSAP 動畫效果
- 平滑的頁面過渡
- 卡片懸停動畫

🔧 **功能**
- 新增/刪除作品
- 上傳作品圖片
- 發送聯絡訊息
- 訊息管理（標記為已讀、刪除）
- 實時資料更新

💾 **資料存儲**
- NeDB-Promises NoSQL 資料庫
- 自動持久化
- 異步操作支持

## 技術棧

- **前端框架**: Vue 3
- **UI 框架**: Bootstrap 5
- **動畫庫**: GSAP 3
- **後端框架**: Express.js
- **資料庫**: NeDB-Promises
- **文件上傳**: Multer
- **HTTP 客戶端**: Axios
- **CORS 支持**: Enabled

## 安裝和運行

### 前置要求
- Node.js 12.0 或更高版本
- npm 或 yarn

### 安裝步驟

1. 進入項目目錄
```bash
cd d:\WEB
```

2. 安裝依賴 (第一次運行)
```bash
npm install
```

3. 啟動開發服務器
```bash
npm start
```

4. 在瀏覽器中打開
```
http://localhost:3000
```

## 項目結構

```
d:\WEB/
├── package.json              # 項目配置和依賴
├── server.js                 # Express 服務器和 API
├── .env                       # 環境變量
├── data/                      # NeDB 資料庫文件
│   ├── portfolios.db         # 作品集資料
│   └── messages.db           # 訊息資料
└── Public/                    # 前端靜態文件
    ├── index.html            # 主 HTML 文件
    ├── css/
    │   └── style.css         # 全局樣式
    ├── js/
    │   └── app.js            # Vue 3 應用
    ├── img/                  # 圖片資源
    └── upload/               # 上傳文件目錄
```

## API 端點

### 作品集 API

- `GET /api/portfolios` - 獲取所有作品
- `GET /api/portfolios/:id` - 獲取單個作品
- `POST /api/portfolios` - 新增作品 (支持文件上傳)
- `PUT /api/portfolios/:id` - 更新作品
- `DELETE /api/portfolios/:id` - 刪除作品

### 訊息 API

- `GET /api/messages` - 獲取所有訊息
- `POST /api/messages` - 新增訊息
- `PUT /api/messages/:id` - 標記訊息為已讀
- `DELETE /api/messages/:id` - 刪除訊息

## 使用說明

### 新增作品

1. 導航到「作品集」頁面
2. 填寫作品標題、描述和技術
3. 可選：上傳作品圖片
4. 可選：添加作品連結
5. 點擊「新增作品」

### 發送訊息

1. 導航到「聯絡我」頁面
2. 填寫聯絡表單
3. 點擊「發送訊息」
4. 訊息將出現在下方的訊息列表中

### 管理訊息

- 點擊「標記為已讀」標記為已讀
- 點擊「刪除」刪除訊息

## 自定義

### 修改顏色主題

編輯 `Public/css/style.css` 中的 `:root` 變量：

```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    /* ... 更多顏色 */
}
```

### 添加新頁面

在 `Public/js/app.js` 中添加新的頁面狀態，然後在 `index.html` 中添加對應的 HTML 區塊。

## 文件上傳限制

- 圖片存儲在 `Public/upload/` 目錄
- 支持所有常見圖片格式
- 文件自動重命名以避免衝突

## 故障排除

### 404 錯誤
確保服務器正在運行：`npm start`

### 資料不加載
檢查 `data/` 目錄是否存在和可寫

### 文件上傳失敗
確保 `Public/upload/` 目錄存在且有寫入權限

## 許可證

MIT License

## 聯絡方式

如有問題或建議，請通過網站的聯絡表單與我聯繫。

---

**建議**：定期備份 `data/` 目錄以保護您的資料。
