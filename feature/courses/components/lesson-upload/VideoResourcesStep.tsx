"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon, SaveAllIcon, UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LessonRelatedLink } from "../../courseTypes";

const textResourceFormSchema = z.object({
  notes: z.string().optional(),
  lesson_uuid: z.string(),
});

const relatedLinkFormSchema = z.object({
  title: z.string().min(2, "Please provide a valid title. Minimum length: 2"),
  url: z.string().regex(
    /^[a-zA-Z]+:\/\/[\w.-]+(:[0-9]+)?(\/[^\s]*)?$/,
    "Please provide a valid URL"
  )
});

type VideoResourceSetupProps = {
  lessonId: string | null;
};

const VideoResourcesStep = ({ lessonId }: VideoResourceSetupProps) => {
  const [relatedLinks, setRelatedLinks] = useState<Array<LessonRelatedLink>>(
    []
  );
  const textResouceForm = useForm<z.infer<typeof textResourceFormSchema>>({
    resolver: zodResolver(textResourceFormSchema),
    defaultValues: {
      lesson_uuid: lessonId || undefined,
    },
  });
  const relatedLinkForm = useForm<z.infer<typeof relatedLinkFormSchema>>({
    resolver: zodResolver(relatedLinkFormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const createRelatedLink = (
    values: z.infer<typeof relatedLinkFormSchema>
  ) => {
    setRelatedLinks(prev => {
      return [...prev, {...values, index: relatedLinks.length - 1}]
    })
    relatedLinkForm.reset()
  };

  const removeRelatedLink = (index: number) => {
    setRelatedLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = (values: z.infer<typeof textResourceFormSchema>) => {
    console.log("Form Submitted:", values);
  };
  return (
    <main className="">
      <section>
        <div>
          <Form {...textResouceForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-6"
            >
              {/* Lesson Notes */}
              <div className="w-[80%] mx-auto">
                <h1 className="section-title">Add Lesson Notes</h1>
                <FormField
                  control={textResouceForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Lesson Notes"
                          {...field}
                          className="h-[10em]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <div className="w-[80%] mx-auto">
            <h1 className="section-title">Add Reference URLs</h1>
            <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
              Add multiple reference URLs for your lesson.
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((link, index) => (
                <div
                  key={index}
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
                    onClick={() => {removeRelatedLink(index)}}
                    className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <Form {...relatedLinkForm}>
              <form onSubmit={relatedLinkForm.handleSubmit(createRelatedLink)}>
                <div className="my-6 space-y-6 w-[70%]">
                  <FormField
                    control={relatedLinkForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Link Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
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
                        <FormLabel>Related Link URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="URL"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer"
                  >
                    <PlusIcon /> Add Link
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="my-3 w-full flex justify-end items-center">
            <Button
              type="button"
              className="bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer"
            >
              <SaveAllIcon /> Save
            </Button>
          </div>

          <hr />

          <div className="w-[80%] mx-auto">
            <h1 className="section-title">Add Reference Materials</h1>
            <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
              Add multiple PDF, PPTX, DOCX or other reference materials for your
              lesson.
            </p>
            <div className="my-6 flex flex-col justify-center items-start gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="url-title" className="text-[14px]">
                  Document Title
                </Label>
                <Input
                  placeholder="URL Title"
                  className="w-full"
                  name="url-title"
                  id="url-title"
                />
              </div>
              <div>
                <span className="text-[14px] font-medium">
                  Upload Reference Material File
                </span>
                <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
                  Upload the reference material file here, it will be
                  downloadable by the enrolled members of the course.
                </p>
                <div
                  className="flex justify-center items-center h-[6em] w-[20em] px-4
                            border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[12px] text-gray-600"
                >
                  Drag & drop or click to upload image (Max 5MB) <UploadIcon />
                </div>
              </div>
              <Button className="bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer">
                <UploadIcon /> Upload Reference
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VideoResourcesStep;
