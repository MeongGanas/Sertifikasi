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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const kategori = [
    {
        id: "minuman",
        label: "Minuman",
    },
    {
        id: "makanan",
        label: "Makanan",
    },
    {
        id: "snack",
        label: "Snack",
    },
] as const;

const productSchema = z.object({
    nama: z.string(),
    kategori: z.string(),
    stock: z.string(),
    harga: z.string(),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function AddProduct({ auth }: PageProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            nama: "",
            kategori: "",
            stock: "",
            harga: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append("nama", values.nama);
        formData.append("kategori", values.kategori);
        formData.append("stock", values.stock);
        formData.append("harga", values.harga);

        const promise = axios.post("/dashboard/barang", formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                console.log(res);
                setIsSubmitted(false);
                window.location.replace("/dashboard/barang");
                return "Tambah Barang Sukses!";
            },
            error: (err) => {
                console.log(err);
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });

        setIsSubmitted(false);
    });

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Add Product" />
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Tambah Products</CardTitle>
                    <CardDescription>
                        Isi data di bawah ini untuk menambah barang.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid items-start gap-5 mb-5 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="nama"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Nama</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    {...field}
                                                    placeholder="Nama barang"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="kategori"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Kategori</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Kategori
                                                        </SelectLabel>
                                                        {kategori.map((k) => (
                                                            <SelectItem
                                                                value={k.id}
                                                                key={k.id}
                                                            >
                                                                {k.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    required
                                                    placeholder="Stock barang"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="harga"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Harga</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    required
                                                    placeholder="Harga barang"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                            <Button
                                asChild
                                variant={"outline"}
                                disabled={isSubmitted}
                            >
                                <Link href="/dashboard/barang">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitted}>
                                Tambah
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}
