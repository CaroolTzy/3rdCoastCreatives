import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://3rdcoastcreatives.com"),
  title: "3rd Coast Creatives | Digital Content & Social Media Agency",
  description:
    "3rd Coast Creatives builds social content, creative production, video, photography, and digital marketing systems for brands ready to look sharper online.",
  openGraph: {
    title: "3rd Coast Creatives | Digital Content & Social Media Agency",
    description:
      "Modern content production, social media management, design, photography, video, and digital marketing.",
    type: "website",
    images: [
      {
        url: "/assets/brand/logo-brand-card.jpg",
        width: 6250,
        height: 6250,
        alt: "3rd Coast Creatives logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3rd Coast Creatives | Digital Content & Social Media Agency",
    description:
      "Modern content production, social media management, design, photography, video, and digital marketing.",
    images: ["/assets/brand/logo-brand-card.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
