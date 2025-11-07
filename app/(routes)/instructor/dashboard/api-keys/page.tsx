"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Info } from "lucide-react"
import APIKeyGenerationForm from "@/feature/api-keys/components/APIKeyGenerationForm"
import APIKeyList from "@/feature/api-keys/components/APIKeyList"
import APIKeyUsageModal from "@/feature/api-keys/components/APIKeyUsageModal"
import APIKeySuccessModal from "@/feature/api-keys/components/APIKeySuccessModal"


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
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)

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

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <div className="mx-auto p-8">
        <div className="mb-8">
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

        <div className="space-y-4">
          <APIKeyGenerationForm setShowSuccessModal={setShowSuccessModal} />
          <APIKeyList keys={keys} handleDelete={handleDelete} />
        </div>
      </div>

      <APIKeyUsageModal showUsageModal={showUsageModal} setShowUsageModal={setShowUsageModal} />
      <APIKeySuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

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
