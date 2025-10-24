import { RefObject } from "react";

export type PresignedUploadReturnState = {
    presignedURL: string | null,
    objectKey: string | null,
    isCancelled: RefObject<boolean>
}