import "./globals.css";
import localFont from "next/font/local";
import SplashScreen from '../components/brand/SplashScreen';

const hero = localFont({
  src: "./fonts/PressStart2P.woff2",
  weight: "400",
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
        <script dangerouslySetInnerHTML={{ __html: `(function () {
          var root = document.documentElement;
          var seen = false;
          try { root.dataset.theme = localStorage.getItem('haikal-portfolio-theme') === 'dark' ? 'dark' : 'light'; }
          catch { root.dataset.theme = 'light'; }
          try { seen = sessionStorage.getItem('hc-portfolio-splash-seen') === '1'; } catch {}
          if (!seen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.dataset.splash = 'pending';
        })();` }} />
      </head>
      <body>
        <SplashScreen>{children}</SplashScreen>
      </body>
    </html>
  );
};

export default RootLayout;
