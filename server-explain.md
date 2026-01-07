# server.js 程式碼註解與解釋（超基礎版）

---

## 1. 套件引用
這裡是把 Node.js 的各種工具叫進來用：
- express：讓你快速做網站伺服器。
- cors：讓不同網站可以互相存取資料。
- multer：讓你可以上傳檔案（像圖片）。
- path、fs：處理檔案路徑和檔案本身。
- nedb-promises：一種很簡單的資料庫，像記事本一樣存資料。
- ejs：讓伺服器可以產生 HTML 頁面。

---

## 2. 伺服器初始化
這裡是在「開一台伺服器」：
- `const app = express();`：建立一個網站伺服器。
- `const PORT = process.env.PORT || 3000;`：設定伺服器要在哪個「門牌號碼」等你（預設 3000）。

---

## 3. 中間件設定
這些是伺服器的「助手」：
- cors：允許外部網站來存取你的資料。
- express.json：讓伺服器能看懂 JSON 格式（像是表單資料）。
- express.static：讓你可以直接存取 Public 資料夾裡的檔案（像網頁、圖片）。
- EJS 設定：讓伺服器能產生 HTML 頁面給你看。

---

## 4. 檔案上傳設定
這裡是在設定「檔案要存哪裡」：
- uploadDir：檔案會存到 Public/upload 資料夾。
- 如果 upload 資料夾不存在就自動建立。
- multer 設定：檔案存到 uploadDir，檔名用原本的名字。

---

## 5. 資料目錄與資料庫初始化
這裡是在設定「資料要存哪裡」：
- dataDir：所有資料都存到 data 資料夾。
- portfoliosDb：存作品集的資料。
- messagesDb：存留言訊息的資料。

---

## 6. 作品集 API
這些是「作品集」的功能：
- `/api/portfolios`：取得所有作品（給前端用）。
- `/api/portfolios/:id`：取得某一個作品。
- `POST /api/portfolios`：新增作品（可以上傳圖片）。
- `PUT /api/portfolios/:id`：修改作品。
- `DELETE /api/portfolios/:id`：刪除作品。

---

## 7. 訊息 API
這些是「留言」的功能：
- `/api/messages`：取得所有留言。
- `POST /api/messages`：新增留言。
- `PUT /api/messages/:id`：把留言標記為已讀。
- `DELETE /api/messages/:id`：刪除留言。

---

## 8. EJS 訊息管理頁
這些是「後台管理留言」的功能：
- `/messages`：用伺服器產生一個留言列表頁面。
- `POST /messages/:id/read`：在頁面上把留言標記為已讀。
- `POST /messages/:id/delete`：在頁面上刪除留言。

---

## 9. 啟動伺服器
這裡是在「開機」：
- `app.listen(PORT, () => {...})`：讓你的網站伺服器開始運作，等你用瀏覽器連線。

---

如果你想知道「每一行」在做什麼，或想看「流程圖」，請再問我！我可以用更白話的方式解釋每個步驟。
