import api from "@/lib/api/axios"
import { route } from "@/lib/constants/RouteConstants"


export const fetchPresignedUploadURL = async (
    filename: string,
    contentType: string,
    prefix: string,
    uploadType: string | null,
    specificId: string | null
) => {
    const { data } = await api.post(route.GET_PRESIGNED_UPLOAD, {
        prefix,
        file_name: filename,
        content_type: contentType,
        upload_type: uploadType,
        specific_id: specificId ?? null
    })
    const url = data?.response?.upload_url
    const key = data?.response?.object_key

    if (!url || !key) throw new Error(data?.msg || "Unable to generate upload URL")

    return { presignedURL: url, objectKey: key };
}


export const fetchListDataService = async (url: string, listingFilters: StandardFilters | null = null) => {
    const params = new URLSearchParams();

    if (listingFilters) {
        if (listingFilters.filters)
            Object.entries(listingFilters.filters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "")
                params.append(key, String(value));
            });

        if (listingFilters.search)
            params.append("search", listingFilters.search);

        if (listingFilters.ordering)
            params.append("ordering", listingFilters.ordering);

        params.append("page", String(listingFilters.page));
        params.append("page_size", String(listingFilters.page_size))
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const { data } = await api.get(url + queryString);
    return data as StandardResponse;
}