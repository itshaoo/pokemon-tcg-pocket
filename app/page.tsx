"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/pokemon-tcg-pocket" : "";
const asset = (path: string) => `${basePath}${path}`;
const officialHeroVideo = "https://tcgpocket.pokemon.com/videos/background-video.mp4";
const officialShowcaseEmbed =
  "https://www.youtube.com/embed/W_s8I736G2k?autoplay=1&rel=0&modestbranding=1";
const officialDetailsEmbed =
  "https://www.youtube.com/embed/16duP6ga_Q8?autoplay=1&rel=0&modestbranding=1";
const officialCharizardVideo = "https://tcgpocket.pokemon.com/videos/charizard_revised_en.mp4";
const officialImmersiveVideo =
  "https://tcgpocket.pokemon.com/videos/pikachuimmersive_revised_en.mp4";

type ModalVideo = {
  description: string;
  src: string;
  title: string;
};

type OpenVideo = (src?: string, title?: string) => void;

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

function ImageDivider({
  src,
  alt = "",
  className = ""
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`image-divider ${className}`}
      aria-hidden={alt ? undefined : true}
      style={{ "--poke-pattern": `url(${asset("/assets/poke-pattern.png")})` } as React.CSSProperties}
    >
      <img src={asset(src)} alt={alt} />
    </div>
  );
}

function LoopMedia({
  alt,
  poster,
  reducedMotion,
  videoSrc
}: {
  alt: string;
  poster: string;
  reducedMotion: boolean;
  videoSrc: string;
}) {
  return (
    <div className="portrait-media">
      {reducedMotion ? (
        <img src={asset(poster)} alt={alt} />
      ) : (
        <video autoPlay loop muted playsInline poster={asset(poster)} aria-label={alt}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
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
        style={{ backgroundImage: `url(${asset("/assets/banner-fallback.jpg")})` }}
        aria-hidden="true"
      />
      {!reducedMotion && (
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster={asset("/assets/banner-fallback.jpg")}
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
    <section id="available" className="section available-section reveal">
      <div className="section-copy">
        <h1>Available Now!</h1>
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
    <section className="section web-store-section reveal">
      <div
        className="web-store-copy"
        style={{ "--poke-pattern": `url(${asset("/assets/poke-pattern.png")})` } as React.CSSProperties}
      >
        <h2>The official Pokémon Trading Card Game Pocket Web Store is now live!</h2>
        <a className="primary-button" href="https://store.pokemontcgpocket.com/en-US">
          Shop Now
        </a>
      </div>
    </section>
  );
}

function DeviceShowcase({
  onOpen
}: {
  onOpen: OpenVideo;
}) {
  return (
    <section className="device-showcase reveal">
      <button
        className="video-poster"
        type="button"
        onClick={() => onOpen(officialShowcaseEmbed, "Pokémon Trading Card Game Pocket")}
        aria-label="Open Pokémon TCG Pocket video"
      >
        <img src={asset("/assets/news-wonder.webp")} alt="Pokémon Trading Card Game Pocket" />
        <span className="play-button" aria-hidden="true" />
      </button>
    </section>
  );
}

function VideoDetails({
  onOpen
}: {
  onOpen: OpenVideo;
}) {
  return (
    <section id="details" className="section details-section reveal">
      <div className="details-grid">
        <div>
          <h2>Pokémon TCG Pocket Details!</h2>
          <p>Catch this video to learn more about the gameplay and features of this game.</p>
          <button className="secondary-button" type="button" onClick={() => onOpen()}>
            Learn more
          </button>
        </div>
        <button className="video-poster" type="button" onClick={() => onOpen()} aria-label="Open trailer">
          <img src={asset("/assets/trailer-thumbnail.jpg")} alt="Pokémon TCG Pocket trailer" />
          <span className="play-button" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function DevicesAnnouncement({
  onOpen
}: {
  onOpen: OpenVideo;
}) {
  return (
    <div
      className="tcg-devices-bg"
      style={
        {
          "--devices-bg": `url(${asset("/assets/tcg-devices-bg.jpg")})`,
          "--devices-pattern": `url(${asset("/assets/tcg-devices-bg-pattern.png")})`
        } as React.CSSProperties
      }
    >
      <StoreCta />
      <WebStore />
      <DeviceShowcase onOpen={onOpen} />
      <VideoDetails onOpen={onOpen} />
    </div>
  );
}

function NewsGrid() {
  const [forumItem] = newsItems.slice(-1);
  const topStories = newsItems.slice(0, 3);

  return (
    <section
      id="news"
      className="section news-section reveal"
      style={{ "--poke-pattern": `url(${asset("/assets/poke-pattern.png")})` } as React.CSSProperties}
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

function GameOverview({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="section overview-section reveal">
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
      <div className="overview-media">
        <LoopMedia
          alt="Pokémon Trading Card Game Pocket card animation"
          poster="/assets/charizard-video-fallback.png"
          reducedMotion={reducedMotion}
          videoSrc={officialCharizardVideo}
        />
      </div>
    </section>
  );
}

function ImmersiveCards({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="cards" className="section immersive-section reveal">
      <div className="immersive-media">
        <LoopMedia
          alt="Pokémon Trading Card Game Pocket immersive Pikachu card animation"
          poster="/assets/immersive-pikachu-fallback.png"
          reducedMotion={reducedMotion}
          videoSrc={officialImmersiveVideo}
        />
      </div>
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

function FeatureVideos({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="feature-video-bg">
      <GameOverview reducedMotion={reducedMotion} />
      <ImmersiveCards reducedMotion={reducedMotion} />
    </div>
  );
}

function AboutTcg() {
  return (
    <section className="about-tcg-section reveal">
      <div className="about-header-media">
        <img src={asset("/assets/cardspread-header.webp")} alt="" />
      </div>
      <div className="overview-copy">
        <h2>About the Pokémon Trading Card Game</h2>
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

function Newsletter() {
  return (
    <section className="section newsletter-section reveal">
      <div className="newsletter-content">
        <h2>Sign up for the newsletter!</h2>
        <p>Be among the first to receive new game announcements!</p>
        <a className="primary-button" href="https://www.pokemon.com/us/newsletter">
          Subscribe
        </a>
      </div>
    </section>
  );
}

function OfficialLowerSections() {
  return (
    <div
      className="official-lower-bg"
      style={{ "--cards-bg": `url(${asset("/assets/tcg-cards-bg-graphic.png")})` } as React.CSSProperties}
    >
      <AboutTcg />
      <ImageDivider src="/assets/pokeball-divider.webp" className="pokeball-divider" />
      <Newsletter />
    </div>
  );
}

function VideoModal({
  description,
  open,
  onClose,
  src,
  title
}: {
  description: string;
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
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
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div>
          <h2 id="trailer-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <img
        className="footer-logo"
        src={asset("/assets/tcgpocket-logo-footer.webp")}
        alt="Pokémon Trading Card Game Pocket"
      />
      <div className="region-selector" aria-label="Region">
        <span>Select your region — United States</span>
        <strong>United States</strong>
      </div>
      <nav aria-label="Footer links">
        <a href="https://www.pokemon.com/us/privacy-notice">Privacy Notice</a>
        <a href="https://www.pokemon.com/us/terms-of-use">Terms of Use</a>
        <a href="https://support.pokemon.com/">Customer Service</a>
        <a href="https://community.pokemon.com/en-us/categories/tcg-pocket">Forums</a>
      </nav>
      <div className="footer-logos" aria-label="Official logos">
        <img src={asset("/assets/logo-tpc.svg")} alt="The Pokemon Company" />
        <img src={asset("/assets/logo-nintendo.svg")} alt="Nintendo" />
        <img
          src={asset("/assets/privacy-badge.webp")}
          alt="BBB Caru - Kid's Privacy Safe Harbor"
        />
      </div>
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
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  const openVideo = (src = officialDetailsEmbed, title = "Pokémon TCG Pocket Details!") => {
    setModalVideo({
      description: "Catch this video to learn more about the gameplay and features of this game.",
      src,
      title
    });
  };

  useEffect(() => {
    const preferred = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(preferred || sessionStorage.getItem("reduced-motion") === "true");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
    sessionStorage.setItem("reduced-motion", String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;

    if (reducedMotion) {
      root.style.removeProperty("--scroll-blue-x");
      root.style.removeProperty("--scroll-blue-y");
      root.style.removeProperty("--scroll-white-x");
      root.style.removeProperty("--scroll-white-y");
      root.style.removeProperty("--scroll-soft-y");
      return;
    }

    let frame = 0;

    const updateScrollVars = () => {
      frame = 0;
      const scrollY = window.scrollY;
      root.style.setProperty("--scroll-blue-x", `${scrollY * -0.018}px`);
      root.style.setProperty("--scroll-blue-y", `${scrollY * -0.032}px`);
      root.style.setProperty("--scroll-white-x", `${scrollY * 0.012}px`);
      root.style.setProperty("--scroll-white-y", `${scrollY * -0.026}px`);
      root.style.setProperty("--scroll-soft-y", `${scrollY * -0.018}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollVars);
    };

    updateScrollVars();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  useEffect(() => {
    let frame = 0;

    const updateBackTop = () => {
      frame = 0;
      setShowBackTop(window.scrollY > window.innerHeight * 0.85);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateBackTop);
    };

    updateBackTop();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.01 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "160px 0px", threshold: 0.08 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <Hero reducedMotion={reducedMotion} onToggleMotion={() => setReducedMotion((v) => !v)} />
      <main>
        <DevicesAnnouncement onOpen={openVideo} />
        <ImageDivider src="/assets/top-divider.webp" className="top-divider" />
        <NewsGrid />
        <ImageDivider src="/assets/bottom-divider.webp" className="bottom-divider" />
        <FeatureVideos reducedMotion={reducedMotion} />
        <OfficialLowerSections />
      </main>
      <Footer />
      <VideoModal
        description={modalVideo?.description ?? ""}
        open={modalVideo !== null}
        onClose={() => setModalVideo(null)}
        src={modalVideo?.src ?? officialDetailsEmbed}
        title={modalVideo?.title ?? "Pokémon TCG Pocket Details!"}
      />
      <button
        className={`back-to-top ${showBackTop ? "is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      >
        <span aria-hidden="true" />
      </button>
    </>
  );
}
