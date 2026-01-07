const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            currentPage: 'home',
            portfolios: [],
            contactForm: {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            },
            showLightbox: false,
            lightboxImage: null,
            lightboxVideo: null,
            lightboxIndex: 0,
            allPortfolios: []
        };
    },
    computed: {
        categories() {
            // 從作品中提取分類
            const list = this.portfolios.map(portfolio => portfolio.category);
            // 過濾掉空的分類
            const filteredList = list.filter(category => category);
            // 使用 Set 去除重複，再轉回陣列
            return [...new Set(filteredList)];
        }
    },
    mounted() {
        this.animateOnMount();
        // 設置首頁視差效果
        setTimeout(() => {
            if (this.currentPage === 'home') {
                this.setupHeroParallax();
            }
        }, 500);
    },
    watch: {
        currentPage(newPage) {
            this.$nextTick(() => {
                this.animatePageTransition();
                
                // 如果切換到首頁，設置視差效果
                if (newPage === 'home') {
                    setTimeout(() => {
                        this.setupHeroParallax();
                        if (typeof ScrollTrigger !== 'undefined') {
                            ScrollTrigger.refresh();
                        }
                    }, 100);
                } else if (newPage === 'portfolio') {
                    // 如果切換到作品集，觸發卡片動畫
                    setTimeout(() => {
                        this.animatePortfolioCards();
                    }, 100);
                } else {
                    // 清除 ScrollTrigger
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    }
                }
            });
        }
    },
    methods: {
        // 動畫方法 (委託給 AppAnimations)
        animateOnMount() {
            if (typeof AppAnimations !== 'undefined') AppAnimations.animateOnMount();
        },
        setupHeroParallax() {
            if (typeof AppAnimations !== 'undefined') AppAnimations.setupHeroParallax();
        },
        animatePageTransition() {
            if (typeof AppAnimations !== 'undefined') AppAnimations.animatePageTransition();
        },
        animatePortfolioCards() {
            if (typeof AppAnimations !== 'undefined') AppAnimations.animatePortfolioCards();
        },
        animateCards() {
            if (typeof AppAnimations !== 'undefined') AppAnimations.animateCards();
        },
        // 訊息方法
        async sendMessage() {
            try {
                await axios.post('/api/messages', {
                    name: this.contactForm.name,
                    email: this.contactForm.email,
                    phone: this.contactForm.phone,
                    subject: this.contactForm.subject,
                    message: this.contactForm.message
                });

                // 重置表單
                this.contactForm = {
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                };

                alert('訊息已發送!');
            } catch (error) {
                console.error('發送訊息出錯:', error);
                alert('發送失敗，請稍後重試');
            }
        },
        openLightbox(clickedPortfolio) {
            // 1. 決定要在光箱中顯示哪些作品列表
            // 如果在作品集頁面，只顯示「同分類」的作品；否則顯示全部
            let lightboxList = this.portfolios;
            
            // 判斷是否需要過濾分類
            const isPortfolioPage = this.currentPage === 'portfolio';
            const hasCategory = clickedPortfolio && clickedPortfolio.category;
            
            if (isPortfolioPage && hasCategory) {
                // 過濾出同分類的作品
                lightboxList = this.portfolios.filter(item => item.category === clickedPortfolio.category);
            }

            // 複製一份列表供光箱切換使用
            this.allPortfolios = lightboxList.slice();

            // 2. 找出被點擊的作品在列表中的位置 (索引)
            this.lightboxIndex = this.allPortfolios.findIndex(item => item._id === clickedPortfolio._id);
            
            // 防呆機制：如果找不到，就預設第一張
            if (this.lightboxIndex === -1) {
                this.lightboxIndex = 0;
            }

            // 3. 更新畫面並顯示光箱
            this.updateLightboxContent();
            this.showLightbox = true;
            document.body.style.overflow = 'hidden'; // 禁止背景滾動
        },

        closeLightbox() {
            this.showLightbox = false;
            document.body.style.overflow = 'auto'; // 恢復背景滾動
            
            // 關閉時，嘗試暫停影片
            const videoElement = document.querySelector('.lightbox-video');
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        },

        nextLightbox() {
            if (this.allPortfolios.length === 0) return;

            // 計算下一張的索引 (使用 % 餘數運算來實現循環播放)
            // 例如：目前是 4，總數 5 -> (4 + 1) % 5 = 0 (回到第一張)
            this.lightboxIndex = (this.lightboxIndex + 1) % this.allPortfolios.length;
            
            this.updateLightboxContent();
        },

        prevLightbox() {
            if (this.allPortfolios.length === 0) return;

            // 計算上一張 (加上長度是為了避免負數，例如 -1 變成 4)
            this.lightboxIndex = (this.lightboxIndex - 1 + this.allPortfolios.length) % this.allPortfolios.length;
            
            this.updateLightboxContent();
        },

        // [新增 helper] 統一處理更新光箱內容的邏輯 (圖片、影片、自動播放)
        updateLightboxContent() {
            const currentItem = this.allPortfolios[this.lightboxIndex];
            
            // 更新圖片與影片連結
            this.lightboxImage = currentItem.imageUrl;
            this.lightboxVideo = currentItem.videoUrl;

            // 等待畫面 DOM 更新後，如果是影片則自動播放
            this.$nextTick(() => {
                const videoElement = document.querySelector('.lightbox-video');
                if (videoElement) {
                    videoElement.currentTime = 0;
                    // 忽略自動播放可能被瀏覽器阻擋的錯誤
                    videoElement.play().catch(() => {});
                }
            });
        },
    }
});
         
const vm = app.mount('#app');

$.ajax({
    url: '/api/portfolios',
    method: 'GET',
    dataType: 'json',
    success: function(results) {
        vm.portfolios = results;
        vm.$nextTick(() => {
            vm.animateCards();
        });
    }
});
