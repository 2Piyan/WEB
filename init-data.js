// 這是一個選擇性的初始化腳本
// 如果你想要一些示例數據，可以運行這個腳本

const Database = require('nedb-promises');
const path = require('path');
const fs = require('fs');

async function initializeData() {
  try {
    // 創建資料目錄
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 初始化資料庫
    const portfoliosDb = new Database({
      filename: path.join(dataDir, 'portfolios.db'),
      autoload: true
    });

    const messagesDb = new Database({
      filename: path.join(dataDir, 'messages.db'),
      autoload: true
    });

    // 添加示例作品
    const samplePortfolios = [
      {
        title: '大二遊戲宣傳',
        description: '又是無情報肝。',
        technologies: ['procreat', 'ae'],
        link: 'https://example.com/todo',
        imageUrl: '/img/Food.jpg',
        videoUrl: '/video/1min.mp4',
        category: '動畫',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '大頭插畫',
        description: '精緻的大頭插畫創作，展現人物的表情和特點。',
        technologies: ['Vue 3', 'Bootstrap 5', 'JavaScript'],
        link: 'https://example.com',
        imageUrl: '/img/head.jpg',
        videoUrl: null,
        category: '插畫',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // 清空原有資料再插入
    await portfoliosDb.remove({}, { multi: true });
    await portfoliosDb.insert(samplePortfolios);

    // 添加示例訊息
    const sampleMessages = [
      {
        name: '訪客A',
        email: 'visitorA@example.com',
        phone: '',
        subject: '你好',
        message: '這是測試訊息',
        createdAt: new Date(),
        read: false
      }
    ];
    await messagesDb.remove({}, { multi: true });
    await messagesDb.insert(sampleMessages);
    console.log('✓ 已添加 PIYAN 風格範例作品與訊息');

    console.log('\n✓ 數據初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('初始化錯誤:', error);
    process.exit(1);
  }
}

// 運行初始化
initializeData();
