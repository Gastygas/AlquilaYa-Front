import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Components/contexts/authContext";
import { ToastContainer } from "react-toastify";


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
    <html lang="es">
      <body>
      <ToastContainer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  );
}
