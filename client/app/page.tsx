import Link from "next/link";
import {
    ArrowRight,
    BrainCircuit,
    Check,
    FileCode2,
    Folder,
    GitBranch,
    Layers3,
    MessageSquare,
    Search,
    ShieldCheck,
    Sparkles,
    Workflow,
    Zap,
} from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { DevPilotIcon } from "@/components/icons/devpilot-icon";

const features = [
    {
        icon: BrainCircuit,
        title: "AI Code Assistant",
        description:
            "Ask questions about your codebase and get intelligent answers with context from your repositories.",
        color: "text-violet-500 bg-violet-500/10",
        span: "lg:col-span-4",
        visual: "code",
    },
    {
        icon: GitBranch,
        title: "GitHub Integration",
        description:
            "Connect your GitHub account and access your repositories from one developer workspace.",
        color: "text-blue-500 bg-blue-500/10",
        span: "lg:col-span-2",
    },
    {
        icon: Search,
        title: "Codebase Understanding",
        description:
            "Explore project structure, understand files and discover how different components work together.",
        color: "text-emerald-500 bg-emerald-500/10",
        span: "lg:col-span-2",
        visual: "tree",
    },
    {
        icon: MessageSquare,
        title: "Contextual AI Chat",
        description:
            "Have meaningful conversations with AI about your project, implementation and technical decisions.",
        color: "text-orange-500 bg-orange-500/10",
        span: "lg:col-span-4",
        visual: "context",
    },
    {
        icon: Workflow,
        title: "Developer Workflow",
        description:
            "Keep your repository exploration and AI-powered development assistance in one place.",
        color: "text-pink-500 bg-pink-500/10",
        span: "lg:col-span-3",
    },
    {
        icon: ShieldCheck,
        title: "Secure Authentication",
        description:
            "Connect through GitHub OAuth and access your developer workspace securely.",
        color: "text-cyan-500 bg-cyan-500/10",
        span: "lg:col-span-3",
    },
];

const steps = [
    {
        number: "01",
        title: "Connect GitHub",
        description: "Sign in with your GitHub account and connect your repositories.",
        icon: GitBranch,
    },
    {
        number: "02",
        title: "Choose a Repository",
        description: "Select a project and explore its structure and source code.",
        icon: Layers3,
    },
    {
        number: "03",
        title: "Ask AI Anything",
        description: "Chat with your codebase and get useful, context-aware answers.",
        icon: BrainCircuit,
    },
];

const technologies = [
    "Next.js",
    "React",
    "TypeScript",
    "Spring Boot",
    "Java",
    "PostgreSQL",
    "GitHub OAuth",
];

const sources = [
    "auth/SecurityConfig.java:42",
    "auth/OAuthSuccessHandler.java:18",
    "app/login/page.tsx:9",
];

const questions = [
    "How does the authentication flow work?",
    "Where is this API endpoint handled?",
    "What breaks if I rename this service?",
];

const css = `
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes caret{50%{opacity:0}}
.rise{opacity:0;animation:rise .6s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:var(--d,0s)}
.caret{animation:caret 1s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.rise{opacity:1;animation:none}.caret{animation:none}}
`;

const gridTexture =
    "[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px]";

async function CopyrightYear() {
    "use cache";
    return <>{new Date().getFullYear()}</>;
}

function FeatureVisual({ type }: { type?: string }) {
    if (type === "code") {
        return (
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background/70 font-mono text-[12px] leading-6">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-[11px] text-muted-foreground">
                    <FileCode2 size={13} /> auth/SecurityConfig.java
                </div>
                <pre className="overflow-x-auto px-4 py-3 text-muted-foreground">
                    <code>
                        <span className="text-violet-500">@Bean</span>
                        {"\n"}
                        <span className="text-sky-500">SecurityFilterChain</span>
                        {" chain(HttpSecurity http) {\n  return http\n    ."}
                        <span className="text-emerald-500">oauth2Login</span>
                        {"(withDefaults())\n    .build();\n}"}
                    </code>
                </pre>
            </div>
        );
    }

    if (type === "tree") {
        return (
            <div className="mt-6 space-y-1.5 rounded-xl border border-border bg-background/70 p-4 font-mono text-[12px] text-muted-foreground">
                <div className="flex items-center gap-2"><Folder size={13} className="text-emerald-500" /> src</div>
                <div className="flex items-center gap-2 pl-5"><Folder size={13} /> auth</div>
                <div className="flex items-center gap-2 pl-10 text-foreground"><FileCode2 size={13} className="text-emerald-500" /> SecurityConfig.java</div>
                <div className="flex items-center gap-2 pl-5"><Folder size={13} /> repos</div>
            </div>
        );
    }

    if (type === "context") {
        return (
            <div className="mt-6 flex flex-wrap gap-2">
                {sources.map((source) => (
                    <span
                        key={source}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                    >
                        <Check size={12} className="text-orange-500" />
                        {source}
                    </span>
                ))}
            </div>
        );
    }

    return null;
}

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-background text-foreground">
            <style>{css}</style>

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <DevPilotIcon className="size-9" />
                        <span className="font-heading text-xl font-bold tracking-tight">
                            DevPilot
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {[
                            ["Features", "#features"],
                            ["How it works", "#how-it-works"],
                            ["Technology", "#technology"],
                        ].map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm text-muted-foreground transition hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        <Link
                            href="/login"
                            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted sm:inline-flex"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:opacity-90"
                        >
                            Get Started
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
                <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] ${gridTexture}`}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 right-0 -z-10 h-[460px] w-[760px] rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/15 to-cyan-400/10 blur-[120px]"
                />

                <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
                    <div>
                        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-3 pr-4 text-xs font-medium shadow-sm">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                            </span>
                            Your AI-powered developer workspace
                        </div>

                        <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
                            Understand your code.
                            <span className="mt-2 block text-muted-foreground/60">
                                Build smarter with AI.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
                            Your codebase deserves more than a simple code editor.
                            Connect GitHub, explore repositories and let AI help you
                            understand your code.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/login"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:-translate-y-0.5"
                            >
                                Start Building
                                <ArrowRight
                                    size={17}
                                    className="transition group-hover:translate-x-1"
                                />
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold transition hover:bg-muted"
                            >
                                Explore Features
                            </Link>
                        </div>

                        <p className="mt-5 text-xs text-muted-foreground">
                            Sign in with GitHub to get started.
                        </p>
                    </div>

                    {/* Live chat preview */}
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-violet-500/25 via-blue-500/20 to-cyan-400/20 blur-2xl"
                        />

                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
                            <div className="flex h-12 items-center justify-between border-b border-border px-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 rounded-full bg-red-400" />
                                    <span className="size-2.5 rounded-full bg-yellow-400" />
                                    <span className="size-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <GitBranch size={13} />
                                    acme/payments-api
                                </div>
                                <div className="w-10" />
                            </div>

                            <div className="space-y-5 p-5 sm:p-7">
                                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground">
                                    How does the authentication flow work in my project?
                                </div>

                                <div className="rounded-2xl rounded-bl-sm border border-border bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                                    <div className="rise mb-2 flex items-center gap-2 font-semibold text-foreground">
                                        <Sparkles size={15} className="text-primary" />
                                        DevPilot AI
                                    </div>

                                    <p className="rise [--d:0.5s]">
                                        Sign-in uses GitHub OAuth. Spring Security sends
                                        the user to GitHub, then your backend creates a
                                        session for the workspace.
                                    </p>

                                    <div className="rise mt-3 flex flex-wrap gap-2 [--d:1.1s]">
                                        {sources.map((source) => (
                                            <span
                                                key={source}
                                                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px]"
                                            >
                                                <FileCode2 size={11} className="text-primary" />
                                                {source}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="rise mt-3 inline-block h-4 w-[3px] rounded-full bg-primary align-middle [--d:1.6s]">
                                        <span className="caret block h-full w-full bg-primary" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -left-5 top-24 hidden items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium shadow-xl sm:flex">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            1,284 files indexed
                        </div>

                        <p className="mt-5 text-center text-xs text-muted-foreground">
                            An illustrative preview of the DevPilot experience
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section
                id="features"
                className="border-t border-border/60 bg-muted/20 px-5 py-24 sm:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 max-w-2xl">
                        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
                            Everything you need to understand your code
                        </h2>
                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            A focused developer workspace that brings repository
                            exploration and AI assistance together.
                        </p>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className={`rounded-3xl border border-border bg-card p-7 transition duration-300 hover:border-foreground/20 ${feature.span}`}
                                >
                                    <div
                                        className={`mb-5 flex size-11 items-center justify-center rounded-xl ${feature.color}`}
                                    >
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                                        {feature.description}
                                    </p>
                                    <FeatureVisual type={feature.visual} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="px-5 py-24 sm:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
                            From repository to understanding
                        </h2>
                        <p className="mt-4 text-base text-muted-foreground">
                            Get started in three simple steps.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-10 md:grid-cols-3">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.number} className="border-t-2 border-primary/30 pt-6">
                                    <div className="flex items-end justify-between">
                                        <span className="font-heading text-6xl font-bold leading-none text-primary/25">
                                            {step.number}
                                        </span>
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="mt-6 font-heading text-xl font-semibold">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 max-w-xs text-sm leading-7 text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* AI highlight */}
            <section className="px-5 pb-24 sm:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-foreground text-background">
                    <div
                        aria-hidden
                        className={`absolute inset-0 opacity-[0.12] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)] ${gridTexture.replaceAll("var(--border)", "currentColor")}`}
                    />
                    <div
                        aria-hidden
                        className="absolute -right-20 -top-32 size-96 rounded-full bg-violet-500/30 blur-[110px]"
                    />

                    <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
                        <div>
                            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-5xl">
                                Spend less time searching.
                                <span className="block opacity-60">More time building.</span>
                            </h2>
                            <p className="mt-5 max-w-md text-sm leading-8 opacity-70">
                                Stop jumping between files trying to understand unfamiliar
                                code. Ask questions, explore your project and get help
                                understanding your implementation.
                            </p>
                            <Link
                                href="/login"
                                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
                            >
                                Try DevPilot
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {questions.map((question) => (
                                <div
                                    key={question}
                                    className="flex items-center gap-3 rounded-2xl border border-background/15 bg-background/10 px-5 py-4 text-sm backdrop-blur-sm"
                                >
                                    <MessageSquare size={16} className="shrink-0 opacity-60" />
                                    {question}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology */}
            <section
                id="technology"
                className="border-y border-border/60 bg-muted/20 px-5 py-20 sm:px-8"
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-md">
                        <h2 className="font-heading text-3xl font-bold tracking-tight">
                            Built with modern technologies
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            A modern full-stack architecture designed for a
                            developer-focused experience.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:max-w-xl lg:justify-end">
                        {technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:text-primary"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 py-24 sm:px-8">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-indigo-600 px-7 py-16 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-12">
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                    />
                    <div className="relative">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <Zap size={27} />
                        </div>
                        <h2 className="mt-7 font-heading text-3xl font-bold sm:text-5xl">
                            Ready to understand your code better?
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75">
                            Connect your GitHub account and experience a smarter way to
                            explore and understand your projects.
                        </p>
                        <Link
                            href="/login"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-white/90"
                        >
                            Get Started with DevPilot
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-5 py-8 sm:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
                    <Link href="/" className="flex items-center gap-2">
                        <DevPilotIcon className="size-7" />
                        <span className="font-heading font-bold">DevPilot</span>
                    </Link>

                    <p className="text-center text-xs text-muted-foreground">
                        AI-powered development workspace.
                    </p>

                    <div className="flex items-center gap-5 text-xs text-muted-foreground">
                        <Link href="/login" className="transition hover:text-foreground">
                            Sign in
                        </Link>
                        <Link href="#features" className="transition hover:text-foreground">
                            Features
                        </Link>
                    </div>
                </div>

                <div className="mx-auto mt-7 max-w-7xl border-t border-border pt-5 text-center text-xs text-muted-foreground">
                    © <CopyrightYear /> DevPilot. Built for developers.
                </div>
            </footer>
        </main>
    );
}