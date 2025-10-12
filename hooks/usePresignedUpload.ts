import { SetStateAction, useCallback } from "react";
import { PUBLIC_UPLOAD } from "@/lib/constants/FileConstants";
import { fetchPresignedUploadURL } from "../feature/common/commonServices";
import axios from "axios";

export const usePresignedUpload = (
    filename: string,
    uploadPrefix: string,
    presignedData: PresignedDataState,
    setPresignedData: React.Dispatch<SetStateAction<PresignedDataState>>,
    uploadType: string | null = null,
    specific_id: string | null = null
) => {
    const getPresignedURL = useCallback(async () => {
        if (presignedData.presignedURL && presignedData.objectKey) return {
            presignedURL: presignedData.presignedURL,
            objectKey: presignedData.objectKey
        }

        const {presignedURL, objectKey} = await fetchPresignedUploadURL(
            filename, uploadPrefix, uploadType, specific_id
        )

        setPresignedData((prev) => ({...prev, presignedURL, objectKey}))
        return {presignedURL, objectKey}

    }, [presignedData, setPresignedData])

    const uploadFile = useCallback(async (
        file: File, setUploadProgress: React.Dispatch<SetStateAction<number>>
    ) => {
        try {
            const { presignedURL, objectKey } = await getPresignedURL();
            if (!presignedURL || !objectKey) throw new Error("Unable to upload file! Please try again later.")
            await axios.put(presignedURL, file, {
                headers: {"Content-Type": file.type || "application/octet-stream"},
                onUploadProgress: (e) => {
                    const progress = Math.round((e.loaded * 100) / (e.total ?? 1));
                    setUploadProgress(progress)
                }
            })
            return { objectKey, presignedURL };
        } catch (err: any) {
            if (err?.response?.status === 403) {
                setPresignedData((prev) => ({
                    ...prev,
                    presignedURL: null,
                    objectKey: null,
                }));
                return uploadFile(file, setUploadProgress);
            }

            throw new Error(err?.message ?? "Failed to upload file! Please, Try again later.")
        }
    }, [getPresignedURL])

    return {uploadFile}
}