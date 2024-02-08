import "./globals.css";
import { Poppins, Saira } from "next/font/google";
import { cn } from "../lib/utils";
import DiscordAuth from "@/components/DiscordAuth";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "600",
  variable: "--font-poppins",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        `font-sans antialiased ${saira.variable} ${poppins.variable}`,
      )}
    >
      <body className="bg-background text-foreground">
        <main className="flex min-h-screen flex-col items-center">
          <div className="flex w-full flex-1 flex-col items-center gap-20">
            <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
              <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
                <p className="font-heavy">THE FINALS LFG</p>
                <DiscordAuth />
              </div>
            </nav>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
