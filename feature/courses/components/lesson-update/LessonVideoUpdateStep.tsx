"use client";

import Loader from "@/app/components/atoms/Loader";
import { UploadIcon, XIcon, VideoIcon, BanIcon } from "lucide-react";
import { SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LessonMediaData } from "../../courseTypes";
import { formatFileSize, validateMP4File } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type VideoUploadStepProps = {
  lessonId: string | null;
  fileData: LessonMediaData;
  setFileData: React.Dispatch<SetStateAction<LessonMediaData>>;
  uploadProgress: number;
  cancelUpload: () => void;
};

const LessonVideoUpdateStep = ({
  lessonId,
  fileData,
  setFileData,
  uploadProgress,
  cancelUpload,
}: VideoUploadStepProps) => {
  const allowedFileSize = 2; // GB
  const videoUploadRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isValidatingVideoFile, setIsValidatingVideoFile] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  

  const videoFileChange = async (file: File | undefined) => {
    if (!file) return;

    const sizeInGB = file.size / 1024 ** 3;
    if (sizeInGB > allowedFileSize) {
      toast.error(`File size exceeds ${allowedFileSize}GB limit.`);
      return;
    }

    setIsValidatingVideoFile(true);
    const { valid, duration } = await validateMP4File(file);
    setIsValidatingVideoFile(false);

    if (!valid) return;

    const objectURL = URL.createObjectURL(file);
    setPreviewURL(objectURL);

    setFileData({
      file,
      duration: duration || 0,
    });
  };

  const clearVideo = () => {
    setFileData({ file: null, duration: 0 });
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(null);
  };

  if (!lessonId) return <Loader className="h-screen" />;

  return (
    <main className="w-[80%] mx-auto">
      <section>
        <div>
          <h2 className="section-title">Lesson Video Upload</h2>
          <p className="text-gray-600 text-[12px] mb-2 text-justify font-semibold">
            Upload the lesson video. It will be securely served to enrolled course members.
          </p>

          {/* Upload Area */}
          {!previewURL && (
            <div
              onClick={() => videoUploadRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                videoFileChange(e.dataTransfer.files?.[0]);
              }}
              className={`flex justify-center items-center h-[40vh] w-[80%] mx-auto
                border-2 border-dashed ${
                  isDragging ? "border-teal-500 bg-teal-50" : "border-gray-200"
                } rounded-md gap-3 font-semibold text-[14px] text-gray-600
                transition cursor-pointer hover:border-teal-400 hover:bg-teal-50`}
            >
              {isDragging
                ? "Drop your video file here ..."
                : isValidatingVideoFile
                ? "Validating file..."
                : `Drag & drop or click to upload video (Max ${allowedFileSize}GB)`}
              <UploadIcon className="ml-2 text-teal-600" />
            </div>
          )}

          <input
            type="file"
            accept="video/mp4"
            className="hidden"
            ref={(e) => { videoUploadRef.current = e; }}
            onChange={(e) => videoFileChange(e?.target?.files?.[0])}
          />

          {/* Preview Section */}
          {previewURL && fileData.file && (
            <div className="mt-8 w-[80%] mx-auto border border-gray-200 rounded-xl shadow-sm p-4 relative bg-white">
              <button
                onClick={clearVideo}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              >
                <XIcon size={18} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <VideoIcon className="text-teal-600" size={20} />
                <div>
                  <p className="font-semibold text-[14px]">{fileData.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(fileData.file.size)} • {fileData.duration.toFixed(2)}s
                  </p>
                </div>
              </div>

              {/* Upload Progress + Cancel */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4 mb-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Uploading... {uploadProgress.toFixed(0)}%</p>
                    <button
                    onClick={cancelUpload}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 
                              text-sm font-semibold text-white bg-red-500 rounded-md
                              hover:bg-red-600 active:bg-red-700 
                              shadow-sm hover:shadow-md transition-all duration-150"
                  >
                    <BanIcon size={14} />
                    Cancel Upload
                  </button>
                  </div>
                </div>
              )}

              {/* Video Preview */}
              <video
                src={previewURL}
                controls
                className="rounded-lg w-full max-h-[400px] border border-gray-100 mt-2"
              ></video>

              {uploadProgress === 100 && (
                <p className="text-xs text-green-600 mt-3 text-right font-semibold">
                  ✅ Upload complete
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default LessonVideoUpdateStep;
