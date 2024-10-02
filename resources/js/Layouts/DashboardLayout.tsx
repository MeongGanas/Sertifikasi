import { User } from "@/types";
import { PropsWithChildren } from "react";
import { TooltipProvider } from "@/Components/ui/tooltip";
import {
    DashboardAside,
    DashboardHeader,
} from "@/Components/MyComponent/DashboardComponent";

export default function DashboardLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <TooltipProvider>
            <div className="flex flex-col w-full min-h-screen bg-muted/40">
                <DashboardAside />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <DashboardHeader user={user} />
                    <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        {children}
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
}
