"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { navItems } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const syncScrollButton = () => {
      setShowScrollTop(window.scrollY > 640);
    };

    syncScrollButton();
    window.addEventListener("scroll", syncScrollButton, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand-mark" href="/" aria-label="3rd Coast Creatives home">
          <Image
            className="brand-logo"
            src="/assets/brand/logo-white.png"
            alt="3rd Coast Creatives"
            width={9178}
            height={1852}
            priority
          />
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="nav-cta" href="/#contact">
          Start a project
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
        </button>
      </nav>
      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link
          className="mobile-menu-cta"
          href="/#contact"
          onClick={() => setOpen(false)}
        >
          Start a project
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <button
        aria-label="Scroll to top"
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        onClick={scrollToTop}
        type="button"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </header>
  );
}
