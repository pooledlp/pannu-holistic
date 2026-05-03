import React, { useEffect, useMemo, useState } from "react";
const smileCases = [
  { file: "case1.png", alt: "Case 1 smile transformation before and after" },
  { file: "case2.png", alt: "Case 2 smile transformation before and after" },
  { file: "case3.png", alt: "Case 3 smile transformation before and after" },
];

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

const therapyOptions = [
  "Early Decay Reversal & teeth Sensitivity Treatment",
  "Homeopathic & Ozone Therapy",
  "Myofunctional Therapy",
  "Certified Buteyko Breathing Therapist",
  "Low-Radiation Digital X-Rays",
  "No braces - Teeth Alignment (Ages 2–17)",
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
  {
    name: "Dental Probiotics with Hydroxyapatite",
    price: "$59.00",
    details:
      "Supports oral microbiome balance while helping strengthen enamel with hydroxyapatite minerals.",
  },
  {
    name: "Detox Whitening Hydroxyapatite Mineral Toothpaste",
    price: "$29.00",
    details:
      "A non-toxic daily toothpaste designed for gentle whitening, remineralization, and fresh breath support.",
  },
  {
    name: "Holistic Gum Oil Pulling",
    price: "$13.00",
    details:
      "Traditional botanical oil blend to support gum comfort, oral cleansing, and daily wellness routines.",
  },
  {
    name: "Super Ozone Oil",
    price: "$19.00",
    details:
      "Concentrated ozone-infused oil often used for targeted oral care and supportive gum maintenance.",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/holistic_dental_wellness?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/PannuHolistic?mibextid=wwXIfr",
    icon: "facebook",
  },
  {
    name: "Yelp",
    href: "https://www.yelp.com/biz/pannu-holistic-dental-myology-point-richmond?utm_source=ishare",
    icon: "yelp",
  },
  {
    name: "Google Reviews",
    href: "https://www.google.com/search?client=safari&hs=PaCp&sca_esv=59623aa993e8ccae&hl=en-us&sxsrf=ANbL-n78wlYdRrB3Uj-PztWmTH3uAeN0mg:1768951989126&q=pannu+holistic+dental+myology+reviews&uds=ALYpb_kZB5BOMUFlRqxCQelgPO46HLqUsKbBDhWkTzA928o8qe3buKYCxWuxEffC1s54UDE7B2wqGyRr416oSB598Vu4FMo9jFyTJsqWmF3FCf7yK6FDl6_TvBIHu1R6_N05w99Hp_j0NdAfiQ7Su6Bh0YOwwOFYZyI4lqoeZO2kkjk3Ej08Uia0BOteQHDLoVtyUPe-Sg8YavS9dLtS5SPzSUm2p-h_EfzPiBiMbw2am6ju7DULr1VOK33dovzAuWh3o4C8mnGJ_u1ngz5ALyEB6-dmbv-uirFe0OWq6jfJ_8CiMVzz7H2U919fFCDiBYJYTfWR6R-Y7KSbVcYYoVoJRYuxKPOVdr2aK4kAZjMRJG9i-kre5IrphEiWoqHtofO4gkUKWERoEGRC5ZlqESdPtNHNfpjaIWJjZhxGQSRkwdLucLlR6QwRgGX2_4TYCfUIRQsNOxMTzp--cDYXeyKa20y2jV6TjqKheHj94iY1QgdDcZkaSHU&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZ-lSIQqaJ_raeYAy8sJMN_HAR9bYI3GKKx4MeIQ3Op0cOE72O-Lwsc0tj2UF5T2TTkGOPdtd6Z4BgrwjvkaRfb0TVlYYzQnpAtCAO25NxcpyRFNRg%3D%3D&sa=X&ved=2ahUKEwi8677Xo5uSAxUTIUQIHRuODZEQk8gLegQIFhAB&ictx=1&biw=375&bih=703&dpr=3&aic=0#ebo=1",
    icon: "google",
  },
];



function SocialIcon({ icon, name }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-label={name} role="img">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-label={name} role="img">
        <path fill="currentColor" d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8.2v3h2.6v8h2.8Z"/>
      </svg>
    );
  }

  if (icon === "yelp") {
    return <span aria-label={name} role="img" style={{ fontWeight: 800, fontSize: 13 }}>Yelp</span>;
  }

  return (
    <svg viewBox="0 0 24 24" aria-label={name} role="img">
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.2-.2-1.8H12v3.3h5.5a4.8 4.8 0 0 1-2 3.1v2.6h3.2c1.9-1.7 3.1-4.2 3.1-7.2Z"/>
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.6l-3.2-2.6c-.9.6-2 1-3.5 1-2.7 0-4.9-1.8-5.7-4.2H3v2.6A10 10 0 0 0 12 22Z"/>
      <path fill="#FBBC05" d="M6.3 13.6a6 6 0 0 1 0-3.2V7.8H3a10 10 0 0 0 0 8.8l3.3-3Z"/>
      <path fill="#EA4335" d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.8-2.8A9.5 9.5 0 0 0 12 2 10 10 0 0 0 3 7.8l3.3 2.6C7.1 7.8 9.3 6 12 6Z"/>
    </svg>
  );
}


const seo = {
  canonical: "https://www.pannuholistic.com/",
  title: "Pannu Holistic | Holistic Dental Hygiene & Myofunctional Therapy in Point Richmond, CA",
  description:
    "Pannu Holistic provides holistic dental hygiene, preventative dentistry, myofunctional therapy, and non-toxic oral wellness care in Point Richmond, California.",
};


const office = {
  phoneDisplay: "415.755.5549",
  phoneHref: "tel:4157555549",
  addressDisplay: "229 Tewksbury Ave. Ste A. Point Richmond, CA 94801",
  mapQuery: "229 Tewksbury Ave Ste A Point Richmond CA 94801",
};

function App() {
  const base = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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

  useEffect(() => {
    document.title = seo.title;

    const setMeta = (name, content, attr = "name") => {
      let node = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attr, name);
        document.head.appendChild(node);
      }
      node.setAttribute("content", content);
    };

    setMeta("description", seo.description);
    setMeta("og:title", seo.title, "property");
    setMeta("og:description", seo.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "en_US", "property");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.canonical);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Products", href: "#products" },
      { label: "Reviews", href: "#reviews" },
      { label: "Why Us", href: "#why-us" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );



  const ratingStars = (rating = 0) => {
    const count = Math.round(Number(rating));
    return "★".repeat(Math.max(0, Math.min(5, count)));
  };

  const reviewFeed = testimonials;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Pannu Holistic",
    url: seo.canonical,
    telephone: office.phoneDisplay,
    areaServed: ["Point Richmond", "Richmond", "East Bay", "San Francisco Bay Area"],
  };


  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <style>{`
        * { box-sizing: border-box; }

:root {
          --font-body: "Avenir Next", "Avenir", "Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif;
          --font-display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Times New Roman", serif;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-body);
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
          padding: 88px 0;
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
          font-family: var(--font-display);
          font-size: clamp(28px, 3.6vw, 48px);
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
          align-items: stretch;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: stretch;
          gap: 12px;
          color: #f8fdff;
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
          font-family: var(--font-display);
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
          isolation: isolate;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          background: #0c1f25;
        }

        .hero-video {
          position: absolute;
          opacity: 0;
          transition: opacity 500ms ease;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.14);
          transform-origin: center center;
        }

        .hero-video.ready {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(8,24,30,0.12) 0%, rgba(8,24,30,0.28) 58%, rgba(8,24,30,0.44) 100%),
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
          color: #6f93a0;
        }

        .hero .eyebrow {
          color: rgba(255,255,255,0.84);
        }

        .hero h1 {
          text-shadow: 0 14px 40px rgba(6,16,24,0.45);
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(36px, 4.6vw, 64px);
          line-height: 1.02;
          font-weight: 600;
          letter-spacing: -0.02em;
          max-width: 760px;
          text-wrap: balance;
        }

        .hero p {
          text-shadow: 0 10px 24px rgba(6,16,24,0.38);
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
          font-family: var(--font-display);
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
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          background: rgba(248,245,239,0.94);
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .service-card::after {
          content: "";
          position: absolute;
          inset: -60% auto auto -20%;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(141,183,192,0.35), transparent 72%);
          transform: scale(0.7);
          opacity: 0;
          transition: opacity 280ms ease, transform 280ms ease;
          pointer-events: none;
        }

        .service-card:hover::after {
          opacity: 1;
          transform: scale(1);
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
          font-family: var(--font-display);
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
          grid-template-columns: minmax(320px, 1fr) minmax(320px, 1fr);
          gap: 34px;
          align-items: stretch;
        }

        .about-visual {
          display: flex;
          justify-content: flex-start;
        }

        .about-frame {
          width: min(520px, 100%);
          max-height: 760px;
          border-radius: 34px;
          background: linear-gradient(180deg, #f1ebdf 0%, #e7dfd2 100%);
          box-shadow: 0 24px 60px rgba(22,49,58,0.10);
          padding: 18px;
          min-height: 100%;
          overflow: hidden;
          border: 1px solid rgba(22,49,58,0.05);
        }

        .about-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          filter: grayscale(100%) sepia(8%) brightness(1.03) contrast(0.96);
        }

        .about-copy {
          background: rgba(248,245,239,0.94);
          border-radius: 34px;
          padding: 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 20px 50px rgba(22,49,58,0.07);
          border: 1px solid rgba(22,49,58,0.05);
          font-size: 14px;
        }

        .about-name {
          margin-top: 28px;
          font-family: var(--font-display);
          font-size: 36px;
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
          font-size: 14px;
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
          grid-template-columns: 1fr;
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
          font-family: var(--font-display);
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

        .product-card p {
          margin: 0 0 14px;
          color: #4f666d;
          line-height: 1.7;
          font-size: 14px;
        }

        .product-card .button {
          padding: 10px 16px;
          font-size: 13px;
          letter-spacing: 0.08em;
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
        .reviews-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin: 0 0 28px;
        }
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(248,245,239,0.94);
          border: 1px solid rgba(22,49,58,0.08);
          text-decoration: none;
          color: #17313a;
          font-size: 13px;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .social-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(22,49,58,0.12);
        }
        .social-pill-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          overflow: hidden;
        }
        .social-pill-icon svg {
          width: 16px;
          height: 16px;
          display: block;
        }
        .social-pill-icon-instagram { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
        .social-pill-icon-facebook { background: #1877f2; }
        .social-pill-icon-yelp { background: #d32323; font-size: 10px; }
        .social-pill-icon-google { background: #ffffff; border: 1px solid rgba(0,0,0,0.1); }

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

        .contact-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: 38px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.02em;
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
          font-family: var(--font-display);
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

        .contact-form {
          margin-top: 24px;
          display: grid;
          gap: 12px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          border: 1px solid rgba(22,49,58,0.14);
          border-radius: 14px;
          background: #fff;
          padding: 12px 14px;
          font-size: 15px;
          color: #17313a;
        }

        .contact-form textarea {
          min-height: 120px;
          resize: vertical;
        }

        .contact-form-note {
          margin: 10px 0 0;
          color: #5e7278;
          font-size: 13px;
          line-height: 1.6;
        }


        .benefits-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; }
        .benefit { padding: 24px; border-radius: 22px; background: rgba(248,245,239,0.94); border: 1px solid rgba(22,49,58,0.05); box-shadow: 0 18px 40px rgba(22,49,58,0.06); }
        .benefit h3 { margin: 0 0 10px; font-size: 22px; font-family: var(--font-display); }
        .benefit p { margin: 0; line-height: 1.8; color: #4f666d; }
        .benefit ul { margin: 14px 0 0; padding-left: 18px; display: grid; gap: 8px; color: #4f666d; }
        .benefit li { line-height: 1.65; }
        .benefit-subhead { margin: 16px 0 8px; font-weight: 700; color: #16313a; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; }
        .benefit-cta { display: inline-block; margin-top: 16px; font-weight: 700; color: #16313a; text-decoration: none; border-bottom: 1px solid rgba(22,49,58,0.32); padding-bottom: 2px; }
        .benefit-cta:hover { color: #2b695e; border-bottom-color: rgba(43,105,94,0.6); }



        .smile-journey {
          margin-top: 10px;
        }
        .smile-track {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 18px;
        }
        .tooth-stage {
          text-align: center;
          padding: 22px;
          border-radius: 24px;
          background: rgba(248,245,239,0.94);
          border: 1px solid rgba(22,49,58,0.06);
          box-shadow: 0 18px 40px rgba(22,49,58,0.06);
        }
        .tooth-image {
          width: 100%;
          max-width: 280px;
          aspect-ratio: 1 / 1;
          margin: 0 auto 14px;
          display: block;
          border-radius: 20px;
          object-fit: cover;
          background: #efe8dc;
        }
        .tooth-stage p { margin: 0; color: #4f666d; font-size: 14px; line-height: 1.7; }

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


        .intro-panel,
        .service-card,
        .about-copy,
        .glass-box,
        .review-card,
        .contact-card,
        .form-card,
        .benefit,
        .product-card,
        .detail-item,
        .contact-item {
          position: relative;
          overflow: hidden;
          transition: transform 280ms cubic-bezier(.2,.8,.2,1), box-shadow 280ms ease, border-color 280ms ease;
        }

        .intro-panel::before,
        .service-card::before,
        .about-copy::before,
        .glass-box::before,
        .review-card::before,
        .contact-card::before,
        .form-card::before,
        .benefit::before,
        .product-card::before,
        .detail-item::before,
        .contact-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.38) 45%, transparent 70%);
          transform: translateX(-140%);
          transition: transform 700ms ease;
          pointer-events: none;
        }

        .intro-panel:hover,
        .service-card:hover,
        .about-copy:hover,
        .glass-box:hover,
        .review-card:hover,
        .contact-card:hover,
        .form-card:hover,
        .benefit:hover,
        .product-card:hover,
        .detail-item:hover,
        .contact-item:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 24px 54px rgba(20, 52, 66, 0.16);
          border-color: rgba(118, 170, 184, 0.42);
        }

        .intro-panel:hover::before,
        .service-card:hover::before,
        .about-copy:hover::before,
        .glass-box:hover::before,
        .review-card:hover::before,
        .contact-card:hover::before,
        .form-card:hover::before,
        .benefit:hover::before,
        .product-card:hover::before,
        .detail-item:hover::before,
        .contact-item:hover::before {
          transform: translateX(140%);
        }

        .reviews-grid .review-card:nth-child(odd),
        .services-grid .service-card:nth-child(odd),
        .benefits-grid .benefit:nth-child(odd) {
          animation: cardFloat 6s ease-in-out infinite;
        }

        .reviews-grid .review-card:nth-child(even),
        .services-grid .service-card:nth-child(even),
        .benefits-grid .benefit:nth-child(even) {
          animation: cardFloat 6.5s ease-in-out infinite reverse;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .service-card,
        .review-card,
        .benefit,
        .product-card,
        .contact-card,
        .form-card,
        .detail-item,
        .contact-item,
        .bio-card {
          animation: cardDrift 7.5s ease-in-out infinite;
        }

        .contact-card,
        .form-card,
        .contact-item {
          animation: none;
        }

        .services-grid .service-card:nth-child(2n),
        .reviews-grid .review-card:nth-child(2n),
        .benefits-grid .benefit:nth-child(2n),
        .product-grid .product-card:nth-child(2n) {
          animation-delay: -2.6s;
        }

        @keyframes cardDrift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-7px) translateX(2px); }
        }

        @keyframes toothRecover {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }


        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(3px);
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.5;
          animation: orbDrift 14s ease-in-out infinite;
        }

        .hero-orb-one {
          width: 280px;
          height: 280px;
          top: 16%;
          right: 8%;
          background: radial-gradient(circle, rgba(137, 215, 232, 0.45), rgba(137, 215, 232, 0));
        }

        .hero-orb-two {
          width: 220px;
          height: 220px;
          bottom: 18%;
          right: 34%;
          background: radial-gradient(circle, rgba(220, 241, 197, 0.42), rgba(220, 241, 197, 0));
          animation-delay: -4s;
        }

        .hero-orb-three {
          width: 320px;
          height: 320px;
          left: -4%;
          top: 26%;
          background: radial-gradient(circle, rgba(255, 248, 231, 0.45), rgba(255, 248, 231, 0));
          animation-delay: -8s;
        }

        .reveal {
          animation: fadeLift 0.9s cubic-bezier(.2,.7,.2,1) both;
        }

        .button-light {
          animation: softPulse 3.2s ease-in-out infinite;
        }

        @keyframes fadeLift {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes orbDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-18px,0) scale(1.06); }
        }

        @keyframes softPulse {
          0%, 100% { box-shadow: 0 18px 40px rgba(0,0,0,0.14); }
          50% { box-shadow: 0 20px 54px rgba(112, 178, 194, 0.36); }
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

          .benefits-grid {
            grid-template-columns: 1fr;
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

          .smile-track {
            grid-template-columns: repeat(2, minmax(0, 1fr));
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
          text-shadow: 0 14px 40px rgba(6,16,24,0.45);
            font-size: clamp(38px, 12vw, 58px);
          }

          .hero p {
          text-shadow: 0 10px 24px rgba(6,16,24,0.38);
            font-size: 16px;
          }

          .section,
          .about-section {
            padding: 64px 0;
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

          .smile-track {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .tooth-stage {
            padding: 20px;
          }

          .tooth-image {
            max-width: min(100%, 420px);
          }

          .about-name {
            font-size: 34px;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }

                @keyframes floatUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .button,
          .service-card,
          .header { transition: none; }
          .hero-video { transform: none; }
          .hero-orb,
          .button-light,
          .reveal,
          .reviews-grid .review-card,
          .services-grid .service-card,
          .benefits-grid .benefit { animation: none !important; }
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
          className={`hero-video ${videoReady ? "ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${base}products-ocean.jpg`}
          onLoadedData={() => setVideoReady(true)}
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
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-orb hero-orb-three" />
        <div className="hero-bottom-fade" />

        <div className="hero-inner">
          <div className="container hero-copy reveal">
            <h1>New standard in dentistry: an advanced approach through a data-driven, systemically aligned, integrative, holistic model.</h1>

            <div className="hero-actions">
              <a href="#products" className="button button-light">
                View Products
              </a>
              <a href="#contact" className="button button-glass">
                Contact Us
              </a>
            </div>

          </div>
        </div>
      </section>

      <div className="intro-band">
        <div className="container">
          <div className="intro-panel reveal">
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
          <div className="section-head reveal">
            <small>Services</small>
            <h2>Holistic therapies rooted in comfort, prevention, and well-being.</h2>
            <p>
              A natural, whole-body approach to oral health using therapies and
              materials selected to support long-term wellness.
            </p>
          </div>

          <div className="services-grid reveal">
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
        <div className="container about-wrap reveal">
          <div className="about-visual">
            <div className="about-frame">
              <img
                src={`${base}Taren2.png`}
                alt="Portrait of Taren Pannu"
                className="about-img"
              />
            </div>
          </div>

          <div className="about-copy">
            <div className="about-name">Taren Pannu, RDHAP, BS</div>

            <div className="bio-card">
              <p>
                Taren Pannu is a dental and airway health practitioner dedicated
                to holistic, functional, and integrative dental care. Her
                approach is grounded in the belief that oral health is closely
                connected to overall wellness.
              </p>

              <p>
                She began her career as a dentist in India, building a strong
                foundation in dental surgery. Her early training was influenced
                by Ayurvedic and homeopathic practices, shaping her appreciation
                for prevention-focused and natural healing approaches. After
                moving to the United States, Mrs. Pannu earned her Bachelor of
                Science with honors from Thomas Edison State University in New
                Jersey and Registered Dental Hygienist in Alternative Practice
                (RDHAP) certification from the University of the Pacific.
              </p>

              <p>
                She pursued advanced training in myofunctional therapy and
                became certified in Buteyko breathing, expanding her focus to
                include airway health, breathing, jaw development, and sleep as
                essential components of dental care.
              </p>

              <p>
                Today, her practice reflects this philosophy, taking an
                integrative, airway-centered approach that focuses on
                identifying root causes rather than simply treating symptoms.
                Her care is evidence-based and centered on long-term oral and
                overall health, to support holistic wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <div className="products-wrap reveal">
            <div className="products-inner">
              <div className="glass-box">
                <small>Products</small>
                <h2>Featured wellness products for holistic oral care.</h2>
                <p>
                  Our product collection is selected to support preventive,
                  non-toxic oral wellness at home between visits. Each option is
                  chosen to align with our whole-body approach to dental care.
                  For best results, we can help guide you to the right product
                  based on your goals and oral health needs.
                </p>

                <div className="product-grid">
                  {products.map((product) => (
                    <div className="product-card" key={product.name}>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                      <p>{product.details}</p>
                      <a href="#contact" className="button button-primary">
                        Contact to order
                      </a>
                    </div>
                  ))}
                </div>

                <p>
                  Need help deciding? Visit our Contact section and share your
                  current concerns (sensitivity, gum support, whitening goals,
                  or remineralization) so we can recommend the best fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head reviews-head">
            <small>Reviews</small>
            <h2>What patients are saying.</h2>
          </div>
          <div className="reviews-socials reveal">
            {socialLinks.map((social) => (
              <a key={social.name} className="social-pill" href={social.href} target="_blank" rel="noreferrer">
                <span className={`social-pill-icon social-pill-icon-${social.icon}`} aria-hidden="true">
                  <SocialIcon icon={social.icon} name={social.name} />
                </span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>

          <div className="reviews-grid reveal">
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

      <section className="section" id="smile-journey">
        <div className="container">
          <div className="section-head">
            <small>Smile Transformation</small>
            <h2>All real results. No braces. No surgery.</h2>
            <p>
              These are real before-and-after outcomes from focused myofunctional therapy — just consistent muscle
              retraining, breathing support, and holistic oral care.
            </p>
          </div>
          <div className="smile-journey reveal">
            <div className="smile-track">
              {smileCases.map((item, index) => (
                <div className="tooth-stage" key={item.file}>
                  <img className="tooth-image" src={`${base}${item.file}`} alt={item.alt} loading="lazy" />
                  <p>Case {index + 1}: Myofunctional therapy transformation</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="why-us">
        <div className="container">
          <div className="section-head">
            <small>Why Patients Choose Us</small>
            <h2>WHY CHOOSE US</h2>
            <p>
              We take a preventive, functional approach that goes beyond symptoms to support dental health, airway function, jaw development, and long-term whole-body wellness for patients of all ages.
            </p>
          </div>
          <div className="benefits-grid reveal">
            <article className="benefit">
              <h3>Root-Cause, Whole-Body Dentistry</h3>
              <ul>
                <li>Addresses root causes, not just symptoms</li>
                <li>Supports oral health, function, and growth</li>
                <li>Designed for adults and children</li>
              </ul>
              <a href="#about" className="benefit-cta">Learn About Our Approach</a>
            </article>
            <article className="benefit">
              <h3>Comfort-Focused, Biocompatible Care</h3>
              <p>
                We prioritize a calm, supportive experience using non-toxic, biocompatible materials and gentle techniques that reduce anxiety—especially for children and sensitive patients.
              </p>
              <ul>
                <li>Biocompatible, non-toxic materials</li>
                <li>Comfort-first environment with anxiety-reducing care</li>
                <li>Child-friendly, calming experience tools</li>
              </ul>
              <a href="#contact" className="benefit-cta">Experience Comfortable Care</a>
            </article>
            <article className="benefit">
              <h3>Airway, Function &amp; Prevention-First Dentistry</h3>
              <p>
                We focus on breathing, jaw development, alignment, and early prevention using personalized treatment plans and low-radiation digital X-rays for safer, more precise care.
              </p>
              <ul>
                <li>Airway and jaw development support</li>
                <li>Teeth alignment without braces or surgery (when appropriate)</li>
                <li>Preventive, personalized treatment planning</li>
                <li>Low-radiation digital diagnostics</li>
              </ul>
              <a href="#services" className="benefit-cta">Explore Preventive Treatments</a>
            </article>
            <article className="benefit">
              <h3>Child-Friendly Dentistry</h3>
              <p>
                A calm, supportive environment designed to help children feel safe, comfortable, and confident at every visit.
              </p>
              <div className="benefit-subhead">What we focus on:</div>
              <ul>
                <li><strong>Comfort &amp; Familiarity</strong> — Disney movies, comfort items, and a playroom that feels like home—not a dental office.</li>
                <li><strong>Positive Early Experiences</strong> — A gentle, patient approach that builds trust and helps children feel at ease with dental care.</li>
                <li><strong>Encouragement, Not Pressure</strong> — Small rewards for cooperation and a no-pressure approach that prioritizes emotional comfort—even if treatment isn’t completed.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>



      <section className="section" id="contact">
        <div className="container">
          <div className="section-head">
            <small>Contact</small>
          </div>

          <div className="contact-shell reveal">
            <div className="contact-card">
              <h3 className="contact-title">Get in Touch</h3>

              <div className="contact-list">
                <a href={office.phoneHref} className="contact-item">
                  <span>Phone</span>
                  <strong>{office.phoneDisplay}</strong>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  className="contact-item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Address</span>
                  <strong>{office.addressDisplay}</strong>
                </a>
              </div>

              <form
                className="contact-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" placeholder="How can we help?" required />
                <button type="submit" className="button button-light">Send Message</button>
              </form>
            </div>

            <aside className="contact-card map-card">
              <h3>Find Us</h3>
              <p>{office.addressDisplay}</p>
              <div className="map-embed-wrap">
                <iframe
                  className="map-embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`}
                  title="Pannu Holistic on Google Maps"
                />
              </div>
              <div className="map-actions">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  className="button button-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>COPYRIGHT © 2026 • Pannu Holistic</div>
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
