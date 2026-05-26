"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { phoneShowcaseScreens } from "@/lib/content";
import { Reveal } from "./motion";

export function PhoneShowcase() {
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
            Layered campaign mockups let social calendars, creative boards, and edit
            queues move as one connected brand system.
          </p>
          <a className="text-link" href="/portfolio">
            View sample work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>

        <div className="phone-stage" aria-label="Animated phone mockup previews">
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
                    <Image
                      className="phone-mockup"
                      src={screen.src}
                      alt={`${screen.title} mobile screen mockup`}
                      width={screen.width}
                      height={screen.height}
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
