import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps, PembelianProps } from "@/types";
import { Head } from "@inertiajs/react";
import { File, ListFilter } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/Components/ui/pagination";
import { Separator } from "@/Components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { PembelianTabs } from "@/Components/MyComponent/DashboardPembelian";

export default function Pembelian({
    auth,
    allPembelian,
}: PageProps<{ allPembelian: PembelianProps }>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Pembelian" />

            <PembelianTabs pembelian={allPembelian} />
        </DashboardLayout>
    );
}
