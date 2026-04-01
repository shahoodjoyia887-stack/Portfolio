/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    window.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL PROGRESS BAR ===============*/
const scrollProgress = document.getElementById('scroll-progress')

const updateScrollProgress = () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / height) * 100
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%'
    }
}
window.addEventListener('scroll', updateScrollProgress)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.getElementById('cursor')
const cursorFollower = document.createElement('div')
cursorFollower.className = 'cursor-follower'
document.body.appendChild(cursorFollower)

window.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }
    if (cursorFollower) {
        // Subtle lag for the follower
        setTimeout(() => {
            cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        }, 50)
    }
})

// Hover effects for cursor
const interactiveElements = document.querySelectorAll('a, button, .projects__card, .services__card')
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.width = '60px'
            cursor.style.height = '60px'
            cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.1)'
        }
    })
    el.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.width = '40px'
            cursor.style.height = '40px'
            cursor.style.backgroundColor = 'transparent'
        }
    })
})

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container", {
    loop: true,
    spaceBetween: 24,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        1200: {
            slidesPerView: 2,
            spaceBetween: 32,
        },
    },
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__content, .about__data, .projects__container, .experience__content, .services__container, .contact__container, .footer__container`)
sr.reveal(`.home__images`, { origin: 'bottom', delay: 700 })
sr.reveal(`.about__images`, { origin: 'left', delay: 700 })
sr.reveal(`.contact__content`, { origin: 'right', delay: 700 })
sr.reveal(`.skills__item`, { interval: 100 })
sr.reveal(`.about__box`, { interval: 100 })
sr.reveal(`.services__card`, { interval: 150 })

/*=============== CONTACT FORM VALIDATION & SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form')

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const inputs = contactForm.querySelectorAll('.contact__form-input')
        let isValid = true

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false
                input.style.borderColor = 'red'
            } else {
                input.style.borderColor = 'var(--border-color)'
            }
        })

        if (!isValid) {
            alert('Please fill in all fields.')
            return
        }

        // Simulate submission
        const submitBtn = contactForm.querySelector('button')
        const originalBtnText = submitBtn.innerHTML

        submitBtn.disabled = true
        submitBtn.innerHTML = 'Sending... <i class="ri-loader-4-line"></i>'

        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="ri-checkbox-circle-line"></i>'
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)'

            // Clear form
            contactForm.reset()

            setTimeout(() => {
                submitBtn.disabled = false
                submitBtn.innerHTML = originalBtnText
                submitBtn.style.background = ''
            }, 3000)
        }, 1500)
    })
}

/*=============== DYNAMIC YEAR ===============*/
const yearSpan = document.getElementById('current-year')
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
}
