import { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Jiroshi | Online Learning Platform for Educators and Organizations",
  description: "Jiroshi is a software-as-a-service platform that helps educators and organizations create, manage, and operate online learning platforms. Subscription-based access with secure payment processing.",
  keywords: ["Online Learning Platform", "Course Management", "Education Software", "Learning Management", "Online Courses", "Jiroshi", "SaaS Platform"],
  authors: [{ name: "Jiroshi Team" }],
  openGraph: {
    title: "Jiroshi | Online Learning Platform for Educators and Organizations",
    description: "Create and manage your own online learning platform. Jiroshi helps educators deliver courses to students with simple tools for content management and student access.",
    url: "https://jiroshi.com",
    siteName: "Jiroshi",
    images: [
      {
        url: "https://jiroshi-static-prod.s3.ap-south-1.amazonaws.com/website/landing-og-image.png",
        width: 1200,
        height: 630,
        alt: "Jiroshi - Online Learning Platform Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiroshi | Online Learning Platform for Educators and Organizations",
    description: "Create and manage your own online learning platform. Jiroshi helps educators deliver courses to students with simple tools for content management and student access.",
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
    "description": "A software-as-a-service platform that helps educators and organizations create and manage online learning platforms.",
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
