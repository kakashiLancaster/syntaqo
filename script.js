document.addEventListener('DOMContentLoaded', () => {

    
    // 2. تفعيل القائمة المتجاوبة (Responsive Navbar)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. تفعيل حالة "active" للروابط عند التمرير
    const sections = document.querySelectorAll('section'); // ستشمل الآن #rules
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) { 
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('data-section') === current) {
                a.classList.add('active');
            }
        });
    });
// ...
    // إغلاق قائمة الموبايل عند النقر على رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    // --------------------------------------------------
    // 1. وظيفة زر العودة للأعلى (Scroll to Top Button) ... (محتوى سابق) ...
    // 2. تأثير الظهور التدريجي للعناصر عند التمرير (Reveal Effect) ... (محتوى سابق) ...

    
    // --------------------------------------------------
    // 3. وظيفة بطاقات الهولوغرافية (Tilt Effect)
    // --------------------------------------------------
    const holoCards = document.querySelectorAll('.holo-card-wrapper');

    holoCards.forEach(wrap => {
        const card = wrap.querySelector('.holo-card');
        
        // تعيين لون الوهج الأولي من الـ data-attribute
        const glowColor = wrap.dataset.color || 'var(--primary-color)';
        wrap.style.setProperty('--card-glow-color', glowColor);

        // متغيرات لتخزين موقع الماوس
        let mouseX = 0;
        let mouseY = 0;
        let rafId = null; // ID لحلقة requestAnimationFrame

        // دالة التحديث في حلقة الرسوم المتحركة
        function updateTransform() {
            // حساب النسبة المئوية لموقع الماوس (0-100)
            const percentX = (mouseX / card.offsetWidth) * 100;
            const percentY = (mouseY / card.offsetHeight) * 100;

            // حساب الإمالة (Rotate) - يتم عكس الإمالة للحصول على تأثير 3D
            const rotateX = ((50 - percentY) / 10).toFixed(2); // ميل بسيط على محور X
            const rotateY = ((percentX - 50) / 8).toFixed(2); // ميل بسيط على محور Y

            // تحديث متغيرات CSS
            wrap.style.setProperty('--pointer-x', `${percentX}%`);
            wrap.style.setProperty('--pointer-y', `${percentY}%`);
            wrap.style.setProperty('--rotate-x', `${rotateX}deg`);
            wrap.style.setProperty('--rotate-y', `${rotateY}deg`);

            // استدعاء التحديث التالي
            rafId = requestAnimationFrame(updateTransform);
        }

        // معالجة حركة الماوس
        wrap.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            // موقع الماوس النسبي داخل البطاقة
            mouseX = e.clientX - rect.left; 
            mouseY = e.clientY - rect.top;

            // تفعيل حالة التمرير (لتحريك الـ ::before ونقطة الـ Shine)
            if (!wrap.classList.contains('active')) {
                wrap.classList.add('active');
            }
        });

        // معالجة الدخول إلى البطاقة
        wrap.addEventListener('pointerenter', () => {
             // عند الدخول، نتأكد من بدء حلقة الانيميشن
             if (!rafId) {
                updateTransform();
            }
        });

        // معالجة الخروج من البطاقة
        wrap.addEventListener('pointerleave', () => {
            // إيقاف حلقة الانيميشن
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }

            // إعادة الإمالة والـ pointer إلى المنتصف بسلاسة عبر CSS Transition
            wrap.style.setProperty('--rotate-x', '0deg');
            wrap.style.setProperty('--rotate-y', '0deg');
            wrap.style.setProperty('--pointer-x', '50%');
            wrap.style.setProperty('--pointer-y', '50%');
            
            // إلغاء حالة التمرير
            wrap.classList.remove('active');
        });

        // ابدأ حلقة الرسوم المتحركة الأولية
        updateTransform();

    });
    // --------------------------------------------------
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (الكود السابق لتأثير الإمالة والأشياء الأخرى) ...

    // --------------------------------------------------
    // 4. وظيفة تبديل تصنيفات المتجر (Store Tabs)
    // --------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-button');
    const productsGrids = document.querySelectorAll('.products-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;

            // إزالة حالة التفعيل من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إخفاء جميع محتويات الشبكة
            productsGrids.forEach(grid => grid.classList.add('hidden'));

            // تفعيل الزر الذي تم الضغط عليه
            this.classList.add('active');
            
            // إظهار المحتوى المستهدف
            const targetGrid = document.getElementById(targetId);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }
        });
    });

    // --------------------------------------------------
});
// --------------------------------------------------
// 5. وظائف قسم البطاقات المتوهجة (BounceCards) - *تم التصحيح النهائي*
// --------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.server-images-section .card');
    if (cards.length === 0) return; // إنهاء الوظيفة إذا لم يتم العثور على البطاقات

    const enableHover = true; 
    
    const transformStyles = [
        "rotate(5deg) translate(-150px)",
        "rotate(0deg) translate(-70px)",
        "rotate(-5deg)",
        "rotate(5deg) translate(70px)",
        "rotate(-5deg) translate(150px)"
    ];
    
    const animationDelay = 1;
    const animationStagger = 0.08;
    const easeType = "elastic.out(1, 0.5)";

    // --------------------------------------------------
    // 5.1. تطبيق المستمعات وتشغيل الحركة الأولية
    // --------------------------------------------------

    cards.forEach((card, idx) => {
        // 🔴 تم حذف: card.style.transform = baseTransform;
        // القيمة الأولية تم وضعها مباشرةً في HTML (style="transform: ...")

        // إعداد المستمعات للأحداث (مفعلة الآن)
        if (enableHover) {
            card.addEventListener('mouseenter', () => pushSiblings(idx));
            card.addEventListener('mouseleave', resetSiblings);
        }
    });

    // تشغيل الحركة الأولية (الانطلاق) باستخدام GSAP
    gsap.fromTo(
        cards, // استخدم متغيراً حقيقياً بدلاً من Selector String
        { scale: 0 }, 
        {
            scale: 1, 
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay
        }
    );

    // --------------------------------------------------
    // 5.2. وظائف حركة التمرير (Hover Logic)
    // --------------------------------------------------
    
    // (وظائف getNoRotationTransform و getPushedTransform تبقى كما هي)

    const getNoRotationTransform = (transformStr) => {
        const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
        if (hasRotate) {
            return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
        } else if (transformStr === 'none') {
            return 'rotate(0deg)';
        } else {
            return `${transformStr} rotate(0deg)`;
        }
    };

    const getPushedTransform = (baseTransform, offsetX) => {
        const translateRegex = /translate\(([-0-9.]+)px\)/;
        const match = baseTransform.match(translateRegex);
        if (match) {
            const currentX = parseFloat(match[1]);
            const newX = currentX + offsetX;
            return baseTransform.replace(translateRegex, `translate(${newX}px)`);
        } else {
            return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
        }
    };


    // دفع البطاقات المجاورة عند التمرير على بطاقة معينة
    const pushSiblings = (hoveredIdx) => {
        if (!enableHover) return;

        cards.forEach((card, i) => {
            gsap.killTweensOf(card); 

            const baseTransform = transformStyles[i] || 'none';

            if (i === hoveredIdx) {
                const noRotationTransform = getNoRotationTransform(baseTransform);
                gsap.to(card, {
                    transform: noRotationTransform,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    zIndex: 100, // وضع البطاقة الممرر عليها في المقدمة
                    overwrite: 'auto'
                });
            } else {
                const offsetX = i < hoveredIdx ? -160 : 160;
                const pushedTransform = getPushedTransform(baseTransform, offsetX);

                const distance = Math.abs(hoveredIdx - i);
                const delay = distance * 0.05;

                gsap.to(card, {
                    transform: pushedTransform,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    delay,
                    zIndex: 10, // ضمان بقاء البطاقات الجانبية في الخلف
                    overwrite: 'auto'
                });
            }
        });
    };

    // إعادة ضبط البطاقات إلى حالتها الافتراضية عند مغادرة الماوس
    const resetSiblings = () => {
        if (!enableHover) return;

        cards.forEach((card, i) => {
            gsap.killTweensOf(card);
            const baseTransform = transformStyles[i] || 'none';
            gsap.to(card, {
                transform: baseTransform,
                duration: 0.4,
                ease: 'back.out(1.4)',
                zIndex: i, // ترتيب Z-index بالاعتماد على فهرسها
                overwrite: 'auto'
            });
        });
    };
});
// ... (الكود الحالي لـ script.js) ...

// ====== بداية كود مكون المجلد Folder Component (Vanilla JS) - *مُعدّل لـ 6 أوراق وحجم أكبر* ======

const maxItems = 6; // تم التعديل من 3 إلى 6 أوراق

// ... (دالة darkenColor تبقى كما هي) ...
const darkenColor = (hex, percent) => {
    // ... (الكود الكامل لدالة darkenColor كما أرسلته سابقاً) ...
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const paperOffsetsMap = new Map();

// 2. تهيئة المجلدات عند تحميل الصفحة
const folderWrappers = document.querySelectorAll('.folder-wrapper');

folderWrappers.forEach(wrapper => {
    const folderElement = wrapper.querySelector('.folder');
    // إذا كنت تريد الحجم ضعف السابق (الذي كان 2)، فاجعل data-size="4" في الـ HTML
    const color = wrapper.getAttribute('data-color') || '#5227FF';
    const size = parseFloat(wrapper.getAttribute('data-size')) || 1; // الآن سيستخدم 4 إذا تم تعيينها

    // تطبيق خاصية scale
    wrapper.style.transform = `scale(${size})`;

    // ... (حساب الألوان يبقى كما هو) ...
    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = darkenColor('#ffffff', 0.1);
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = '#ffffff';

    folderElement.style.setProperty('--folder-color', color);
    folderElement.style.setProperty('--folder-back-color', folderBackColor);
    folderElement.style.setProperty('--paper-1', paper1);
    folderElement.style.setProperty('--paper-2', paper2);
    folderElement.style.setProperty('--paper-3', paper3);
    
    // ⚠️ تهيئة الإزاحات (Offsets) لـ 6 أوراق
    paperOffsetsMap.set(folderElement, Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));


    // 3. إضافة مستمعي الأحداث
    folderElement.addEventListener('click', () => handleClick(folderElement));
    
    // مستمعي أحداث الماوس للأوراق
    wrapper.querySelectorAll('.paper').forEach(paper => {
        paper.addEventListener('mousemove', (e) => handlePaperMouseMove(e, folderElement));
        paper.addEventListener('mouseleave', (e) => handlePaperMouseLeave(e, folderElement));
    });
});

// 4. دالة فتح/إغلاق المجلد (تم تحديث عدد الأوراق)
const handleClick = (folderElement) => {
    const isOpen = folderElement.getAttribute('data-is-open') === 'true';
    
    if (isOpen) {
        // الإغلاق
        folderElement.setAttribute('data-is-open', 'false');
        folderElement.classList.remove('open');
        // إعادة تعيين إزاحات المغناطيس لـ 6 أوراق
        paperOffsetsMap.set(folderElement, Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
        folderElement.querySelectorAll('.paper').forEach(paper => {
             paper.style.setProperty('--magnet-x', `0px`);
             paper.style.setProperty('--magnet-y', `0px`);
        });
        
    } else {
        // الفتح
        folderElement.setAttribute('data-is-open', 'true');
        folderElement.classList.add('open');
    }
};

// 5. دالة تحريك الماوس على الأوراق (تأثير المغناطيس) (تبقى كما هي)
const handlePaperMouseMove = (e, folderElement) => {
    const isOpen = folderElement.getAttribute('data-is-open') === 'true';
    if (!isOpen) return;

    const paper = e.currentTarget;
    const index = parseInt(paper.getAttribute('data-index'), 10);
    const rect = paper.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;

    paper.style.setProperty('--magnet-x', `${offsetX}px`);
    paper.style.setProperty('--magnet-y', `${offsetY}px`);
};

// 6. دالة مغادرة الماوس (إعادة ضبط الإزاحة) (تبقى كما هي)
const handlePaperMouseLeave = (e, folderElement) => {
    e.currentTarget.style.setProperty('--magnet-x', `0px`);
    e.currentTarget.style.setProperty('--magnet-y', `0px`);
};

// ====== نهاية كود مكون المجلد Folder Component (Vanilla JS) - *مُعدّل لـ 6 أوراق وحجم أكبر* ======