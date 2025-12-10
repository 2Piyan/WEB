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
        title: '個人網站',
        description: '使用 Vue 和 Bootstrap 構建的個人作品集網站。這是一個完整的響應式設計，支持暗黑模式和多語言切換，展示了現代前端開發技術。',
        technologies: ['Vue 3', 'Bootstrap 5', 'JavaScript'],
        link: 'https://example.com',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e6f5b3bb?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '待辦事項應用',
        description: '一個具有本地存儲功能的待辦事項管理應用。支持添加、編輯、刪除任務，並可根據優先級和截止日期進行排序，界面簡潔易用。',
        technologies: ['Vue', 'localStorage', 'CSS3'],
        link: 'https://example.com/todo',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '天氣應用',
        description: '實時天氣查詢應用，集成了 OpenWeatherMap API。可以查詢全球各地的天氣，支持自動定位和天氣預報功能。',
        technologies: ['React', 'Axios', 'OpenWeatherMap API'],
        link: 'https://example.com/weather',
        imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd965?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '電子商務平台',
        description: '功能完整的電子商務平台，包含商品展示、購物車、訂單管理和支付集成。使用了 Stripe 進行安全的支付處理。',
        technologies: ['Vue', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://example.com/shop',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '社交媒體儀表板',
        description: '社交媒體統計分析儀表板。集成多個社交平台的 API，實時顯示粉絲數、互動率和發文統計，提供數據可視化圖表。',
        technologies: ['React', 'Chart.js', 'Instagram API', 'Twitter API'],
        link: 'https://example.com/dashboard',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '專案管理工具',
        description: '團隊協作的專案管理工具。支持看板視圖、甘特圖、任務分配、時間追蹤和實時協作編輯功能，提升團隊效率。',
        technologies: ['Vue 3', 'WebSocket', 'PostgreSQL', 'Express'],
        link: 'https://example.com/pm',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // 檢查是否已有數據
    const count = await portfoliosDb.count({});
    if (count === 0) {
      await portfoliosDb.insert(samplePortfolios);
      console.log('✓ 已添加示例作品');
    } else {
      console.log('✓ 作品集已有數據，跳過初始化');
    }

    // 添加示例訊息
    const sampleMessages = [
      {
        name: '李四',
        email: 'lisi@example.com',
        subject: '很棒的作品！',
        message: '我非常喜歡你的設計風格，有興趣合作嗎？',
        createdAt: new Date(),
        read: true
      }
    ];

    const msgCount = await messagesDb.count({});
    if (msgCount === 0) {
      await messagesDb.insert(sampleMessages);
      console.log('✓ 已添加示例訊息');
    } else {
      console.log('✓ 訊息已有數據，跳過初始化');
    }

    console.log('\n✓ 數據初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('初始化錯誤:', error);
    process.exit(1);
  }
}

// 運行初始化
initializeData();
