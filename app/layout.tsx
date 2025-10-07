import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from 'react-hot-toast'
import RecoilProvider from "@/store/recoil-provider";

export const metadata: Metadata = {
  title: "Jiroshi",
  description: "A Headless LMS Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* <!-- Font Awesome --> */}
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          /> */}

          {/* <!-- Google Fonts --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className="antialiased"
      >
        <RecoilProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
