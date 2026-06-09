import React, { useState, useEffect, useRef } from 'react';

/**
 * [Your Company Name] — Premium Landscaping Calgary Application Root
 * High-performance, highly polished React version built precisely with your layout design.
 */
export default function App() {
  // Navigation scrolling state and states
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const [showBtt, setShowBtt] = useState(false);

  // Active Modals Overlay active section ID
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Interactive Before/After Comparison Slider Position (0-100)
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Statistics counters loaded dynamically on mount
  const [statReviews, setStatReviews] = useState(0);
  const [statYears, setStatYears] = useState(0);
  const [statServed, setStatServed] = useState(0);

  // Interactive FAQ active index
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Toast feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastShow, setToastShow] = useState(false);

  // Quote Submission Form parameters state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Lawn Care']);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Monitor top offset for header shading
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowBtt(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up stats animated counting simulation
  useEffect(() => {
    const t1 = setTimeout(() => {
      // Reviews count: 0 -> 125
      let reviews = 0;
      const reviewsInterval = setInterval(() => {
        reviews += 5;
        if (reviews >= 125) {
          setStatReviews(125);
          clearInterval(reviewsInterval);
        } else {
          setStatReviews(reviews);
        }
      }, 20);

      // Years count: 0 -> 8
      let years = 0;
      const yearsInterval = setInterval(() => {
        years += 1;
        if (years >= 8) {
          setStatYears(8);
          clearInterval(yearsInterval);
        } else {
          setStatYears(years);
        }
      }, 100);

      // Served count: 0 -> 500
      let served = 0;
      const servedInterval = setInterval(() => {
        served += 15;
        if (served >= 500) {
          setStatServed(500);
          clearInterval(servedInterval);
        } else {
          setStatServed(served);
        }
      }, 20);

      return () => {
        clearInterval(reviewsInterval);
        clearInterval(yearsInterval);
        clearInterval(servedInterval);
      };
    }, 400);

    return () => clearTimeout(t1);
  }, []);

  // Before/After Dragging Move logic
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, pos)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    handleSliderMove(e.clientX);
    const pointerMoveHandler = (moveEvent: PointerEvent) => {
      handleSliderMove(moveEvent.clientX);
    };
    const pointerUpHandler = () => {
      window.removeEventListener('pointermove', pointerMoveHandler);
      window.removeEventListener('pointerup', pointerUpHandler);
    };
    window.addEventListener('pointermove', pointerMoveHandler);
    window.addEventListener('pointerup', pointerUpHandler);
  };

  // Toast feedback helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3800);
  };

  // Safe Navigation Scrolling
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const desktopNav = document.getElementById('nav');
    const offset = (desktopNav ? desktopNav.offsetHeight : 70) + 8;
    const position = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: 'smooth' });
    setDrawerOpen(false); // Make sure mobile menu closes on click
  };

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form Submission event
  const submitForm = () => {
    if (!firstName.trim()) {
      triggerToast('Please enter your first name.');
      return;
    }
    if (!phoneNumber.trim()) {
      triggerToast('Please enter your phone number.');
      return;
    }
    if (selectedServices.length === 0) {
      triggerToast('Please check at least one service you need.');
      return;
    }

    setFormSubmitted(true);
    triggerToast("🌿 Quote request received! We'll be in touch within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] antialiased font-sans selection:bg-[var(--lime)] selection:text-[var(--ink)]">
      
      {/* PROMO BANNER */}
      {promoVisible && (
        <div id="promo" className="transition-all duration-300">
          <span>🌿 &nbsp;Calgary Spring Bookings Now Open — Book before July 1st and save 15% on any service</span>
          <button id="promo-close" onClick={() => setPromoVisible(false)} aria-label="Close">×</button>
        </div>
      )}

      {/* NAV BAR */}
      <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={goTop}>
            <svg className="nav-logo-icon" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#0d1a0f"/>
              <path d="M18 8 C14 12 10 16 12 21 C14 26 22 26 24 21 C26 16 22 12 18 8Z" fill="#c8e84e"/>
              <line x1="18" y1="22" x2="18" y2="30" stroke="#c8e84e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="nav-logo-text">
              <span className="ph">[Company]</span>
              <br/>
              <em>Landscaping</em>
            </div>
          </div>
          
          <div className="nav-links">
            <a onClick={() => goTo('services-sec')}>Services</a>
            <a onClick={() => goTo('process-sec')}>How It Works</a>
            <a onClick={() => goTo('pricing-sec')}>Pricing</a>
            <a onClick={() => goTo('reviews-sec')}>Reviews</a>
            <a onClick={() => goTo('contact-sec')}>Contact</a>
            <a onClick={() => goTo('quote-sec')} className="nav-cta-btn btn">Free Quote →</a>
          </div>

          <button className={`ham ${drawerOpen ? 'x' : ''}`} onClick={() => setDrawerOpen(!drawerOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* DRAWER FOR MOBILE NAVIGATION */}
      {drawerOpen && (
        <>
          <div id="drawer-overlay" onClick={() => setDrawerOpen(false)} className="open"></div>
          <nav id="drawer" className="open">
            <a onClick={() => goTo('services-sec')}>Services</a>
            <a onClick={() => goTo('process-sec')}>How It Works</a>
            <a onClick={() => goTo('pricing-sec')}>Pricing</a>
            <a onClick={() => { goTo('faq-sec'); setDrawerOpen(false); }}>FAQ</a>
            <a onClick={() => goTo('reviews-sec')}>Reviews</a>
            <a onClick={() => goTo('contact-sec')}>Contact</a>
            <a onClick={() => goTo('quote-sec')} className="d-cta">Get Free Quote →</a>
          </nav>
        </>
      )}

      {/* HERO HERO SECTION */}
      <section className="hero">
        <img 
          className="hero-img" 
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=85" 
          loading="eager" 
          alt="Premium lawn and landscape in Calgary" 
        />
        <div className="hero-grad"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">Calgary's #1 Rated Landscaping Crew</div>
          <h1>Your Property.<br/><em>Our Obsession.</em></h1>
          <p className="hero-sub">Premium lawn care, landscaping, and property maintenance for Calgary homeowners and businesses who demand the best.</p>
          <div className="hero-btns">
            <button className="btn btn-lime btn-arrow" onClick={() => goTo('quote-sec')}>Get Free Quote</button>
            <button className="btn btn-white" onClick={() => goTo('services-sec')}>Explore Services</button>
          </div>
        </div>
        
        <div className="hero-badge">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="circ" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
            </defs>
            <circle cx="60" cy="60" r="50" fill="rgba(200,232,78,0.15)" stroke="#c8e84e" strokeWidth="1"/>
            <circle cx="60" cy="60" r="38" fill="#c8e84e"/>
            <text fontFamily="Playfair Display, serif" fontSize="20" fontWeight="900" fill="#0d1a0f" textAnchor="middle" dominantBaseline="middle" x="60" y="56">5.0</text>
            <text fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#0d1a0f" textAnchor="middle" x="60" y="72">★★★★★</text>
            <text fill="rgba(255,255,255,0.7)" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="2.5">
              <textPath href="#circ" startOffset="10%">CALGARY • TRUSTED • RATED •&nbsp;</textPath>
            </text>
          </svg>
        </div>

        <div className="hero-scroll" onClick={() => goTo('marquee-sec')}>
          <div className="hero-scroll-line"></div>
          <span>scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" id="marquee-sec">
        <div className="marquee-track">
          {[1, 2].map((group) => (
            <React.Fragment key={group}>
              <div className="marquee-item"><span className="marquee-dot"></span>Lawn Mowing</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Snow Removal</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Spring Clean Up</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Fall Clean Up</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Landscaping</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Hardscaping</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Aeration</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Fertilization</div>
              <div className="marquee-item"><span className="marquee-dot"></span>Commercial Maintenance</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section style={{ background: 'var(--cream)' }}>
        <div className="about-wrap">
          <div className="about-img-stack rev-l">
            <img className="about-img-main" src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=80" alt="Calgary landscaping team" />
            <img className="about-img-accent" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Lawn care Calgary" />
            <div className="about-badge">
              <strong>{statServed}</strong>
              <span>Properties Served</span>
            </div>
          </div>
          <div className="about-text rev-r">
            <div className="eyebrow">About Us</div>
            <h2 className="display" style={{ marginBottom: '20px' }}>Calgary's <em>Trusted</em><br/>Outdoor Experts</h2>
            <p>We're a local, family-run landscaping crew based in Calgary. Every yard we touch gets the same obsessive attention to detail — whether it's a weekly mow or a complete outdoor transformation.</p>
            <p>We've built our reputation one lawn at a time, with honest pricing, reliable scheduling, and results that speak for themselves.</p>
            <div className="about-checks">
              <div className="about-check"><div className="check-circle">✓</div>Fully licensed &amp; insured in Alberta</div>
              <div className="about-check"><div className="check-circle">✓</div>Serving all Calgary neighbourhoods</div>
              <div className="about-check"><div className="check-circle">✓</div>Year-round maintenance available</div>
              <div className="about-check"><div className="check-circle">✓</div>Free, no-obligation estimates</div>
            </div>
            <button className="btn btn-ink btn-arrow" onClick={() => goTo('quote-sec')}>Get Your Free Quote</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bg" id="stats-sec">
        <div className="stats-inner">
          <div className="stat-cell rev">
            <div className="stat-num"><span>{statReviews}</span>+</div>
            <div className="stat-lbl">5-Star Reviews</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '90%' }}></div></div>
          </div>
          <div className="stat-cell rev">
            <div className="stat-num"><span>{statYears}</span>+</div>
            <div className="stat-lbl">Years in Calgary</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '70%' }}></div></div>
          </div>
          <div className="stat-cell rev">
            <div className="stat-num"><span>{statServed}</span>+</div>
            <div className="stat-lbl">Properties Served</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '95%' }}></div></div>
          </div>
          <div className="stat-cell rev">
            <div className="stat-num">100<span style={{ fontSize: '1.6rem' }}>%</span></div>
            <div className="stat-lbl">Satisfaction Guaranteed</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '100%' }}></div></div>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="services-bg" id="services-sec">
        <div className="services-header">
          <div className="rev-l">
            <div className="eyebrow">What We Do</div>
            <h2 className="display">Every Service Your<br/>Property <em>Needs</em></h2>
          </div>
          <button className="btn btn-outline rev-r" onClick={() => goTo('quote-sec')} style={{ flexShrink: 0 }}>See All Services →</button>
        </div>
        
        <div className="services-grid">

          <div className="svc rev svc-featured" onClick={() => setActiveModal('lawn')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Lawn Care Calgary" />
              <div className="svc-tag">Most Popular</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Lawn Maintenance &amp; Mowing</div>
              <p className="svc-text">Professional weekly or bi-weekly mowing, edging, and trimming designed specifically for Calgary's climate — keeping your grass thick and green all season.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

          <div className="svc rev" onClick={() => setActiveModal('snow')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=700&q=80" alt="Snow Removal Calgary" />
              <div className="svc-tag">Winter</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Snow &amp; Ice Control</div>
              <p className="svc-text">Fast, reliable snow removal for Calgary winters. Residential driveways and commercial sites. Seasonal contracts available.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

          <div className="svc rev" onClick={() => setActiveModal('spring')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80" alt="Spring Clean Up Calgary" />
              <div className="svc-tag">Spring</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Spring Clean Up</div>
              <p className="svc-text">Remove winter debris, prepare beds, and get your Calgary lawn ready to thrive heading into the growing season.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

          <div className="svc rev" onClick={() => setActiveModal('fall')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=700&q=80" alt="Fall Clean Up Calgary" />
              <div className="svc-tag">Fall</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Fall Clean Up</div>
              <p className="svc-text">Full leaf removal, final mow, bed preparation, and winterizer treatment to protect your lawn through the Calgary winter.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

          <div className="svc rev" onClick={() => setActiveModal('landscape')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=700&q=80" alt="Landscaping Calgary" />
              <div className="svc-tag">Design</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Landscaping &amp; Hardscaping</div>
              <p className="svc-text">From sod and garden beds to patios and retaining walls — full outdoor transformations for Calgary homes.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

          <div className="svc rev" onClick={() => setActiveModal('commercial')}>
            <div className="svc-img">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" alt="Commercial Landscaping Calgary" />
              <div className="svc-tag">Commercial</div>
            </div>
            <div className="svc-body">
              <div className="svc-title">Commercial Maintenance</div>
              <p className="svc-text">Year-round contract maintenance for Calgary office buildings, retail plazas, strata, and commercial properties.</p>
              <span className="svc-link">Learn More</span>
            </div>
          </div>

        </div>
      </div>

      {/* PROCESS */}
      <section className="process-bg" id="process-sec">
        <div className="process-inner">
          <div className="rev text-center max-w-[560px] mx-auto">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.4)', justifyContent: 'center' }}>Our Process</div>
            <h2 className="display text-white">Simple as <em>1, 2, 3</em></h2>
          </div>
          <div className="process-steps">
            <div className="process-step rev">
              <div className="process-num">01</div>
              <h3>Get a Free Quote</h3>
              <p>Fill out our quick form or call us. We'll visit your Calgary property and provide a clear, honest estimate — no pressure, no hidden fees.</p>
            </div>
            <div className="process-step rev">
              <div className="process-num">02</div>
              <h3>We Schedule &amp; Plan</h3>
              <p>You choose the service and timing. We handle everything else — equipment, crew, and any prep work needed for your specific property.</p>
            </div>
            <div className="process-step rev">
              <div className="process-num">03</div>
              <h3>We Do the Work</h3>
              <p>Our crew shows up on time with the right equipment. We work thoroughly and leave your property spotless — or we come back until it's right.</p>
            </div>
            <div className="process-step rev">
              <div className="process-num">04</div>
              <h3>You Relax &amp; Enjoy</h3>
              <p>Receive a completion photo and invoice. Simple online payment. Then just enjoy your beautiful Calgary property — we'll see you next time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER OVERLAY SECTION */}
      <section className="ba-bg" id="ba-sec">
        <div className="ba-inner">
          <div className="rev text-center max-w-[520px] mx-auto pb-6">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Results That Speak</div>
            <h2 className="display">See the <em>Difference</em></h2>
            <p className="text-[var(--ink-3)] text-[0.95rem] font-light mt-3">
              Drag the slider to reveal the transformation — this is what our Calgary crew can do for your property.
            </p>
          </div>
          
          <div className="ba-grid">
            {/* Interactive Dragging Comparison Slider */}
            <div 
              className="ba-slider rev-l" 
              id="ba-slider" 
              ref={sliderRef}
              onPointerDown={handlePointerDown}
            >
              <div className="ba-after">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="After — Clean Calgary lawn" />
              </div>
              <div 
                className="ba-before" 
                id="ba-before"
                style={{ width: `${100 - sliderPos}%` }}
              >
                <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80" alt="Before — Overgrown lawn" />
              </div>
              <div className="ba-line" id="ba-line" style={{ left: `${sliderPos}%` }}></div>
              <div className="ba-handle" id="ba-handle" style={{ left: `${sliderPos}%` }}>⟺</div>
              <div className="ba-label ba-label-before">Before</div>
              <div className="ba-label ba-label-after">After</div>
            </div>

            <div className="ba-features rev-r">
              <div style={{ marginBottom: '8px' }}>
                <div className="eyebrow">Why It Matters</div>
                <h3 className="display" style={{ fontSize: '1.8rem' }}>What You Get<br/><em>Every Visit</em></h3>
              </div>
              <div className="ba-feat">
                <div className="ba-feat-icon">🌿</div>
                <div>
                  <h4>Precision Edging</h4>
                  <p>Clean, defined borders between your lawn, beds, and driveways that make the whole property look sharp.</p>
                </div>
              </div>
              <div className="ba-feat">
                <div className="ba-feat-icon">✂️</div>
                <div>
                  <h4>Optimal Cut Height</h4>
                  <p>We cut at the right height for Calgary's climate — never scalping, always healthy.</p>
                </div>
              </div>
              <div className="ba-feat">
                <div className="ba-feat-icon">🍃</div>
                <div>
                  <h4>Complete Cleanup</h4>
                  <p>Every clipping blown off every hard surface before we leave. No mess, ever.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TAB */}
      <div className="pricing-bg" id="pricing-sec">
        <div className="pricing-inner">
          <div className="rev text-center max-w-[560px] mx-auto">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Transparent Pricing</div>
            <h2 className="display">No Surprises.<br/><em>Ever.</em></h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '12px', fontSize: '0.95rem', fontWeight: 300 }}>Starting prices for a typical Calgary residential property. Custom quotes for all sizes.</p>
          </div>
          
          <div className="pricing-grid">
            <div className="plan rev">
              <div className="plan-name">Basic</div>
              <div className="plan-price">$65<span style={{ fontSize: '1rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-3)', fontWeight: 300 }}>/visit</span></div>
              <div className="plan-period">Small residential lot</div>
              <div className="plan-divider"></div>
              <div className="plan-features">
                <div className="plan-feat">Lawn mowing</div>
                <div className="plan-feat">String trimming</div>
                <div className="plan-feat">Driveway blow-down</div>
                <div className="plan-feat no">Edging</div>
                <div className="plan-feat no">Fertilization</div>
              </div>
              <button className="plan-btn plan-btn-dark" onClick={() => goTo('quote-sec')}>Get Quote →</button>
            </div>
            
            <div className="plan plan-popular rev">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-name">Standard</div>
              <div className="plan-price" style={{ color: 'var(--white)' }}>$95<span style={{ fontSize: '1rem', fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>/visit</span></div>
              <div className="plan-period">Average Calgary lot</div>
              <div className="plan-divider"></div>
              <div className="plan-features">
                <div className="plan-feat">Lawn mowing</div>
                <div className="plan-feat">String trimming</div>
                <div className="plan-feat">Driveway blow-down</div>
                <div className="plan-feat">Precision edging</div>
                <div className="plan-feat no">Fertilization</div>
              </div>
              <button className="plan-btn plan-btn-light" onClick={() => goTo('quote-sec')}>Get Quote →</button>
            </div>

            <div className="plan rev">
              <div className="plan-name">Premium</div>
              <div className="plan-price">$145<span style={{ fontSize: '1rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-3)', fontWeight: 300 }}>/visit</span></div>
              <div className="plan-period">Large lot / full service</div>
              <div className="plan-divider"></div>
              <div className="plan-features">
                <div className="plan-feat">Lawn mowing</div>
                <div className="plan-feat">String trimming</div>
                <div className="plan-feat">Driveway blow-down</div>
                <div className="plan-feat">Precision edging</div>
                <div className="plan-feat">Seasonal fertilization</div>
              </div>
              <button className="plan-btn plan-btn-dark" onClick={() => goTo('quote-sec')}>Get Quote →</button>
            </div>
          </div>
          <p className="rev text-center mt-6 text-[0.82rem] font-light text-[var(--ink-3)]">
            All prices in CAD. Taxes extra. Final pricing confirmed after free property assessment. <span className="ph">[Update with actual prices]</span>
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="faq-bg" id="faq-sec">
        <div className="faq-inner">
          <div className="rev-l">
            <div className="eyebrow">FAQ</div>
            <h2 className="display" style={{ marginBottom: '20px' }}>Questions?<br/><em>We've got answers.</em></h2>
            <p style={{ color: 'var(--ink-3)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '28px' }}>Can't find what you're looking for? Just give us a call or shoot us a message.</p>
            <button className="btn btn-ink btn-arrow" onClick={() => goTo('quote-sec')}>Contact Us</button>
          </div>
          
          <div className="faq-list rev-r">
            {[
              {
                q: 'Do I need to be home when you come?',
                a: "Nope! As long as we have access to your yard, you don't need to be home. We'll send you a completion photo when we're done so you always know the work is finished."
              },
              {
                q: 'What happens if it rains on my scheduled day?',
                a: "We monitor Calgary weather closely. If conditions are unsafe or would damage your lawn (e.g. cutting wet grass too short), we'll automatically reschedule for the next available day and notify you in advance."
              },
              {
                q: 'How do I pay?',
                a: "We invoice after each visit via email with a secure online payment link. We accept all major credit cards, e-transfer, and cheque. Commercial clients can be set up on monthly billing cycles."
              },
              {
                q: 'Are you insured in Alberta?',
                a: "Yes — we carry full liability insurance and WCB coverage. You're fully protected on every visit. We're happy to provide proof of insurance on request."
              },
              {
                q: 'Can I book a one-time service or is it recurring?',
                a: "Both! We offer one-time services (spring clean-up, snow removal, etc.) as well as weekly and bi-weekly recurring lawn maintenance. Recurring clients get priority scheduling and are locked in at a fixed rate."
              },
              {
                q: 'What Calgary neighbourhoods do you serve?',
                a: "We serve all Calgary neighbourhoods including NW, SW, NE, SE, and surrounding areas like Airdrie, Cochrane, and Chestermere. See our service area map below for details."
              }
            ].map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <div className="faq-q" onClick={() => setFaqOpenIndex(isOpen ? null : idx)}>
                    <span>{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </div>
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-bg" id="reviews-sec">
        <div className="reviews-inner">
          <div className="reviews-header rev">
            <div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>What Clients Say</div>
              <h2 className="display" style={{ color: 'var(--white)', marginTop: '8px' }}>Calgary <em>Loves</em> Us</h2>
            </div>
            <div className="rating-big">
              <div className="rating-num">5.0</div>
              <div className="rating-detail">
                <div className="stars-row">★★★★★</div>
                <div className="rating-count"><span className="ph">[X]</span> Google reviews</div>
              </div>
            </div>
          </div>
          
          <div className="reviews-grid">
            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Amazing service from start to finish. Professional, punctual, and our lawn has never looked better. They transformed our backyard completely."</p>
              <div className="review-author">
                <div className="review-avatar">SM</div>
                <div>
                  <div className="review-name">Sarah M.</div>
                  <div className="review-loc">NW Calgary</div>
                </div>
              </div>
            </div>

            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Called Monday, they were there Thursday. Did a fantastic spring clean-up and hauled everything away. Will definitely use them every season."</p>
              <div className="review-author">
                <div className="review-avatar">JT</div>
                <div>
                  <div className="review-name">James T.</div>
                  <div className="review-loc">SW Calgary</div>
                </div>
              </div>
            </div>

            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Best landscaping crew in Calgary. Showed up on time every single week all summer. Our neighbours constantly ask who does our lawn!"</p>
              <div className="review-author">
                <div className="review-avatar">LK</div>
                <div>
                  <div className="review-name">Linda K.</div>
                  <div className="review-loc">SE Calgary</div>
                </div>
              </div>
            </div>

            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Very competitive pricing and top quality work. They transformed our overgrown backyard into something beautiful. Super happy with the result!"</p>
              <div className="review-author">
                <div className="review-avatar">AP</div>
                <div>
                  <div className="review-name">Anna P.</div>
                  <div className="review-loc">Airdrie</div>
                </div>
              </div>
            </div>

            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Our commercial property has never looked this clean. The crew is consistent, thorough, and always goes above and beyond what we expect."</p>
              <div className="review-author">
                <div className="review-avatar">RG</div>
                <div>
                  <div className="review-name">Rob G.</div>
                  <div className="review-loc">Calgary Property Manager</div>
                </div>
              </div>
            </div>

            <div className="review-card rev">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Snow was gone before I even woke up! Signed up for the seasonal contract and it's completely worth it. True peace of mind every winter."</p>
              <div className="review-author">
                <div className="review-avatar">MK</div>
                <div>
                  <div className="review-name">Mark K.</div>
                  <div className="review-loc">NE Calgary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE AREA MAP AND CONTACT DETAILED LAYOUT */}
      <div className="map-bg" id="contact-sec">
        <div className="map-inner">
          <div className="rev-l">
            <div className="eyebrow">Service Area</div>
            <h2 className="display" style={{ marginBottom: '16px' }}>We Serve All of <em>Calgary</em></h2>
            <p style={{ color: 'var(--ink-3)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '28px' }}>From NW to SE, we've got your neighbourhood covered. We also serve nearby Airdrie, Cochrane, and Chestermere.</p>
            
            <div className="map-areas">
              <div className="area-chip">NW Calgary</div>
              <div className="area-chip">SW Calgary</div>
              <div className="area-chip">NE Calgary</div>
              <div className="area-chip">SE Calgary</div>
              <div className="area-chip">Downtown</div>
              <div className="area-chip">Airdrie</div>
              <div className="area-chip">Cochrane</div>
              <div className="area-chip">Chestermere</div>
            </div>
            
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--ink-2)' }}>📞 &nbsp;<span className="ph">[Your Phone Number]</span></div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--ink-2)' }}>✉️ &nbsp;<span className="ph">[your@email.com]</span></div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--ink-2)' }}>🕐 &nbsp;<span className="ph">[Mon – Sat, 9am – 9pm]</span></div>
            </div>
          </div>
          
          <div className="map-frame rev-r">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d161673.28296566!2d-114.24273!3d51.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1699999999999"
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer" 
              title="Calgary Service Area"
            ></iframe>
          </div>
        </div>
      </div>

      {/* REQUEST QUOTE FORM SECTION (FUNCTIONAL & REPLACEMENT OF GET QUOTE DROPDOWN WITH CHECKBOXES) */}
      <div className="cta-bg" id="quote-sec">
        <div className="cta-inner">
          <div className="cta-text rev-l">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>Free Estimate</div>
            <h2>Get Your <em>Free</em><br/>Quote Today</h2>
            <p style={{ marginTop: '16px' }}>No pressure. No hidden fees. Just an honest price for your Calgary property — usually within 24 hours.</p>
            
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,232,78,0.12)', border: '1px solid rgba(200,232,78,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>✓</div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300 }}>Response within 24 hours</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,232,78,0.12)', border: '1px solid rgba(200,232,78,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>✓</div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300 }}>No obligation to book</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,232,78,0.12)', border: '1px solid rgba(200,232,78,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>✓</div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300 }}>Serving all Calgary areas</span>
              </div>
            </div>
          </div>

          <div className="cta-form rev-r" id="quote-form-wrap">
            {!formSubmitted ? (
              <>
                <h3>Request a Free Quote</h3>
                <p>Fill in your details and select the services you desire.</p>
                
                <div className="form-row">
                  <div className="form-field">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      placeholder="John" 
                      required 
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder="Smith" 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder="(403) 555-0100" 
                    required 
                  />
                </div>

                {/* BEAUTIFUL COLLAPSIBLE SERVICE SELECTOR - PRECISELY DESIGNED WITH CHECKBOXES */}
                <div className="form-field">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/50">What Service(s) are you Interested In?</label>
                  <button 
                    type="button"
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white/[0.07] border border-white/10 hover:border-white/25 rounded-lg p-3 text-sm text-left text-white transition-all cursor-pointer focus:border-[var(--lime)] h-[48px]"
                  >
                    <span className="truncate pr-4 text-xs font-light text-white/80">
                      {selectedServices.length === 0 
                        ? "Select Services (Click to expand)..." 
                        : `${selectedServices.length} Selected: ${selectedServices.join(', ')}`
                      }
                    </span>
                    <span className={`text-[var(--lime)] text-xs transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <div 
                    className="transition-all duration-300 ease-out overflow-hidden"
                    style={{
                      maxHeight: servicesDropdownOpen ? '420px' : '0px',
                      opacity: servicesDropdownOpen ? 1 : 0,
                      marginTop: servicesDropdownOpen ? '10px' : '0px'
                    }}
                  >
                    <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-2 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[225px] overflow-y-auto pr-1">
                        {[
                          'Lawn Care',
                          'Aeration',
                          'Power Raking (Dethatching)',
                          'Overseeding',
                          'Fertilization',
                          'Yard Clean Up',
                          'Junk Removal',
                          'Mulch Installation',
                          'Gutter Cleaning',
                          'Landscaping / Hardscaping',
                          'Other (Please specify)'
                        ].map((svcName) => {
                          const checked = selectedServices.includes(svcName);
                          return (
                            <label 
                              key={svcName} 
                              className={`flex items-start gap-3 p-2.5 rounded-md cursor-pointer transition-all select-none border text-xs text-left text-white ${
                                checked 
                                  ? 'border-[var(--lime)] bg-[var(--lime)]/15 font-semibold' 
                                  : 'border-transparent hover:bg-white/5 text-white/75'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                checked={checked} 
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, svcName]);
                                  } else {
                                    setSelectedServices(selectedServices.filter(s => s !== svcName));
                                  }
                                }}
                                className="accent-[var(--lime)] cursor-pointer mt-0.5" 
                              />
                              <span>{svcName}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label>Calgary Neighbourhood / Area</label>
                  <input 
                    type="text" 
                    value={neighbourhood} 
                    onChange={(e) => setNeighbourhood(e.target.value)} 
                    placeholder="e.g. NW Calgary, Airdrie..." 
                  />
                </div>

                <button 
                  className="btn btn-lime text-center justify-center mt-3" 
                  style={{ width: '100%', fontSize: '0.95rem', padding: '16px' }}
                  onClick={submitForm}
                >
                  Send My Free Quote Request →
                </button>
              </>
            ) : (
              <div className="form-success-msg" style={{ display: 'block' }}>
                <div className="check-big">🌿</div>
                <h4>We've got your request!</h4>
                <p className="mt-2 text-white/80">
                  Expect a prompt call or message from our Calgary team within 24 hours to discuss your selected services:
                </p>
                <div className="my-4 text-xs bg-white/5 p-3 rounded text-left border border-white/10 space-y-1 text-[var(--lime)]">
                  <strong>Name:</strong> {firstName} {lastName}<br/>
                  <strong>Phone:</strong> {phoneNumber}<br/>
                  <strong>Selected Services:</strong>
                  <ul className="list-disc list-inside pl-2 text-white/90">
                    {selectedServices.map(s => <li key={s}>{s}</li>)}
                  </ul>
                  {neighbourhood && (
                    <>
                      <strong>Property Location:</strong> {neighbourhood}
                    </>
                  )}
                </div>
                <button 
                  className="btn btn-white w-full py-2.5 text-xs tracking-wider uppercase mt-2 justify-center"
                  onClick={() => {
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setNeighbourhood('');
                    setSelectedServices(['Lawn Maintenance & Mowing']);
                    setFormSubmitted(false);
                  }}
                >
                  Submit Another Quote
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
              <svg width="28" height="28" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="18" fill="#c8e84e"/>
                <path d="M18 8 C14 12 10 16 12 21 C14 26 22 26 24 21 C26 16 22 12 18 8Z" fill="#0d1a0f"/>
                <line x1="18" y1="22" x2="18" y2="30" stroke="#0d1a0f" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)' }}>
                <span className="ph">[Your Company]</span>
              </span>
            </div>
            <p>Premium landscaping and property maintenance across Calgary, Alberta. Quality you can see, reliability you can count on.</p>
            <div className="footer-socials">
              <div className="footer-social">📘</div>
              <div className="footer-social">📸</div>
              <div className="footer-social">🐦</div>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li onClick={() => setActiveModal('lawn')}>Lawn Maintenance</li>
              <li onClick={() => setActiveModal('snow')}>Snow Removal</li>
              <li onClick={() => setActiveModal('spring')}>Spring Clean Up</li>
              <li onClick={() => setActiveModal('fall')}>Fall Clean Up</li>
              <li onClick={() => setActiveModal('landscape')}>Landscaping</li>
              <li onClick={() => setActiveModal('commercial')}>Commercial</li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li onClick={() => goTo('about-sec')}>About Us</li>
              <li onClick={() => goTo('process-sec')}>How It Works</li>
              <li onClick={() => goTo('pricing-sec')}>Pricing</li>
              <li onClick={() => goTo('faq-sec')}>FAQ</li>
              <li onClick={() => goTo('reviews-sec')}>Reviews</li>
              <li onClick={() => goTo('contact-sec')}>Service Area</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-row">📍 <span className="ph">[Your Calgary Address]</span></div>
            <div className="footer-contact-row">📞 <span className="ph">[Your Phone Number]</span></div>
            <div className="footer-contact-row">✉️ <span className="ph">[your@email.com]</span></div>
            <div className="footer-contact-row">🕐 <span className="ph">[Mon – Sat, 9am – 9pm]</span></div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 <span className="ph">[Your Company Name]</span> — Calgary, AB. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <div id="float-cta">
        <a className="float-call" href="tel:+1"><span>📞</span> Call Now</a>
        <button className="float-quote" onClick={() => goTo('quote-sec')}><span>✉️</span> Free Quote</button>
      </div>

      {/* BACK TO TOP BUTTON */}
      <button id="btt" className={showBtt ? 'show' : ''} onClick={goTop} aria-label="Back to top">↑</button>

      {/* TOAST SYSTEM */}
      <div className={`toast ${toastShow ? 'show' : ''}`} id="toast">{toastMessage}</div>

      {/* ══════════════ INTUITIVE SERVICE DETAIL MODALS (100% CORRESPONDING TO YOUR HTML CONTENT) ══════════════ */}

      {activeModal === 'lawn' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Lawn Care Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Lawn Maintenance &amp; Mowing</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Professional lawn care built for Calgary's climate. We keep your grass thick, green, and healthy from the first spring thaw through to fall.</p>
              <h3>What's Included</h3>
              <ul>
                <li>Weekly or bi-weekly mowing at optimal height for Calgary grass</li>
                <li>Precision string trimming along all edges and obstacles</li>
                <li>Clean blow-down of clippings from all hard surfaces</li>
                <li>Seasonal aeration and overseeding available</li>
                <li>3-step fertilization program (spring, summer, fall)</li>
              </ul>
              <div className="modal-badge">💲 From $65/visit · Free assessment on first visit</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Get Free Quote</button>
                <button className="btn btn-outline" onClick={() => { setActiveModal(null); goTo('contact-sec'); }}>Our Service Area</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'snow' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=900&q=80" alt="Snow Removal Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Snow &amp; Ice Control</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Don't let a Calgary winter slow you down. Fast, reliable residential and commercial snow removal with priority dispatch for seasonal contract clients.</p>
              <h3>Services Offered</h3>
              <ul>
                <li>Driveway and walkway clearing after every snowfall</li>
                <li>Commercial parking lot plowing</li>
                <li>Ice salting and sand application</li>
                <li>Seasonal contracts — priority dispatch, locked-in rates</li>
              </ul>
              <div className="modal-badge">❄️ Seasonal contracts available · Per-visit rates also offered</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Get Free Quote</button>
                <button className="btn btn-outline" onClick={() => { setActiveModal(null); goTo('contact-sec'); }}>Service Area</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'spring' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80" alt="Spring Clean Up Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Spring Clean Up</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>After a Calgary winter, your property needs a fresh start. We remove all debris, dead material, and winter damage to get your lawn and beds thriving.</p>
              <h3>What We Do</h3>
              <ul>
                <li>Full leaf and debris removal from lawn and garden beds</li>
                <li>First mow and edge of the season</li>
                <li>Cut back dead perennials and ornamental grasses</li>
                <li>Light dethatching / raking of matted grass</li>
                <li>Complete haul-away of all debris</li>
              </ul>
              <div className="modal-badge">🌱 Book by April for priority scheduling</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Book Spring Clean Up</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'fall' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80" alt="Fall Clean Up Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Fall Clean Up</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Proper fall preparation is the most important thing you can do for your Calgary lawn's long-term health. We leave it ready to bounce back beautifully in spring.</p>
              <h3>What We Do</h3>
              <ul>
                <li>Complete leaf and debris removal from all areas</li>
                <li>Final mow at proper winter height</li>
                <li>Trim back perennials and shrubs</li>
                <li>Apply winterizer fertilizer for spring readiness</li>
                <li>Full debris haul-away included</li>
              </ul>
              <div className="modal-badge">🍂 Book before October for best availability</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Book Fall Clean Up</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'landscape' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=80" alt="Landscaping Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Landscaping &amp; Hardscaping</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Transform your Calgary outdoor space from ordinary to extraordinary. From full backyard redesigns to simple garden refreshes — we do it all.</p>
              <h3>Landscaping</h3>
              <ul>
                <li>Sod installation and lawn establishment</li>
                <li>Garden bed design and planting</li>
                <li>Mulch, rock, and decorative gravel installation</li>
                <li>Grading and drainage solutions</li>
              </ul>
              <h3>Hardscaping</h3>
              <ul>
                <li>Patio and walkway installation (paving stone, concrete)</li>
                <li>Retaining walls and raised garden beds</li>
                <li>Fire pit areas and outdoor living spaces</li>
              </ul>
              <div className="modal-badge">🪴 Custom quotes for every project size</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Get Project Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'commercial' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <div className="modal-hero">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80" alt="Commercial Calgary" />
              <div className="modal-hero-grad"></div>
              <div className="modal-hero-title">Commercial Maintenance</div>
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Your commercial property tells clients what to expect from your business. We keep it looking sharp year-round — consistently, reliably, on contract.</p>
              <h3>Who We Work With</h3>
              <ul>
                <li>Property management companies</li>
                <li>Strata and condo corporations</li>
                <li>Retail plazas and office buildings</li>
                <li>Schools, churches, and institutions</li>
              </ul>
              <h3>Contract Services</h3>
              <ul>
                <li>Year-round lawn and landscape maintenance</li>
                <li>Snow removal and de-icing</li>
                <li>Spring and fall clean-ups</li>
                <li>Monthly invoicing available</li>
              </ul>
              <div className="modal-badge">🏢 Annual contracts available · Custom pricing</div>
              <div className="modal-cta-row">
                <button className="btn btn-ink btn-arrow" onClick={() => { setActiveModal(null); goTo('quote-sec'); }}>Request Commercial Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
