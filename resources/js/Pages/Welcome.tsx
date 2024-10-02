import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
}: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <Button>halo</Button>
        </>
    );
}
