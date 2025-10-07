import {
  GraduationCapIcon,
  UsersIcon,
  BookAIcon,
  DollarSignIcon
} from 'lucide-react'

const dashboardHome = () => {
  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>

      <section>
        <h2 className='section-title'>Key Performance Indicators</h2>
        <div className="grid grid-cols-4 gap-4 my-6">
          <div className='kpi-box'>
            <div className='kpi-header'>
              <span>Total Courses</span>
              <span><GraduationCapIcon /></span>
            </div>
            <p>100</p>
            <span className='kpi-subtext'>+5 courses this month</span>
          </div>
          <div className='kpi-box'>
            <div className='kpi-header'>
              <span>Total Students</span>
              <span><UsersIcon /></span>
            </div>
            <p>200</p>
            <span className='kpi-subtext'>+150 students this month</span>
          </div>
          <div className='kpi-box'>
            <div className='kpi-header'>
              <span>Total Lessons</span>
              <span><BookAIcon /></span>
            </div>
            <p>400</p>
            <span className='kpi-subtext'>+300 lessons this month</span>
          </div>
          <div className='kpi-box'>
            <div className='kpi-header'>
              <span>Payments Collected</span>
              <span><DollarSignIcon /></span>
            </div>
            <p className='font-semibold text-[15px] text-red-400 mt-3'>Payments will be live soon. Stay tuned!</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className='section-title'>Enrollment and Payment Trends</h2>

        <div className='flex justify-center items-center h-[40vh]'>
          <p className='coming-soon-text'>Enrollment and payment trends will be live soon. Stay tuned!</p>
        </div>
      </section>

    </main>
  )
}

export default dashboardHome