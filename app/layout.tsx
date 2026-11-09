import "./globals.css";
import SmoothScroll from '../components/SmoothScroll'; 
export const metadata = {
  title: "Portfolio Haikal Cannavaro",
  description: "Made by Haikal Cannavaro",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
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
