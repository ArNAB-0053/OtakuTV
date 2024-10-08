import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DeviceWidthProvider } from "@/context/page";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Otaku.tv",
  description: "Discover and review your favorite anime, explore detailed profiles, and connect with fellow anime enthusiasts on Otaku.tv.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "red",
          colorBackground: "#303950",
          colorInputBackground: "#272e41",
          colorInputText: "#fefefe",
        },
        layout: {
          logoImageUrl: "/logoo.svg",
          unsafe_disableDevelopmentModeWarnings: true,
        },
        elements: {
          formButtonPrimary: {
            fontSize: 14,
            textTransform: "none",
          },
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html
        lang="en"
        className="overflow-x-hidden dark scroll-smooth scrollbar-thin scrollbar-thumb-scrollbarColor !scrollbar-track-transparent scrollbar-rounded-full "
      >
        <body className={`${inter.className} dark overflow-x-hidden flex flex-col min-h-screen`}>
          <NextTopLoader className="z-[99999]" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DeviceWidthProvider>
              <Header />
              <main className="mt-16 flex-grow">{children}</main> {/* Added flex-grow */}
              <Footer />
            </DeviceWidthProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
