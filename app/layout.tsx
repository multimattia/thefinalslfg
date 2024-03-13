import "./globals.css";
import { Poppins, Saira } from "next/font/google";
import logo from "./svgs/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../lib/utils";
import DiscordAuth from "@/components/DiscordAuth";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "800", "700"],
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
        `font-sans antialiased ${saira.variable} ${poppins.variable}`
      )}
    >
      <body className="bg-background bg-radial-gradient from-[#8999AC] to-[#5E6675] text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-20">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10 bg-black">
                <div className="flex w-full max-w-screen-xl  items-center justify-between p-3 text-sm">
                  <Link
                    href="/"
                    className="flex flex-row gap-4 font-heavy text-4xl font-extrabold tracking-tight text-white"
                  >
                    <Image src={logo} alt="logo" width={58} height={35} />
                    LFG
                  </Link>
                  {/* <Link href="/matt" className="font-sans ">
                    Matt's form
                  </Link>
                  <Link href="/danny" className="font-sans ">
                    danny's page
                  </Link> */}
                  {/* <ModeToggle /> */}
                  <DiscordAuth />
                </div>
              </nav>
            </div>
            <div className="flex-1">{children}</div>
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
