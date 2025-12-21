import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DownloadIcon, InfoIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React from 'react'
import StudentListData from '@/feature/students/components/StudentListData'


const static_table_data = [
  {
    "student_name": "Student 1",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 2",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 3",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 4",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 5",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 6",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 7",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 8",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 9",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
  {
    "student_name": "Student 10",
    "courses_enrolled": 3,
    "payment_status": "Free",
    "amount_paid": 0.0,
    "enrollement_date": "2025-08-06"
  },
]

const total_pages = 8

const studentManagementPage = () => {
  return (
    <main className='main-container'>
      <h1 className='page-title'>Instructor Dashboard</h1>

      <StudentListData />
    </main>
  )
}

export default studentManagementPage