import React from 'react'
import StudentListData from '@/feature/students/components/StudentListData'

const studentManagementPage = () => {
  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>
      <StudentListData />
    </main>
  )
}

export default studentManagementPage