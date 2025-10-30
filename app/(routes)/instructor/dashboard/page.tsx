import {
  RocketIcon,
  SettingsIcon,
  BarChart3Icon,
  CreditCardIcon,
  DatabaseIcon,
  BellIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardHome = () => {
  return (
    <main className="main-container">
      <h1 className="page-title">Instructor Dashboard</h1>

      {/* KPI Section */}
      <section>
        <h2 className="section-title">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {[
            {
              title: 'Total Courses',
              value: '100',
              change: '+5 this month',
              icon: <RocketIcon className="text-indigo-500 w-5 h-5" />
            },
            {
              title: 'Total Lessons',
              value: '400',
              change: '+300 this month',
              icon: <DatabaseIcon className="text-emerald-500 w-5 h-5" />
            },
            {
              title: 'Total Enrollments',
              value: '200',
              change: '+150 this month',
              icon: <BarChart3Icon className="text-teal-500 w-5 h-5" />
            }
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-700">{item.title}</p>
                  {item.icon}
                </div>
                <p className="text-3xl font-bold mt-2 text-gray-900">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="mt-10">
        <h2 className="section-title mb-5">What’s Upcoming?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Instructor Payments',
              desc: 'Get paid directly to your bank account via Razorpay integration.',
              icon: <CreditCardIcon className="text-green-500 w-5 h-5" />,
              tag: 'Coming Soon'
            },
            {
              title: 'Student Analytics',
              desc: 'View engagement metrics, retention trends, and course performance.',
              icon: <BarChart3Icon className="text-blue-500 w-5 h-5" />,
              tag: 'In Development'
            },
            {
              title: 'Notification Center',
              desc: 'Receive instant updates about new enrollments and payments.',
              icon: <BellIcon className="text-yellow-500 w-5 h-5" />,
              tag: 'Design Phase'
            },
            {
              title: 'Advanced Course Editor',
              desc: 'A sleek new editor with drag & drop uploads and inline previews.',
              icon: <SettingsIcon className="text-purple-500 w-5 h-5" />,
              tag: 'Beta Testing'
            },
            {
              title: 'Public Instructor Profiles',
              desc: 'Let students discover your courses and reviews on your profile.',
              icon: <RocketIcon className="text-orange-500 w-5 h-5" />,
              tag: 'Planned'
            }
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md rounded-xl"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <CardTitle className="text-sm font-semibold text-gray-800 truncate">
                      {item.title}
                    </CardTitle>
                  </div>
                  <span
                    className="whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-gray-50"
                    style={{ flexShrink: 0 }}
                  >
                    {item.tag}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
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
