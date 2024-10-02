export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    created_at: string;
}

export interface Product {
    id: number;
    nama: string;
    kategori: string;
    stock: number;
    harga: number;
    pembelian: Pembelian[];
    created_at: string;
}

export interface Pembelian {
    id: number;
    barang_id: number;
    barang: Product;
    jumlah: number;
    total_harga: number;
    created_at: string;
}

export interface ProductsProps {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PembelianProps {
    current_page: number;
    data: Pembelian[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface UserProps {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
