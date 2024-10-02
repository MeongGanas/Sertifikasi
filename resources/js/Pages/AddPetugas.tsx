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
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const petugasSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
});

type PetugasSchema = z.infer<typeof petugasSchema>;

export default function AddPetugas({ auth }: PageProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<PetugasSchema>({
        resolver: zodResolver(petugasSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("password", values.password);

        const promise = axios.post("/dashboard/petugas", formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: (res) => {
                console.log(res);
                setIsSubmitted(false);
                window.location.replace("/dashboard/petugas");
                return "Tambah Petugas Sukses!";
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
                    <CardTitle>Tambah Petugas</CardTitle>
                    <CardDescription>
                        Isi data di bawah ini untuk membuat akun petugas.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid items-start gap-5 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Nama petugas"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Username petugas"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Password petugas"
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
                                <Link href="/dashboard/petugas">Batal</Link>
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
