"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MessageCircle, Play } from "lucide-react";
import {
  portfolioItems,
  processSteps,
  services,
  testimonials,
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
    label: "Clearer direction",
    copy: "A single visual path for content, campaigns, and channels.",
  },
  {
    label: "Launch-ready assets",
    copy: "Photography, video, and social pieces shaped for release.",
  },
  {
    label: "Monthly content systems",
    copy: "Repeatable production rhythm without scattered handoffs.",
  },
];

const projectTypes = [
  "Social media management",
  "Content creation",
  "Photography / video",
  "Digital marketing",
];

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState(projectTypes[0]);
  const [projectOpen, setProjectOpen] = useState(false);

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
            <h1>Creative that makes your brand easier to choose.</h1>
            <p className="hero-lede">
              Social content, photography, video, and campaign assets shaped
              into one clear visual direction.
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
              <h2>Creative support without the scattered handoff.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-lede">
                Strategy, production, design, and campaign delivery stay tied to
                the same visual standard.
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
              <h2>Campaign visuals built to move.</h2>
              <p>
                Sample directions for launches, feeds, and content cycles that
                need to feel consistent across every touchpoint.
              </p>
              <Link className="text-link" href="/portfolio">
                See the portfolio
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="portfolio-strip">
              {portfolioItems.slice(0, 6).map((item) => (
                <MotionCard className="portfolio-motion" key={item.title}>
                  <article className="portfolio-tile">
                    <div
                      className="tile-image"
                      style={{ backgroundPosition: item.imagePosition }}
                    />
                    <div>
                      <span>{item.category}</span>
                      <strong>
                        {item.title === "Launch Content System" ? (
                          <>
                            Launch&nbsp;Content
                            <br />
                            System
                          </>
                        ) : (
                          item.title
                        )}
                      </strong>
                    </div>
                  </article>
                </MotionCard>
              ))}
            </div>
          </Reveal>
        </div>
      </ScrollScene>

      <PinnedProcess steps={processSteps} />

      <ScrollScene className="section dark-section testimonial-section">
        <div className="container">
          <Reveal>
            <h2>Clearer creative. Cleaner delivery.</h2>
          </Reveal>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <MotionCard key={testimonial.name} delay={index * 0.08}>
                <blockquote>
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </footer>
                </blockquote>
              </MotionCard>
            ))}
          </div>
        </div>
      </ScrollScene>

      <ScrollScene className="section light-section contact-section" id="contact">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-copy">
              <h2>Tell us what needs to be sharper.</h2>
              <p>
                Send the brief, the launch, or the channel that needs a cleaner
                creative system.
              </p>
              <div className="contact-methods">
                <span>
                  <Mail size={17} aria-hidden="true" />
                  hello@3rdcoastcreatives.com
                </span>
                <span>
                  <MessageCircle size={17} aria-hidden="true" />
                  Project inquiries, launches, and monthly content cycles
                </span>
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
        <div className="container footer-grid">
          <div className="footer-brand">
            <strong>3rd Coast Creatives</strong>
            <span>Digital content, social media, and creative production.</span>
          </div>
          <div className="footer-meta">
            <nav className="footer-links" aria-label="Footer navigation">
              <Link href="/portfolio">Work</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
            <span>&copy; 2026 3rd Coast Creatives</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
