import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
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
import { ProductsProps } from "@/types";
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

export function ProductTabs({ products }: { products: ProductsProps }) {
    return (
        <div className="overflow-x-auto">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex justify-between">
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <CardTitle className="capitalize">
                                Semua Barang
                            </CardTitle>
                            <CardDescription>
                                Berikut ini adalah barang-barang yang ada
                                beserta stocknya.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/dashboard/barang/create">
                                Tambah Barang
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Barang</TableHead>
                                <TableHead className="hidden lg:table-cell">
                                    Kategori
                                </TableHead>
                                <TableHead>Stocks</TableHead>
                                <TableHead className="text-center">
                                    Harga
                                </TableHead>
                                <TableHead className="hidden md:table-cell text-center">
                                    Total Pembelian
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
                            {products.data.length == 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center"
                                    >
                                        Tidak ada data ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                            {products.data &&
                                products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            {product.nama}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell capitalize">
                                            {product.kategori}
                                        </TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-center">
                                            {formatPrice(product.harga)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-center">
                                            {product.pembelian.length}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.created_at}
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
                                                            href={`/dashboard/barang/${product.id}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/dashboard/barang/${product.id}`}
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
                                        href={products.links[0].url || ""}
                                    />
                                </PaginationItem>
                                {products &&
                                    products.links
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
                                            products.links[
                                                products.links.length - 1
                                            ].url || ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-5</strong> of{" "}
                            <strong>{products.total}</strong> products
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
