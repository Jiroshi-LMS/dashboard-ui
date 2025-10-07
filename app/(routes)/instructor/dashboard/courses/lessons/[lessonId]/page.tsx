import { Badge } from "@/components/ui/badge";
import { ActivityIcon, Calendar1Icon, Clock10Icon, DownloadIcon, PencilIcon, TrashIcon, UsersIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
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
} from "@/components/ui/alert-dialog"

interface LessonDetailsPageProps {
  params: Promise<{ lessonId: string }>;
}


const static_attached_links = [
    {
        "link_id": 'link-1',
        "link_title": "Django Documentation",
        "link_url": "https://docs.djangoproject.com/en/4.1/",
    },
    {
        "link_id": 'link-2',
        "link_title": "Python Documentation",
        "link_url": "https://docs.python.org/3/",
    },
    {
        "link_id": 'link-3',
        "link_title": "Git Documentation",
        "link_url": "https://git-scm.com/docs",
    }
]

const static_downloadables = [
    {
        "downloadable_id": 'downloadable-1',
        "downloadable_title": "Lesson 1 Notes",
        "downloadable_file_name": 'notes_lesson_1.pdf',
        "downloadable_file_size": '10MB',
        "downloadable_file_type": 'pdf',
    },
    {
        "downloadable_id": 'downloadable-2',
        "downloadable_title": "Django Book PDF",
        "downloadable_file_name": 'django_book.pdf',
        "downloadable_file_size": '20MB',
        "downloadable_file_type": 'pdf',
    },
    {
        "downloadable_id": 'downloadable-3',
        "downloadable_title": "Learn Python PDF",
        "downloadable_file_name": 'learn_python.pdf',
        "downloadable_file_size": '12MB',
        "downloadable_file_type": 'pdf',
    },
]

const lessonDetailsPage = async ({params}: LessonDetailsPageProps) => {
  const { lessonId } = await params

  let badgeStatus = "active"
  let badge_color = 'bg-primary text-white'
  if (badgeStatus === 'inactive') {
    badge_color = 'bg-red-400 text-white'
  } else if (badgeStatus === 'draft') {
    badge_color = 'bg-blue-400 text-white'
  }
  return (
    <main className="main-container">
      <h1 className="page-title">Lesson Details</h1>
      <section>
        <h2 className="section-title">Lesson Video</h2>
        <div className="flex justify-center items-center w-full">
            <video width="320" height="240" controls preload="auto" className="w-full h-[70vh] bg-black" playsInline>
                <source src="https://www.pexels.com/download/video/28036568/" type="video/mp4" />
                {/* <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                /> */}
                Your browser does not support the video tag.
            </video>
        </div>
        <section className="">
            <h2 className="content-title">Setting up your first Django project</h2>
            <div className="flex justify-between items-center w-full my-2">
              <span className="flex items-center text-gray-400 text-[14px]"><Clock10Icon className="h-3 w-3 mr-1"/> 2 hour(s)</span>
              <span><Badge className={`${badge_color} uppercase`}><ActivityIcon /> {badgeStatus}</Badge></span>
            </div>
            <div className="flex justify-between items-center w-full my-2">
              <span className="flex items-center text-gray-400 text-[14px]"><UsersIcon className="h-3 w-3 mr-1"/> 50 Views</span>
              <span className="flex items-center text-gray-400 text-[14px]"><Calendar1Icon className="h-3 w-3 mr-1"/> 2025-05-01</span>
            </div>
            <div className="flex justify-end items-center w-full my-3 gap-3">
                <Link href={`/instructor/dashboard/courses/lessons/${lessonId}/edit`}>
                    <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'><PencilIcon /> Edit Lesson</Button>
                </Link>
            </div>
            <div className="bg-gray-100 rounded-md p-4 my-4">
                <h4 className="font-bold text-gray-600">Course Description</h4>
                <p className="text-gray-600 text-[12px] mt-4 text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse potenti. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. 
                    Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. 
                    Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. 
                    Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. 
                    Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus.
                </p>
            </div>
        </section>
        <section className="min-h-[30vh]">
            <Tabs defaultValue="notes" className="w-full">
                <TabsList>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="attached-links">Attached Links</TabsTrigger>
                    <TabsTrigger value="donwloadables">Downloadables</TabsTrigger>
                </TabsList>
                <TabsContent value="notes">
                    <p className="text-gray-600 text-[12px] mt-4 text-left">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur dicta iusto aut quaerat quibusdam facilis, culpa repellendus eligendi vero veniam odio quod dolorum maiores harum alias eos velit et error!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur dicta iusto aut quaerat quibusdam facilis, culpa repellendus eligendi vero veniam odio quod dolorum maiores harum alias eos velit et error!
                        Consectetur dicta iusto aut quaerat quibusdam facilis, culpa repellendus eligendi vero veniam odio quod dolorum maiores harum alias eos velit et error!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur dicta iusto aut quaerat quibusdam facilis, culpa repellendus eligendi vero veniam odio quod dolorum maiores harum alias eos velit et error!
                    </p>
                </TabsContent>
                <TabsContent value="attached-links">
                    <div>
                        {
                            static_attached_links.map((data, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-center items-start w-full my-1">
                                        <div className="w-full">
                                            <h4 className="font-bold text-gray-600 my-1">
                                                {data.link_title}
                                            </h4>
                                            <Link href={data.link_url} target="_blank" className="text-teal-500 hover:underline text-[12px]">{data.link_url}</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </TabsContent>
                <TabsContent value="donwloadables">
                    <div className="flex w-full flex-wrap gap-2">
                        {
                            static_downloadables.map((data, index) => {
                                return (
                                    <div className="bg-gray-100 rounded-sm w-fit py-1 px-4" key={index}>
                                        <h3 className="font-semibold text-black text-[14px]">
                                            {data.downloadable_title}
                                        </h3>
                                        <div key={index} className="flex justify-start items-start w-full my-2 gap-3">
                                            <div>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png" alt="PDF Icon" className="w-10" />
                                            </div>
                                            <div className="w-full flex flex-col justify-start items-start">
                                                <h4 className="font-semibold text-[12px] text-gray-800">{data.downloadable_file_name}</h4>
                                                <p className="text-gray-600 text-[12px] text-justify">
                                                    {data.downloadable_file_size}
                                                </p>
                                            </div>
                                            <Button className='bg-[transparent] text-gray-400 hover:bg-gray-200 cursor-pointer'><DownloadIcon /></Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </section>
        <div className="flex justify-end items-center w-full">
            <AlertDialog>
            <AlertDialogTrigger className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-500 cursor-pointer
            text-white px-2 py-2 font-semibold text-[13px] rounded-md"> <TrashIcon className="w-4" /> Delete Course</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your lesson
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
      </section>


    </main>
  )
}

export default lessonDetailsPage