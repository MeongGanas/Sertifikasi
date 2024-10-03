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
import { UserProps } from "@/types";
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

export function PetugasTabs({ petugas }: { petugas: UserProps }) {
    return (
        <div className="overflow-x-auto">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <CardTitle className="capitalize">
                                Semua Akun Petugas
                            </CardTitle>
                            <CardDescription>
                                Berikut adalah semua data akun petugas yang
                                pernah dibuat.
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/petugas/create">
                                Tambah Petugas
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {petugas.data.length == 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center"
                                    >
                                        Tidak ada data ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                            {petugas.data &&
                                petugas.data.map((petugas) => (
                                    <TableRow key={petugas.id}>
                                        <TableCell className="font-medium">
                                            {petugas.name}
                                        </TableCell>
                                        <TableCell>
                                            {petugas.username}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {petugas.created_at}
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
                                                            href={`/dashboard/petugas/${petugas.id}`}
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
                                        href={petugas.links[0].url || ""}
                                    />
                                </PaginationItem>
                                {petugas &&
                                    petugas.links
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
                                            petugas.links[
                                                petugas.links.length - 1
                                            ].url || ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-5</strong> of{" "}
                            <strong>{petugas.total}</strong> petugas
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
