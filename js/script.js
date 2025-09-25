// script.js — tiny, dependency-free interactions & animations

// Typing tagline
const typedEl = document.getElementById('typed');
const phrases = [
    'React · Next.js · TypeScript',
    'Node.js · GraphQL · WebSockets',
    'Microservices · AWS · Kubernetes',
    'Performance & Scalable systems'
];
let pIndex = 0, cIndex = 0, forward = true;
function typeTick() {
    const cur = phrases[pIndex];
    if (forward) {
        cIndex++;
        typedEl.textContent = cur.slice(0, cIndex);
        if (cIndex === cur.length) {
            forward = false;
            setTimeout(typeTick, 900);
            return;
        }
    } else {
        cIndex--;
        typedEl.textContent = cur.slice(0, cIndex);
        if (cIndex === 0) {
            forward = true;
            pIndex = (pIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeTick, forward ? 40 : 26);
}
if (typedEl) typeTick();

// Intersection Observer - reveal elements
const revealSelector = '.reveal-up, .reveal-left';
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(revealSelector).forEach(el => observer.observe(el));

// Staggered skill chip animation (when expertise section revealed)
const skillChips = document.querySelectorAll('.skill-chip');
const expertiseSection = document.getElementById('expertise');
if (expertiseSection) {
    const skillObserver = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
            skillChips.forEach((chip, i) => {
                setTimeout(() => chip.classList.add('visible'), i * 110);
            });
            obs.disconnect();
        }
    }, { threshold: 0.12 });
    skillObserver.observe(expertiseSection);
}

// Animate meter bars on reveal
document.querySelectorAll('.meter-bar').forEach(bar => {
    const val = bar.style.getPropertyValue('--value') || bar.getAttribute('style') || '';
    // We'll animate when in view
});
const meterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.meter-bar').forEach(b => {
                const v = b.style.getPropertyValue('--value') || b.getAttribute('style') || '';
                // parse --value from inline style if present
                const match = b.style.getPropertyValue('--value') || b.getAttribute('style').match(/--value:\s*([^;]+)/);
                const value = match ? match[1].trim() : '70%';
                b.style.width = value;
            });
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
const meters = document.querySelectorAll('.card-glass');
if (meters.length) meterObserver.observe(document.getElementById('expertise') || meters[0]);

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 240) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form demo: copy to clipboard and show note (no backend)
function handleContact(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const snippet = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(snippet).then(() => {
            document.getElementById('contactNote').style.display = 'block';
            form.reset();
            setTimeout(() => document.getElementById('contactNote').style.display = 'none', 4000);
        }, () => {
            alert('Could not copy to clipboard — please email: yourname@example.com');
        });
    } else {
        alert('Clipboard not available. Please email yourname@example.com directly.');
    }
}

// Attach form listener
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', handleContact);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
