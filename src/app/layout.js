import { Roboto } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootStrapClient from "@/component/BootStrapClient";
import NextAuthProvider from "@/app/NextAuthProvider";
import StoreProvider from "./StoreProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: "Local-Mart",
  description: "Asish bhandari ecommerce project using nextJs",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <link rel="icon" href="/vercel.svg" sizes="any" />
      <body className={roboto.className}>
        <StoreProvider>
          <NextAuthProvider>
          {children}
          </NextAuthProvider>
        </StoreProvider>
        <BootStrapClient />
      </body>
    </html>
  );
}
