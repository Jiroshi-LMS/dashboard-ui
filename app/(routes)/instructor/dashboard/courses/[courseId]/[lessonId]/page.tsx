import { Badge } from "@/components/ui/badge";
import {
  ActivityIcon,
  Calendar1Icon,
  Clock10Icon,
  DownloadIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LessonDetailsPageProps {
  params: Promise<{ lessonId: string }>;
}

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

const LessonDetailsPage = async ({ params }: LessonDetailsPageProps) => {
  const { lessonId } = await params;
  console.log(lessonId)

  let badgeStatus = "active";
  const badgeColor =
    badgeStatus === "inactive"
      ? "bg-red-500"
      : badgeStatus === "draft"
      ? "bg-blue-500"
      : "bg-green-500";

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Lesson Details
        </h1>
        <Link href={`/instructor/dashboard/courses/lessons/${lessonId}/edit`}>
          <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
            <PencilIcon size={16} /> Edit Lesson
          </Button>
        </Link>
      </div>

      {/* Video Section */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Lesson Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md overflow-hidden bg-black">
            <video
              className="w-full h-[60vh] object-contain"
              controls
              playsInline
            >
              <source
                src="https://www.pexels.com/download/video/28036568/"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Clock10Icon size={14} /> 2 hours
              </span>
              <span className="flex items-center gap-1">
                <UsersIcon size={14} /> 50 Views
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${badgeColor} text-white capitalize flex items-center gap-1`}>
                <ActivityIcon size={12} /> {badgeStatus}
              </Badge>
              <span className="flex items-center gap-1">
                <Calendar1Icon size={14} /> 2025-05-01
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Setting up your first Django project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            potenti. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas
            congue ligula ac quam viverra nec consectetur ante hendrerit.
            Praesent et diam eget libero egestas mattis sit amet vitae augue.
          </p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card className="shadow-md border border-gray-200">
        <CardContent className="pt-6">
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="attached-links">Attached Links</TabsTrigger>
              <TabsTrigger value="downloadables">Downloadables</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur dicta iusto aut quaerat quibusdam facilis.
            </TabsContent>

            <TabsContent value="attached-links">
              <div className="space-y-3">
                {static_attached_links.map((link) => (
                  <div key={link.link_id} className="border-b pb-2">
                    <h4 className="font-semibold text-gray-800">{link.link_title}</h4>
                    <Link
                      href={link.link_url}
                      target="_blank"
                      className="text-primary text-sm hover:underline"
                    >
                      {link.link_url}
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="downloadables">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {static_downloadables.map((item) => (
                  <Card key={item.downloadable_id} className="border-gray-200 shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                        alt="PDF"
                        className="w-10"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">
                          {item.downloadable_title}
                        </p>
                        <p className="text-gray-500 text-xs">{item.downloadable_file_size}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <DownloadIcon size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Section */}
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2">
              <TrashIcon size={16} /> Delete Lesson
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete your
                lesson and its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
};

export default LessonDetailsPage;
