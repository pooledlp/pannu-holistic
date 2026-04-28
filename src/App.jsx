import React, { useEffect, useMemo, useState } from "react";

const services = [
  {
    title: "Holistic Oral Detox Therapy",
    text: "Dental cleanings using only organic, non-toxic products for a healthier mouth. Cleanse and rejuvenate your oral health with herbal rinses and essential oils. Experience a natural approach to dental care.",
  },
  {
    title: "Holistic TMJ Treatment",
    text: "Relieve TMJ pain with holistic approaches that address the root cause and promote overall wellness. Combining myofunctional therapy and Buteyko breathing techniques for a comprehensive approach to oral and facial health.",
  },
  {
    title: "Non-Toxic Chemical-Free Dental Materials",
    text: "We use digital X-rays with low radiation for safer diagnostics. Our commitment is to provide the best care with materials free from harmful chemicals, ensuring your overall well-being.",
  },
];

const highlights = [
  "Specialized in Preventative Dentistry",
  "Organic and non-toxic therapies",
  "Whole-body wellness approach",
  "Personalized care",
];

const therapyOptions = [
  "Ozone Therapy",
  "Myofunctional Therapy",
  "Buteyko Breathing",
  "Mineral Treatment for Decay Prevention",
  "Desensitization Treatment for Sensitive Teeth",
  "Holistic Teeth Whitening",
];



const testimonials = [
  {
    key: "yvonne-marroquin",
    quote:
      "We had an amazing experience! The service was above and beyond and my 5 year old is already looking forward to visiting again. I really appreciate the education we received and all of the details that made my daughter feel so comfortable, from playing Frozen songs to gifting her a tiara. I highly recommend!",
    name: "Yvonne Marroquin",
    rating: 5,
    when: "a month ago",
  },
  {
    key: "erica-garcia",
    quote:
      "Being under the care and guidance of Taren is something I am so, so grateful for! I was so done with bouncing around different dental offices and not feeling I was truly receiving quality care. I knew exactly what I wanted in my next dental ...",
    name: "Erica Garcia",
    rating: 5,
    when: "8 months ago",
  },
  {
    key: "lorena-castillo",
    quote:
      "Wonderful treatments for me and my young daughter. Dr. Pannu truly has a passion for our teeth's health and longevity. Because of her services I have taken a new approach for my teeth and gum health.",
    name: "Lorena Castillo",
    rating: 5,
    when: "9 months ago",
  },
  {
    key: "catherine-munoz",
    quote:
      "Taren Pannu’s office was so inviting and clean. She has a very calming and gentle disposition. She explained everything to me while she was doing and was very thorough. My teeth felt great when I left. I think she is exceptional and I make a long drive just to see her for my dental cleanings.",
    name: "Catherine Munoz",
    rating: 5,
    when: "a year ago",
  },
];


const products = [
  { name: "Dental Probiotics with Hydroxyapatite", price: "$59.00" },
  { name: "Detox Whitening Hydroxyapatite Mineral Toothpaste", price: "$29.00" },
  { name: "Holistic Gum Oil Pulling", price: "$13.00" },
  { name: "Super Ozone Oil", price: "$19.00" },
];

const office = {
  phoneDisplay: "415.755.5549",
  phoneHref: "tel:4157555549",
  emailDisplay: "info@pannuholistic.com",
  emailHref: "mailto:info@pannuholistic.com",
  addressLine1: "229 Tewksbury Ave. Ste A.",
  addressLine2: "Point Richmond, CA 94801",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=229+Tewksbury+Ave+Ste+A+Point+Richmond+CA+94801",
  mapsEmbedHref:
    "https://www.google.com/maps?q=229+Tewksbury+Ave+Ste+A+Point+Richmond+CA+94801&output=embed",
};

function App() {
  const base = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Products", href: "#products" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );



  const ratingStars = (rating = 0) => {
    const count = Math.round(Number(rating));
    return "★".repeat(Math.max(0, Math.min(5, count)));
  };

  const reviewFeed = testimonials;

  return (
    <div className="site-shell">
      <style>{`
        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: Inter, Arial, sans-serif;
          color: #17313a;
          background: #f7f3ec;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        img {
          max-width: 100%;
          display: block;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        :focus-visible {
          outline: 2px solid #8db7c0;
          outline-offset: 3px;
        }

        .site-shell {
          width: 100%;
          background:
            radial-gradient(circle at top left, rgba(143, 190, 198, 0.10), transparent 24%),
            linear-gradient(180deg, #f8f4ed 0%, #f1ebe1 100%);
        }

        .container {
          width: min(1320px, calc(100% - 48px));
          margin: 0 auto;
        }

        .section {
          padding: 116px 0;
          position: relative;
        }

        .section-head {
          max-width: 780px;
          margin-bottom: 42px;
        }

        .section-head small {
          display: block;
          margin-bottom: 16px;
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7599a2;
        }

        .section-head h2 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(38px, 5vw, 68px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.03em;
          text-wrap: balance;
        }

        .section-head p {
          margin: 18px 0 0;
          color: #5b7279;
          font-size: 17px;
          line-height: 1.9;
          max-width: 690px;
        }

        .header {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 50;
          padding: 16px 0;
          transition: background 180ms ease, box-shadow 180ms ease, padding 180ms ease;
        }

        .header.scrolled {
          background: rgba(10, 26, 31, 0.68);
          backdrop-filter: blur(14px);
          box-shadow: 0 14px 40px rgba(5, 16, 20, 0.15);
          padding: 10px 0;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          min-width: 0;
        }

        .brand-mark {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          flex: 0 0 auto;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(6px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .brand-mark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.14);
        }

        .brand-copy small {
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          margin-bottom: 4px;
          color: rgba(255,255,255,0.82);
        }

        .brand-copy strong {
          display: block;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 30px;
          line-height: 0.9;
          font-weight: 600;
          white-space: nowrap;
        }

        .brand-copy span {
          display: block;
          margin-top: 4px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.76);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 26px;
          color: rgba(255,255,255,0.95);
        }

        .nav-links a {
          font-size: 15px;
          transition: opacity 160ms ease;
        }

        .nav-links a:hover { opacity: 0.8; }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 22px;
          border-radius: 999px;
          color: #fff;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
        }

        .menu-button {
          display: none;
          border: 0;
          background: rgba(255,255,255,0.12);
          color: #fff;
          border-radius: 999px;
          padding: 12px 16px;
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          cursor: pointer;
        }

        .mobile-panel { display: none; }

        .hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          background: #0c1f25;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.14);
          transform-origin: center center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(7,20,25,0.26) 0%, rgba(7,20,25,0.56) 58%, rgba(7,20,25,0.74) 100%),
            radial-gradient(circle at 18% 18%, rgba(255,255,255,0.08), transparent 24%);
        }

        .hero-bottom-fade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 230px;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(to top, #f8f4ed 0%, rgba(248,244,237,0.92) 34%, rgba(248,244,237,0) 100%);
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 210px 0 120px;
        }

        .hero-copy {
          max-width: 760px;
          color: #fff;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 22px;
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.84);
        }

        .hero h1 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(42px, 5.2vw, 72px);
          line-height: 1.02;
          font-weight: 600;
          letter-spacing: -0.02em;
          max-width: 760px;
          text-wrap: balance;
        }

        .hero p {
          margin: 24px 0 0;
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255,255,255,0.88);
          max-width: 620px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 34px;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 14px;
          font-weight: 600;
          transition: transform 180ms ease, opacity 180ms ease, background 180ms ease;
          border: none;
          cursor: pointer;
        }

        .button:hover { transform: translateY(-2px); }

        .button-light {
          background: #fff;
          color: #17333a;
          box-shadow: 0 18px 40px rgba(0,0,0,0.14);
        }

        .button-glass {
          color: #fff;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.92);
          font-size: 13px;
          backdrop-filter: blur(10px);
        }

        .intro-band {
          position: relative;
          z-index: 3;
          margin-top: -56px;
        }

        .intro-panel {
          background: linear-gradient(180deg, rgba(238,230,218,0.98) 0%, rgba(243,237,228,0.98) 100%);
          border-radius: 34px;
          padding: 46px;
          box-shadow: 0 24px 60px rgba(22,49,58,0.10);
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 34px;
          align-items: center;
          border: 1px solid rgba(23,49,58,0.05);
        }

        .intro-panel h2 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 0.98;
          font-weight: 600;
          max-width: 650px;
        }

        .intro-panel p {
          margin: 16px 0 0;
          color: #566d75;
          line-height: 1.9;
          font-size: 16px;
          max-width: 650px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .detail-item {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255,255,255,0.64);
          color: #35545d;
          font-size: 15px;
          border: 1px solid rgba(23,49,58,0.04);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .service-card {
          padding: 34px;
          border-radius: 30px;
          background: rgba(248,245,239,0.94);
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 60px rgba(22,49,58,0.10);
        }

        .service-card .num {
          display: inline-flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #e3eff0;
          color: #678d96;
          font-size: 13px;
          margin-bottom: 18px;
        }

        .service-card h3 {
          margin: 0 0 12px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 32px;
          line-height: 1.02;
          font-weight: 600;
        }

        .service-card p {
          margin: 0;
          color: #5d737a;
          line-height: 1.9;
          font-size: 16px;
        }

        .about-section {
          padding: 34px 0 116px;
        }

        .about-wrap {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 34px;
          align-items: center;
        }

        .about-visual {
          display: flex;
          justify-content: center;
        }

        .about-frame {
          width: min(430px, 100%);
          border-radius: 34px;
          background: linear-gradient(180deg, #f1ebdf 0%, #e7dfd2 100%);
          box-shadow: 0 24px 60px rgba(22,49,58,0.10);
          padding: 28px 20px 0;
          overflow: hidden;
          border: 1px solid rgba(22,49,58,0.05);
        }

        .about-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: grayscale(100%) sepia(8%) brightness(1.03) contrast(0.96);
        }

        .about-copy {
          background: rgba(248,245,239,0.94);
          border-radius: 34px;
          padding: 42px;
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
        }

        .about-name {
          margin-top: 28px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 40px;
          line-height: 1;
          font-weight: 600;
        }

        .about-role {
          margin-top: 8px;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7498a0;
        }

        .bio-card {
          margin-top: 26px;
          padding: 24px;
          border-radius: 24px;
          background: #f1ebe0;
          border: 1px solid rgba(22,49,58,0.05);
          color: #4e656d;
          line-height: 1.9;
          font-size: 15px;
        }

        .products-wrap {
          border-radius: 36px;
          overflow: hidden;
          position: relative;
          background: rgba(248,245,239,0.94);
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
        }

        .products-wrap::before {
          content: none;
        }

        .products-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 40px;
        }

        .glass-box {
          padding: 32px;
          border-radius: 28px;
          background: #f1ebe0;
          border: 1px solid rgba(22,49,58,0.05);
          color: #17313a;
        }

        .glass-box small {
          display: block;
          margin-bottom: 16px;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6f93a0;
        }

        .glass-box h2 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 0.98;
          font-weight: 600;
          text-wrap: balance;
        }

        .glass-box p {
          margin: 18px 0 0;
          color: #4f666d;
          line-height: 1.85;
        }

        .product-grid {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }

        .product-card {
          padding: 16px 18px;
          border-radius: 18px;
          background: #f7f3ec;
          border: 1px solid rgba(22,49,58,0.05);
        }

        .product-card strong {
          display: block;
          font-size: 16px;
          margin-bottom: 6px;
        }

        .product-card span {
          display: block;
          color: #4f666d;
          margin-bottom: 10px;
        }

        .order-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(22,49,58,0.08);
          font-size: 13px;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }
        .reviews-embed-wrap {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 10px;
          background: #fff;
          margin-bottom: 24px;
        }
        .reviews-embed {
          width: 100%;
          min-height: 420px;
          border: 0;
          border-radius: calc(var(--radius) - 10px);
          display: block;
        }
        .google-review-cta {
          width: fit-content;
          padding: 10px 16px;
          border: 1px solid var(--line);
          border-radius: 999px;
          text-decoration: none;
          color: var(--ink);
          font-weight: 600;
          display: inline-flex;
          margin-bottom: 18px;
        }

        .review-card {
          background: rgba(248,245,239,0.94);
          border-radius: 30px;
          padding: 34px;
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
        }

        .review-card p {
          margin: 0;
          color: #4f666d;
          line-height: 1.95;
          font-size: 16px;
        }

        .review-name {
          margin-top: 20px;
          font-weight: 700;
          color: #17313a;
        }
        .review-rating {
          color: #d49b00;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .review-when {
          font-size: 12px;
          color: var(--muted);
          margin-top: 8px;
        }

        .contact-shell {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 24px;
        }

        .contact-card,
        .form-card {
          border-radius: 30px;
          background: rgba(248,245,239,0.94);
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
          padding: 34px;
        }

        .contact-list {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }

        .contact-item {
          display: block;
          padding: 16px 18px;
          border-radius: 18px;
          background: #f1ebe0;
          border: 1px solid rgba(22,49,58,0.04);
        }

        .contact-item span {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7599a2;
          margin-bottom: 6px;
        }

        .contact-item strong {
          font-size: 16px;
          line-height: 1.65;
        }

        .map-card h3 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 38px;
          line-height: 1;
        }

        .map-card p {
          margin: 14px 0 0;
          color: #4f666d;
          line-height: 1.7;
        }

        .map-embed-wrap {
          margin-top: 22px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(22,49,58,0.08);
          min-height: 380px;
          background: #fff;
        }

        .map-embed {
          width: 100%;
          height: 100%;
          min-height: 380px;
          border: 0;
          display: block;
        }

        .map-actions {
          margin-top: 16px;
          display: flex;
          justify-content: flex-start;
        }

        .footer {
          padding: 34px 0 48px;
          color: #667a80;
          font-size: 14px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .footer-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        @media (max-width: 1100px) {
          .intro-panel,
          .about-wrap,
          .products-inner,
          .contact-shell {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 920px) {
          .nav-links { display: none; }

          .menu-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-panel {
            display: block;
            margin-top: 14px;
            padding: 16px;
            border-radius: 24px;
            background: rgba(8, 22, 27, 0.72);
            backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.14);
          }

          .mobile-links {
            display: grid;
            gap: 10px;
          }

          .mobile-links a {
            color: #fff;
            padding: 12px 14px;
            border-radius: 14px;
            background: rgba(255,255,255,0.06);
          }

          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .container {
            width: min(calc(100% - 28px), 1320px);
          }

          .header {
            padding: 12px 0;
          }

          .brand {
            gap: 10px;
          }

          .brand-mark {
            width: 56px;
            height: 56px;
          }

          .brand-copy strong {
            font-size: 24px;
            white-space: normal;
          }

          .brand-copy span {
            font-size: 10px;
          }

          .hero-inner {
            padding: 160px 0 88px;
          }


          .hero-video {
            object-position: 68% center;
            transform: scale(1.02);
          }

          .hero h1 {
            font-size: clamp(38px, 12vw, 58px);
          }

          .hero p {
            font-size: 16px;
          }

          .section,
          .about-section {
            padding: 84px 0;
          }

          .intro-panel,
          .service-card,
          .about-copy,
          .glass-box,
          .review-card,
          .contact-card,
          .form-card {
            padding: 24px;
          }

          .products-inner {
            padding: 24px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .about-name {
            font-size: 34px;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .button,
          .service-card,
          .header { transition: none; }
          .hero-video { transform: none; }
        }
      `}</style>

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="nav" aria-label="Primary navigation">
            <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
              <div className="brand-mark">
                <img
                  src={`${base}logosite.png`}
                  alt="Pannu Holistic logo"
                />
              </div>
              <div className="brand-copy">
                <small>Holistic Dentistry</small>
                <strong>Pannu Holistic</strong>
                <span>Dental Myology</span>
              </div>
            </a>

            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="nav-cta">
                Contact Us
              </a>
            </div>

            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </nav>

          {menuOpen && (
            <div className="mobile-panel" id="mobile-menu">
              <div className="mobile-links">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="hero" id="home">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.6;
              video.onplay = () => {
                video.playbackRate = 0.6;
              };
            }
          }}
        >
          <source src={`${base}hero-video.mp4`} type="video/mp4" />
        </video>

        <div className="hero-overlay" />
        <div className="hero-bottom-fade" />

        <div className="hero-inner">
          <div className="container hero-copy">
            <div className="eyebrow">
              Holistic Therapy • Preventative Dentistry • Whole-Body Wellness
            </div>

            <h1>Specialized in Preventative Dentistry</h1>

            <p>
              At our practice, we offer a range of holistic therapy options,
              including Ozone Therapy, Myofunctional Therapy, Buteyko Breathing,
              Mineral Treatment for decay prevention, desensitization treatment
              for sensitive teeth, and Holistic Teeth Whitening.
            </p>

            <div className="hero-actions">
              <a href="#products" className="button button-light">
                View Products
              </a>
              <a href="#contact" className="button button-glass">
                Contact Us
              </a>
            </div>

            <div className="hero-meta" aria-label="Practice highlights">
              {highlights.map((item) => (
                <div className="hero-chip" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="intro-band">
        <div className="container">
          <div className="intro-panel">
            <div>
              <h2>Holistic therapies designed to support a healthier, more balanced life.</h2>
              <p>
                Our approach combines preventative dentistry with wellness-focused
                care that supports comfort, function, breathing, and overall
                well-being.
              </p>
            </div>

            <div className="detail-grid">
              {therapyOptions.map((item) => (
                <div className="detail-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <small>Services</small>
            <h2>Holistic therapies rooted in comfort, prevention, and well-being.</h2>
            <p>
              A natural, whole-body approach to oral health using therapies and
              materials selected to support long-term wellness.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="num">0{index + 1}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container about-wrap">
          <div className="about-visual">
            <div className="about-frame">
              <img
                src={`${base}taren.png`}
                alt="Portrait of Taren Pannu"
                className="about-img"
              />
            </div>
          </div>

          <div className="about-copy">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <small>About</small>
              <h2>Meet Taren Pannu, RDHAP</h2>
              <p>
                Taren provides compassionate, personalized dental hygiene care
                through a holistic lens, supporting oral health as part of
                whole-body wellness.
              </p>
            </div>

            <div className="about-name">Taren Pannu</div>
            <div className="about-role">RDHAP</div>

            <div className="bio-card">
              Welcome to Pannu Holistic. I’m Taren Pannu, a dedicated
              practitioner with a passion for holistic health and wellness. With
              years of experience in holistic therapies, my mission is to help
              you achieve optimal health through natural and integrative
              approaches. At Pannu Holistic, I combine ancient wisdom with
              modern techniques to provide personalized care that addresses the
              root causes of health concerns, rather than simply managing
              symptoms. Whether you are seeking relief from chronic discomfort,
              support with stress management, or a path toward overall
              well-being, I am here to guide and support you every step of the
              way.
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <div className="products-wrap">
            <div className="products-inner">
              <div className="glass-box">
                <small>Products</small>
                <h2>Featured wellness products available through the office.</h2>
                <p>
                  To place an order, please call or email the office directly.
                  We will be happy to assist you with product availability and
                  ordering.
                </p>

                <div className="product-grid">
                  {products.map((product) => (
                    <div className="product-card" key={product.name}>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                      <div className="order-pill">Call or email to order</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-box">
                <small>Order Information</small>
                <h2>Call or email the office to place your order.</h2>
                <p>
                  If you would like to purchase any available product, contact
                  the office directly and we will help you with ordering and
                  questions.
                </p>

                <div className="contact-list" style={{ marginTop: "24px" }}>
                  <a href={office.phoneHref} className="contact-item">
                    <span>Phone</span>
                    <strong>{office.phoneDisplay}</strong>
                  </a>

                  <a href={office.emailHref} className="contact-item">
                    <span>Email</span>
                    <strong>{office.emailDisplay}</strong>
                  </a>

                  <a
                    href={office.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-item"
                  >
                    <span>Address</span>
                    <strong>
                      {office.addressLine1}
                      <br />
                      {office.addressLine2}
                    </strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head">
            <small>Reviews</small>
            <h2>What patients are saying.</h2>
            <p>
              Thoughtful, personalized care that helps patients feel supported,
              comfortable, and cared for.
            </p>
          </div>

          <div className="reviews-grid">
            {reviewFeed.map((review) => (
              <article className="review-card" key={review.key || review.name}>
                {review.rating ? (
                  <div className="review-rating">{ratingStars(review.rating)}</div>
                ) : null}
                <p>{review.quote}</p>
                <div className="review-name">{review.name}</div>
                {review.when ? <div className="review-when">{review.when}</div> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="section-head">
            <small>Contact</small>
            <h2>We’d love to hear from you. Drop us a message.</h2>
            <p>
              Reach out by phone or email, and view our office location below.
            </p>
          </div>

          <div className="contact-shell">
            <div className="contact-card">
              <h3
                style={{
                  margin: 0,
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: "38px",
                  lineHeight: 1,
                }}
              >
                Get in Touch
              </h3>

              <div className="contact-list">
                <a href={office.phoneHref} className="contact-item">
                  <span>Phone</span>
                  <strong>{office.phoneDisplay}</strong>
                </a>

                <a href={office.emailHref} className="contact-item">
                  <span>Email</span>
                  <strong>{office.emailDisplay}</strong>
                </a>

                <a
                  href={office.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <span>Address</span>
                  <strong>
                    {office.addressLine1}
                    <br />
                    {office.addressLine2}
                  </strong>
                </a>
              </div>
            </div>

            <div className="form-card map-card">
              <h3>Office Location</h3>
              <p>Find us in Point Richmond and open directions in Google Maps.</p>

              <div className="map-embed-wrap">
                <iframe
                  className="map-embed"
                  title="Pannu Holistic office location"
                  src={office.mapsEmbedHref}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="map-actions">
                <a href={office.mapsHref} target="_blank" rel="noreferrer" className="button button-light">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            COPYRIGHT © 2026 • Pannu Holistic • {office.addressLine1},{" "}
            {office.addressLine2}
          </div>
          <div className="footer-links">
            <a href="#home">Homepage</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
