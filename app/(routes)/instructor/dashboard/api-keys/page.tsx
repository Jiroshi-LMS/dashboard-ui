"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, Key, Copy, Check, Info, Shield } from "lucide-react"
import APIKeyGenerationForm from "@/feature/api-keys/components/APIKeyGenerationForm"
import APIKeyList from "@/feature/api-keys/components/APIKeyList"


export default function KeyManager() {
  const [keys, setKeys] = useState<KeyPair[]>([
    { 
      id: "1", 
      name: "Production API", 
      expires_at_days: "1 Month", 
      createdAt: "2025-10-25"
    },
    { 
      id: "2", 
      name: "Development", 
      expires_at_days: "Never", 
      createdAt: "2025-10-20"
    },
  ])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showUsageModal, setShowUsageModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<CreatedKeys | null>(null)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)



  const handleDelete = (id: string) => {
    setKeyToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (keyToDelete) {
      setKeys((prev) => prev.filter((k) => k.id !== keyToDelete))
      setKeyToDelete(null)
    }
    setShowDeleteDialog(false)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <div className="mx-auto p-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">API Keys</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUsageModal(true)}
              className="text-gray-600"
            >
              <Info className="w-4 h-4 mr-2" />
              Usage
            </Button>
          </div>
          <p className="text-gray-500">
            Manage your API keys for authentication and integration
          </p>
        </div>

        <APIKeyGenerationForm setShowSuccessModal={setShowSuccessModal} />
        <APIKeyList keys={keys} handleDelete={handleDelete} />
        
      </div>

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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this key pair. Any applications using these keys will immediately lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
