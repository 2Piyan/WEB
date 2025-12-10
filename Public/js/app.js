const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            currentPage: 'home',
            portfolios: [],
            messages: [],
            contactForm: {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            }
        };
    },
    mounted() {
        this.loadPortfolios();
        this.loadMessages();
        this.animateOnMount();
        // 如果沒有作品，添加示例作品
        this.initializeSamplePortfolios();
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
        // 動畫方法
        animateOnMount() {
            gsap.from('nav', { duration: 0.6, y: -100, opacity: 0, ease: 'power2.out' });
            gsap.from('footer', { duration: 0.6, y: 100, opacity: 0, ease: 'power2.out' });
        },
        setupHeroParallax() {
            // 確保元素存在再設置動畫
            const heroSection = document.querySelector('.hero');
            if (!heroSection) return;
            
            try {
                if (!gsap.plugins.ScrollTrigger) {
                    return;
                }

                // 清除之前的 ScrollTrigger
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                
                // 簡化的視差效果
                gsap.to('.parallax-bg', {
                    y: -100,
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.5,
                        markers: false
                    },
                    ease: 'none'
                });

                // 標題視差效果
                gsap.to('.hero-title', {
                    y: 150,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'center center',
                        scrub: 0.5,
                        markers: false
                    }
                });

                // 副標題視差效果
                gsap.to('.hero-subtitle', {
                    y: 100,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top center',
                        end: 'center center',
                        scrub: 0.5,
                        markers: false
                    }
                });

                // 按鈕視差效果
                gsap.to('.hero-buttons', {
                    y: 80,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top center',
                        end: 'center center',
                        scrub: 0.5,
                        markers: false
                    }
                });

                // 滾動提示動畫
                gsap.to('.scroll-indicator', {
                    opacity: 0,
                    pointerEvents: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.5,
                        markers: false
                    }
                });
            } catch (error) {
                console.warn('視差動畫初始化失敗:', error);
            }
        },
        animatePageTransition() {
            const section = document.querySelector('main > section');
            if (section) {
                gsap.fromTo(section, 
                    { opacity: 0, y: 20 },
                    { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }
                );
            }
        },
        animatePortfolioCards() {
            const cards = document.querySelectorAll('.portfolio-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );
        },
        // 作品集方法
        initializeSamplePortfolios() {
            const sampleData = [
                {
                    title: '待辦事項應用',
                    description: '一個具有本地存儲功能的待辦事項管理應用。支持添加、編輯、刪除任務，並可根據優先級和截止日期進行排序，界面簡潔易用。',
                    technologies: ['Vue', 'localStorage', 'CSS3'],
                    link: 'https://example.com/todo',
                    imageUrl: null,
                    videoUrl: '/video/1min.mp4',
                    category: '動畫'
                },
                {
                    title: '天氣應用',
                    description: '實時天氣查詢應用，集成了 OpenWeatherMap API。可以查詢全球各地的天氣，支持自動定位和天氣預報功能。',
                    technologies: ['React', 'Axios', 'OpenWeatherMap API'],
                    link: 'https://example.com/weather',
                    imageUrl: null,
                    videoUrl: '/video/1411222018.mp4',
                    category: '動畫'
                },
                {
                    title: '社交媒體儀表板',
                    description: '社交媒體統計分析儀表板。集成多個社交平台的 API，實時顯示粉絲數、互動率和發文統計，提供數據可視化圖表。',
                    technologies: ['React', 'Chart.js', 'Instagram API', 'Twitter API'],
                    link: 'https://example.com/dashboard',
                    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
                    videoUrl: null,
                    category: '動畫'
                },
                {
                    title: '個人網站',
                    description: '使用 Vue 和 Bootstrap 構建的個人作品集網站。這是一個完整的響應式設計，支持暗黑模式和多語言切換，展示了現代前端開發技術。',
                    technologies: ['Vue 3', 'Bootstrap 5', 'JavaScript'],
                    link: 'https://example.com',
                    imageUrl: '/img/head.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '應用界面設計',
                    description: '精美的應用界面設計作品，展示了現代UI設計的最佳實踐和創意視覺效果。',
                    technologies: ['UI Design', 'Figma', 'Sketch'],
                    link: 'https://example.com',
                    imageUrl: '/img/hello.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '視覺設計作品',
                    description: '創意十足的視覺設計作品，融合了色彩理論和用戶體驗設計原則。',
                    technologies: ['Design', 'Adobe XD', 'Illustrator'],
                    link: 'https://example.com',
                    imageUrl: '/img/oc.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '電子商務平台',
                    description: '功能完整的電子商務平台，包含商品展示、購物車、訂單管理和支付集成。使用了 Stripe 進行安全的支付處理。',
                    technologies: ['Vue', 'Node.js', 'MongoDB', 'Stripe'],
                    link: 'https://example.com/shop',
                    imageUrl: '/img/hua.jpg',
                    videoUrl: null,
                    category: '插畫'
                }
            ];

            // 檢查是否已有作品，如果沒有則添加示例
            if (this.portfolios.length === 0) {
                setTimeout(() => {
                    this.portfolios = sampleData;
                    this.$nextTick(() => {
                        this.animateCards();
                    });
                }, 500);
            }
        },
        async loadPortfolios() {
            try {
                const response = await axios.get('/api/portfolios');
                this.portfolios = response.data;
                this.$nextTick(() => {
                    this.animateCards();
                });
            } catch (error) {
                console.error('載入作品集出錯:', error);
            }
        },
        animateCards() {
            gsap.from('.portfolio-card', {
                duration: 0.6,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        },
        // 訊息方法
        async loadMessages() {
            try {
                const response = await axios.get('/api/messages');
                this.messages = response.data;
            } catch (error) {
                console.error('載入訊息出錯:', error);
            }
        },
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

                // 重新載入訊息
                await this.loadMessages();
                alert('訊息已發送!');
            } catch (error) {
                console.error('發送訊息出錯:', error);
                alert('發送失敗，請稍後重試');
            }
        },
        async markAsRead(id) {
            try {
                await axios.put(`/api/messages/${id}`);
                await this.loadMessages();
            } catch (error) {
                console.error('標記訊息出錯:', error);
            }
        },
        async deleteMessage(id) {
            if (!confirm('確定要刪除此訊息嗎?')) return;
            try {
                await axios.delete(`/api/messages/${id}`);
                await this.loadMessages();
            } catch (error) {
                console.error('刪除訊息出錯:', error);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleString('zh-TW');
        }
    }
});

app.mount('#app');
