import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnStack - Master Every Tech Stack",
  description: "Comprehensive courses for Python, FastAPI, SQLAlchemy, Docker, ML, and DevOps. Each module teaches from absolute basics to writing real applications — with code examples, hands-on exercises, quizzes, and mini-projects.",
  keywords: ["Python", "FastAPI", "SQLAlchemy", "Docker", "Machine Learning", "DevOps", "Learning", "Programming"],
  authors: [{ name: "LearnStack" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "LearnStack - Master Every Tech Stack",
    description: "Practical, project-based learning for Python, FastAPI, Docker, ML, and more.",
    siteName: "LearnStack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
