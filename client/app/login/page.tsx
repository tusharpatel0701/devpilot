
"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-auth";

// Backend URL
const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// GitHub OAuth2 login URL
const getGitHubLoginUrl = () =>
    `${API_URL}/oauth2/authorization/github`;

// Loading component
function LoginLoading() {
    return (
        <div className="flex min-h-svh items-center justify-center">
            <Spinner className="size-8" />
        </div>
    );
}

// Login content
function LoginContent() {
    const params = useSearchParams();
    const error = params.get("error");
    const { data: user, isLoading} = useCurrentUser();

    return (
        <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(from_var(--primary)_1_c_h),transparent_55%)]" />

            <header className="relative z-10 flex h-14 items-center justify-between px-4">
                <Link href="/">
                    <BrandMark />
                </Link>

                <ModeToggle />
            </header>

            <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">

                <Card className="w-full max-w-sm border-border/70 bg-card/90 shadow-lg shadow-foreground/5 backdrop-blur-xl">

                    <CardHeader className="space-y-4 text-center">

                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
                            <GitHubIcon className="size-6" />
                        </div>

                        <div className="space-y-1">
                            <CardTitle className="text-xl">
                                Sign in
                            </CardTitle>

                            <CardDescription>
                                Connect GitHub to chat with your repositories.
                            </CardDescription>
                        </div>

                    </CardHeader>

                    <CardContent className="space-y-4">

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle />

                                <AlertTitle>
                                    Sign-in failed
                                </AlertTitle>

                                <AlertDescription>
                                    Please try again.
                                </AlertDescription>
                            </Alert>
                        )}

                        <a
                            href={getGitHubLoginUrl()}
                            className={cn(
                                buttonVariants({ size: "lg" }),
                                "inline-flex w-full items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90"
                            )}
                        >
                            <GitHubIcon className="size-5" />
                            Continue with GitHub
                        </a>

                    </CardContent>

                </Card>

            </main>

        </div>
    );
}

// Main page
export default function LoginPage() {
    return (
        <Suspense fallback={<LoginLoading />}>
            <LoginContent />
        </Suspense>
    );
}
