"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import type { PropsWithChildren } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollScene({
  children,
  className,
  id,
  scale = true,
}: PropsWithChildren<{ className?: string; id?: string; scale?: boolean }>) {
  return (
    <section className={`scroll-scene ${className ?? ""}`} id={id}>
      <motion.div
        className="scroll-scene-inner"
        initial={{ opacity: 0.72, scale: scale ? 0.985 : 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.36 }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function MotionCard({
  children,
  delay = 0,
  className,
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ y: -8, scale: 1.015 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function PinnedProcess({
  steps,
}: {
  steps: Array<{
    number: string;
    title: string;
    body: string;
    headingLines?: string[];
  }>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(latest * steps.length)),
    );
    setActiveIndex(nextIndex);
  });

  const activeStep = steps[activeIndex] ?? steps[0];
  const contentTransition = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          y: 18,
          filter: "blur(4px)",
        },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
        exit: {
          opacity: 0,
          y: -12,
          filter: "blur(3px)",
        },
      };

  return (
    <section className="scroll-scene process-scene light-section" id="process" ref={sectionRef}>
      <div className="scroll-scene-inner process-sticky">
        <div className="container process-stage">
          <div className="process-copy">
            <h2>Strategic creative from start to finish.</h2>

            <div className="process-rail" aria-label="Creative process steps">
              {steps.map((step, index) => (
                <button
                  className={`process-step-dot ${activeIndex === index ? "is-active" : ""}`}
                  key={step.number}
                  type="button"
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span>{step.number}</span>
                  {activeIndex === index ? (
                    <motion.i
                      layoutId="process-active-marker"
                      aria-hidden="true"
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                  <strong>{step.title}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="process-panel">
            <AnimatePresence mode="wait">
              <motion.div
                className="process-panel-content"
                key={activeStep.number}
                initial={contentTransition.initial}
                animate={contentTransition.animate}
                exit={contentTransition.exit}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="process-panel-number" aria-hidden="true">
                  {activeStep.number}
                </span>
                <motion.h3
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                    delay: shouldReduceMotion ? 0 : 0.08,
                  }}
                >
                  {(activeStep.headingLines ?? [activeStep.title]).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                    delay: shouldReduceMotion ? 0 : 0.14,
                  }}
                >
                  {activeStep.body}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FloatLayer({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="float-layer"
      animate={{ y: [0, -16, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
