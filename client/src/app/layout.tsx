import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '../userContext';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyTenant",
  description: "Easy Tenat Onboarding Process",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
        <body className={inter.className}>{children}</body>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;

