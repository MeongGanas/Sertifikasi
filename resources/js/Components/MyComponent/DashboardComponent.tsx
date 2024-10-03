import {
    Building,
    Home,
    LineChart,
    LucideIcon,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    User2,
    Users2,
} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Link } from "@inertiajs/react";
import React from "react";
import { User } from "@/types";
import SearchForm from "./Search";

function AsideLink({
    link,
    active,
    name,
    Icon,
}: {
    link: string;
    active: string;
    name: string;
    Icon: LucideIcon;
}) {
    return (
        <>
            <TooltipTrigger asChild>
                <Link
                    href={link}
                    className={`flex items-center justify-center transition-colors rounded-lg h-9 w-9 hover:text-foreground md:h-8 md:w-8 ${
                        route().current()?.includes(active)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                    }`}
                >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{name}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
        </>
    );
}

export function DashboardAside() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="w-4 h-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Admin Panel</span>
                </Link>
                <Tooltip>
                    <AsideLink
                        name="Dashboard"
                        link="/dashboard"
                        active="dashboard"
                        Icon={Home}
                    />
                </Tooltip>
                <Tooltip>
                    <AsideLink
                        name="Pembelian"
                        link="/dashboard/pembelian"
                        active="pembelian"
                        Icon={ShoppingCart}
                    />
                </Tooltip>
                <Tooltip>
                    <AsideLink
                        name="Barang"
                        link="/dashboard/barang"
                        active="barang"
                        Icon={Package}
                    />
                </Tooltip>
                <Tooltip>
                    <AsideLink
                        name="Petugas"
                        link="/dashboard/petugas"
                        active="petugas"
                        Icon={Users2}
                    />
                </Tooltip>
            </nav>
        </aside>
    );
}

export function DashboardHeader({ user }: { user: User }) {
    const currentPath = window.location.pathname.split("/").slice(1);
    const pathLoop = currentPath.slice(0, -1);

    let builtPath = "";

    return (
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="w-5 h-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
                        >
                            <Package2 className="w-5 h-5 transition-all group-hover:scale-110" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="w-5 h-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/pembelian"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Pembelian
                        </Link>
                        <Link
                            href="/dashboard/barang"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Package className="w-5 h-5" />
                            Barang
                        </Link>
                        {user.role === "admin" && (
                            <Link
                                href="/dashboard/petugas"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Users2 className="w-5 h-5" />
                                Petugas
                            </Link>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {pathLoop.map((path, i) => {
                        builtPath += `/${path}`;

                        return (
                            <React.Fragment key={i}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={builtPath}
                                            className="capitalize"
                                        >
                                            {path}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {i < currentPath.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        );
                    })}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="capitalize">
                            {currentPath[currentPath.length - 1]}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SearchForm />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-4">
                        <span>{user.name}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <User2 />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {user.role === "admin" && (
                        <>
                            <DropdownMenuItem>
                                <Link href="/dashboard/petugas">
                                    Tambah Akun
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={route("logout")} method="post">
                            Logout
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
