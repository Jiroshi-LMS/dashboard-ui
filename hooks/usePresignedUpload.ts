import { SetStateAction, useCallback, useRef, useState } from "react";
import { fileContentTypes } from "@/lib/constants/FileConstants";
import { fetchPresignedUploadURL } from "../feature/common/commonServices";
import axios from "axios";
import { PresignedUploadReturnState } from "@/feature/common/commonTypes";


export const usePresignedUpload = (
    filename: string,
    uploadPrefix: string,
    uploadType: string | null = null,
    specific_id: string | null = null
) => {
    const [presignedData, setPresignedData] = useState<PresignedDataState>({
        presignedURL: null,
        objectKey: null
    })
    const abortControllerRef = useRef<AbortController | null>(null);
    const isCancelled = useRef(false);

    const cancelUpload = useCallback(() => {
        if (abortControllerRef.current) {
            isCancelled.current = true;
            abortControllerRef.current.abort();
        }
    }, []);

    const getPresignedURL = useCallback(async (contentType: string) => {
        if (presignedData.presignedURL && presignedData.objectKey) return presignedData
        const {presignedURL, objectKey} = await fetchPresignedUploadURL(
            filename, contentType, uploadPrefix, 
            uploadType, specific_id
        )
        setPresignedData({presignedURL, objectKey})
        return {presignedURL, objectKey}
    }, [presignedData, filename, uploadPrefix, uploadType, specific_id])

    const uploadFile = useCallback(async (
        file: File, 
        contentType: string, 
        setUploadProgress?: React.Dispatch<SetStateAction<number>>
    ): Promise<PresignedUploadReturnState> => {
        try {
             const controller = new AbortController();
            abortControllerRef.current = controller;
            isCancelled.current = false;

            const { presignedURL, objectKey } = await getPresignedURL(contentType);
            if (!presignedURL || !objectKey) throw new Error("Unable to upload file! Please try again later.")
            await axios.put(presignedURL, file, {
                headers: {"Content-Type": file.type || fileContentTypes.OCTET_STREAM},
                onUploadProgress: (e) => {
                    const progress = Math.round((e.loaded * 100) / (e.total ?? 1));
                    if (setUploadProgress) setUploadProgress(progress)
                },
                signal: controller.signal
            })
            return { objectKey, presignedURL, isCancelled };
        } catch (err: any) {
            if (axios.isCancel(err)) {
                isCancelled.current=false;
                throw new Error("Upload Cancelled !")
            }

            if (err?.response?.status === 403) {
                setPresignedData((prev) => ({
                    ...prev,
                    presignedURL: null,
                    objectKey: null,
                }));
                return uploadFile(file, contentType, setUploadProgress);
            }

            throw new Error(err?.message ?? "Failed to upload file! Please, Try again later.")
        }
    }, [getPresignedURL])

    return {uploadFile, presignedData, setPresignedData, cancelUpload}
}