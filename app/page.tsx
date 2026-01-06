import { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Jiroshi | The Headless LMS for Modern Learning Platforms",
  description: "Build your own course platform using clean, flexible APIs. Jiroshi handles the heavy lifting of video hosting, user management, and payments.",
  keywords: ["Headless LMS", "Learning Management System", "API-first LMS", "Course Platform", "e-learning API", "Jiroshi"],
  authors: [{ name: "Jiroshi Team" }],
  openGraph: {
    title: "Jiroshi | The Headless LMS for Modern Learning Platforms",
    description: "Build your own course platform using clean, flexible APIs. Manage content, users, and enrollments - without building an LMS from scratch.",
    url: "https://jiroshi.com",
    siteName: "Jiroshi",
    images: [
      {
        url: "https://jiroshi-static-prod.s3.ap-south-1.amazonaws.com/website/landing-og-image.png",
        width: 1200,
        height: 630,
        alt: "Jiroshi - Headless LMS Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiroshi | The Headless LMS for Modern Learning Platforms",
    description: "Build your own course platform using clean, flexible APIs. Manage content, users, and enrollments - without building an LMS from scratch.",
    images: ["https://jiroshi-static-prod.s3.ap-south-1.amazonaws.com/website/landing-og-image.png"],
    creator: "@jiroshi_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jiroshi.com",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jiroshi",
    "url": "https://jiroshi.com",
    "logo": "https://jiroshi.com/icon.png",
    "description": "A Headless LMS built for modern learning platforms.",
    "sameAs": [
      "https://twitter.com/jiroshi_app",
      "https://github.com/jiroshi-lms",
      "https://demo.jiroshi.com/",
      "https://github.com/Jiroshi-LMS/demo-usage"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jiroshi",
    "url": "https://jiroshi.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://jiroshi.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LandingPageClient />
    </>
  );
}
