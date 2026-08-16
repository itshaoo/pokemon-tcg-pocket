"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/pokemon-tcg-pocket" : "";
const asset = (path: string) => `${basePath}${path}`;
const officialHeroVideo = "https://tcgpocket.pokemon.com/videos/background-video.mp4";
const officialTrailerEmbed =
  "https://www.youtube.com/embed/W_s8I736G2k?autoplay=1&rel=0&modestbranding=1";

type NewsItem = {
  title: string;
  image: string;
};

const newsItems: NewsItem[] = [
  {
    title: "Discover Your Sense of Wonder in Pokémon TCG Pocket",
    image: "/assets/news-wonder.webp"
  },
  {
    title: "Build Your Dream Deck in Pokémon TCG Pocket",
    image: "/assets/news-deck.webp"
  },
  {
    title: "Pokémon TCG Pocket Collecting Guide",
    image: "/assets/news-collectors.webp"
  },
  {
    title: "Connect with fellow Pokémon TCG Pocket players in the Pokémon Community forums.",
    image: "/assets/news-community.jpg"
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
        <h1>Pokémon Trading Card Game Pocket Is Available Now!</h1>
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

function WebStore() {
  return (
    <section
      className="section web-store-section reveal"
      style={{
        backgroundImage: `linear-gradient(rgba(232, 244, 255, 0.92), rgba(232, 244, 255, 0.92)), url(${asset("/assets/poke-pattern.png")})`
      }}
    >
      <div className="web-store-copy">
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
          <h2>Pokémon TCG Pocket Details!</h2>
          <p>Catch this video to learn more about the gameplay and features of this game.</p>
          <button className="secondary-button" type="button" onClick={onOpen}>
            Learn more
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
              <h3>{item.title}</h3>
              <a href="https://tcgpocket.pokemon.com/en-us/news/">Learn more</a>
            </div>
          </article>
        ))}
      </div>
      <article className="forum-banner reveal-item">
        <img src={asset(forumItem.image)} alt="" />
        <div>
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
        <h2>Pokémon Trading Card Game Pocket</h2>
        <p>
          Experience the fun of collecting Pokémon Trading Card Game (TCG) cards with Pokémon
          Trading Card Game Pocket, an upcoming game for iOS and Android devices from Creatures
          Inc., the original developers of the Pokémon TCG, and DeNA Co., Ltd.
        </p>
        <p>
          In this game, you will be able to open two booster packs every day at no cost. You can
          collect digital cards featuring nostalgic artwork from the past as well as brand-new cards
          that are exclusive to Pokémon Trading Card Game Pocket.
        </p>
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
        <h2>About the Pokémon Trading Card Game</h2>
      </div>
      <div className="about-copy">
        <p>
          Debuting in October 1996, the Pokémon Trading Card Game is based on the world introduced
          in the Pokémon video game series. Players can collect cards featuring their favorite
          Pokémon characters, build powerful decks, and face off against opponents in strategic
          battles.
        </p>
        <p>
          This highly social game has been sold in 14 languages and has been played in 89 countries
          or regions, making it a great way for fans around the world to experience the world of
          Pokémon!
        </p>
      </div>
    </section>
  );
}

function ImmersiveCards() {
  return (
    <section
      id="cards"
      className="section immersive-section reveal"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18, 39, 77, 0.86), rgba(27, 62, 126, 0.86)), url(${asset("/assets/immersive-pikachu.webp")})`
      }}
    >
      <div className="immersive-copy">
        <h2>Immersive cards</h2>
        <p>
          Be on the lookout for new “immersive cards,” which will make you feel as though you’ve
          leapt into the world of the card’s illustration.
        </p>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="section newsletter-section reveal">
      <div>
        <h2>Sign up for the newsletter!</h2>
        <p>Be among the first to receive new game announcements!</p>
      </div>
      <a className="primary-button" href="https://www.pokemon.com/us/newsletter">
        Subscribe
      </a>
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
          <p>Catch this video to learn more about the gameplay and features of this game.</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <img src={asset("/assets/tcgpocket-logo.webp")} alt="Pokémon Trading Card Game Pocket" />
      <nav aria-label="Footer links">
        <a href="https://www.pokemon.com/us/privacy-notice">Privacy Notice</a>
        <a href="https://www.pokemon.com/us/terms-of-use">Terms of Use</a>
        <a href="https://support.pokemon.com/">Customer Service</a>
        <a href="https://community.pokemon.com/en-us/categories/tcg-pocket">Forums</a>
      </nav>
      <p>Products, contents, features, etc. subject to changes.</p>
      <p>Screenshots and footage are from a product in development and not final.</p>
      <p>Free-to-start; optional in-game purchases available.</p>
      <p>Cards may vary by pack.</p>
      <p>
        Android, Google Play and the Google Play logo are trademarks of Google LLC. Apple, App
        Store, and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other
        countries.
      </p>
      <p>
        ©2024 Pokémon. ©1995–2024 Nintendo / Creatures Inc. / GAME FREAK inc. ©2024 DeNA Co., Ltd.
        TM, ® Nintendo.
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
        <WebStore />
        <VideoDetails onOpen={() => setModalOpen(true)} />
        <NewsGrid />
        <GameOverview />
        <ImmersiveCards />
        <AboutTcg />
        <Newsletter />
      </main>
      <Footer />
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
