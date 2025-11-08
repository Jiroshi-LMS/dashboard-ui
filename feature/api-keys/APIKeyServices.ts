import toast from "react-hot-toast"
import { generateKeyPairRepository } from "./APIKeyRepository"
import { standardErrors } from "@/lib/constants/errors"


export const GenerateKeyPairService = async (
    key_name: string, 
    expires_at_days: number | null
): Promise<{publicKey: string, privateKey: string} | null> => {
    try {
        const resp = await generateKeyPairRepository(key_name, expires_at_days)
        if (resp?.status && resp?.response) {
            toast.success("Key Pair has been generated successfully !")
            return {
                publicKey: resp.response?.public,
                privateKey: resp.response?.private
            }
        }
        toast.error(resp?.msg || "Unable to generate keys at the moment! Please try again later.")
    } catch(err: any) {
        toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN)
    }
    return null
}


// export const FetchKeyListService = async () => {
//     try{
//         const resp = await fetchKeyListRepository()
//     } catch (err: any) {

//     }
//     return null
//  }