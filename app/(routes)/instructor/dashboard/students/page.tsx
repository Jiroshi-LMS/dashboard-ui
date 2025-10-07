import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DownloadIcon } from 'lucide-react'
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

      <section className='flex justify-between items-center'>
        <form className='flex gap-2'>
          <Input type="search" placeholder="Search by course name" />
          <Input type='date' placeholder='Enrollment Date' />
        </form>
        <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer'>
            <DownloadIcon /> Export Data
        </Button>
      </section>

      <section className='mt-5'>
        <h2 className='section-title'>All Courses</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Student Name</TableHead>
              <TableHead className='text-center'>Courses Enrolled</TableHead>
              <TableHead className='text-center'>Payment Status</TableHead>
              <TableHead className='text-center'>Amount Paid</TableHead>
              <TableHead className='text-center'>Enrolled At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              static_table_data.map((data, index) => {
                return (
                <TableRow key={index}>
                  <TableCell className='font-semibold text-center'>{data.student_name}</TableCell>
                  <TableCell className='text-center'>{data.courses_enrolled}</TableCell>
                  <TableCell className='text-center'>{data.payment_status}</TableCell>
                  <TableCell className='text-center'>{data.amount_paid}</TableCell>
                  <TableCell className='text-center'>{data.enrollement_date}</TableCell>
                </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </section>

      <section className='my-6'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {
            Array.from({ length: static_table_data.length }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href="#">{index + 1}</PaginationLink>
              </PaginationItem>
            ))
          } 
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

    </main>
  )
}

export default studentManagementPage