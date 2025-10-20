"use client";

import { useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { PlusIcon, SaveAllIcon, UploadIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { LessonRelatedLink } from "../../courseTypes";
import { textResourceFormSchema } from "../../courseSchemas";
import { updateTextResourceRepository } from "../../courseRepositories";
import { standardErrors } from "@/lib/constants/errors";
import Loader from "@/app/components/atoms/Loader";

/** Lenient URL validator */
const relatedLinkFormSchema = z.object({
  title: z.string().min(2, "Please provide a valid title. Minimum length: 2"),
  url: z
    .string()
    .regex(/^(https?:\/\/)?([\w.-]+)(\.[a-z]{2,})([^\s]*)?$/i, "Please provide a valid URL"),
});

type VideoResourceSetupProps = {
  lessonId: string | null;
};

const VideoResourcesStep: React.FC<VideoResourceSetupProps> = ({ lessonId }) => {
  const [relatedLinks, setRelatedLinks] = useState<Array<LessonRelatedLink>>([]);

  // Main notes form (this will be the only <form> element)
  const textResourceForm = useForm<z.infer<typeof textResourceFormSchema>>({
    resolver: zodResolver(textResourceFormSchema),
    defaultValues: {
      notes: "",
      lesson_uuid: lessonId ?? "",
    },
  });

  // Related link "mini-form" — we will NOT render a <form> for this
  const relatedLinkForm = useForm<z.infer<typeof relatedLinkFormSchema>>({
    resolver: zodResolver(relatedLinkFormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const createRelatedLink = (values: z.infer<typeof relatedLinkFormSchema>) => {
    setRelatedLinks((prev) => [...prev, { ...values }]);
    relatedLinkForm.reset();
  };

  const removeRelatedLink = (index: number) => {
    setRelatedLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTextResources = async (values: z.infer<typeof textResourceFormSchema>) => {
    try {
      const resp = await updateTextResourceRepository(values, relatedLinks);
      if (resp?.status) {
        toast.success("Textual resources updated successfully!");
        return;
      }
      toast.error(resp?.msg || "Unable to update text resources! Please try again later.");
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || err?.message || standardErrors.UNKNOWN);
    }
  };

  if (!lessonId) return <Loader className="h-screen" />

  return (
    <main>
      <section className="w-[80%] mx-auto space-y-10">
        <FormProvider {...textResourceForm}>
          <form onSubmit={textResourceForm.handleSubmit(updateTextResources)} className="space-y-8">
            <div>
              <h1 className="section-title">Add Lesson Notes</h1>
              <FormField
                control={textResourceForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="h-[10em]" placeholder="Write lesson notes..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h1 className="section-title">Add Reference URLs</h1>
              <p className="text-gray-600 text-[12px] mb-2 font-semibold">
                Add multiple reference URLs for your lesson.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {relatedLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-3 py-1 rounded-full shadow-sm hover:bg-gray-200 transition"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-teal-600 hover:underline truncate max-w-[150px]"
                    >
                      {link.title}
                    </a>

                    <button
                      type="button"
                      onClick={() => removeRelatedLink(idx)}
                      className="text-gray-500 hover:text-red-600 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 w-[70%]">
                <FormField
                  control={relatedLinkForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={relatedLinkForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={() => relatedLinkForm.handleSubmit(createRelatedLink)()}
                    className="bg-primary text-white hover:bg-teal-600"
                  >
                    <PlusIcon size={16} className="mr-1" /> Add Link
                  </Button>

                  {relatedLinkForm.formState.errors.title?.message && (
                    <div className="text-sm text-red-500">{String(relatedLinkForm.formState.errors.title.message)}</div>
                  )}
                  {relatedLinkForm.formState.errors.url?.message && (
                    <div className="text-sm text-red-500">{String(relatedLinkForm.formState.errors.url.message)}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-primary text-white hover:bg-teal-600">
                <SaveAllIcon size={16} className="mr-1" />
                Save
              </Button>
            </div>
          </form>
        </FormProvider>

        <div>
          <h1 className="section-title">Add Reference Materials</h1>
          <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
            Add multiple PDF, PPTX, DOCX or other reference materials for your lesson.
          </p>

          <div className="my-6 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="url-title" className="text-[14px]">Document Title</Label>
              <Input placeholder="Reference title" className="w-full" name="url-title" id="url-title" />
            </div>

            <div>
              <span className="text-[14px] font-medium">Upload Reference Material File</span>
              <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
                Upload the reference material file here; it’ll be downloadable by enrolled course members.
              </p>
              <div className="flex justify-center items-center h-[6em] w-[20em] px-4 border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[12px] text-gray-600 cursor-pointer">
                Drag & drop or click to upload file (Max 5MB) <UploadIcon />
              </div>
            </div>

            <Button className="bg-primary text-white hover:bg-teal-600">
              <UploadIcon /> Upload Reference
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VideoResourcesStep;
