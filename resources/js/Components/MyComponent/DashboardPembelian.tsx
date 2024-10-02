import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { PembelianProps } from "@/types";
import formatPrice from "@/lib/formatPrice";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

export function PembelianTabs({ pembelian }: { pembelian: PembelianProps }) {
    return (
        <div className="overflow-x-auto">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <CardTitle className="capitalize">
                                Semua Pembelian
                            </CardTitle>
                            <CardDescription>
                                Berikut adalah data semua pembelian yang pernah
                                terjadi.
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/pembelian/create">
                                Tambah Pembelian
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Barang</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Harga
                                </TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead className="text-center">
                                    Total Harga
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pembelian.data &&
                                pembelian.data.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell className="font-medium">
                                            {data.barang.nama}
                                        </TableCell>
                                        <TableCell>
                                            {formatPrice(data.barang.harga)}
                                        </TableCell>
                                        <TableCell>{data.jumlah}</TableCell>
                                        <TableCell className="text-center">
                                            {formatPrice(data.total_harga)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {data.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/dashboard/pembelian/${data.id}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/dashboard/pembelian/${data.id}`}
                                                            method="delete"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="w-full space-y-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={pembelian.links[0].url || ""}
                                    />
                                </PaginationItem>
                                {pembelian &&
                                    pembelian.links
                                        .slice(1, -1)
                                        .map((link, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href={link.url || ""}
                                                    isActive={link.active}
                                                >
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href={
                                            pembelian.links[
                                                pembelian.links.length - 1
                                            ].url || ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-5</strong> of{" "}
                            <strong>{pembelian.total}</strong> pembelian
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
