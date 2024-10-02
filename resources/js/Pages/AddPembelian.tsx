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
import { PageProps, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const pembelianSchema = z.object({
    barang_id: z.string(),
    jumlah: z.string(),
});

type PembelianSchema = z.infer<typeof pembelianSchema>;

export default function AddPembelian({
    auth,
    barang,
}: PageProps<{ barang: Product[] }>) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<PembelianSchema>({
        resolver: zodResolver(pembelianSchema),
        defaultValues: {
            barang_id: "",
            jumlah: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append("barang_id", values.barang_id);
        formData.append("jumlah", values.jumlah);

        const promise = axios.post("/dashboard/pembelian", formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                console.log(res);
                setIsSubmitted(false);
                window.location.replace("/dashboard/pembelian");
                return "Tambah Pembelian Sukses!";
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
                    <CardTitle>Tambah Pembelian</CardTitle>
                    <CardDescription>
                        Isi data di bawah ini untuk menambah data pembelian.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid items-start gap-5 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="barang_id"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Barang</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih barang" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Barang
                                                        </SelectLabel>
                                                        {barang.map((b) => (
                                                            <SelectItem
                                                                value={b.id.toString()}
                                                                key={b.id}
                                                            >
                                                                {b.nama}
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
                                    name="jumlah"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Jumlah</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    required
                                                    placeholder="Jumlah barang"
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
                                <Link href="/dashboard/pembelian">Batal</Link>
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
