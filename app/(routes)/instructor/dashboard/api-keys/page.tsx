"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import APIKeyGenerationForm from "@/feature/api-keys/components/APIKeyGenerationForm"
import APIKeyList from "@/feature/api-keys/components/APIKeyList"
import APIKeyUsageModal from "@/feature/api-keys/components/APIKeyUsageModal"
import APIKeySuccessModal from "@/feature/api-keys/components/APIKeySuccessModal"


export default function KeyManager() {
  const [keys, setKeys] = useState<Array<KeyItem> | null>(null)
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<CreatedKeys | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showUsageModal, setShowUsageModal] = useState(false)
  const [shouldFetchKeyList, setShouldFetchKeyList] = useState(true)

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="mx-auto p-4 md:p-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">API Keys</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUsageModal(true)}
              className="text-gray-600 w-full sm:w-auto justify-center"
            >
              <Info className="w-4 h-4 mr-2" />
              Usage
            </Button>
          </div>
          <p className="text-sm md:text-base text-gray-500">
            Manage your API keys for authentication and integration
          </p>
        </div>

        <div className="space-y-4">
          <APIKeyGenerationForm
            setShowSuccessModal={setShowSuccessModal}
            setNewlyCreatedKey={setNewlyCreatedKey}
            setShouldFetchKeyList={setShouldFetchKeyList}
          />
          <APIKeyList
            keys={keys}
            setKeys={setKeys}
            shouldFetchKeyList={shouldFetchKeyList}
            setShouldFetchKeyList={setShouldFetchKeyList}
          />
        </div>
      </div>

      <APIKeyUsageModal showUsageModal={showUsageModal} setShowUsageModal={setShowUsageModal} />
      <APIKeySuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        newlyCreatedKey={newlyCreatedKey}
      />
    </div>
  )
}
