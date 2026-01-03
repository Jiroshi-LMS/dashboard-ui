import React from 'react'
import StudentListData from '@/feature/students/components/StudentListData'

const studentManagementPage = () => {
  return (
    <main className='main-container'>
      <h1 className='page-title'>All Student Signups</h1>
      <StudentListData />
    </main>
  )
}

export default studentManagementPage