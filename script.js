// Interactive JavaScript matching GitHub Repo: Renuka4443/My-Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initTypingNameEffect();
    initScrollAnimations();
    initNavbarScroll();
    initProjectFilters();
    initMetricsCounter();
    initContactForm();
    initBackToTopButton();
});

/* 1. Name Typing Animation (Matches HeroSection.tsx in reference repo) */
function initTypingNameEffect() {
    const nameElem = document.getElementById('typedName');
    if (!nameElem) return;

    const fullName = "Poornima Mendhekar";
    let index = 0;
    nameElem.textContent = "";

    const timer = setInterval(() => {
        if (index < fullName.length) {
            nameElem.textContent = fullName.substring(0, index + 1);
            index++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

/* 2. Scroll Animation Observer */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in-up').forEach(el => observer.observe(el));
}

/* 3. Navbar Scroll shrink & active link */
function initNavbarScroll() {
    const navbar = document.querySelector('.glass-nav-renuka');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-renuka');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* 4. Project Category Filters */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn-item');
    const projectCols = document.querySelectorAll('.project-item-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCols.forEach(col => {
                const category = col.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    col.style.display = 'block';
                } else {
                    col.style.display = 'none';
                }
            });
        });
    });
}

/* 5. Metrics Counter Animation */
function initMetricsCounter() {
    const metricNums = document.querySelectorAll('.metric-num-renuka');
    let counted = false;

    function countUp() {
        const metricsSec = document.getElementById('metrics');
        if (!metricsSec) return;

        const pos = metricsSec.getBoundingClientRect().top;
        if (pos < window.innerHeight / 1.2 && !counted) {
            counted = true;
            metricNums.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const suffix = num.getAttribute('data-suffix') || '';
                let count = 0;
                const step = Math.max(1, Math.ceil(target / 40));

                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        num.innerText = target + suffix;
                        clearInterval(timer);
                    } else {
                        num.innerText = count + step;
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', countUp);
}

/* 6. FormSubmit AJAX Contact Form Handler */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitBtn) submitBtn.innerText = 'Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (formSuccess) formSuccess.classList.remove('d-none');
                contactForm.reset();
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        } finally {
            if (submitBtn) submitBtn.innerText = 'Send Message';
        }
    });
}

/* 7. Floating Back to Top Button Handler */
function initBackToTopButton() {
    const backBtn = document.getElementById('backToTopBtn');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });
}
