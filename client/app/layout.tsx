
import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
    weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "DevPilot",
    description: "Your AI-powered developer workspace.",
};

export default function RootLayout({
    children,
}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                roboto.variable,
                poppins.variable
            )}
            suppressHydrationWarning
        >
            <body className="flex min-h-full flex-col font-sans">
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
