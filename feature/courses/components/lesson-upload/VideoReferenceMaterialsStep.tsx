"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadIcon, FileTextIcon, FileIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { object } from "zod";
import { referenceMaterialResourceFormSchema } from "../../courseSchemas";
import { LessonReferenceMaterial, LessonResourcesAll } from "../../courseTypes";
import toast from "react-hot-toast";
import { usePresignedUpload } from "@/hooks/usePresignedUpload";
import { constantFilenames, fileContentTypes, fileUploadPrefixes, PRIVATE_UPLOAD } from "@/lib/constants/FileConstants";
import { units } from "@/lib/constants/common";
import { CreateLessonReferenceMaterialService, FetchLessonResourcesService, RemoveLessonReferenceMaterialService } from "../../courseServices";
import Loader from "@/app/components/atoms/Loader";
import { Progress } from "@/components/ui/progress";

const VideoReferenceMaterialsStep = ({
  lessonId,
  referenceMaterials,
  setReferenceMaterials,
}: {
  lessonId: string | null;
  referenceMaterials: Array<LessonReferenceMaterial>;
  setReferenceMaterials: React.Dispatch<React.SetStateAction<Array<LessonReferenceMaterial>>>;
}) => {
  const allowedFileSize = 20; // MBs
  const {uploadFile, setPresignedData} = usePresignedUpload(
      constantFilenames.LESSON_REFERENCE_MATERIAL,
      fileUploadPrefixes.LESSON_REFERENCE_MATERIAL,
      PRIVATE_UPLOAD,
      lessonId
  )

  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [referenceUploadProgress, setReferenceUploadProgress] = useState<number>(0)
  const [referenceCardLoaders, setReferenceCardLoaders] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (lessonId && referenceMaterials.length === 0) {
      const fetchResources = async () => {
        setInitialLoading(true);
        const setResourcesState = (data: LessonResourcesAll | null) => {
          if (data && data.file_resources) {
            const formattedResources = data.file_resources.map(res => ({
              title: res.title,
              file_name: res.file_name,
              file_size: res.file_size,
              file_type: res.file_type,
              file_key: res.file_key,
              resource_id: res.uuid
            }));
            setReferenceMaterials(formattedResources);
          }
        };
        await FetchLessonResourcesService(lessonId, (data) => setResourcesState(data as LessonResourcesAll | null));
        setInitialLoading(false);
      };
      fetchResources();
    }
  }, [lessonId, referenceMaterials.length, setReferenceMaterials]);

  const referenceMaterialForm = useForm<
    z.infer<typeof referenceMaterialResourceFormSchema>
  >({
    resolver: zodResolver(referenceMaterialResourceFormSchema),
    defaultValues: {
      title: "",
      referenceFile: undefined,
    },
  });

  const createReferenceMaterial = async (
    values: z.infer<typeof referenceMaterialResourceFormSchema>
  ) => {
      try {
      if (!lessonId) return;
      const file = values.referenceFile;
      if (!file) {
        toast.error("Please upload a file.");
        return;
      }
      const contentType = file.type
      if (
            file.size > allowedFileSize * units.MB
        ) throw new Error("Please provide a valid file format.");

      const { objectKey } = await uploadFile(
        file,
        contentType,
        setReferenceUploadProgress
      );
      if (!objectKey) throw new Error("Failed to upload file! Please try again later.")
      const material: LessonReferenceMaterial = {
        title: values.title,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type || "unknown",
        file_key: objectKey,
        resource_id: null
      };
      const creationResponse = await CreateLessonReferenceMaterialService(material, lessonId)
      if (creationResponse.success && creationResponse.response?.resource_id) {
        material.resource_id = creationResponse.response.resource_id
        setReferenceMaterials(prev => [...prev, material])
        toast.success("Reference material added successfully!");
        referenceMaterialForm.reset();
      }
      setPresignedData({
        presignedURL: null,
        objectKey: null
      })
      setReferenceUploadProgress(0)
    } catch (err) {
      toast.error("Failed to add reference material. Please try again.");
    }
  };

  const removeReferenceMaterial = async (index: number) => {
    const resource = referenceMaterials[index];
    if (!resource) return;

    setReferenceCardLoaders((prev) => ({ ...prev, [index]: true }));
    try {
      const deletionResponse = await RemoveLessonReferenceMaterialService(resource.resource_id as string);

      if (deletionResponse) {
        setReferenceMaterials((prev) => prev.filter((_, i) => i !== index));
        toast.success("Lesson Reference Material Deleted Successfully!")
      } else {
        toast.error("Failed to remove reference.");
      }
    } catch (err) {
      console.error("Error removing reference:", err);
      toast.error("An error occurred while removing the reference.");
    } finally {
      setReferenceCardLoaders((prev) => {
        const newMap = { ...prev };
        delete newMap[index];
        return newMap;
      });
    }
  };

  const formatFileSize = (size: number) => {
    if (size < units.KB) return `${size} B`;
    else if (size < units.MB)
      return `${(size / units.KB).toFixed(1)} KB`;
    else return `${(size / (units.MB)).toFixed(1)} MB`;
  };

  if (!lessonId) return <Loader className="h-screen" />
  if (initialLoading) return <Loader className="h-screen" />

  return (
    <section className="w-[80%] mx-auto space-y-10">
      {
        (referenceUploadProgress > 0 || referenceMaterialForm.formState.isSubmitting) ? 
        <div className="flex justify-center items-center border border-gray-200 rounded-2xl shadow-sm p-8 transition hover:shadow-md min-h-[50vh]">
          <Progress value={referenceUploadProgress} />
        </div> :
      <div className="border border-gray-200 rounded-2xl shadow-sm p-8 transition hover:shadow-md">
        <h1 className="section-title text-2xl font-semibold mb-2">
          Add Reference Materials (Optional)
        </h1>
        <p className="text-gray-600 text-[13px] mb-6 font-medium">
          Upload PDFs, PPTX, DOCX, XLSX or images for your lesson. Enrolled learners
          will be able to download these resources.
        </p>

        <Form {...referenceMaterialForm}>
          <form
            onSubmit={referenceMaterialForm.handleSubmit(createReferenceMaterial)}
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={referenceMaterialForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    File Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Chapter 1 Notes"
                      className="focus-visible:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              control={referenceMaterialForm.control}
              name="referenceFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Reference File
                  </FormLabel>
                  <FormControl>
                    <div
                      className="flex justify-center items-center h-[6em] w-full border-2 border-dashed 
                      border-gray-300 rounded-xl gap-3 text-gray-600 font-medium text-sm cursor-pointer
                      hover:bg-gray-50 hover:border-teal-400 transition"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      <UploadIcon size={18} />{" "}
                      Drag & drop or click to upload file (Max {allowedFileSize}MB)
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.jpg,.png,.docx,.pptx,.xlsx,.doc,.ppt,.xls"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </div>
                  </FormControl>
                  {referenceMaterialForm.watch("referenceFile") && (
                    <p className="text-xs text-gray-700 mt-2 flex items-center gap-1">
                      <FileTextIcon size={14} className="text-teal-500" />
                      {referenceMaterialForm.watch("referenceFile")?.name}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={referenceMaterialForm.formState.isSubmitting}
                className="bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
              >
                {referenceMaterialForm.formState.isSubmitting ? (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <UploadIcon size={16} />
                )}
                Upload Reference
              </Button>
            </div>
          </form>
        </Form>
      </div>
      }
      {/* Uploaded Materials Grid */}
      {referenceMaterials.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Uploaded Materials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {referenceMaterials.map((item, index) => {
              const IsDeleting = referenceCardLoaders[index]
              return (
                <Card
                  key={index}
                  className="border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl"
                >
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <CardTitle className="truncate text-[15px] font-semibold">
                      {item.title}
                    </CardTitle>
                    { 
                      (IsDeleting) ? 
                      <button className="px-1 py-2 rounded-md font-medium text-[13px] transition flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-[black] border-t-transparent rounded-full" />
                      </button>
                      :
                      <button
                        onClick={() => removeReferenceMaterial(index)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <XIcon size={16} />
                      </button>
                    }
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileIcon size={16} className="text-teal-600" />
                      <span className="truncate">{item.file_name}</span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      {item.file_type} • {formatFileSize(item.file_size)}
                    </p>
                  </CardContent>
                </Card>
              )}
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoReferenceMaterialsStep;
