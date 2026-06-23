"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
import { phoneShowcaseScreens } from "@/lib/content";
import { Reveal } from "./motion";

export function PhoneShowcase() {
  const [scrollHintHidden, setScrollHintHidden] = useState(false);

  const handleScrollableMockupScroll = (
    event: React.UIEvent<HTMLDivElement>,
  ) => {
    const target = event.currentTarget;
    const isAtBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 8;

    setScrollHintHidden(isAtBottom);
  };

  return (
    <section className="phone-showcase" aria-labelledby="phone-showcase-title">
      <Image
        className="phone-showcase-bg"
        src="/assets/phone-showcase/background-plate.png"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="phone-showcase-overlay" />
      <div className="container phone-showcase-grid">
        <Reveal className="phone-showcase-copy">
          <h2 id="phone-showcase-title">Campaign systems made for the feed.</h2>
          <p>
            Niche-focused strategies let social calendars, creative assets, and public
            relations move as one connected brand system.
          </p>
          <a className="text-link" href="/portfolio">
            View sample work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>

        <div className="phone-stage" aria-label="Animated phone mockup previews">
          <div className="phone-stage-ambient" aria-hidden="true" />
          <div className="phone-stack">
            {phoneShowcaseScreens.map((screen, index) => (
              <motion.figure
                className={`phone-card phone-card-${index + 1}`}
                key={screen.title}
                tabIndex={0}
                initial={{ opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="phone-card-inner">
                  <div className="phone-device">
                    {screen.scrollable ? (
                      <div
                        className="phone-screen phone-screen-scroll"
                        aria-label={`${screen.title} scrollable preview`}
                        onScroll={handleScrollableMockupScroll}
                      >
                        <Image
                          src={screen.src}
                          alt={`${screen.title} mobile screen mockup`}
                          width={screen.width}
                          height={screen.height}
                          sizes="(max-width: 680px) 58vw, 292px"
                        />
                      </div>
                    ) : (
                      <div className="phone-screen" aria-hidden="true">
                        <Image
                          className="phone-screen-img"
                          src={screen.src}
                          alt={`${screen.title} mobile screen mockup`}
                          fill
                          sizes="(max-width: 680px) 58vw, 292px"
                        />
                      </div>
                    )}
                    {screen.scrollable ? (
                      <div
                        className={`phone-scroll-hint ${
                          scrollHintHidden ? "is-hidden" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <span>Scroll to see more</span>
                        <ChevronDown size={14} strokeWidth={2.6} />
                      </div>
                    ) : null}
                    <time
                      className={`phone-clock ${index === 2 ? "is-light" : ""}`}
                      dateTime="09:41"
                      aria-hidden="true"
                    >
                      9:41
                    </time>
                    <div
                      className={`phone-status ${index === 2 ? "is-light" : ""}`}
                      aria-hidden="true"
                    >
                      <IoCellular aria-hidden="true" />
                      <IoWifi aria-hidden="true" />
                      <IoBatteryFull aria-hidden="true" />
                    </div>
                    <Image
                      className="phone-frame"
                      src="/assets/phone-showcase/phone-frame.webp"
                      alt=""
                      width={1748}
                      height={3532}
                      sizes="(max-width: 680px) 58vw, 292px"
                    />
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
