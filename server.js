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

// portfolioDB.insert([
//     {"_id":"p_1","title":"大二遊戲宣傳","description":"又是無情報肝。","technologies":["procreat","ae"],"link":"https://example.com/todo","imageUrl":null,"videoUrl":"/video/1min.mp4","category":"動畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_2","title":"自我介紹","description":"海獅。","technologies":["procreat","ae"],"link":"https://example.com/weather","imageUrl":null,"videoUrl":"/video/1411222018.mp4","category":"動畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_3","title":"大二動畫","description":"老鼠的不歸路。","technologies":["procreat","ae"],"link":"https://example.com/weather","imageUrl":null,"videoUrl":"/video/s1411222018_myanimation.mp4","category":"動畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_4","title":"大頭插畫","description":"精緻的大頭插畫創作，展現人物的表情和特點。","technologies":["Vue 3","Bootstrap 5","JavaScript"],"link":"https://example.com","imageUrl":"/img/head.jpg","videoUrl":null,"category":"插畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_5","title":"全身插畫","description":"完整的全身人物插畫作品。","technologies":["Procreate","Digital Painting"],"link":"https://example.com","imageUrl":"/img/hello.jpg","videoUrl":null,"category":"插畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_6","title":"人物立繪","description":"人物稚態立繪插畫作品。","technologies":["Procreate","Character Design"],"link":"https://example.com","imageUrl":"/img/oc.jpg","videoUrl":null,"category":"插畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_7","title":"半身插畫","description":"半身人物插畫作品。","technologies":["Procreate","Illustration"],"link":"https://example.com","imageUrl":"/img/hua.jpg","videoUrl":null,"category":"插畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}
// {"_id":"p_8","title":"作業","description":"半身人物插畫作品。","technologies":["Procreate","Illustration"],"link":"https://example.com/shop","imageUrl":"/img/work.jpg","videoUrl":null,"category":"插畫","createdAt":"2025-12-24T00:00:00.000Z","updatedAt":"2025-12-24T00:00:00.000Z"}

// ]);