// Slider

// Header
document.addEventListener('DOMContentLoaded', () => {
    const headerNav = document.querySelector('.header-nav');
    const overlay = document.createElement('div');
    const profileNav = document.querySelector('.profile-logo nav');
    const sidebar = document.querySelector('#sidebar');
    const links = document.querySelectorAll(".side-content a");
    let lastScrollTop = 0;

    if (!headerNav || !profileNav || !sidebar) return;

    overlay.className = 'overlay-sldebar';
    document.querySelector('main').appendChild(overlay);

    const updateHeaderVisibility = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isSidebarVisible = document.body.classList.contains('show-sidebar');
        const isProfileNavVisible = document.body.classList.contains('show-profile-logo');

        if (scrollTop < 80) {
            headerNav.style.position = 'fixed';
            headerNav.classList.add('header-visible');
            headerNav.classList.remove('header-hidden');
        } else if (!isSidebarVisible && !isProfileNavVisible) {
            if (scrollTop > lastScrollTop) {
                headerNav.style.position = '';
                headerNav.classList.add('header-hidden');
                headerNav.classList.remove('header-visible');
            } else {
                headerNav.style.position = 'fixed';
                headerNav.classList.add('header-visible');
                headerNav.classList.remove('header-hidden');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    const showSidebar = () => {
        document.body.classList.add('show-sidebar');
        document.querySelector('.hamb-bars').classList.add('active');
        sidebar.classList.add('show');
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
    };

    const hideSidebar = () => {
        document.body.classList.remove('show-sidebar');
        document.querySelector('.hamb-bars').classList.remove('active');
        sidebar.classList.remove('show');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    };

    const showProfileNav = () => {
        document.body.classList.add('show-profile-logo');
        profileNav.style.display = 'block';
        requestAnimationFrame(() => {
            profileNav.classList.add('active');
        });
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
    };
    
    const hideProfileNav = () => {
        document.body.classList.remove('show-profile-logo');
        profileNav.classList.remove('active');
        setTimeout(() => {
            profileNav.style.display = 'none';
        }, 300);
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    };
    

    const toggleSidebar = () => {
        if (document.body.classList.contains('show-sidebar')) {
            hideSidebar();
        } else {
            hideProfileNav();
            showSidebar();
        }
    };

    const toggleProfileNav = () => {
        if (document.body.classList.contains('show-profile-logo')) {
            hideProfileNav();
        } else {
            hideSidebar();
            showProfileNav();
        }
    };

    const handleOverlayClick = () => {
        hideSidebar();
        hideProfileNav();
        updateHeaderVisibility();
    };

    window.addEventListener('scroll', updateHeaderVisibility);
    document.querySelector('.hamb-bars').addEventListener('click', toggleSidebar);
    document.querySelector('.profile-logo').addEventListener('click', toggleProfileNav);
    overlay.addEventListener('click', handleOverlayClick);

    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split("/").pop();
        links.forEach(link => {
            link.style.color = link.getAttribute("href") === currentPath ? "#fe9901" : "";
        });
    };

    highlightActiveLink();
});

//footer
document.addEventListener('DOMContentLoaded', () => {
    const langButton = document.getElementById('footer-lang');
    const languageMenu = document.getElementById('languageMenu');
    const footerElements = document.querySelectorAll('footer > *');

    if (langButton && languageMenu) {
        langButton.addEventListener('click', () => {
            languageMenu.classList.toggle('show');
        });
    }

    footerElements.forEach(element => {
        element.classList.add('show');
    });
});




//cookies


//animate-on-scroll
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('dieogames-videos-item')) {
                    entry.target.classList.add('dieogames-videos-visible');
                } else if (entry.target.classList.contains('dieogames-support-game-item') || entry.target.classList.contains('dieogames-support-accounts-item')) {
                    entry.target.classList.add('dieogames-support-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const videoItems = document.querySelectorAll('.dieogames-videos-item');
    videoItems.forEach(item => {
        observer.observe(item);
    });

    const supportItems = document.querySelectorAll('.dieogames-support-game-item, .dieogames-support-accounts-item');
    supportItems.forEach(item => {
        observer.observe(item);
    });
});

//support page
document.addEventListener("DOMContentLoaded", () => {
    const allAnswers = document.querySelectorAll('.dieogames-Support-answer-asdjw821u8duhqf');
    const questions = document.querySelectorAll('.dieogames-Support-question-asdjw821u8duhqd');
    const topButton = document.querySelector('.dieogames-Support-back-to-top');

    // Hide all answers by default
    allAnswers.forEach(answer => answer.classList.remove('show'));

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const arrowIcon = question.querySelector('.arrow-icon');

            // Close all other answers
            allAnswers.forEach(ans => {
                if (ans !== answer) {
                    ans.classList.remove('show');
                    const icon = ans.previousElementSibling.querySelector('.arrow-icon');
                    if (icon) icon.classList.remove('rotate');
                }
            });

            // Toggle the current answer
            answer.classList.toggle('show');
            if (arrowIcon) arrowIcon.classList.toggle('rotate');
        });
    });

    // Back to top button functionality
    if (topButton) {
        window.addEventListener('scroll', () => {
            topButton.style.display = window.scrollY > 300 ? "block" : "none";
        });

        topButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/*-game download-*/
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".oftamyam_gallery-item img");
    const oftamyam_modal = document.querySelector(".oftamyam_modal");
    const oftamyam_modalImage = document.querySelector(".oftamyam_slider-image");
    const closeButton = document.querySelector(".oftamyam_modal-close");
    const nextButton = document.querySelector(".oftamyam_slider-next");
    const prevButton = document.querySelector(".oftamyam_slider-prev");

    let currentIndex = 0;

    // وظيفة للتحقق إذا كانت على شاشة موبايل
    const isMobile = () => window.innerWidth <= 768;

    // افتح المودال وعرض الصورة
    const openoftamyam_Modal = (index) => {
        if (isMobile() || !oftamyam_modal || !oftamyam_modalImage) return; 
        currentIndex = index;
        oftamyam_modalImage.src = galleryItems[currentIndex].src;
        oftamyam_modal.classList.add("active");
    };

    // إغلاق المودال
    const closeoftamyam_Modal = () => {
        if (!oftamyam_modal) return;
        oftamyam_modal.classList.remove("active");
    };

    // عرض الصورة التالية
    const showNextImage = () => {
        if (!oftamyam_modalImage || galleryItems.length === 0) return;
        currentIndex = (currentIndex + 1) % galleryItems.length;
        oftamyam_modalImage.src = galleryItems[currentIndex].src;
    };

    // عرض الصورة السابقة
    const showPrevImage = () => {
        if (!oftamyam_modalImage || galleryItems.length === 0) return;
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        oftamyam_modalImage.src = galleryItems[currentIndex].src;
    };

    // تحقق من وجود العناصر قبل إضافة المستمعين
    if (galleryItems.length > 0 && !isMobile()) {
        galleryItems.forEach((img, index) => {
            img.addEventListener("click", () => openoftamyam_Modal(index));
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeoftamyam_Modal);
    }

    if (nextButton) {
        nextButton.addEventListener("click", showNextImage);
    }

    if (prevButton) {
        prevButton.addEventListener("click", showPrevImage);
    }

    if (oftamyam_modal) {
        oftamyam_modal.addEventListener("click", (e) => {
            if (e.target === oftamyam_modal) closeoftamyam_Modal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeoftamyam_Modal();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
    });
});
// downloads page 
