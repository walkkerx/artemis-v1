import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://artemis.collegium.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "University of Artemis — Re-engineering Human Learning",
    template: "%s | University of Artemis",
  },
  description:
    "A global collegiate university connecting scholars and ideas across borders. Undergraduate, graduate, and PhD Academy programs across seven schools and four continents.",
  keywords: [
    "University of Artemis",
    "Artemis Collegium",
    "global university",
    "interdisciplinary education",
    "undergraduate programs",
    "graduate programs",
    "PhD Academy",
    "liberal arts",
    "research university",
    "decentralized education",
  ],
  authors: [{ name: "University of Artemis" }],
  creator: "University of Artemis",
  publisher: "University of Artemis",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "University of Artemis",
    title: "University of Artemis — Re-engineering Human Learning",
    description:
      "A global collegiate university connecting scholars and ideas across borders. Undergraduate, graduate, and PhD Academy programs across seven schools and four continents.",
    images: [
      {
        url: "/resources/img/campus-architecture.png",
        width: 1200,
        height: 630,
        alt: "University of Artemis campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "University of Artemis — Re-engineering Human Learning",
    description:
      "A global collegiate university connecting scholars and ideas across borders. Undergraduate, graduate, and PhD Academy programs across seven schools and four continents.",
    images: ["/resources/img/campus-architecture.png"],
    creator: "@artemisuni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

export const viewport = {
  themeColor: "#8A0000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white text-foreground font-sans`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-[#8A0000] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-[13px] focus:font-bold"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
