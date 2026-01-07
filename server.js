const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fileupload = require('express-fileupload');
const Database = require('nedb-promises');
const ejs = require('ejs');

const server = express();
const PORT = process.env.PORT || 3000;

var messageDB = Database.create(__dirname + "/messages.db");
var portfolioDB = Database.create(__dirname + "/portfolios.db");

// 中間件
server.use(cors());
server.use(express.json());

// 設定靜態檔案資料夾 (務必確保資料夾名稱大小寫與此處一致，Render/Linux 是區分大小寫的)
server.use(express.static(path.join(__dirname, 'Public')));
server.use(fileupload({extended: true}));

// 設置EJS模板引擎

server.set('view engine', 'ejs');
server.set("views", __dirname + "/views");

// EJS 路由 - 訊息列表頁面 (SSR)
server.get('/messages', async (req, res) => {
    try {
        const messages = await messageDB.find({}).sort({ createdAt: -1 });
        res.render('messages', { messages });
    } catch (error) {
        res.status(500).send('伺服器錯誤: ' + error.message);
    }
});

// 方便測試用的 /portfolios 路由 (回傳 JSON)
server.get("/portfolios", (req, res) => {
    portfolioDB.find({}).then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send(err);
    });
});

server.get("/api/portfolios",(req,res)=>{
    portfolioDB.find({}).then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send(err);
    })
});

// 訊息 API
server.get("/api/messages", async (req, res) => {
    try {
        const messages = await messageDB.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.post("/api/messages", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const newMessage = {
            name,
            email,
            phone: phone || '',
            subject,
            message,
            createdAt: new Date()
        };
        const result = await messageDB.insert(newMessage);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

