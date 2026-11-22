import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from '../components/SmoothScroll';
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('haikal-portfolio-theme')==='dark'?'dark':'light';if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('hc-portfolio-splash-seen')!=='1'){document.documentElement.dataset.splash='pending';}}catch(e){document.documentElement.dataset.theme='light';}})();` }} />
      </head>
      <body>
        <SplashScreen />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
};

export default RootLayout;
