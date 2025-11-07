import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Key, Trash2 } from 'lucide-react'
import React from 'react'

const APIKeyList = (
    {keys, handleDelete}: {keys: KeyPair[], handleDelete: (id: string) => void}
) => {
  return (
    <div className="space-y-6">
        <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100 bg-white">
            <CardTitle className="text-lg font-semibold text-gray-900">Your Keys</CardTitle>
            <CardDescription>
            {keys.length} active key{keys.length !== 1 ? 's' : ''}
            </CardDescription>
        </CardHeader>

        <CardContent className="p-0 bg-white">
            {keys.length === 0 ? (
            <div className="text-center py-16">
                <Key className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No keys created yet</p>
                <p className="text-gray-400 text-sm mt-1">Create your first API key to get started</p>
            </div>
            ) : (
            <div className="divide-y divide-gray-100">
                {keys.map((key) => (
                <div
                    key={key.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                            <Key className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">{key.name}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 ml-11">
                        <span>Created {key.createdAt}</span>
                        <span>•</span>
                        <span>Expires: {key.expires_at_days}</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(key.id)}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </CardContent>
        </Card>
    </div>
  )
}

export default APIKeyList