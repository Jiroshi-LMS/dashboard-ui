"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"

const APIKeyUsageModal = (
    {showUsageModal, setShowUsageModal}: {showUsageModal: boolean, setShowUsageModal: Dispatch<SetStateAction<boolean>>}
) => {
  return (
    <Dialog open={showUsageModal} onOpenChange={setShowUsageModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle className="text-xl">API Key Documentation</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 text-sm">
            <div>
                <h3 className="font-semibold text-base mb-2">Key Types</h3>
                <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Public Key (pk_live_...)</p>
                    <p className="text-gray-600">Safe to use in client-side code, browser applications, and public repositories</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Private Key (sk_live_...)</p>
                    <p className="text-gray-600">Must be kept secret. Only use in server-side code and secure environments</p>
                </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-base mb-2">Authentication</h3>
                <p className="text-gray-600 mb-3">Include your API key in the Authorization header:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <div>curl https://api.example.com/endpoint \</div>
                <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-base mb-2">Best Practices</h3>
                <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Store private keys in environment variables, never in code</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Rotate keys regularly and delete unused keys</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Use different keys for development and production</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Set appropriate expiration times based on usage</span>
                </li>
                </ul>
            </div>
            </div>
            
            <div className="flex justify-end mt-6">
            <Button
                onClick={() => setShowUsageModal(false)}
                variant="outline"
            >
                Close
            </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default APIKeyUsageModal