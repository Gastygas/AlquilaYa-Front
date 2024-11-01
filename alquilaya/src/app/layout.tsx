import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Components/contexts/authContext";
import { ToastContainer } from "react-toastify";


const primaryFont = Figtree({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-primary"
});

export const metadata: Metadata = {
  title: "AlquilaYa",
  description: "Creado por Henry Students",
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="es" className={`${primaryFont.variable}`}>
      <body className={primaryFont.className}>
      <ToastContainer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  );
}
