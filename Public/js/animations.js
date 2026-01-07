const AppAnimations = {
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
    animateCards() {
        gsap.from('.portfolio-card', {
            duration: 0.6,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
};