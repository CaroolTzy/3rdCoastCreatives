"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "./header";
import { Reveal } from "./motion";
import { portfolioItems, services } from "@/lib/content";

export function PortfolioPage() {
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
        <div className="container portfolio-grid-page">
          {portfolioItems.map((item, index) => (
            <Reveal key={item.title} delay={(index % 4) * 0.05}>
              <article className="case-card">
                <div
                  className="case-image"
                  style={{ backgroundPosition: item.imagePosition }}
                />
                <div className="case-content">
                  <span>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.metric}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="container two-column">
          <Reveal>
            <div>
              <h2>Every portfolio item maps back to a real service offer.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="capability-list">
              {services.map((service) => (
                <span key={service.title}>{service.title}</span>
              ))}
            </div>
          </Reveal>
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
