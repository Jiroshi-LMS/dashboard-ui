import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/store/ReduxProvider";
import NextTopLoaderProvider from "@/app/components/providers/NextTopLoaderProvider";
import { ThemeProvider, THEME_STORAGE_KEY } from "@/app/components/providers/ThemeProvider";
import { HammerIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Jiroshi",
  description: "A Headless LMS Dashboard",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const MAINTENANCE_MODE = false;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: applies stored theme class before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='dark'||s==='light'?s:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(t);})();`,
          }}
        />

        {/* <!-- Google Fonts --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-background text-foreground"
      >
        {MAINTENANCE_MODE ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 mb-6">
              <HammerIcon size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Temporarily unavailable for maintenance</h1>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              We&apos;re currently performing some scheduled updates. We&apos;ll be back online shortly.
            </p>
          </div>
        ) : (
          <ReduxProvider>
            <ThemeProvider>
              <NextTopLoaderProvider />
              <Toaster
                position="top-right"
                reverseOrder={false}
              />
              <SidebarProvider defaultOpen={false}>
                {children}
              </SidebarProvider>
            </ThemeProvider>
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}
