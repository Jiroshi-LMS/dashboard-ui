"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"

const APIKeyUsageModal = (
    { showUsageModal, setShowUsageModal }: { showUsageModal: boolean, setShowUsageModal: Dispatch<SetStateAction<boolean>> }
) => {
    return (
        <Dialog open={showUsageModal} onOpenChange={setShowUsageModal}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        API Key Usage
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 text-sm">

                    {/* ================= Key Types ================= */}

                    <div>
                        <h3 className="font-semibold text-base mb-2">
                            API Key Types
                        </h3>

                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-1">
                                    Public Key (pk*)
                                </p>
                                <p className="text-gray-600">
                                    Safe to use in frontend applications, browsers, and
                                    client-side code. Required for all public and
                                    student-facing API calls.
                                </p>
                            </div>

                            <div className="p-3 bg-red-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-1">
                                    Secret Key (sk*)
                                </p>
                                <p className="text-gray-600">
                                    Must be kept private and used only in secure,
                                    server-side environments. Intended for sensitive
                                    operations such as payments and privileged actions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ================= Authentication ================= */}

                    <div>
                        <h3 className="font-semibold text-base mb-2">
                            Authentication
                        </h3>

                        <p className="text-gray-600 mb-3">
                            All API requests must include the API key in the
                            <code className="mx-1 font-mono">x-api-key</code> header.
                        </p>

                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                            <div>curl https://api.jiroshi.com/api/v1/endpoint \</div>
                            <div className="ml-4">
                                -H "x-api-key: YOUR_PUBLIC_API_KEY"
                            </div>
                        </div>
                    </div>

                    {/* ================= Key Usage Rules ================= */}

                    <div>
                        <h3 className="font-semibold text-base mb-2">
                            Key Usage Rules
                        </h3>

                        <ul className="space-y-2 text-gray-600">
                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Use <strong>public keys (pk)</strong> for frontend
                                    and student-facing APIs.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Never expose <strong>secret keys (sk)</strong> in
                                    browser code or public repositories.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Each API endpoint specifies whether it requires a
                                    public or secret key.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Using the wrong key type will result in an
                                    authentication error.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* ================= Best Practices ================= */}

                    <div>
                        <h3 className="font-semibold text-base mb-2">
                            Best Practices
                        </h3>

                        <ul className="space-y-2 text-gray-600">
                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Store API keys in environment variables, not in code.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Rotate keys periodically and delete unused keys.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Use different keys for development and production.
                                </span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-gray-400">•</span>
                                <span>
                                    Limit key usage to the minimum required scope.
                                </span>
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