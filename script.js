document.addEventListener('DOMContentLoaded', function() {
    // スクロールトップボタンの追加
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // ナビゲーションのスムーススクロール
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // スクロール時のセクションハイライト処理
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('nav-active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('nav-active');
            }
        });

        // スキルプログレスバーのアニメーション
        const skillSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (isInViewport(skillSection)) {
            skillBars.forEach(bar => {
                bar.classList.add('animate');
            });
        }

        // スクロールトップボタンの表示・非表示
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // スクロールトップボタンのクリックイベント
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // コンタクトフォームの送信処理
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 簡単なバリデーション
            if (!name || !email || !message) {
                alert('すべてのフィールドを入力してください。');
                return;
            }
            
            // ここでフォームデータを送信する処理を追加
            // 実際のAPIエンドポイントに送信する代わりに、現在は成功メッセージを表示するだけ
            
            alert('お問い合わせが送信されました。ありがとうございます！');
            contactForm.reset();
        });
    }

    // 要素が画面内に表示されているかチェックする関数
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});

// プログレスバーの初期設定
const progressBars = document.querySelectorAll('.progress-bar');
progressBars.forEach(bar => {
    // 各プログレスバーのwidthをスキルレベルに応じて設定
    const styleWidth = bar.style.width;
    bar.style.width = '0';
    
    // アニメーション用のクラス付与のため、元のwidthを保存
    bar.setAttribute('data-width', styleWidth);
});

// ページが読み込まれた後に実行
window.onload = function() {
    // プログレスバーが見えるようになったらアニメーション
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            if (isInViewport(progress)) {
                progress.classList.add('animate');
                const bar = progress.querySelector('.progress-bar');
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }, 500);
    
    // 要素が画面内に表示されているかチェックする関数
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
};
