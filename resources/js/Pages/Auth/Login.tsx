import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Head } from "@inertiajs/react";

const loginFormSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const toggleShowPass = () => setShowPass(!showPass);

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { handleSubmit, control } = form;

    const onSubmit = handleSubmit(async (values) => {
        setIsLoading(true);

        const promise = axios.post("/login", values);

        toast.promise(promise, {
            loading: "Logging in...",
            success: () => {
                setIsLoading(false);
                window.location.replace("/");
                return "Login success!";
            },
            error: (err) => {
                setIsLoading(false);
                console.log(err);
                return `Login fail! ${err.response.data.message}`;
            },
        });
    });

    return (
        <div className="h-screen flex items-center">
            <Head title="Login Panel" />
            <Card className="mx-auto w-screen max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Login Admin Panel
                    </CardTitle>
                    <CardDescription>
                        Enter your data below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-5">
                            <FormField
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input type="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPass
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="******"
                                                    {...field}
                                                />
                                                <Button
                                                    size="icon"
                                                    type="button"
                                                    onClick={toggleShowPass}
                                                    variant="ghost"
                                                    className="absolute top-0 right-0"
                                                >
                                                    {showPass ? (
                                                        <Eye size={16} />
                                                    ) : (
                                                        <EyeOff size={16} />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
