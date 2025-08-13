document.addEventListener('DOMContentLoaded', function() {
    const ui = {
        hamburger: document.getElementById('hamburger-menu'),
        navList: document.getElementById('nav-list'),
        scrollToTopBtn: document.querySelector('.scroll-to-top'),
        form: document.querySelector('.contact-form'),
        formMessage: document.querySelector('.contact-form__message'),
        sections: document.querySelectorAll('.section'),
        navLinks: document.querySelectorAll('.nav__link')
    };

    // Menu Hamburger
    ui.hamburger.addEventListener('click', () => {
        const isExpanded = ui.hamburger.getAttribute('aria-expanded') === 'true';
        ui.hamburger.setAttribute('aria-expanded', !isExpanded);
        ui.navList.classList.toggle('nav__list--active');
        ui.hamburger.classList.toggle('header__hamburger--active');
    });

    // Rolagem Suave
    ui.navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (ui.navList.classList.contains('nav__list--active')) {
                ui.hamburger.setAttribute('aria-expanded', false);
                ui.navList.classList.remove('nav__list--active');
                ui.hamburger.classList.remove('header__hamburger--active');
            }
        });
    });

    // Botão Voltar ao Topo
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            ui.scrollToTopBtn.style.display = 'block';
        } else {
            ui.scrollToTopBtn.style.display = 'none';
        }
    });

    ui.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Validação do Formulário
    if (ui.form) {
        ui.form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;

            if (nome.trim() === '' || email.trim() === '') {
                ui.formMessage.textContent = 'Por favor, preencha todos os campos.';
                ui.formMessage.style.color = '#ff4d4d';
            } else if (!validateEmail(email)) {
                ui.formMessage.textContent = 'Por favor, insira um e-mail válido.';
                ui.formMessage.style.color = '#ff4d4d';
            } else {
                ui.formMessage.textContent = 'Cadastro realizado com sucesso!';
                ui.formMessage.style.color = '#00ffff';
                ui.form.reset();
                setTimeout(() => {
                    ui.formMessage.textContent = '';
                }, 3000);
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\\]\\.,;:\s@"]+(\.[^<>()[\\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animação de scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section--visible');
            }
        });
    }, { threshold: 0.1 });

    ui.sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});
});