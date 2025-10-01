/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scrolling & focus management for in-page navigation
    const scrollLinks = document.querySelectorAll('a.js-scroll-trigger[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            if (!prefersReducedMotion) {
                event.preventDefault();
                const targetOffset = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: Math.max(targetOffset, 0), behavior: 'smooth' });
                const originalTabIndex = target.getAttribute('tabindex');
                if (originalTabIndex === null) {
                    target.setAttribute('tabindex', '-1');
                }
                try {
                    target.focus({ preventScroll: true });
                } catch (focusError) {
                    target.focus();
                }
                target.addEventListener('blur', () => {
                    if (originalTabIndex === null) {
                        target.removeAttribute('tabindex');
                    }
                }, { once: true });
            }
        });
    });

    // Create a subtle scroll progress indicator on the side nav
    let progressBar = null;
    if (sideNav) {
        progressBar = document.createElement('span');
        progressBar.className = 'scroll-progress';
        sideNav.appendChild(progressBar);
    }

    // Reveal-on-scroll animation for sections and notable elements
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll('.resume-section, .social-icons a, .resume-section-content > *');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
        });

        revealTargets.forEach((target, index) => {
            target.classList.add('will-reveal');
            target.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`);
            observer.observe(target);
        });
    }

    // Elevate the nav styling and update scroll progress while scrolling
    const handleScroll = (() => {
        let ticking = false;
        const update = () => {
            ticking = false;
            if (sideNav) {
                sideNav.classList.toggle('nav-scrolled', window.scrollY > 80);
            }
            if (progressBar) {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
                progressBar.style.setProperty('--progress-scale', progress.toFixed(3));
            }
        };

        return () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };
    })();

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
});
