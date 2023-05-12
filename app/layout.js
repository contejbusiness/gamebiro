import Nav from "./components/Nav";
import Provider from "./components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "./components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Easy Earn",
  description: "Earn Money with us",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
