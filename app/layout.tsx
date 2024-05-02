import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "KrisKringle",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <PrimeReactProvider>
                <body className={`${inter.className} md:mx-auto md:w-8`}>
                    {children}
                </body>
            </PrimeReactProvider>
        </html>
    );
}
