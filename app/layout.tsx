import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from '../components/SmoothScroll'; 
const hero = localFont({
  src: "./fonts/PixelifySans.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-hero",
  adjustFontFallback: false,
  fallback: ["Arial", "sans-serif"],
});

const copy = localFont({
  src: "./fonts/BricolageGrotesque.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-copy",
});

const meta = localFont({
  src: "./fonts/IBMPlexMono.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-meta",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

export const metadata = {
  title: "Portfolio Haikal Cannavaro",
  description: "Made by Haikal Cannavaro",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${hero.variable} ${copy.variable} ${meta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('haikal-portfolio-theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();` }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
};

export default RootLayout;
