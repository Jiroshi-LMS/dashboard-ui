import Loader from "@/app/components/atoms/Loader";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchListDataService } from "@/feature/common/commonServices";
import { route } from "@/lib/constants/RouteConstants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Key, Trash2 } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { DeleteAPIKeyService } from "../APIKeyServices";

type APIKeyListProps = {
  keys: Array<KeyItem> | null;
  setKeys: Dispatch<SetStateAction<Array<KeyItem> | null>>;
  shouldFetchKeyList: boolean;
  setShouldFetchKeyList: Dispatch<SetStateAction<boolean>>;
};

const APIKeyList = ({ keys, setKeys, shouldFetchKeyList, setShouldFetchKeyList }: APIKeyListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasFetchedOnce = useRef(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (uuid: string) => {
    setKeyToDelete(uuid);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (keyToDelete) {
      await DeleteAPIKeyService(keyToDelete)
      setShouldFetchKeyList(true)
    }
    setShowDeleteDialog(false);
  };

  const fetchAPIKeysData = async () => {
    setIsLoading(true);
    try {
      const resp = await fetchListDataService(route.LIST_API_KEYS);
      const paginatedData: PaginatedResults | null = resp?.response;
      if (paginatedData) {
        const formattedData = paginatedData?.results?.map(
          (keyData: KeyItem, idx) => {
            const keyCreatedDateObject = new Date(keyData.created_at);
            let keyExpiresDateObject: Date | null = null;
            if (keyData.expires_at)
              keyExpiresDateObject = new Date(keyData.expires_at);
            return {
              ...keyData,
              created_at: keyCreatedDateObject.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              expires_at:
                keyExpiresDateObject?.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) || "Never",
            };
          }
        );
        setKeys(formattedData);
      }
    } catch (err: any) {
      toast.error("Failed to fetch courses! Try again.");
      setKeys([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasFetchedOnce.current && !shouldFetchKeyList) return;
    hasFetchedOnce.current = true;
    setKeys(null);
    fetchAPIKeysData();
    setShouldFetchKeyList(false)
  }, [shouldFetchKeyList]);

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 gap-0">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Your Keys
          </CardTitle>
          {keys ? (
            <CardDescription>
              {keys.length} active key{keys.length !== 1 ? "s" : ""}
            </CardDescription>
          ) : null}
        </CardHeader>
        {isLoading ? (
          <CardContent>
            <Loader className="h-[30vh]" />
          </CardContent>
        ) : !keys ? (
          <CardContent>
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-red-400 font-bold text-2xl text-center">
                "Nothing to show! Try generating an API Key."
              </h1>
            </div>
          </CardContent>
        ) : (
          <CardContent className="p-0 bg-white">
            {keys.length === 0 ? (
              <div className="text-center py-20">
                <Key className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No API Keys Yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Create your first key to begin integrating.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y">
                {keys.map((key) => (
                  <div
                    key={key.uuid}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors gap-4"
                  >
                    {/* Left Section */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                      <div className="mt-1 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
                        <Key className="w-4 h-4 text-white" />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        {/* Name + Type + Status Badges */}
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
                            {key.key_name}
                          </h3>

                          <div className="flex flex-wrap gap-1.5 mt-0.5">
                            {/* Key Type Badge */}
                            <span
                              className={
                                key.key_type === "public"
                                  ? "text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
                                  : "text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700"
                              }
                            >
                              {key.key_type === "public" ? "Public" : "Private"}
                            </span>

                            {/* Status Badge */}
                            <span
                              className={
                                key.status === "active"
                                  ? "text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700"
                                  : key.status === "revoked"
                                    ? "text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700"
                                    : "text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600"
                              }
                            >
                              {key.status.charAt(0).toUpperCase() +
                                key.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="whitespace-nowrap">Created: {key.created_at}</span>
                          <span className="hidden sm:inline text-gray-400">•</span>
                          <span className="whitespace-nowrap">Expires: {key.expires_at}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button (visible on hover for desktop, always visible on mobile) */}
                    <div className="w-full sm:w-auto flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="sm:opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(key.uuid)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <div className="flex justify-end items-center w-full">
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your course
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default APIKeyList;
