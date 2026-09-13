import React, { useEffect, useMemo, useRef, useState } from "react";
import ReviewTicker from "./components/ReviewFeed.jsx";

import Interior, {ResourceCards} from "./components/Interior.jsx";
import {getPage, servicePages, navigation} from "./content/site.mjs";
import "./legacy.css";
import "./pages.css";
const smileCases = [
  {
    file: "case1.png",
    alt: "Case 1 smile transformation before and after",
    title: "Myofunctional Therapy + Airway + Habit Correction (pacifier)",
    text: "Care focused on tongue posture, breathing habits, and pacifier use. The photographs show this patient’s dental appearance at different stages.",
  },
  {
    file: "case2.png",
    alt: "Case 2 smile transformation before and after",
    title: "Myofunctional Therapy + Habit Correction (tongue thrust)",
    text: "Care focused on tongue thrust and oral muscle habits. Assessment and treatment needs differ for each patient.",
  },
  {
    file: "case3.png",
    alt: "Case 3 smile transformation before and after",
    title: "Myofunctional Therapy + Airway + Habit Correction + Ozone therapy",
    text: "This individual care plan included oral muscle work, breathing habits, and ozone as an adjunct. A combined case cannot show which treatment caused a change.",
  },
];

const services = [
  {
    "id": "airway",
    "title": "Airway & sleep concerns",
    "icon": "jaw",
    "concern": "Mouth breathing, snoring, or restless sleep?",
    "text": "Your breathing habits and oral function are worth a closer look. We assess oral signs and discuss whether evaluation by a sleep clinician or other specialist is needed. Sleep apnea requires medical diagnosis; dental support complements your prescribed care."
  },
  {
    "id": "myofunctional",
    "title": "Myofunctional therapy",
    "icon": "jaw",
    "concern": "Help your tongue and mouth work together.",
    "text": "Guided exercises retrain tongue resting posture, lip closure, and swallowing patterns. An individual plan can support oral function and healthier habits in adults and children. It may complement sleep apnea treatment for selected patients."
  },
  {
    "id": "gums",
    "title": "Gum inflammation care",
    "icon": "leaf",
    "concern": "Bleeding gums deserve attention.",
    "text": "We look at plaque buildup, home-care habits, dry mouth, and other contributing factors. Professional cleaning and a practical daily routine help control inflammation. Early gingivitis can often be reversed; advanced gum disease needs ongoing treatment and sometimes specialist care."
  },
  {
    "id": "enamel",
    "title": "Enamel remineralization",
    "icon": "bio",
    "concern": "Protect your teeth before damage progresses.",
    "text": "Remineralization means helping replace minerals lost from the tooth surface. We review your cavity risk, saliva, diet, and home care to guide prevention. Some early, non-cavitated lesions can improve with appropriate care; a cavity with a hole may need restoration."
  },
  {
    "id": "ozone",
    "title": "Ozone treatments",
    "icon": "bio",
    "concern": "Understand your options before choosing.",
    "text": "Ozone is offered as an additional option within selected dental care plans. We discuss the intended use, risks, alternatives, and limits of the evidence. It does not replace established cavity or gum treatment and is not a treatment for autoimmune disease."
  },
  {
    "id": "whole-body",
    "title": "Whole-person prevention",
    "icon": "leaf",
    "concern": "Your health history belongs in the conversation.",
    "text": "Oral health and general health are connected. Medications, diabetes, dry mouth, and daily habits can affect your mouth. We consider these factors in your dental care and encourage appropriate medical follow-up, without promising to prevent systemic or autoimmune conditions."
  }
];

function ServiceIcon({ icon, title }) {
  if (icon === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-label={title} role="img">
        <path d="M19 4c-5.5 0-9.7 1.9-12.3 4.6C4.1 11.2 3 14.5 3 18c3.6 0 6.8-1.1 9.4-3.7C15.1 11.7 17 7.5 17 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 17c1.8-2.7 4.4-5 8-6.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "jaw") {
    return (
      <svg viewBox="0 0 24 24" aria-label={title} role="img">
        <path d="M6 8.2C6 5.9 8 4 10.5 4h3C16 4 18 5.9 18 8.2v2.1c0 2.1-1.2 4-3.1 5L13 16.2c-.6.3-1.4.3-2 0l-1.9-.9C7.2 14.3 6 12.4 6 10.3V8.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.3 10.2h5.4M10 13h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "bio") {
    return (
      <svg viewBox="0 0 24 24" aria-label={title} role="img">
        <path d="M12 4v16M6.5 7.5c0 1.6 1.4 2.9 3 2.9H14c1.7 0 3-1.3 3-2.9s-1.3-2.9-3-2.9H9.5c-1.6 0-3 1.3-3 2.9Zm0 9c0 1.6 1.4 2.9 3 2.9H14c1.7 0 3-1.3 3-2.9s-1.3-2.9-3-2.9H9.5c-1.6 0-3 1.3-3 2.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-label={title} role="img">
      <path d="M12 3 5 6v6c0 4.6 2.9 7.8 7 9 4.1-1.2 7-4.4 7-9V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9.4 12 2 2 3.5-3.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const therapyOptions = [
  "Mouth breathing or snoring",
  "Tongue posture & swallowing habits",
  "Bleeding or tender gums",
  "Sensitive teeth & early enamel changes",
  "Questions about ozone treatments",
  "Preventive care for adults & children"
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
    href: "https://www.google.com/maps/search/?api=1&query=Pannu+Holistic+Dental+Myology&query_place_id=ChIJUY5WJ9qDhYARJs7fpxLgji4",
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
  title: "Pannu Holistic Dental Myology",
  description:
    "Pannu Holistic provides holistic dental hygiene, preventative dentistry, myofunctional therapy, and non-toxic oral wellness care in Point Richmond, California.",
};


const office = {
  phoneDisplay: "415.755.5549",
  phoneHref: "tel:4157555549",
  addressDisplay: "229 Tewksbury Ave. Ste A. Point Richmond, CA 94801",
  mapQuery: "229 Tewksbury Ave Ste A Point Richmond CA 94801",
};

function App({pathname="/"}) {
  const page=getPage(pathname);
  const isHome=pathname==="/";
  const base = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: "idle", message: "" });
  const [contactStartedAt, setContactStartedAt] = useState(() => Date.now());
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const heroVideoRef = useRef(null);

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
    setContactStartedAt(Date.now());
  }, []);

  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "https://formsubmit.co/ajax/info@pannuholistic.com";

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) {
      setContactStatus({
        type: "error",
        message: "Submission blocked. Please try again.",
      });
      return;
    }

    if (Date.now() - contactStartedAt < 2500) {
      setContactStatus({
        type: "error",
        message: "Please wait a moment, then try again.",
      });
      return;
    }

    formData.append("_subject", "New website contact request");
    formData.append("_captcha", "false");

    setIsSubmittingContact(true);
    setContactStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      const receipt=await response.json();
      if(receipt.success!==true&&receipt.success!=="true")throw new Error("Delivery rejected");
      setContactStatus({
        type: "success",
        message: "Thanks! Your message was sent successfully. We will reply soon.",
      });
      form.reset();
      setContactStartedAt(Date.now());
    } catch (error) {
      setContactStatus({
        type: "error",
        message: "We could not send your message right now. Please call us at 415.755.5549.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) {
      return undefined;
    }

    let retryTimeout;

    const startVideo = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      if (video.readyState < 2) {
        return;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          retryTimeout = window.setTimeout(startVideo, 700);
        });
      }
    };

    startVideo();
    video.addEventListener("loadedmetadata", startVideo);
    video.addEventListener("canplay", startVideo);

    const events = ["touchstart", "pointerdown", "visibilitychange"];
    events.forEach((eventName) => document.addEventListener(eventName, startVideo, { passive: true }));

    return () => {
      if (retryTimeout) {
        window.clearTimeout(retryTimeout);
      }
      video.removeEventListener("loadedmetadata", startVideo);
      video.removeEventListener("canplay", startVideo);
      events.forEach((eventName) => document.removeEventListener(eventName, startVideo));
    };
  }, []);

  const navLinks=navigation;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Pannu Holistic",
    url: "https://pannuholistic.com/",
    telephone: office.phoneDisplay,
    areaServed: ["Point Richmond", "Richmond", "East Bay", "San Francisco Bay Area"],
  };


  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>



      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="nav" aria-label="Primary navigation">
            <a href="/" className="brand" onClick={() => setMenuOpen(false)}>
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
                <a key={link.href} href={link.href} className={link.href === "/contact/" ? "nav-appointment" : undefined}>
                  {link.label}
                </a>
              ))}
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

      <main id="main-content">
      {isHome ? <>
      <section className="hero" id="home">
        <video
          className={`hero-video ${videoReady ? "ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${base}products-ocean.jpg`}
          onCanPlay={() => setVideoReady(true)}
          ref={heroVideoRef}
          onPlay={(event) => {
            event.currentTarget.playbackRate = 0.6;
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
            <span className="eyebrow">Holistic dental care · Point Richmond, CA</span>
            <h1>
              Guided by science.
              <br />
              Focused on a healthier you.
            </h1>
            <p>Your mouth connects to your overall health. Our evidence-informed approach targets contributing causes to help prevent gum disease and decay, reduce oral inflammation and sensitivity, and address airway and jaw function.</p>
            <div className="hero-actions"><a className="button button-light" href="#contact">Request an appointment <span aria-hidden="true">↗</span></a><a className="button button-glass" href="#services">Find care for your concerns</a></div>
            <a className="hero-practitioner" href="/about/"><img src={`${base}Taren2.png`} alt="" /><span>Meet Taren Pannu<strong>RDHAP, BS · Personalized, preventive care</strong></span><span aria-hidden="true">↗</span></a>


          </div>
        </div>
      </section>

      <div className="intro-band">
        <div className="container">
          <div className="intro-panel reveal">
            <div>
              <h2>Does any of this sound familiar?</h2>
              <p>
                You deserve to understand what is happening, why it may keep coming back, and what you can do next. Start with your concerns. We’ll help you understand your options.
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
            <h2>Understand the cause. Choose your next step.</h2>
            <p>
              Our holistic approach considers your health history, oral habits, and clinical findings together. Explore care for your airway, tongue function, gums, and enamel—with clear explanations of what each option can and cannot do.
            </p>
          </div>

          <div className="services-grid reveal">
            {services.map((service) => (
              <article className="service-card" id={service.id} key={service.title}>
                <div className="num">
                  <ServiceIcon icon={service.icon} title={service.title} />
                </div>
                <h3>{service.title}</h3>
                <p className="service-concern">{service.concern}</p>
                <p>{service.text}</p>
                <a className="care-link" href={servicePages.find(p=>p.id===service.id).path}>Explore {service.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container reveal">
          <div className="about-copy">
            <div className="bio-card bio-layout">
              <div className="about-visual">
                <div className="about-frame">
                  <img
                    src={`${base}Taren2.png`}
                    alt="Portrait of Taren Pannu"
                    className="about-img"
                  />
                </div>
              </div>

              <div>
                <div className="about-name">Taren Pannu, RDHAP, BS</div>
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
                Her focus is helping patients understand the factors behind their oral health concerns. She brings a preventive, airway-centered perspective to dental hygiene and explains treatment choices, evidence, and limitations so patients can make informed decisions.
              </p>
              </div>
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
                <h2>Keep your care going at home</h2>
                <p>
                  Ask which products fit your needs, how to use them, and what evidence supports them. Products are optional additions to your routine; they do not replace brushing, cleaning between teeth, or necessary dental treatment.
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
            <h2>What patients are saying</h2>
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

          <ReviewTicker />
        </div>
      </section>

      <section className="section" id="smile-journey">
        <div className="container">
          <div className="section-head">
            <small>Transformations:</small><a className="care-link" href="/patient-stories/">Explore patient stories ↗</a>
            <h2>Individual care. Individual progress.</h2>
            <p>
              Examples from the practice’s treatment journeys. Results vary; these images do not establish improvements in breathing or sleep, or guarantee that braces or surgery can be avoided.
            </p>
          </div>
          <div className="smile-journey reveal">
            <div className="smile-track">
              {smileCases.map((item, index) => (
                <div className="tooth-stage" key={item.file}>
                  <img className="tooth-image" src={`${base}${item.file}`} alt={item.alt} loading="lazy" />
                  <p><strong>Case {index + 1}:</strong> {item.title}</p>
                  <p>{item.text}</p>
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
            <h2>Feel heard. Understand your care.</h2>
            <p>
              We take a preventive, functional approach that goes beyond symptoms to support dental health, airway function, jaw development, and long-term whole-body wellness for patients of all ages.
            </p>
          </div>
          <div className="benefits-grid reveal">
            <article className="benefit">
              <h3>Look for contributing causes</h3>
              <ul>
                <li>Explore what may be driving recurring oral concerns</li>
                <li>Supports oral health, function, and growth</li>
                <li>Designed for adults and children</li>
              </ul>
            </article>
            <article className="benefit">
              <h3>Gentle care, explained clearly</h3>
              <p>
                We take time to explain your options, discuss materials and sensitivities, and help you feel comfortable—especially if you or your child feels anxious about dental care.
              </p>
              <ul>
                <li>Materials selected with your needs and sensitivities in mind</li>
                <li>Comfort-first environment with anxiety-reducing care</li>
                <li>Child-friendly, calming experience tools</li>
              </ul>
            </article>
            <article className="benefit">
              <h3>Prevention that fits your life</h3>
              <p>
                We focus on breathing, jaw development, alignment, and early prevention using personalized treatment plans and low-radiation digital X-rays for safer, more precise care.
              </p>
              <ul>
                <li>Airway and jaw development support</li>
                <li>Discuss when orthodontic or specialist evaluation is appropriate</li>
                <li>Preventive, personalized treatment planning</li>
                <li>Low-radiation digital diagnostics</li>
              </ul>
            </article>
            <article className="benefit">
              <h3>A positive start for children</h3>
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




      <section className="section evidence-section" id="care-questions">
        <div className="container">
          <div className="section-head"><small>Science, made understandable</small><h2>A whole-body perspective. Clear answers.</h2><p>Holistic care should help you make informed choices. Here is what the evidence means for common patient questions.</p></div>
          <div className="patient-questions">
            <details><summary>Can gum treatment prevent autoimmune or systemic disease?</summary><p>Gum disease is associated with several health conditions, and the relationship with diabetes goes both ways. An association does not prove that dental treatment prevents autoimmune disease, heart disease, or other systemic conditions. Treating your gums matters for your oral health and belongs alongside appropriate medical care. <a href="https://www.nidcr.nih.gov/news-events/nidcr-news/2024/healthy-mouth-healthy-body" target="_blank" rel="noreferrer">Read the NIH overview ↗</a></p></details>
            <details><summary>Can myofunctional therapy help with sleep apnea?</summary><p>Mouth and facial exercises may help selected patients as part of a treatment plan. Snoring, gasping during sleep, or persistent daytime sleepiness deserve medical evaluation. Exercises do not replace a sleep study, CPAP, or other prescribed treatment. <a href="https://www.nhlbi.nih.gov/health/sleep-apnea/treatment" target="_blank" rel="noreferrer">Explore NIH treatment guidance ↗</a></p></details>
            <details><summary>Can inflamed gums and early tooth decay improve?</summary><p>Plaque-related gingivitis can often be reversed with effective home care and professional cleaning. Periodontitis needs ongoing management. Early decay before a hole forms may be arrested or remineralized with appropriate care; established cavities need a dental assessment. Fluoride and other established preventive options have evidence that varies by the type of lesion. <a href="https://www.nidcr.nih.gov/health-info/oral-hygiene" target="_blank" rel="noreferrer">NIH gum-care guidance ↗</a> · <a href="https://www.ada.org/resources/ada-library/oral-health-topics/caries-risk-assessment-and-management" target="_blank" rel="noreferrer">ADA prevention guidance ↗</a></p></details>
            <details><summary>How strong is the evidence for ozone?</summary><p>Evidence depends on the proposed use. A systematic review found insufficient, very-low-certainty evidence to recommend ozone for treating tooth decay. Ask about the expected benefit, delivery method, safety precautions, and established alternatives before choosing it. <a href="https://pubmed.ncbi.nlm.nih.gov/33303100/" target="_blank" rel="noreferrer">Read the research review ↗</a></p></details>
          </div>
          <a className="button button-primary questions-cta" href="#contact">Discuss your concerns with us ↗</a>
        </div>
      </section>

      <section className="section resource-band"><div className="container"><div className="section-head"><small>PATIENT GUIDES</small><h2>A clearer path to your next visit.</h2><p>Prepare your questions, understand your options, and feel more confident about your next step.</p></div><ResourceCards limit={3}/><a className="care-link" href="/resources/">Explore all patient guides ↗</a></div></section>

      <section className="section" id="contact">
        <div className="container">
          <div className="section-head">
            <small>Your next step</small>
            <h2>Let’s talk about what’s bothering you.</h2>
            <p>Tell us whether your main concern is your gums, enamel, breathing, or oral habits. Request an appointment in Point Richmond or call 415.755.5549 to discuss whether our care is a fit.</p>
          </div>

          <div className="contact-shell reveal">
            <div className="contact-card">
              <h3 className="contact-title">Request an appointment</h3>

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
                onSubmit={handleContactSubmit}
              >
                <input type="text" name="name" aria-label="Your name" autoComplete="name" placeholder="Your name" required />
                <input type="email" name="email" aria-label="Your email" autoComplete="email" placeholder="Your email" required />
                <input
                  type="tel"
                  name="phone" aria-label="Your phone number" autoComplete="tel"
                  placeholder="Your phone number"
                  inputMode="tel"
                  required
                />
                <textarea name="message" aria-label="How can we help?" placeholder="How can we help?" required />
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  className="hp-field"
                />
                <button type="submit" className="button button-light" disabled={isSubmittingContact}>{isSubmittingContact ? "Sending..." : "Send appointment request"}</button>
                {contactStatus.type !== "idle" && (
                  <p className={`contact-form-note ${contactStatus.type === "success" ? "contact-success" : "contact-error"}`} role="status">
                    {contactStatus.message}
                  </p>
                )}
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

      </> : <Interior page={page} />}
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <div>COPYRIGHT © 2026 • Pannu Holistic</div>
          <div className="footer-links">{navigation.map(link=><a key={link.href} href={link.href}>{link.label}</a>)}<a href="/community/">Social updates</a><a href="/questions/">Care questions</a><a href="/products/">Products</a><a href="/patient-stories/">Patient stories</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/resources/feed.xml">RSS</a></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
