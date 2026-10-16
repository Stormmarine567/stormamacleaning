# AMA Authentic Klining Services — Website

A complete multi-page HTML/CSS/JS website for AMA Authentic Klining Services.

## Pages
- `index.html` — Home page (hero, services, gallery preview, testimonials, CTA)
- `about.html` — About Us (mission, values, coverage areas)
- `services.html` — All 6 services in detail
- `gallery.html` — Filterable gallery (Kitchen, Bathroom, Living Room, Office)
- `pricing.html` — 3-tier pricing cards + FAQ accordion
- `booking.html` — Booking form with validation + success state
- `contact.html` — Contact form + contact info + social links

## Files
- `style.css` — All styles (responsive, mobile-first)
- `main.js` — Navbar scroll, mobile menu, scroll-reveal animations, gallery filter, FAQ accordion

## Logo Replacement
To replace the placeholder logo:
1. Upload your logo image (recommended: PNG with transparency, ~80×80px or SVG)
2. Replace all occurrences of the `<img>` tag inside `.logo-mark` and `.footer-logo`:
   ```html
   <img src="YOUR_LOGO_FILE.png" alt="AMA Logo" />
   ```
3. The logo image is currently a placeholder from placehold.co

## Customization
- **Phone number**: Search & replace `+2348000000000` and `+234 800 000 0000`
- **Email**: Replace `info@amacleaning.com`
- **WhatsApp**: Update `wa.me/2348000000000` links
- **Colors**: Edit CSS variables in `:root` in `style.css`
- **Instagram**: Update the Instagram href links

## PHP Backend (Optional)
To make the forms actually submit data to a database or email, you can replace the JavaScript `setTimeout` simulation in `booking.html` and `contact.html` with a `fetch()` POST to a PHP endpoint.

Example PHP endpoint (`submit.php`):
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Save to database or send email
    mail('info@amacleaning.com', 'New Booking', print_r($data, true));
    echo json_encode(['success' => true]);
}
```

## No Build Required
This is a plain HTML/CSS/JS site — just open `index.html` in a browser or upload the folder to any web host (cPanel, Netlify, Vercel, etc.).
