"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, Play, Send } from "lucide-react";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
import { Header } from "./header";
import { Reveal } from "./motion";
import { partnerLogos, portfolioCategories } from "@/lib/content";

const INITIAL_VISIBLE_ITEMS = 12;
const VISIBLE_INCREMENT = 12;
const getPortfolioGroup = (title: string) => title.replace(/\s+\d+$/, "");
const storyLogoAliases: Record<string, string> = {
  "Beacon 57": "Beacon at Hotel Lydia",
  "Crawfish for a Cause": "Crawfish for a Cause Corpus Christi",
  "Habitat for Humanity": "Habitat for Humanity Corpus Christi",
  "The Bar & Grill": "The Bar & Grill Corpus Christi",
};

const getStoryProfileLogo = (account: string) => {
  const logoName = storyLogoAliases[account] ?? account;
  return partnerLogos.find((logo) => logo.name === logoName)?.src;
};

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState(portfolioCategories[0].slug);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const selectedCategory =
    portfolioCategories.find((category) => category.slug === activeCategory) ??
    portfolioCategories[0];
  const imageItems = selectedCategory.items.filter(
    (item) => "imageSrc" in item && Boolean(item.imageSrc),
  );
  const visibleItems = imageItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < imageItems.length;

  return (
    <main>
      <Header />
      <section className="portfolio-hero">
        <div className="container portfolio-hero-grid">
          <Reveal>
            <div className="portfolio-hero-copy">
              <h1>Campaign visuals built for a sharper feed.</h1>
              <p>
                See how strategy, design, photo, video, and social assets can
                move together as one campaign system.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container portfolio-tabs-layout">
          <Reveal>
            <div
              className="portfolio-tabs"
              role="tablist"
              aria-label="Portfolio service categories"
            >
              {portfolioCategories.map((category) => {
                const isActive = category.slug === selectedCategory.slug;

                return (
                  <button
                    aria-controls={`${category.slug}-panel`}
                    aria-selected={isActive}
                    className={`portfolio-tab ${isActive ? "is-active" : ""}`}
                    id={`${category.slug}-tab`}
                    key={category.slug}
                    onClick={() => {
                      setActiveCategory(category.slug);
                      setVisibleCount(INITIAL_VISIBLE_ITEMS);
                      setPlayingVideo(null);
                    }}
                    role="tab"
                    type="button"
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div
            aria-labelledby={`${selectedCategory.slug}-tab`}
            className={`portfolio-tab-panel ${visibleItems.length === 0 ? "is-note-only" : ""}`}
            id={`${selectedCategory.slug}-panel`}
            role="tabpanel"
          >
            {selectedCategory.note ? (
              <Reveal>
                <p className="portfolio-category-note">{selectedCategory.note}</p>
              </Reveal>
            ) : null}

            {visibleItems.length > 0 ? (
              <div className="portfolio-grid-page">
                {visibleItems.map((item, index) => {
                  const group = getPortfolioGroup(item.title);
                  const previousGroup =
                    index > 0 ? getPortfolioGroup(visibleItems[index - 1].title) : "";
                  const showGroup = group !== previousGroup;
                  const imageSrc = item.imageSrc;
                  const imagePosition =
                    "imagePosition" in item && typeof item.imagePosition === "string"
                      ? item.imagePosition
                      : "center";
                  const videoSrc =
                    "videoSrc" in item && typeof item.videoSrc === "string"
                      ? item.videoSrc
                      : undefined;
                  const isVideo = videoSrc !== undefined;
                  const isPlaying = playingVideo === videoSrc;
                  const isStory =
                    "display" in item && item.display === "story";
                  const account =
                    "account" in item && typeof item.account === "string"
                      ? item.account
                      : getPortfolioGroup(item.title);
                  const orientation =
                    "orientation" in item && item.orientation === "landscape"
                      ? "landscape"
                      : "portrait";
                  const videoClassName = `case-video-media is-${orientation}`;
                  const profileLogoSrc = isStory ? getStoryProfileLogo(account) : undefined;

                  return (
                    <Fragment key={`${item.title}-${imageSrc}-grouped`}>
                      {showGroup ? (
                        <div className="portfolio-group-heading" key={`${group}-heading`}>
                          <span>{group}</span>
                        </div>
                      ) : null}
                      <Reveal key={`${item.title}-${imageSrc}`} delay={(index % 4) * 0.05}>
                        {isStory ? (
                          <article className="story-card">
                            <div className="story-phone">
                              <time className="story-clock" dateTime="09:41" aria-hidden="true">
                                9:41
                              </time>
                              <div className="story-status" aria-hidden="true">
                                <IoCellular aria-hidden="true" />
                                <IoWifi aria-hidden="true" />
                                <IoBatteryFull aria-hidden="true" />
                              </div>
                              <div className="story-screen">
                                <div className="story-media-area">
                                  {isVideo && isPlaying ? (
                                    <video
                                      autoPlay
                                      className="story-media"
                                      controls
                                      playsInline
                                      poster={imageSrc}
                                      src={videoSrc}
                                    />
                                  ) : (
                                    <video
                                      autoPlay
                                      className="story-media"
                                      loop
                                      muted
                                      playsInline
                                      poster={imageSrc}
                                      src={videoSrc}
                                    />
                                  )}
                                  <div className="story-progress" aria-hidden="true">
                                    <span />
                                    <span />
                                    <span />
                                  </div>
                                  <div className="story-top">
                                    <span className={`story-avatar ${profileLogoSrc ? "has-logo" : ""}`}>
                                      {profileLogoSrc ? (
                                        <img alt="" aria-hidden="true" src={profileLogoSrc} />
                                      ) : (
                                        account.slice(0, 1)
                                      )}
                                    </span>
                                    <div>
                                      <strong>{account}</strong>
                                      <span>Portfolio story</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="story-actions">
                                  <span className="story-reply">Send message...</span>
                                  <Heart size={24} aria-hidden="true" />
                                  <MessageCircle size={24} aria-hidden="true" />
                                  <Send size={24} aria-hidden="true" />
                                </div>
                              </div>
                              <img
                                alt=""
                                aria-hidden="true"
                                className="story-frame"
                                src="/assets/phone-showcase/iphone-frame.webp"
                              />
                            </div>
                          </article>
                        ) : (
                          <article className="case-card">
                          {isVideo && isPlaying ? (
                            <div className={videoClassName}>
                              <video
                                autoPlay
                                controls
                                playsInline
                                poster={imageSrc}
                                src={videoSrc}
                              />
                            </div>
                          ) : isVideo ? (
                            <button
                              aria-label={`Play ${item.title}`}
                              className={videoClassName}
                              onClick={() => setPlayingVideo(videoSrc)}
                              style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundPosition: imagePosition,
                              }}
                              type="button"
                            >
                              <span className="case-play">
                                <Play size={22} fill="currentColor" aria-hidden="true" />
                              </span>
                            </button>
                          ) : (
                            <div
                              className="case-image"
                              style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundPosition: imagePosition,
                                backgroundSize: "cover",
                              }}
                            />
                          )}
                          <div className="case-content">
                            <span>{item.category}</span>
                            <h2>{item.title}</h2>
                            <p>{item.metric}</p>
                          </div>
                        </article>
                        )}
                      </Reveal>
                    </Fragment>
                  );
                })}
              </div>
            ) : null}

            {hasMoreItems ? (
              <Reveal>
                <div className="portfolio-load-more-wrap">
                  <button
                    className="portfolio-load-more"
                    onClick={() => setVisibleCount((count) => count + VISIBLE_INCREMENT)}
                    type="button"
                  >
                      Load more
                      <span>
                      {visibleItems.length} of {imageItems.length}
                      </span>
                  </button>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="portfolio-cta">
        <div className="container">
          <Reveal>
            <h2>Have the work. Need the site to show it better?</h2>
            <Link className="button button-primary" href="/#contact">
              Start an inquiry
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
