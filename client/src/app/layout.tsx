import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css";
import "tailwindcss";
import { UserProvider } from '../userContext';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyTenant",
  description: "Easy Tenat Onboarding Process",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        <body className={inter.className}>{children}</body>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

