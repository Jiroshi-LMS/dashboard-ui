import { useState } from "react";

export const useFilters = (defaultFilters: StandardFilters) => {
    const [listFilters, setListFilters] = useState<StandardFilters>(defaultFilters);
    const handleFilterChange = (
        filter_key: string,
        filter_value: string | null
    ) => {
        setListFilters((prev) => {
        const updated = { ...prev };

        if (filter_key === "search" || filter_key === "ordering") 
            updated[filter_key] = filter_value;
        else 
            updated.filters = { ...prev.filters, [filter_key]: filter_value };

        updated.page = 1;
        return updated;
        });
    };

    return { listFilters, setListFilters, handleFilterChange }
}