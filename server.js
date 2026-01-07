const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Database = require('nedb-promises');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(express.static(path.join(__dirname, 'Public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 設置文件上傳
const uploadDir = path.join(__dirname, 'Public', 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// 確保資料目錄存在（必須在初始化 NeDB 之前）
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// NeDB 資料庫初始化
const portfoliosDb = new Database({
  filename: path.join(dataDir, 'portfolios.db'),
  autoload: true
});

const messagesDb = new Database({
  filename: path.join(dataDir, 'messages.db'),
  autoload: true
});

// API 路由 - 作品集

// 獲取所有作品
app.get('/api/portfolios', async (req, res) => {
  try {
    const portfolios = await portfoliosDb.find({});
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 獲取單個作品
app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolio = await portfoliosDb.findOne({ _id: req.params.id });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 新增作品
app.post('/api/portfolios', upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;
    const imageUrl = req.file ? `/upload/${req.file.filename}` : '';

    const portfolio = {
      title,
      description,
      technologies: JSON.parse(technologies || '[]'),
      link,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await portfoliosDb.insert(portfolio);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新作品
app.put('/api/portfolios/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;
    const updateData = {
      title,
      description,
      technologies: JSON.parse(technologies || '[]'),
      link,
      updatedAt: new Date()
    };

    if (req.file) {
      updateData.imageUrl = `/upload/${req.file.filename}`;
    }

    await portfoliosDb.update({ _id: req.params.id }, { $set: updateData });
    const portfolio = await portfoliosDb.findOne({ _id: req.params.id });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 刪除作品
app.delete('/api/portfolios/:id', async (req, res) => {
  try {
    await portfoliosDb.remove({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 路由 - 訊息

// 獲取所有訊息
app.get('/api/messages',   async (req, res) => {
  try {
    const messages = await messagesDb.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 新增訊息
app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newMessage = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      createdAt: new Date(),
      read: false
    };

    const result = await messagesDb.insert(newMessage);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 標記訊息為已讀
app.put('/api/messages/:id', async (req, res) => {
  try {
    await messagesDb.update({ _id: req.params.id }, { $set: { read: true } });
    const msg = await messagesDb.findOne({ _id: req.params.id });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 刪除訊息
app.delete('/api/messages/:id', async (req, res) => {
  try {
    await messagesDb.remove({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EJS 訊息列表頁
app.get('/messages', async (req, res) => {
  try {
    const messages = await messagesDb.find({}).sort({ createdAt: -1 });
    res.render('messages', { messages });
  } catch (error) {
    res.status(500).send('伺服器錯誤: ' + error.message);
  }
});

// 標記訊息為已讀（EJS表單）
app.post('/messages/:id/read', async (req, res) => {
  try {
    await messagesDb.update({ _id: req.params.id }, { $set: { read: true } });
    res.redirect('/messages');
  } catch (error) {
    res.status(500).send('伺服器錯誤: ' + error.message);
  }
});

// 刪除訊息（EJS表單）
app.post('/messages/:id/delete', async (req, res) => {
  try {
    await messagesDb.remove({ _id: req.params.id });
    res.redirect('/messages');
  } catch (error) {
    res.status(500).send('伺服器錯誤: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Server.listen(80);
