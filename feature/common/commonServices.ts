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