import {
  RocketIcon,
  SettingsIcon,
  BarChart3Icon,
  CreditCardIcon,
  DatabaseIcon,
  BellIcon,
  LockIcon,
  SearchIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DashboardKPI from '@/feature/dashboard/components/DashboardKPI'

const DashboardHome = () => {
  return (
    <main className="main-container">
      <h1 className="page-title">Instructor Dashboard</h1>

      {/* KPI Section */}
      <section>
        <DashboardKPI />
      </section>

      {/* Upcoming Section */}
      <section className="mt-10">
        <h2 className="section-title mb-5">What’s Upcoming?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            {
              title: 'Media Management Library',
              desc: 'Upload and manage your media files and resources in one place.',
              icon: <DatabaseIcon className="text-blue-500 w-5 h-5" />,
              tag: 'In Planning'
            },
            {
              title: 'Course & Lesson Permissions',
              desc: 'Control who and how your students can access your courses and lessons.',
              icon: <LockIcon className="text-purple-500 w-5 h-5" />,
              tag: 'In Planning'
            },
            {
              title: 'Razorpay Payment Support',
              desc: 'Get paid directly by your students to your bank account via Razorpay integration.',
              icon: <CreditCardIcon className="text-green-500 w-5 h-5" />,
              tag: 'Coming Soon'
            },
            {
              title: 'Improved Student Analytics',
              desc: 'View engagement metrics, retention trends, and course performance.',
              icon: <BarChart3Icon className="text-yellow-500 w-5 h-5" />,
              tag: 'Coming Soon'
            },
            {
              title: 'Featured Courses',
              desc: 'Highlight your best courses and lessons to attract more students.',
              icon: <RocketIcon className="text-orange-500 w-5 h-5" />,
              tag: 'Coming Soon'
            },
            {
              title: 'Course Tagging',
              desc: 'Organize your courses and lessons with tags for better searchability.',
              icon: <SearchIcon className="text-orange-500 w-5 h-5" />,
              tag: 'Coming Soon'
            }
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md rounded-xl"
            >
              <CardHeader className="">
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <CardTitle className="text-sm font-semibold text-gray-800 truncate px-2">
                      {item.title}
                    </CardTitle>
                  </div>
                  <span
                    className="whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-gray-50 mt-2"
                    style={{ flexShrink: 0 }}
                  >
                    {item.tag}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export default DashboardHome
