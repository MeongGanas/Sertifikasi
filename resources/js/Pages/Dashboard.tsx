import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth: { user } }: PageProps) {
    return (
        <DashboardLayout user={user}>
            <Head title="Dashboard" />

            <div className="p-6 rounded-md border">
                <h1 className="text-3xl">
                    Welcome Back <span className="font-bold">{user.name}</span>!
                </h1>
            </div>
        </DashboardLayout>
    );
}
