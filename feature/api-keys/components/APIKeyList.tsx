import Loader from '@/app/components/atoms/Loader'
import { CommonPaginationBar } from '@/app/components/organism/Paginator/CommonPaginationBar'
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchListDataService } from '@/feature/common/commonServices'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { useFilters } from '@/hooks/useFilters'
import { route } from '@/lib/constants/RouteConstants'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { Key, Trash2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'


type APIKeyListProps = {
    keys: Array<KeyItem> | null, 
    setKeys: Dispatch<SetStateAction<Array<KeyItem>|null>>
}

const APIKeyList = (
    {keys, setKeys}: APIKeyListProps
) => {
  const [paginationData, setPaginationData] = useState<PaginatedResults | null>(null);
  const [search, setSearch] = useDebouncedState("", 500);
  const [isInitial, setIsInitial] = useState(true);
  const hasFetchedOnce = useRef(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const {
  listFilters: keyFilters, 
  setListFilters: setKeyFilters, 
  handleFilterChange
  } = useFilters({
      filters: {},
      ordering: null,
      search: null,
      page: 1,
      page_size: 15,
  })

  const handleDelete = (id: string) => {
    setKeyToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (keyToDelete) {
      setKeys((prev) => (prev) ? prev.filter((k) => k.uuid !== keyToDelete) : prev);
      setKeyToDelete(null)
    }
    setShowDeleteDialog(false)
  }

  const fetchAPIKeysData = async (keyFilters: StandardFilters) => {
    try {
        const resp = await fetchListDataService(
            route.LIST_API_KEYS,
            keyFilters
        );
        const paginatedData: PaginatedResults | null = resp?.response;
        if (paginatedData) {
            setPaginationData(paginatedData);
            const formattedData = paginatedData?.results?.map(
            (keyData: KeyItem, idx) => {
                const keyCreatedDateObject = new Date(keyData.created_at);
                let keyExpiresDateObject: Date | null = null;
                if (keyData.expires_at) keyExpiresDateObject = new Date(keyData.expires_at);
                return {
                  ...keyData,
                  created_at: keyCreatedDateObject.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  }),
                  expires_at: keyExpiresDateObject?.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  }) || "Never"
                };
            }
            );
            setKeys(formattedData);
        }
    } catch (err: any) {
        toast.error("Failed to fetch courses! Try again.");
        setKeys([]);
    }
  };

  useEffect(() => {
    fetchAPIKeysData(keyFilters)
  }, [])

  const totalPages = paginationData?.total_pages || 1

  if (!keys) return <Loader className='h-[30vh]' />
  return (
    <div className="space-y-6">
        <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-white">
                <CardTitle className="text-lg font-semibold text-gray-900">Your Keys</CardTitle>
                <CardDescription>
                {keys.length} active key{keys.length !== 1 ? 's' : ''}
                </CardDescription>
                {/* <section className='flex justify-between items-center my-4'>
                    <LessonListFilters
                        courseId={courseId}
                        lessonFilters={lessonFilters}
                        setLessonFilters={setLessonFilters}
                        setSearch={setSearch}
                        handleFilterChange={handleFilterChange}
                    />
                </section> */}
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
                        key={key.uuid}
                        className="p-6 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                                <Key className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-medium text-gray-900">{key.key_name}</h3>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 ml-11">
                            <span>Created {key.created_at}</span>
                            <span>•</span>
                            <span>Expires: {key.expires_at}</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(key.uuid)}
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
            {paginationData && totalPages > 1 && (
                <section className="my-3">
                    <CommonPaginationBar
                        currentPage={keyFilters.page}
                        totalPages={totalPages}
                        onPageChange={(page: number) =>
                            setKeyFilters((prev) => ({ ...prev, page }))
                        }
                    />
                </section>
            )}
        </Card>
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

export default APIKeyList