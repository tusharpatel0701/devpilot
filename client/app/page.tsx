
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    BrainCircuit,
    Code2,
    GitBranch,
    Layers3,
    MessageSquare,
    Search,
    ShieldCheck,
    Sparkles,
    Terminal,
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
        color: "text-violet-500",
        background: "bg-violet-500/10",
    },
    {
        icon: GitBranch,
        title: "GitHub Integration",
        description:
            "Connect your GitHub account and access your repositories from one developer workspace.",
        color: "text-blue-500",
        background: "bg-blue-500/10",
    },
    {
        icon: Search,
        title: "Codebase Understanding",
        description:
            "Explore project structure, understand files and discover how different components work together.",
        color: "text-emerald-500",
        background: "bg-emerald-500/10",
    },
    {
        icon: MessageSquare,
        title: "Contextual AI Chat",
        description:
            "Have meaningful conversations with AI about your project, implementation and technical decisions.",
        color: "text-orange-500",
        background: "bg-orange-500/10",
    },
    {
        icon: Workflow,
        title: "Developer Workflow",
        description:
            "Keep your repository exploration and AI-powered development assistance in one place.",
        color: "text-pink-500",
        background: "bg-pink-500/10",
    },
    {
        icon: ShieldCheck,
        title: "Secure Authentication",
        description:
            "Connect through GitHub OAuth and access your developer workspace securely.",
        color: "text-cyan-500",
        background: "bg-cyan-500/10",
    },
];

const steps = [
    {
        number: "01",
        title: "Connect GitHub",
        description:
            "Sign in with your GitHub account and connect your repositories.",
        icon: GitBranch,
    },
    {
        number: "02",
        title: "Choose a Repository",
        description:
            "Select a project and explore its structure and source code.",
        icon: Layers3,
    },
    {
        number: "03",
        title: "Ask AI Anything",
        description:
            "Chat with your codebase and get useful, context-aware answers.",
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

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-background text-foreground">
            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
                <div className="absolute right-[-200px] top-[600px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[130px]" />
            </div>

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
                        <Link
                            href="#features"
                            className="text-sm text-muted-foreground transition hover:text-foreground"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm text-muted-foreground transition hover:text-foreground"
                        >
                            How it works
                        </Link>
                        <Link
                            href="#technology"
                            className="text-sm text-muted-foreground transition hover:text-foreground"
                        >
                            Technology
                        </Link>
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
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:opacity-90"
                        >
                            Get Started
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative px-5 pb-24 pt-24 sm:px-8 sm:pt-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-medium shadow-sm">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                            </span>
                            Introducing your AI-powered developer workspace
                            <ArrowUpRight size={14} className="text-muted-foreground" />
                        </div>

                        <h1 className="font-heading text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
                            Understand your code.
                            <br />
                            <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                Build smarter with AI.
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Your codebase deserves more than a simple code editor.
                            Connect GitHub, explore repositories and let AI help
                            you understand your code.
                        </p>

                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/login"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition hover:-translate-y-1 hover:shadow-primary/30 sm:w-auto"
                            >
                                Start Building
                                <ArrowRight
                                    size={17}
                                    className="transition group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="#features"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold transition hover:bg-muted sm:w-auto"
                            >
                                Explore Features
                            </Link>
                        </div>

                        <p className="mt-5 text-xs text-muted-foreground">
                            Sign in with GitHub · Built for developers
                        </p>
                    </div>

                    {/* Product preview */}
                    <div className="relative mx-auto mt-20 max-w-5xl">
                        <div className="absolute -inset-5 rounded-[30px] bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl" />

                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
                            <div className="flex h-12 items-center justify-between border-b border-border px-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 rounded-full bg-red-400" />
                                    <span className="size-2.5 rounded-full bg-yellow-400" />
                                    <span className="size-2.5 rounded-full bg-green-400" />
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <DevPilotIcon className="size-4" />
                                    DevPilot Workspace
                                </div>

                                <div className="w-10" />
                            </div>

                            <div className="grid min-h-[330px] md:grid-cols-[210px_1fr]">
                                {/* Preview sidebar */}
                                <div className="hidden border-r border-border bg-muted/20 p-4 md:block">
                                    <div className="mb-6 flex items-center gap-2 text-sm font-semibold">
                                        <Layers3 size={16} />
                                        Workspace
                                    </div>

                                    {[
                                        "Overview",
                                        "Repositories",
                                        "AI Assistant",
                                        "Settings",
                                    ].map((item, index) => (
                                        <div
                                            key={item}
                                            className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs ${
                                                index === 1
                                                    ? "bg-primary/10 font-semibold text-primary"
                                                    : "text-muted-foreground"
                                            }`}
                                        >
                                            {index === 0 && <Layers3 size={14} />}
                                            {index === 1 && <GitBranch size={14} />}
                                            {index === 2 && <MessageSquare size={14} />}
                                            {index === 3 && <ShieldCheck size={14} />}
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* Preview content */}
                                <div className="p-5 sm:p-8">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                YOUR WORKSPACE
                                            </p>
                                            <h3 className="mt-1 font-heading text-xl font-bold">
                                                Welcome back, Developer
                                            </h3>
                                        </div>

                                        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                                            <Sparkles size={20} />
                                        </div>
                                    </div>

                                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-xl border border-border bg-background p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <GitBranch size={17} className="text-blue-500" />
                                                Repositories
                                            </div>
                                            <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                                Your connected GitHub projects in one place.
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border bg-background p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <BrainCircuit size={17} className="text-violet-500" />
                                                AI Assistant
                                            </div>
                                            <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                                Get answers about your source code.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-xl border border-border bg-background p-4">
                                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                                            <MessageSquare size={16} className="text-violet-500" />
                                            Ask DevPilot AI
                                        </div>

                                        <div className="rounded-lg bg-muted/60 p-3 text-xs leading-6 text-muted-foreground">
                                            How does the authentication flow work in my project?
                                        </div>

                                        <div className="mt-3 flex items-center justify-between gap-2">
                                            <span className="text-xs text-muted-foreground">
                                                Ask questions about your codebase...
                                            </span>
                                            <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-5 text-center text-xs text-muted-foreground">
                            A preview of the DevPilot developer experience
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
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Powerful capabilities
                        </span>

                        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to
                            <br className="hidden sm:block" /> understand your code
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                            A focused developer workspace that brings repository
                            exploration and AI assistance together.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    <div
                                        className={`mb-5 flex size-12 items-center justify-center rounded-xl ${feature.background} ${feature.color}`}
                                    >
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="font-heading text-lg font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                                        Explore DevPilot
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section
                id="how-it-works"
                className="px-5 py-24 sm:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Simple workflow
                        </span>

                        <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                            From repository to understanding
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                            Get started in three simple steps.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-10 md:grid-cols-3">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.number} className="relative text-center">
                                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                                        <Icon size={28} />
                                    </div>

                                    <p className="mt-6 text-xs font-bold tracking-widest text-primary">
                                        STEP {step.number}
                                    </p>

                                    <h3 className="mt-3 font-heading text-xl font-semibold">
                                        {step.title}
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
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
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-card">
                    <div className="absolute -right-20 -top-32 size-96 rounded-full bg-violet-500/10 blur-[100px]" />

                    <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                <Sparkles size={14} />
                                Built around AI
                            </div>

                            <h2 className="mt-6 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                                Spend less time searching.
                                <br />
                                <span className="text-primary">
                                    More time building.
                                </span>
                            </h2>

                            <p className="mt-5 text-sm leading-8 text-muted-foreground">
                                Stop jumping between files trying to understand
                                unfamiliar code. Use DevPilot to ask questions,
                                explore your project and get help understanding
                                your implementation.
                            </p>

                            <Link
                                href="/login"
                                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                            >
                                Try DevPilot
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-5 shadow-xl sm:p-6">
                            <div className="flex items-center gap-3 border-b border-border pb-4">
                                <div className="rounded-lg bg-violet-500/10 p-2.5 text-violet-500">
                                    <BrainCircuit size={21} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        DevPilot AI
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Codebase assistant
                                    </p>
                                </div>
                                <span className="ml-auto size-2 rounded-full bg-emerald-500" />
                            </div>

                            <div className="mt-5 space-y-4">
                                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-4 py-3 text-xs leading-6 text-primary-foreground">
                                    Explain the authentication architecture of this project.
                                </div>

                                <div className="max-w-[90%] rounded-xl rounded-bl-sm border border-border bg-muted/50 px-4 py-3 text-xs leading-6 text-muted-foreground">
                                    <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                                        <Sparkles size={14} className="text-primary" />
                                        AI response
                                    </div>
                                    I can help explain the authentication flow,
                                    identify relevant components and describe
                                    how the different parts of your project work
                                    together.
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-xs text-muted-foreground">
                                    Ask another question...
                                    <span className="ml-auto rounded-md bg-primary p-1.5 text-primary-foreground">
                                        <ArrowRight size={13} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology */}
            <section
                id="technology"
                className="border-y border-border/60 bg-muted/20 px-5 py-20 sm:px-8"
            >
                <div className="mx-auto max-w-5xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Technology
                    </span>

                    <h2 className="mt-4 font-heading text-3xl font-bold">
                        Built with modern technologies
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        A modern full-stack architecture designed for a developer-focused experience.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-3">
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
                <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-indigo-600 px-7 py-16 text-center text-white shadow-2xl shadow-blue-500/15 sm:px-12">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                        <Zap size={27} />
                    </div>

                    <h2 className="mt-7 font-heading text-3xl font-bold sm:text-4xl">
                        Ready to understand your code better?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75">
                        Connect your GitHub account and experience a smarter
                        way to explore and understand your projects.
                    </p>

                    <Link
                        href="/login"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 transition hover:-translate-y-1 hover:bg-white/90"
                    >
                        Get Started with DevPilot
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-5 py-8 sm:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
                    <Link href="/" className="flex items-center gap-2">
                        <DevPilotIcon className="size-7" />
                        <span className="font-heading font-bold">
                            DevPilot
                        </span>
                    </Link>

                    <p className="text-center text-xs text-muted-foreground">
                        AI-powered development workspace.
                    </p>

                    <div className="flex items-center gap-5 text-xs text-muted-foreground">
                        <Link
                            href="/login"
                            className="transition hover:text-foreground"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="#features"
                            className="transition hover:text-foreground"
                        >
                            Features
                        </Link>
                    </div>
                </div>

                <div className="mx-auto mt-7 max-w-7xl border-t border-border pt-5 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} DevPilot. Built for developers.
                </div>
            </footer>
        </main>
    );
}
