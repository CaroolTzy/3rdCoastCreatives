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
    images: ["/assets/hero-creative-studio.png"],
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
