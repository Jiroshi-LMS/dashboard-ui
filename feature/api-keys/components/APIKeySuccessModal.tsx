"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Copy, Key, Shield } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

const APIKeySuccessModal = (
    {
        showSuccessModal, 
        setShowSuccessModal,
        newlyCreatedKey
    }: 
    {
        showSuccessModal: boolean, 
        setShowSuccessModal: Dispatch<SetStateAction<boolean>>,
        newlyCreatedKey: CreatedKeys | null
    }
) => {
    const [copiedKey, setCopiedKey] = useState<string | null>(null)

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedKey(id)
        setTimeout(() => setCopiedKey(null), 2000)
    }

  return (
    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Keys Created Successfully</DialogTitle>
            <DialogDescription className="text-center">
                Save these keys securely. You won't be able to see them again.
            </DialogDescription>
            </DialogHeader>
            
            {newlyCreatedKey && (
            <div className="space-y-4 mt-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Key className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Public Key</h3>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded border border-gray-200">
                    <code className="flex-1 text-sm font-mono text-gray-900 break-all">
                    {newlyCreatedKey.publicKey}
                    </code>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(newlyCreatedKey.publicKey, "public")}
                    >
                    {copiedKey === "public" ? (
                        <Check className="w-4 h-4 text-green-600" />
                    ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                    )}
                    </Button>
                </div>
                <p className="text-xs text-gray-600 mt-2">Use this in client-side applications and API requests</p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-900">Private Key</h3>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded border border-gray-200">
                    <code className="flex-1 text-sm font-mono text-gray-900 break-all">
                    {newlyCreatedKey.privateKey}
                    </code>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(newlyCreatedKey.privateKey, "private")}
                    >
                    {copiedKey === "private" ? (
                        <Check className="w-4 h-4 text-green-600" />
                    ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                    )}
                    </Button>
                </div>
                <p className="text-xs text-red-600 mt-2">⚠️ Keep this secret. Never share or expose it in client-side code</p>
                </div>
            </div>
            )}
            
            <div className="flex justify-center mt-6">
            <Button 
                onClick={() => setShowSuccessModal(false)}
                className="bg-teal-600 hover:bg-teal-700"
            >
                I've Saved These Keys
            </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default APIKeySuccessModal