"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/pokemon-tcg-pocket" : "";
const asset = (path: string) => `${basePath}${path}`;

type CarouselCard = {
  id: string;
  title: string;
  element: string;
  description: string;
  image: string;
  accent: string;
};

type NewsItem = {
  title: string;
  category: string;
  image: string;
  date: string;
};

type TabItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent: string;
};

type PackCard = {
  title: string;
  rarity: string;
  image: string;
  accent: string;
};

const navLinks = [
  { href: "#available", label: "Available Now" },
  { href: "#details", label: "Details" },
  { href: "#news", label: "News" },
  { href: "#cards", label: "Cards" }
];

const carouselCards: CarouselCard[] = [
  {
    id: "pikachu",
    title: "Pikachu ex",
    element: "Lightning",
    description: "Open a pack and step into a sparkling illustrated world.",
    image: "/assets/immersive-pikachu.webp",
    accent: "#f5cc20"
  },
  {
    id: "charizard",
    title: "Charizard ex",
    element: "Fire",
    description: "Feel every card burst with cinematic heat and depth.",
    image: "/assets/charizard-card.webp",
    accent: "#f2643a"
  },
  {
    id: "collect",
    title: "Daily Packs",
    element: "Collection",
    description: "Collect, display, and revisit favorite pulls every day.",
    image: "/assets/news-wonder.webp",
    accent: "#55b9ff"
  }
];

const newsItems: NewsItem[] = [
  {
    title: "Discover Your Sense of Wonder in Pokémon TCG Pocket",
    category: "Expansion",
    image: "/assets/news-wonder.webp",
    date: "Aug 2026"
  },
  {
    title: "Build Your Dream Deck in Pokémon TCG Pocket",
    category: "Strategy",
    image: "/assets/news-deck.webp",
    date: "Guide"
  },
  {
    title: "A Guide to Collecting Cards and Wonder Picks",
    category: "Collecting",
    image: "/assets/news-collectors.webp",
    date: "Tips"
  },
  {
    title: "Visit the Pokémon TCG Pocket Community Forums",
    category: "Community",
    image: "/assets/news-community.jpg",
    date: "Forum"
  }
];

const tabItems: TabItem[] = [
  {
    id: "lightning",
    label: "Lightning",
    title: "Cards that spark to life",
    description:
      "Swipe through immersive artwork that opens like a tiny animated scene, built for the quick rhythm of mobile play.",
    image: "/assets/immersive-pikachu.webp",
    accent: "#ffce25"
  },
  {
    id: "fire",
    label: "Fire",
    title: "Big moments in every pack",
    description:
      "Foil shine, bold shadows, and deep color make rare pulls feel like a reveal worth pausing for.",
    image: "/assets/charizard-card.webp",
    accent: "#ff6848"
  },
  {
    id: "water",
    label: "Water",
    title: "Collect at your own pace",
    description:
      "A calm collection flow keeps cards easy to browse, compare, favorite, and share between battles.",
    image: "/assets/card-spread.webp",
    accent: "#45b7ff"
  }
];

const packCards: PackCard[] = [
  {
    title: "Pikachu ex",
    rarity: "Immersive rare",
    image: "/assets/immersive-pikachu.webp",
    accent: "#ffce25"
  },
  {
    title: "Charizard ex",
    rarity: "Special art",
    image: "/assets/charizard-card.webp",
    accent: "#ff6848"
  },
  {
    title: "Wonder Pick",
    rarity: "Daily pull",
    image: "/assets/news-wonder.webp",
    accent: "#45b7ff"
  }
];

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Pokémon TCG Pocket home">
        TCG Pocket
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        className="icon-menu"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Toggle menu</span>
      </button>
      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

function Hero({
  reducedMotion,
  onToggleMotion
}: {
  reducedMotion: boolean;
  onToggleMotion: () => void;
}) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    };

    hero.addEventListener("pointermove", onPointerMove);
    return () => hero.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion]);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <Header />
      <button
        className="motion-toggle"
        type="button"
        aria-pressed={reducedMotion}
        onClick={onToggleMotion}
      >
        <span aria-hidden="true" className="motion-box" />
        Reduced motion
      </button>
      <div
        className="hero-media"
        style={{ backgroundImage: `url(${asset("/assets/hero-fallback.jpg")})` }}
        aria-hidden="true"
      />
      <div className="hero-glow" aria-hidden="true" />
      <div className="floating-card card-one" aria-hidden="true">
        Lightning
      </div>
      <div className="floating-card card-two" aria-hidden="true">
        Fire
      </div>
      <div className="floating-card card-three" aria-hidden="true">
        Water
      </div>
      <div className="hero-content">
        <img
          className="hero-logo"
          src={asset("/assets/tcgpocket-logo.webp")}
          alt="Pokémon Trading Card Game Pocket"
        />
        <div className="store-badges" aria-label="Download links">
          <a href="https://apps.apple.com/app/id6479970832?mt=8">
            <img src={asset("/assets/app-store-badge.webp")} alt="Download on the App Store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=jp.pokemon.pokemontcgp">
            <img src={asset("/assets/google-play-badge.webp")} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
}

function StoreCta() {
  return (
    <section
      id="available"
      className="section pattern-section available-section reveal"
      style={{ backgroundImage: `url(${asset("/assets/poke-pattern.png")})` }}
    >
      <div className="section-copy">
        <p className="eyebrow">Available Now</p>
        <h1>Pokémon Trading Card Game Pocket Is Available Now!</h1>
        <p>
          Open two booster packs every day at no cost, collect digital cards, and discover
          immersive artwork made for mobile.
        </p>
      </div>
      <div
        className="store-card"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url(${asset("/assets/poke-pattern.png")})`
        }}
      >
        <p className="eyebrow">Official Web Store</p>
        <h2>The official Pokémon Trading Card Game Pocket Web Store is now live!</h2>
        <a className="primary-button" href="https://store.pokemontcgpocket.com/en-US">
          Shop Now
        </a>
      </div>
    </section>
  );
}

function PackReveal({ reducedMotion }: { reducedMotion: boolean }) {
  const [opened, setOpened] = useState(false);
  const [round, setRound] = useState(0);

  const togglePack = () => {
    if (opened) {
      setOpened(false);
      window.setTimeout(() => setRound((value) => value + 1), reducedMotion ? 0 : 220);
      return;
    }
    setOpened(true);
  };

  return (
    <section className={`section pack-section ${opened ? "is-open" : ""}`}>
      <div className="pack-copy">
        <p className="eyebrow">Pack Opening</p>
        <h2>Make every pull feel like a reveal.</h2>
        <p>
          Fresh booster packs arrive with layered foil, bright card art, and a little burst of
          anticipation before the collection grows.
        </p>
        <button className="primary-button" type="button" onClick={togglePack}>
          {opened ? "Reset Pack" : "Open Pack"}
        </button>
      </div>
      <div className="pack-stage" aria-live="polite">
        <div className="pack-burst" aria-hidden="true" />
        <button
          className="booster-pack"
          type="button"
          onClick={togglePack}
          aria-label={opened ? "Reset pack opening" : "Open booster pack"}
        >
          <span>Pokémon</span>
          <strong>TCG Pocket</strong>
          <em>Booster Pack</em>
        </button>
        <div className="revealed-cards" key={round}>
          {packCards.map((card, index) => (
            <article
              className="pull-card"
              key={card.title}
              style={
                {
                  "--pull-accent": card.accent,
                  "--pull-index": index
                } as React.CSSProperties
              }
            >
              <img src={asset(card.image)} alt="" />
              <div>
                <span>{card.rarity}</span>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoDetails({
  onOpen
}: {
  onOpen: () => void;
}) {
  return (
    <section
      id="details"
      className="section details-section reveal"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(14, 43, 91, 0.86), rgba(16, 63, 130, 0.8)), url(${asset("/assets/devices-bg.jpg")})`
      }}
    >
      <div className="details-grid">
        <div>
          <p className="eyebrow">Details</p>
          <h2>Pokémon TCG Pocket Details!</h2>
          <p>
            Catch this quick feature reel to learn how collecting, Wonder Picks, and streamlined
            battles fit into a daily mobile card experience.
          </p>
          <button className="secondary-button" type="button" onClick={onOpen}>
            Watch Trailer
          </button>
        </div>
        <button className="video-poster" type="button" onClick={onOpen} aria-label="Open trailer">
          <img src={asset("/assets/trailer-thumbnail.jpg")} alt="Pokémon TCG Pocket trailer" />
          <span className="play-button" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function CardCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % carouselCards.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const active = carouselCards[index];
  const next = () => setIndex((value) => (value + 1) % carouselCards.length);
  const previous = () =>
    setIndex((value) => (value - 1 + carouselCards.length) % carouselCards.length);

  return (
    <section
      className="section carousel-section reveal"
      style={{ "--accent": active.accent } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current == null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 42) {
          if (delta < 0) next();
          else previous();
        }
        touchStart.current = null;
      }}
    >
      <div className="carousel-shell">
        <div className="carousel-copy">
          <p className="eyebrow">Featured Cards</p>
          <h2>Open a pack. Find a story.</h2>
          <p>
            Pokémon TCG Pocket turns collecting into a daily reveal, with digital cards that feel
            bright, layered, and alive.
          </p>
          <div className="carousel-controls">
            <button type="button" onClick={previous} aria-label="Previous card">
              ‹
            </button>
            <button type="button" onClick={next} aria-label="Next card">
              ›
            </button>
          </div>
        </div>
        <div className="carousel-stage" aria-live="polite">
          {carouselCards.map((card, cardIndex) => (
            <article
              key={card.id}
              className={`feature-card ${cardIndex === index ? "active" : ""}`}
              style={{ "--card-accent": card.accent } as React.CSSProperties}
              aria-hidden={cardIndex !== index}
            >
              <img src={asset(card.image)} alt="" />
              <div>
                <span>{card.element}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="dots" role="tablist" aria-label="Featured cards">
        {carouselCards.map((card, cardIndex) => (
          <button
            key={card.id}
            type="button"
            role="tab"
            aria-selected={cardIndex === index}
            aria-label={`Show ${card.title}`}
            onClick={() => setIndex(cardIndex)}
          />
        ))}
      </div>
    </section>
  );
}

function NewsGrid() {
  return (
    <section
      id="news"
      className="section news-section reveal"
      style={{
        backgroundImage: `linear-gradient(rgba(222, 238, 255, 0.92), rgba(222, 238, 255, 0.92)), url(${asset("/assets/poke-pattern.png")})`
      }}
    >
      <div className="section-heading">
        <p className="eyebrow">Latest News</p>
        <h2>Latest News</h2>
      </div>
      <div className="news-grid">
        {newsItems.map((item, itemIndex) => (
          <article
            className="news-card reveal-item"
            key={item.title}
            style={{ "--delay": `${itemIndex * 90}ms` } as React.CSSProperties}
          >
            <img src={asset(item.image)} alt="" />
            <div>
              <p>
                {item.category} · {item.date}
              </p>
              <h3>{item.title}</h3>
              <a href="#details">Learn more</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GameOverview() {
  return (
    <section className="section overview-section reveal">
      <div className="overview-media">
        <img src={asset("/assets/card-spread.webp")} alt="" />
      </div>
      <div className="overview-copy">
        <p className="eyebrow">Collect Anywhere</p>
        <h2>Pokémon Trading Card Game Pocket</h2>
        <p>
          Experience the fun of collecting Pokémon TCG cards with an app built for short sessions,
          quick reveals, and beautiful digital binders.
        </p>
        <div className="stat-row">
          <span>Daily packs</span>
          <span>Wonder picks</span>
          <span>Quick battles</span>
        </div>
      </div>
    </section>
  );
}

function ImmersiveTabs() {
  const [activeId, setActiveId] = useState(tabItems[0].id);
  const active = useMemo(
    () => tabItems.find((tab) => tab.id === activeId) ?? tabItems[0],
    [activeId]
  );

  return (
    <section
      id="cards"
      className="section tabs-section reveal"
      style={
        {
          "--accent": active.accent,
          backgroundImage: `linear-gradient(180deg, rgba(18, 39, 77, 0.9), rgba(27, 62, 126, 0.9)), url(${asset("/assets/card-spread.webp")})`
        } as React.CSSProperties
      }
    >
      <div className="section-heading">
        <p className="eyebrow">Immersive Cards</p>
        <h2>Immersive cards</h2>
      </div>
      <div className="tabs-layout">
        <div className="tab-list" role="tablist" aria-label="Immersive card elements">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={tab.id === active.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <article
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="tab-panel"
        >
          <img src={asset(active.image)} alt="" />
          <div>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section newsletter-section reveal">
      <div>
        <p className="eyebrow">Newsletter</p>
        <h2>Sign up for the newsletter!</h2>
        <p>Get updates about new cards, events, and official Pokémon TCG Pocket news.</p>
      </div>
      <form
        className="newsletter-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label htmlFor="email">Email address</label>
        <div>
          <input id="email" type="email" placeholder="trainer@example.com" required />
          <button type="submit">Subscribe</button>
        </div>
        <p aria-live="polite">
          {submitted ? "Thanks! This demo form is ready for a real newsletter service." : " "}
        </p>
      </form>
    </section>
  );
}

function VideoModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trailer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-button" onClick={onClose} aria-label="Close trailer">
          ×
        </button>
        <img src={asset("/assets/trailer-thumbnail.jpg")} alt="" />
        <div>
          <h2 id="trailer-title">Pokémon TCG Pocket Details!</h2>
          <p>
            This demo uses a modal preview instead of embedding the official video, keeping the
            interaction focused and GitHub Pages friendly.
          </p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <img src={asset("/assets/tcgpocket-logo.webp")} alt="Pokémon Trading Card Game Pocket" />
      <p>
        Fan-made interview project inspired by the official Pokémon Trading Card Game Pocket
        website.
      </p>
    </footer>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preferred = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(preferred || sessionStorage.getItem("reduced-motion") === "true");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
    sessionStorage.setItem("reduced-motion", String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-item"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    revealItems.forEach((item) => item.classList.remove("is-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    window.requestAnimationFrame(() => {
      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          item.classList.add("is-visible");
          observer.unobserve(item);
        }
      });
    });
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <Hero reducedMotion={reducedMotion} onToggleMotion={() => setReducedMotion((v) => !v)} />
      <main>
        <StoreCta />
        <PackReveal reducedMotion={reducedMotion} />
        <VideoDetails onOpen={() => setModalOpen(true)} />
        <CardCarousel reducedMotion={reducedMotion} />
        <NewsGrid />
        <GameOverview />
        <ImmersiveTabs />
        <Newsletter />
      </main>
      <Footer />
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
