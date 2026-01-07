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
            },
            showLightbox: false,
            lightboxImage: null,
            lightboxVideo: null,
            lightboxIndex: 0,
            allPortfolios: []
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

        // 加入鍵盤事件監聽（用於 lightbox 左右、Esc）
        window.addEventListener('keydown', this.handleKeydown);
    },
    unmounted() {
        window.removeEventListener('keydown', this.handleKeydown);
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
                    title: '大二遊戲宣傳',
                    description: '又是無情報肝。',
                    technologies: ['procreat', 'ae'],
                    link: 'https://example.com/todo',
                    imageUrl: null,
                    videoUrl: '/video/1min.mp4',
                    category: '動畫'
                },
                {
                    title: '自我介紹',
                    description: '海獅。',
                    technologies: ['procreat', 'ae'],
                    link: 'https://example.com/weather',
                    imageUrl: null,
                    videoUrl: '/video/1411222018.mp4',
                    category: '動畫'
                },
                {
                    title: '大二動畫',
                    description: '老鼠的不歸路。',
                    technologies: ['procreat', 'ae'],
                    link: 'https://example.com/weather',
                    imageUrl: null,
                    videoUrl: '/video/s1411222018_myanimation.mp4',
                    category: '動畫'
                },
                {
                    title: '大頭插畫',
                    description: '精緻的大頭插畫創作，展現人物的表情和特點。',
                    technologies: ['Vue 3', 'Bootstrap 5', 'JavaScript'],
                    link: 'https://example.com',
                    imageUrl: '/img/head.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '全身插畫',
                    description: '完整的全身人物插畫作品。',
                    technologies: ['Procreate', 'Digital Painting'],
                    link: 'https://example.com',
                    imageUrl: '/img/hello.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '人物立繪',
                    description: '人物稚態立繪插畫作品。',
                    technologies: ['Procreate', 'Character Design'],
                    link: 'https://example.com',
                    imageUrl: '/img/oc.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '半身插畫',
                    description: '半身人物插畫作品。',
                    technologies: ['Procreate', 'Illustration'],
                    link: 'https://example.com',
                    imageUrl: '/img/hua.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
                {
                    title: '作業',
                    description: '半身人物插畫作品。',
                    technologies: ['Procreate', 'Illustration'],
                    link: 'https://example.com/shop',
                    imageUrl: '/img/work.jpg',
                    videoUrl: null,
                    category: '插畫'
                },
            ];

            // 確保示例資料有唯一 _id
            this.ensurePortfolioIds(sampleData);

            // 檢查是否已有作品，如果沒有則添加示例
            if (this.portfolios.length === 0) {
                setTimeout(() => {
                    this.portfolios = sampleData;
                    this.updateAllPortfolios();
                    this.$nextTick(() => {
                        this.animateCards();
                    });
                }, 500);
            }
        },
        // 產生簡單唯一 id
        generateId() {
            return 'id_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);
        },

        // 確保作品陣列中的每個項目都有 _id
        ensurePortfolioIds(arr) {
            if (!Array.isArray(arr)) return;
            arr.forEach(p => {
                if (!p._id) p._id = this.generateId();
            });
        },
        async loadPortfolios() {
            try {
                const response = await axios.get('/api/portfolios');
                // 若後端回傳沒有 _id（例如測試資料），補上唯一 id
                this.ensurePortfolioIds(response.data);
                this.portfolios = response.data;
                this.updateAllPortfolios();
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
        },
        updateAllPortfolios() {
            // 合併所有作品用於光箱導航
            // 保留原本的順序
            this.ensurePortfolioIds(this.portfolios);
            this.allPortfolios = this.portfolios.slice();
        },
        openLightbox(portfolio) {
            // 當在作品集頁面時，僅以同分類的作品作為光箱導航來源，順序與頁面相同
            let source = this.portfolios;
            if (this.currentPage === 'portfolio' && portfolio && portfolio.category) {
                source = this.portfolios.filter(p => p.category === portfolio.category);
            }

            // 確保 id
            this.ensurePortfolioIds(source);
            this.allPortfolios = source.slice();

            // 找到當前索引
            this.lightboxIndex = this.allPortfolios.findIndex(p => p._id === portfolio._id);
            if (this.lightboxIndex === -1) {
                // fallback: 比對 title/link
                this.lightboxIndex = this.allPortfolios.findIndex(p => p === portfolio || (p.title === portfolio.title && p.link === portfolio.link));
            }
            if (this.lightboxIndex < 0) this.lightboxIndex = 0;

            const current = this.allPortfolios[this.lightboxIndex];
            this.lightboxImage = current.imageUrl;
            this.lightboxVideo = current.videoUrl;
            this.showLightbox = true;
            document.body.style.overflow = 'hidden';
        },
        closeLightbox() {
            this.showLightbox = false;
            document.body.style.overflow = 'auto';
            // 若有影片，停止播放
            const v = document.querySelector('.lightbox-video');
            if (v) {
                try { v.pause(); v.currentTime = 0; } catch (e) { /* ignore */ }
            }
        },
        nextLightbox() {
            if (!this.allPortfolios.length) return;
            this.lightboxIndex = (this.lightboxIndex + 1) % this.allPortfolios.length;
            const portfolio = this.allPortfolios[this.lightboxIndex];
            this.lightboxImage = portfolio.imageUrl;
            this.lightboxVideo = portfolio.videoUrl;
            // 如果是影片，讓它從頭播放
            this.$nextTick(() => {
                const v = document.querySelector('.lightbox-video');
                if (v) { try { v.currentTime = 0; v.play(); } catch(e){} }
            });
        },
        prevLightbox() {
            if (!this.allPortfolios.length) return;
            this.lightboxIndex = (this.lightboxIndex - 1 + this.allPortfolios.length) % this.allPortfolios.length;
            const portfolio = this.allPortfolios[this.lightboxIndex];
            this.lightboxImage = portfolio.imageUrl;
            this.lightboxVideo = portfolio.videoUrl;
            this.$nextTick(() => {
                const v = document.querySelector('.lightbox-video');
                if (v) { try { v.currentTime = 0; v.play(); } catch(e){} }
            });
        },
        // 鍵盤操作：左右切換、Esc 關閉
        handleKeydown(e) {
            if (!this.showLightbox) return;
            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowRight') {
                this.nextLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.prevLightbox();
            }
        }
    }
});

app.mount('#app');
