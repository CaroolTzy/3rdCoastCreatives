"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Mail,
  MessageCircle,
  Play,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  partnerLogos,
  processSteps,
  services,
} from "@/lib/content";
import { Header } from "./header";
import {
  MotionCard,
  PinnedProcess,
  Reveal,
  ScrollScene,
} from "./motion";
import { PhoneShowcase } from "./phone-showcase";

const proofItems = [
  {
    label: "Strategy & Research",
    copy: "Niche-focused direction. Deep industry research to build a clear, data-backed visual path.",
  },
  {
    label: "Launch-ready assets",
    copy: "Digital-first content. High-converting video, photography, and social pieces shaped for release.",
  },
  {
    label: "Reputation & Systems",
    copy: "Brand authority. Repeatable content systems and light PR to protect and grow your reputation.",
  },
];

const projectTypes = [
  "Brand design & logos",
  "Social & campaign planning",
  "Video production",
  "Brand photography",
  "Event coverage",
  "Digital brand assets",
];

const marqueeRows = [
  partnerLogos.slice(0, 6),
  partnerLogos.slice(6),
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1BrUfsFSiF/?mibextid=wwXIfr",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/3rdcoastcc?igsh=a3A1enEwcDk1Mmhi",
    icon: FaInstagram,
  },
];

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState(projectTypes[0]);
  const [projectOpen, setProjectOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const marqueeTracksRef = useRef<Array<HTMLDivElement | null>>([]);
  const marqueeOffsets = useRef<number[]>([]);
  const marqueeDrag = useRef({
    active: false,
    pointerId: -1,
    rowIndex: -1,
    startX: 0,
    startOffset: 0,
  });
  const contactEmail = "wecreate@3rdcoastcreatives.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1600);
    } catch {
      setEmailCopied(false);
    }
  };

  useEffect(() => {
    let animationFrame = 0;
    let lastTimestamp = 0;
    const pixelsPerMs = 0.035;

    const normalizeOffset = (offset: number, wrapPoint: number) => {
      if (wrapPoint <= 0) {
        return 0;
      }

      let nextOffset = offset;

      while (nextOffset <= -wrapPoint) {
        nextOffset += wrapPoint;
      }

      while (nextOffset > 0) {
        nextOffset -= wrapPoint;
      }

      return nextOffset;
    };

    const tick = (timestamp: number) => {
      if (lastTimestamp) {
        const delta = timestamp - lastTimestamp;

        marqueeTracksRef.current.forEach((track, rowIndex) => {
          if (
            !track ||
            (marqueeDrag.current.active && marqueeDrag.current.rowIndex === rowIndex)
          ) {
            return;
          }

          const wrapPoint = track.scrollWidth / 2;
          const direction = rowIndex % 2 === 0 ? -1 : 1;
          const currentOffset = marqueeOffsets.current[rowIndex] ?? 0;
          const nextOffset = normalizeOffset(
            currentOffset + delta * pixelsPerMs * direction,
            wrapPoint,
          );

          marqueeOffsets.current[rowIndex] = nextOffset;
          track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
        });
      }

      lastTimestamp = timestamp;
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const wrapMarqueeOffset = (rowIndex: number, offset: number) => {
    const track = marqueeTracksRef.current[rowIndex];
    const wrapPoint = track ? track.scrollWidth / 2 : 0;

    if (wrapPoint <= 0) {
      return 0;
    }

    let nextOffset = offset;

    while (nextOffset <= -wrapPoint) {
      nextOffset += wrapPoint;
    }

    while (nextOffset > 0) {
      nextOffset -= wrapPoint;
    }

    return nextOffset;
  };

  const startMarqueeDrag = (
    rowIndex: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    marqueeDrag.current = {
      active: true,
      pointerId: event.pointerId,
      rowIndex,
      startX: event.clientX,
      startOffset: marqueeOffsets.current[rowIndex] ?? 0,
    };
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveMarqueeDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = marqueeDrag.current;

    if (!drag.active || drag.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    const track = marqueeTracksRef.current[drag.rowIndex];
    const nextOffset = wrapMarqueeOffset(
      drag.rowIndex,
      drag.startOffset + event.clientX - drag.startX,
    );

    marqueeOffsets.current[drag.rowIndex] = nextOffset;

    if (track) {
      track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
    }
  };

  const stopMarqueeDrag = (
    rowIndex: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const drag = marqueeDrag.current;

    if (drag.pointerId === event.pointerId) {
      marqueeDrag.current.active = false;
      marqueeDrag.current.pointerId = -1;
      marqueeDrag.current.rowIndex = -1;
      event.currentTarget.classList.remove("is-dragging");

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  return (
    <main>
      <Header />
      <ScrollScene className="hero-section" scale={false}>
        <Image
          className="hero-bg"
          src="/assets/hero-centered-cinematic-studio.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Creative built to
              <br className="desktop-break" />
              connect, engage & grow.
            </h1>
            <p className="hero-lede">
              Social media content and digital campaigns built on strategy and
              consistency to position your brand for growth.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#contact">
                Inquire now
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" href="/portfolio">
                View portfolio
                <Play size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollScene>

      <section className="proof-band" aria-label="Creative proof points">
        <div className="container proof-grid">
          {proofItems.map((item) => (
            <div className="proof-item" key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.copy}</span>
            </div>
          ))}
        </div>
      </section>

      <PhoneShowcase />

      <ScrollScene className="section light-section services-section" id="services">
        <div className="container services-layout">
          <div className="services-copy">
            <Reveal>
              <h2>Seamless strategic creative from start to finish.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-lede">
                From niche research and creative strategy to custom logos, video
                production, and event coverage, we handle your entire visual
                footprint under one roof.
              </p>
            </Reveal>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <MotionCard key={service.title} delay={index * 0.04}>
                <article className="service-card">
                  <div className="service-token">
                    <Image
                      src={service.tokenSrc}
                      alt={service.tokenAlt}
                      width={96}
                      height={104}
                      sizes="96px"
                    />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              </MotionCard>
            ))}
          </div>
        </div>
      </ScrollScene>

      <ScrollScene className="section dark-section portfolio-preview">
        <div className="container split-feature">
          <Reveal>
            <div>
              <h2>Trusted by partners and clients.</h2>
              <p>
                Brands, organizations, events, and campaigns rely on 3rd Coast
                Creatives for visual systems built to move.
              </p>
              <Link className="text-link" href="#contact">
                Build with us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="partner-marquee" aria-label="Partner and client logos">
              {marqueeRows.map((row, rowIndex) => (
                <div
                  className="partner-marquee-row"
                  key={`partner-row-${rowIndex}`}
                  onDragStart={(event) => event.preventDefault()}
                  onPointerCancel={(event) => stopMarqueeDrag(rowIndex, event)}
                  onPointerDown={(event) => startMarqueeDrag(rowIndex, event)}
                  onLostPointerCapture={(event) => stopMarqueeDrag(rowIndex, event)}
                  onPointerMove={moveMarqueeDrag}
                  onPointerUp={(event) => stopMarqueeDrag(rowIndex, event)}
                >
                  <div
                    className="partner-marquee-track"
                    ref={(node) => {
                      marqueeTracksRef.current[rowIndex] = node;
                    }}
                  >
                    {[...row, ...row].map((logo, logoIndex) => {
                      const isDuplicate = logoIndex >= row.length;

                      return (
                        <div
                          aria-hidden={isDuplicate}
                          className="partner-logo-card"
                          key={`${logo.src}-${logoIndex}`}
                        >
                          <Image
                            src={logo.src}
                            alt={isDuplicate ? "" : logo.name}
                            draggable={false}
                            width={600}
                            height={338}
                            sizes="(max-width: 680px) 220px, 280px"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </ScrollScene>

      <PinnedProcess steps={processSteps} />

      <ScrollScene className="section dark-section founder-section" id="about">
        <div className="container founder-profile-grid">
          <Reveal className="founder-profile-card">
            <div className="founder-portrait-card">
              <Image
                src="/assets/team/marielle-munoz-headshot.jpg"
                alt="Portrait of Marielle Muñoz"
                fill
                sizes="(max-width: 980px) 72vw, 330px"
              />
            </div>
            <div className="founder-title-block">
              <h2>Marielle Muñoz</h2>
              <p>Founder and Creative Director</p>
            </div>
          </Reveal>

          <Reveal className="founder-bio" delay={0.12}>
            <p className="founder-lead">
              Strategic storytelling with a human-centered edge.
            </p>
            <p>
              Marielle is the Founder and Creative Director of 3rd Coast
              Creatives, a creative studio specializing in storytelling, video
              production, and digital content creation.
            </p>
            <p>
              She brings over 10 years of experience in the creative industry,
              with a strong foundation built across both government and corporate
              environments. Her background includes working in a state university
              setting, where she led a university-based online media channel and
              taught courses in video production, non-linear editing, and
              television and digital media production.
            </p>
            <p>
              Her professional experience also includes roles as a Social Media
              Manager and Creative in both an international airline and a
              national power infrastructure organization, where she developed
              content strategies, managed digital platforms, and produced
              multimedia campaigns.
            </p>
            <p>
              She holds a Bachelor&apos;s degree in Broadcast Communication and a
              Master&apos;s degree in Communication, strengthening her academic
              foundation in media, storytelling, and production.
            </p>
            <p>
              Since 2015, she has continued to build her creative work across
              international and community-based projects. Now based in Corpus
              Christi, she collaborates with local brands, nonprofits, and
              community initiatives focused on meaningful storytelling and
              digital engagement.
            </p>
            <p>
              Marielle loves volunteering with nonprofit organizations and has a
              passion for capturing meaningful moments, whether in community
              events, creative projects, or everyday life. At the core of her
              work is a strategic, human-centered approach to storytelling,
              creating content that feels real, relatable, and memorable.
            </p>
          </Reveal>
        </div>
      </ScrollScene>

      <ScrollScene className="section light-section contact-section" id="contact">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-copy">
              <h2>Tell us what we can build for you.</h2>
              <p>
                Send the brief, the campaign, or the channel that needs a cleaner
                creative system.
              </p>
              <div className="contact-methods">
                <div className="contact-method-row">
                  <Mail className="contact-method-icon" size={17} aria-hidden="true" />
                  <span>{contactEmail}</span>
                  <button
                    aria-label="Copy email address"
                    className="copy-email-button"
                    type="button"
                    onClick={copyEmail}
                  >
                    {emailCopied ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Copy size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="contact-method-row">
                  <MessageCircle className="contact-method-icon" size={17} aria-hidden="true" />
                  <span>Project inquiries, branding launches, and media production</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <form className="contact-form">
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@brand.com" />
              </label>
              <label>
                Project type
                <input type="hidden" name="project" value={selectedProject} />
                <div className="project-select">
                  <button
                    aria-expanded={projectOpen}
                    aria-haspopup="listbox"
                    className="project-select-trigger"
                    type="button"
                    onClick={() => setProjectOpen((open) => !open)}
                  >
                    {selectedProject}
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                  {projectOpen ? (
                    <div className="project-select-menu" role="listbox">
                      {projectTypes.map((project) => (
                        <button
                          aria-selected={project === selectedProject}
                          className="project-select-option"
                          key={project}
                          role="option"
                          type="button"
                          onClick={() => {
                            setSelectedProject(project);
                            setProjectOpen(false);
                          }}
                        >
                          {project}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </label>
              <label>
                Brief
                <textarea name="brief" placeholder="What are we creating?" rows={5} />
              </label>
              <button className="button button-primary" type="button">
                Send inquiry
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
          </Reveal>
        </div>
      </ScrollScene>

      <footer className="site-footer">
        <div className="container footer-shell">
          <div className="footer-main">
            <div className="footer-brand">
              <Image
                className="footer-logo"
                src="/assets/brand/logo-white.png"
                alt="3rd Coast Creatives"
                width={9178}
                height={1852}
              />
              <span>Strategic content, design, and media production for brands ready to grow with clarity.</span>
            </div>
          </div>

          <div className="footer-bottom">
            <nav className="footer-links" aria-label="Footer navigation">
              <Link href="/portfolio">Work</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
            <div className="footer-socials" aria-label="Social links">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  aria-label={`3rd Coast Creatives on ${label}`}
                  href={href}
                  key={label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
            <span className="footer-copyright">&copy; 2026 3rd Coast Creatives</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
