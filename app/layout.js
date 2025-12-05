
import Navbar from "./components/Navbar";
import "./globals.css";
import { SearchProvider } from "./context/Searchcontext";

export const metadata = {
  title: "Product Store",
  description: "Product listing using API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <Navbar/>
          {children}
          </SearchProvider>
      </body>
    </html>
  );
}
