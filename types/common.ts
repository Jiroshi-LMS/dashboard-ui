type StandardResponse = {
    msg: string | null;
    status: boolean;
    status_code: number;
    response: any;
} | null | undefined


type PresignedDataState = {
  presignedURL: string | null,
  objectKey: string | null
}