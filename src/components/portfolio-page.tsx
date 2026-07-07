"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Maximize2,
  MessageCircle,
  Minimize2,
  Pause,
  Play,
  Send,
  Volume2,
  VolumeX,
} from "lucide-react";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
import { Header } from "./header";
import { Reveal } from "./motion";
import { partnerLogos, portfolioCategories } from "@/lib/content";

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

const getGroupId = (categorySlug: string, group: string) =>
  `${categorySlug}-${group}`
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getItemGroup = (item: { title: string; account?: string }) =>
  typeof item.account === "string" ? item.account : getPortfolioGroup(item.title);

const getAssetLabel = (
  items: Array<{ category: string; display?: string; videoSrc?: string }>,
) => {
  const count = items.length;
  const firstCategory = items[0]?.category ?? "Asset";
  const hasStories = items.some((item) => item.display === "story");
  const hasVideos = items.some((item) => typeof item.videoSrc === "string");

  if (hasStories) {
    return `${count} ${count === 1 ? "story" : "stories"}`;
  }

  if (hasVideos) {
    return `${count} ${count === 1 ? "video" : "videos"}`;
  }

  return `${count} ${firstCategory.toLowerCase()} ${count === 1 ? "asset" : "assets"}`;
};

function PortfolioVideoPlayer({
  className,
  poster,
  src,
}: {
  className: string;
  poster: string;
  src: string;
}) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    if (!player?.requestFullscreen) {
      return;
    }

    void player.requestFullscreen();
  };

  const seekVideo = (value: string) => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    const nextProgress = Number(value);
    video.currentTime = (nextProgress / 100) * video.duration;
    setProgress(nextProgress);
  };

  const changeVolume = (value: string) => {
    const video = videoRef.current;
    const nextVolume = Number(value) / 100;

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (video) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (video) {
      video.muted = nextMuted;

      if (!nextMuted && video.volume === 0) {
        video.volume = volume || 1;
      }
    }
  };

  return (
    <div className={className} ref={playerRef}>
      <video
        autoPlay
        onClick={togglePlayback}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;

          if (Number.isFinite(video.duration) && video.duration > 0) {
            setProgress((video.currentTime / video.duration) * 100);
          }
        }}
        onVolumeChange={(event) => {
          const video = event.currentTarget;

          setVolume(video.volume);
          setIsMuted(video.muted || video.volume === 0);
        }}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
        playsInline
        poster={poster}
        ref={videoRef}
        src={src}
      />
      <div className="case-video-controls" aria-label="Video controls">
        <label className="case-video-scrubber">
          <span className="sr-only">Video playback position</span>
          <input
            aria-label="Video playback position"
            max="100"
            min="0"
            onChange={(event) => seekVideo(event.target.value)}
            step="0.1"
            type="range"
            value={progress}
          />
        </label>
        <div className="case-video-control-row">
          <button
            aria-label={isPaused ? "Play video" : "Pause video"}
            onClick={togglePlayback}
            type="button"
          >
            {isPaused ? (
              <Play size={16} fill="currentColor" aria-hidden="true" />
            ) : (
              <Pause size={16} fill="currentColor" aria-hidden="true" />
            )}
          </button>
          <button
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            onClick={toggleMute}
            type="button"
          >
            {isMuted ? (
              <VolumeX size={16} aria-hidden="true" />
            ) : (
              <Volume2 size={16} aria-hidden="true" />
            )}
          </button>
          <label className="case-video-volume">
            <span className="sr-only">Video volume</span>
            <input
              aria-label="Video volume"
              max="100"
              min="0"
              onChange={(event) => changeVolume(event.target.value)}
              step="1"
              type="range"
              value={isMuted ? 0 : volume * 100}
            />
          </label>
          <button
            aria-label={isFullscreen ? "Exit fullscreen video" : "Fullscreen video"}
            onClick={toggleFullscreen}
            type="button"
          >
            {isFullscreen ? (
              <Minimize2 size={16} aria-hidden="true" />
            ) : (
              <Maximize2 size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState(portfolioCategories[0].slug);
  const [activeGroupId, setActiveGroupId] = useState("");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const selectedCategory =
    portfolioCategories.find((category) => category.slug === activeCategory) ??
    portfolioCategories[0];
  const imageItems = useMemo(
    () =>
      selectedCategory.items.filter(
        (item) => "imageSrc" in item && Boolean(item.imageSrc),
      ),
    [selectedCategory],
  );
  const groupedItems = useMemo(() => {
    return imageItems.reduce<
      Array<{
        id: string;
        label: string;
        name: string;
        items: typeof imageItems;
      }>
    >((groups, item) => {
      const name = getItemGroup(item);
      const existingGroup = groups.find((group) => group.name === name);

      if (existingGroup) {
        existingGroup.items.push(item);
        existingGroup.label = getAssetLabel(existingGroup.items);
        return groups;
      }

      groups.push({
        id: getGroupId(selectedCategory.slug, name),
        label: getAssetLabel([item]),
        name,
        items: [item],
      });

      return groups;
    }, []);
  }, [imageItems, selectedCategory.slug]);

  useEffect(() => {
    setActiveGroupId(groupedItems[0]?.id ?? "");
  }, [groupedItems]);

  useEffect(() => {
    if (groupedItems.length === 0) {
      return;
    }

    let frameId = 0;

    const syncActiveGroup = () => {
      frameId = 0;

      const sections = groupedItems
        .map((group) => document.getElementById(group.id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (sections.length === 0) {
        return;
      }

      const activationLine = Math.min(window.innerHeight * 0.34, 280);
      const activeSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();

          return rect.top <= activationLine && rect.bottom > activationLine;
        }) ??
        sections
          .slice()
          .sort((a, b) => {
            const aDistance = Math.abs(a.getBoundingClientRect().top - activationLine);
            const bDistance = Math.abs(b.getBoundingClientRect().top - activationLine);

            return aDistance - bDistance;
          })[0];

      if (activeSection?.id) {
        setActiveGroupId((currentGroupId) =>
          currentGroupId === activeSection.id ? currentGroupId : activeSection.id,
        );
      }
    };

    const requestSync = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(syncActiveGroup);
    };

    syncActiveGroup();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [groupedItems]);

  const scrollToGroup = (groupId: string) => {
    document.getElementById(groupId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
            className={`portfolio-tab-panel ${groupedItems.length === 0 ? "is-note-only" : ""}`}
            id={`${selectedCategory.slug}-panel`}
            role="tabpanel"
          >
            {selectedCategory.note ? (
              <Reveal>
                <p className="portfolio-category-note">{selectedCategory.note}</p>
              </Reveal>
            ) : null}

            {groupedItems.length > 0 ? (
              <div className="portfolio-groups-layout">
                <nav className="portfolio-group-rail" aria-label={`${selectedCategory.title.replace(/\n/g, " ")} sections`}>
                  {groupedItems.map((group) => (
                    <button
                      aria-current={activeGroupId === group.id ? "true" : undefined}
                      className={activeGroupId === group.id ? "is-active" : ""}
                      key={group.id}
                      onClick={() => scrollToGroup(group.id)}
                      type="button"
                    >
                      <span />
                      <strong>{group.name}</strong>
                      <em>{group.items.length}</em>
                    </button>
                  ))}
                </nav>
                <div className="portfolio-groups">
                  {groupedItems.map((group, groupIndex) => (
                    <section
                      className="portfolio-group-section"
                      data-portfolio-group={selectedCategory.slug}
                      id={group.id}
                      key={group.id}
                    >
                      <Reveal>
                        <div className="portfolio-group-heading">
                          <div>
                            <span>{selectedCategory.title.replace(/\n/g, " ")}</span>
                            <h2>{group.name}</h2>
                          </div>
                          <p>{group.label}</p>
                        </div>
                      </Reveal>
                      <div className="portfolio-grid-page">
                        {group.items.map((item, itemIndex) => {
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
                          const delay = ((groupIndex + itemIndex) % 4) * 0.05;

                          return (
                            <Reveal key={`${item.title}-${imageSrc}`} delay={delay}>
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
                                    <PortfolioVideoPlayer
                                      className={videoClassName}
                                      poster={imageSrc}
                                      src={videoSrc}
                                    />
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
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
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
