import DashboardLayout from "@/Layouts/DashboardLayout";
import { User, UserProps } from "@/types";
import { Head } from "@inertiajs/react";
import { PetugasTabs } from "@/Components/MyComponent/DashboardPetugas";

export default function Products({
    auth,
    petugas,
}: {
    auth: { user: User };
    petugas: UserProps;
}) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Petugas" />
            <PetugasTabs petugas={petugas} />
        </DashboardLayout>
    );
}
