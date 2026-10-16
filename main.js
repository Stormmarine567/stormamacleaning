/* main.js — AMA Authentic Klining Services */

// ============================================
// NAVBAR: scroll effect + mobile menu
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ============================================
// SET ACTIVE NAV LINK
// ============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// Also handle fade-up elements that are added dynamically
document.querySelectorAll('.fade-up').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight) {
    el.style.opacity = '0';
    revealObserver.observe(el);
    el.classList.add('scroll-reveal');
  }
});

// ============================================
// GALLERY FILTER (gallery.html)
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-full-grid .gallery-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;

    galleryCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ============================================
// FAQ ACCORDION (pricing.html)
// ============================================
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(fi => {
      fi.classList.remove('open');
      fi.querySelector('.faq-body').style.maxHeight = null;
    });

    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// // ============================================
// // BOOKING FORM SUBMISSION
// // ============================================
// const bookingForm = document.getElementById('booking-form');
// const bookingSuccess = document.getElementById('booking-success');

// if (bookingForm) {
//   bookingForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const btn = bookingForm.querySelector('[type="submit"]');
//     btn.disabled = true;
//     btn.innerHTML = `<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Submitting...`;

//     // Simulate API
//     await new Promise(r => setTimeout(r, 1200));

//     bookingForm.style.display = 'none';
//     bookingSuccess.classList.add('show');
//   });
// }

// document.getElementById('booking-again-btn')?.addEventListener('click', () => {
//   bookingForm.reset();
//   bookingForm.style.display = 'block';
//   bookingSuccess.classList.remove('show');
//   bookingForm.querySelector('[type="submit"]').disabled = false;
//   bookingForm.querySelector('[type="submit"]').innerHTML = `📅 Submit Booking`;
// });

// ============================================
// BOOKING FORM SUBMISSION TO WHATSAPP
// ============================================
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');
const formError = document.getElementById('form-error');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const location = document.getElementById("location").value.trim();
    const serviceSelect = document.getElementById("service_type");
    const propertySelect = document.getElementById("property_type");
    const preferredDate = document.getElementById("preferred_date").value;
    const notes = document.getElementById("notes").value.trim();

    if (!name || !phone || !serviceSelect.value) {
      formError.style.display = "block";
      formError.textContent = "Please fill in Full Name, Phone, and Service Type.";
      return;
    }

    formError.style.display = "none";

    const service = serviceSelect.options[serviceSelect.selectedIndex].text;
    const property = propertySelect.value
      ? propertySelect.options[propertySelect.selectedIndex].text
      : "Not provided";

    const message =
`Hello, I want to book a service.

Full Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email || "Not provided"}
Location / Address: ${location || "Not provided"}
Service Type: ${service}
Property Type: ${property}
Preferred Date: ${preferredDate || "Not provided"}
Additional Notes: ${notes || "None"}`;

    const whatsappNumber = "2348146911808";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappURL;
  });
}

document.getElementById('booking-again-btn')?.addEventListener('click', () => {
  bookingForm.reset();
});

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = `<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...`;

    await new Promise(r => setTimeout(r, 1000));
    contactForm.style.display = 'none';
    contactSuccess.classList.add('show');
  });
}

document.getElementById('contact-again-btn')?.addEventListener('click', () => {
  contactForm.reset();
  contactForm.style.display = '';
  contactSuccess.classList.remove('show');
  contactForm.querySelector('[type="submit"]').disabled = false;
  contactForm.querySelector('[type="submit"]').innerHTML = `✉️ Send Message`;
});

// Spinning loader style
const style = document.createElement('style');
style.textContent = `.spin { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
