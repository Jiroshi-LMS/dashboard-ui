"use client"

import { UploadIcon } from "lucide-react"


const VideoUploadStep = (props: any) => {
  return (
    <main className="w-[80%] mx-auto">
      <section>
        <div>
          <h2 className="section-title">Lesson Video Upload</h2>
          <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
            Upload the lesson video, it will served to the enrolled members of the course.
          </p>
          <div className="flex justify-center items-center h-[40vh] w-[80%] mx-auto
          border-2 border-dashed border-gray-200 rounded-md gap-3 font-semibold text-[14px] text-gray-600">
            Drag & drop or click to upload video (Max 5MB) <UploadIcon />
          </div>
        </div>
      </section>
    </main>
  )
}

export default VideoUploadStep