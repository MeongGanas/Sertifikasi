import DashboardLayout from "@/Layouts/DashboardLayout";
import { ProductsProps, User } from "@/types";
import { Head } from "@inertiajs/react";
import { ProductTabs } from "@/Components/MyComponent/DashboardProduct";

export default function Products({
    auth,
    allProducts,
}: {
    auth: { user: User };
    allProducts: ProductsProps;
}) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Products" />
            <ProductTabs products={allProducts} />
        </DashboardLayout>
    );
}
