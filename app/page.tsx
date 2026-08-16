"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/pokemon-tcg-pocket" : "";
const asset = (path: string) => `${basePath}${path}`;
const officialHeroVideo = "https://tcgpocket.pokemon.com/videos/background-video.mp4";
const officialTrailerEmbed =
  "https://www.youtube.com/embed/W_s8I736G2k?autoplay=1&rel=0&modestbranding=1";

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
      {!reducedMotion && (
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster={asset("/assets/hero-fallback.jpg")}
          aria-hidden="true"
        >
          <source src={officialHeroVideo} type="video/mp4" />
        </video>
      )}
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <img
          className="hero-logo"
          src={asset("/assets/tcgpocket-logo.webp")}
          alt="Pokémon Trading Card Game Pocket"
        />
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
        <div className="store-badges" aria-label="Download links">
          <a href="https://apps.apple.com/app/id6479970832?mt=8">
            <img src={asset("/assets/app-store-badge.webp")} alt="Download on the App Store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=jp.pokemon.pokemontcgp">
            <img src={asset("/assets/google-play-badge.webp")} alt="Get it on Google Play" />
          </a>
        </div>
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

function NewsGrid() {
  const [forumItem] = newsItems.slice(-1);
  const topStories = newsItems.slice(0, 3);

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
        {topStories.map((item, itemIndex) => (
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
      <article className="forum-banner reveal-item">
        <img src={asset(forumItem.image)} alt="" />
        <div>
          <p>
            {forumItem.category} · {forumItem.date}
          </p>
          <h3>{forumItem.title}</h3>
          <a href="https://community.pokemon.com/en-us/categories/tcg-pocket">
            Visit Forums
          </a>
        </div>
      </article>
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
          Experience the fun of collecting Pokémon TCG cards in a new digital format. Open packs,
          discover cards with nostalgic illustrations and new artwork, then keep your collection
          close wherever you go.
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

function AboutTcg() {
  return (
    <section
      className="section about-tcg-section reveal"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 252, 255, 0.94), rgba(248, 252, 255, 0.94)), url(${asset("/assets/poke-pattern.png")})`
      }}
    >
      <div>
        <p className="eyebrow">About the Pokémon Trading Card Game</p>
        <h2>Start with collecting, then discover the game behind the cards.</h2>
      </div>
      <div className="about-copy">
        <p>
          The Pokémon Trading Card Game has been enjoyed by fans around the world for decades.
          Pokémon TCG Pocket keeps the joy of opening packs and building a collection at the center
          while making each session quick, visual, and easy to revisit.
        </p>
        <a className="secondary-link" href="https://tcg.pokemon.com/en-us/">
          Learn about Pokémon TCG
        </a>
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
        <p>
          Some cards let you leap into the world of their illustration, turning a favorite pull
          into a small scene you can linger on.
        </p>
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
        <iframe
          src={officialTrailerEmbed}
          title="Pokémon TCG Pocket: Ruler of the Skies | Official Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div>
          <h2 id="trailer-title">Pokémon TCG Pocket Details!</h2>
          <p>Watch the official trailer in-page, then return to the card experience.</p>
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
        <VideoDetails onOpen={() => setModalOpen(true)} />
        <NewsGrid />
        <GameOverview />
        <ImmersiveTabs />
        <AboutTcg />
        <Newsletter />
      </main>
      <Footer />
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
