import { PrimeReactProvider } from "primereact/api";

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
                <body className={inter.className}>{children}</body>
            </PrimeReactProvider>
        </html>
    );
}
