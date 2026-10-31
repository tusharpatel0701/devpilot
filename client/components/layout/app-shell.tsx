"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";

import { DevPilotIcon } from "@/components/icons/devpilot-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { dashboardNavGroups } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

export function AppShell({
    children,
    title,
    description,
    actions,
    hideHeader = false,
}: {
    children: React.ReactNode;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    hideHeader?: boolean;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const { data: user } = useCurrentUser();
    const logout = useLogout();

    const displayName =
        user?.displayName || user?.githubUsername || "Developer";

    const avatarSrc =
        user?.avatarUrl ||
        (user?.githubUsername
            ? `https://github.com/${user.githubUsername}.png`
            : undefined);

    // Only one nav item can be active: the one with the longest matching href.
    // This stops /dashboard from also lighting up on /dashboard/repositories.
    const allHrefs = dashboardNavGroups.flatMap((group) =>
        group.items.map((item) => item.href)
    );

    const activeHref = allHrefs
        .filter(
            (href) => pathname === href || pathname.startsWith(`${href}/`)
        )
        .sort((a, b) => b.length - a.length)[0];

    const handleLogout = () => {
        logout.mutate();
    };

    return (
        <SidebarProvider>
            <Sidebar variant="inset" collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                render={<Link href="/dashboard" />}
                                tooltip="DevPilot"
                            >
                                <DevPilotIcon className="size-8 rounded-[10px]" />

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        DevPilot
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        Chat with your code
                                    </span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    {dashboardNavGroups.map((group) => (
                        <SidebarGroup key={group.label}>
                            <SidebarGroupLabel>
                                {group.label}
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const active =
                                            item.href === activeHref;

                                        const Icon = item.icon;

                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton
                                                    isActive={active}
                                                    tooltip={item.title}
                                                    render={
                                                        <Link href={item.href} />
                                                    }
                                                >
                                                    <Icon />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip="Account"
                                        />
                                    }
                                >
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={avatarSrc}
                                            alt={displayName}
                                        />
                                        <AvatarFallback>
                                            {displayName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {displayName}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            @{user?.githubUsername || "developer"}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    className="w-56"
                                    side="top"
                                    align="end"
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>

                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push("/dashboard/settings")
                                            }
                                        >
                                            <Settings />
                                            Settings
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            disabled={logout.isPending}
                                        >
                                            <LogOut />
                                            {logout.isPending
                                                ? "Signing out..."
                                                : "Log out"}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                {!hideHeader && (
                    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b px-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <SidebarTrigger />
                            <Separator
                                orientation="vertical"
                                className="h-5"
                            />

                            <div className="min-w-0">
                                {title && (
                                    <h1 className="truncate text-sm font-semibold">
                                        {title}
                                    </h1>
                                )}

                                {description && (
                                    <p className="truncate text-xs text-muted-foreground">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            {actions}
                            <ModeToggle />
                        </div>
                    </header>
                )}

                <main className={cn("flex-1 p-4 md:p-6")}>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export function BrandMark({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-2.5 font-semibold tracking-tight",
                className
            )}
        >
            <DevPilotIcon className="size-9 shrink-0" />
            <span className="text-xl font-bold tracking-tight">
                DevPilot
            </span>
        </div>
    );
}

export function GhostButtonLink({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Button
            variant="ghost"
            size="sm"
            className={className}
            render={<Link href={href} />}
        >
            {children}
        </Button>
    );
}