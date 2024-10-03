import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { SyntheticEvent, useEffect, useState } from "react";

export default function SearchForm() {
    const [searchValue, setSearchValue] = useState<string>("");

    const search = (e: SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (value) {
                params.set("search", value);
            } else {
                params.delete("search");
            }

            if (params.has("page")) {
                params.set("page", "1");
            }

            window.location.replace(
                `${window.location.pathname}?${params.toString()}`
            );
        }, 300);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        if (search) {
            setSearchValue(search);
        }
    }, []);

    return (
        <div className="relative flex-1 ml-auto md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                onInput={search}
                defaultValue={searchValue}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    );
}
