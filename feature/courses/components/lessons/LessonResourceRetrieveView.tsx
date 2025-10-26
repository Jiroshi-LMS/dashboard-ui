"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DownloadIcon, FileIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FetchLessonResourcesService } from '../../courseServices'
import { LessonResourcesAll } from '../../courseTypes'
import Loader from '@/app/components/atoms/Loader'
import { formatFileSize } from '@/lib/utils'


const static_attached_links = [
  {
    link_id: "link-1",
    link_title: "Django Documentation",
    link_url: "https://docs.djangoproject.com/en/4.1/",
  },
  {
    link_id: "link-2",
    link_title: "Python Documentation",
    link_url: "https://docs.python.org/3/",
  },
  {
    link_id: "link-3",
    link_title: "Git Documentation",
    link_url: "https://git-scm.com/docs",
  },
];

const static_downloadables = [
  {
    downloadable_id: "downloadable-1",
    downloadable_title: "Lesson 1 Notes",
    downloadable_file_name: "notes_lesson_1.pdf",
    downloadable_file_size: "10MB",
    downloadable_file_type: "pdf",
  },
  {
    downloadable_id: "downloadable-2",
    downloadable_title: "Django Book PDF",
    downloadable_file_name: "django_book.pdf",
    downloadable_file_size: "20MB",
    downloadable_file_type: "pdf",
  },
  {
    downloadable_id: "downloadable-3",
    downloadable_title: "Learn Python PDF",
    downloadable_file_name: "learn_python.pdf",
    downloadable_file_size: "12MB",
    downloadable_file_type: "pdf",
  },
];

const LessonResourceRetrieveView = ({lessonId}: {lessonId: string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [lessonResources, setLessonResources] = useState<LessonResourcesAll | null>(null)

    useEffect(() => {
        FetchLessonResourcesService(lessonId, setIsLoading, setLessonResources)
    }, [])
  if (isLoading) return <Loader className='h-[30vh]' />

  return (
    <Card className="shadow-md border border-gray-200">
        <CardContent className="pt-6">
          {
            (!lessonResources) ? 
            <div className="flex justify-center items-center min-h-[30vh] w-full">
                <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
                    Unable to fetch lesson resources information. Please try again later...
                </h1>
            </div> :
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="attached-links">Attached Links</TabsTrigger>
              <TabsTrigger value="downloadables">Downloadables</TabsTrigger>
            </TabsList>

            {
                (lessonResources?.notes) ?
                <TabsContent
                value="notes"
                className="text-gray-700 text-sm leading-relaxed min-h-[20vh]"
                >
                    {lessonResources.notes}
                </TabsContent>
                :
                <TabsContent
                value="notes"
                className="flex justify-center items-center text-red-400 text-sm leading-relaxed min-h-[20vh] text-center font-bold"
                >
                    <h1>Notes have not been added...</h1>
                </TabsContent>
            }

            {
                (lessonResources?.related_links && lessonResources?.related_links?.length > 0) ?
                <TabsContent value="attached-links">
                <div className="space-y-3">
                    {lessonResources?.related_links?.map((link, idx) => (
                    <div key={idx} className="border-b pb-2">
                        <h4 className="font-semibold text-gray-800">
                        {link.title}
                        </h4>
                        <Link
                        href={link.url}
                        target="_blank"
                        className="text-primary text-sm hover:underline"
                        >
                        {link.url}
                        </Link>
                    </div>
                    ))}
                </div>
                </TabsContent>
            :
                <TabsContent
                value="attached-links"
                className="flex justify-center items-center text-red-400 text-sm leading-relaxed min-h-[20vh] text-center font-bold"
                >
                    <h1>Links have not been added...</h1>
                </TabsContent>
            }

            {
                (lessonResources?.file_resources && lessonResources?.file_resources.length > 0) ?
                <TabsContent value="downloadables">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessonResources.file_resources?.map((file) => (
                    <Card
                        key={file.uuid}
                        className="border-gray-200 shadow-sm"
                    >
                        <CardContent className="flex items-center gap-3 px-4 py-1">
                        <FileIcon className='w-10 h-16 text-teal-500' />
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">
                            {file.title}
                            </p>
                            <p className="text-gray-500 text-xs">
                            {formatFileSize(file.file_size)}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon"
                        onClick={() => {
                            const link = document.createElement("a");
                            link.target = "_blank"
                            link.href = file.file_key;
                            link.download = file.title || "download";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}>
                            <DownloadIcon size={16} />
                        </Button>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </TabsContent>
            :
                <TabsContent
                value="downloadables"
                className="flex justify-center items-center text-red-400 text-sm leading-relaxed min-h-[20vh] text-center font-bold"
                >
                    <h1>Reference files have not been added...</h1>
                </TabsContent>
            }
        </Tabs>
        }
        </CardContent>
      </Card>
  )
}

export default LessonResourceRetrieveView