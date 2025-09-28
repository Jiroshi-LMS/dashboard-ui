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
]

const total_pages = 8

const studentManagementPage = () => {
  return (
    <main>
      <h1>Instructor Dashboard</h1>

      <section className='flex justify-between items-center'>
        <div>
            <form>
                <input type="text" placeholder="Search" />
                <input type="date" placeholder="Enrolled Date" />
            </form>
            <div>
                <button>Export Data</button>
            </div>
        </div>
        <div>
          <button>Add New Course</button>
        </div>
      </section>

      <section>
        <h2>All Student Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Courses Enrolled</th>
              <th>Payment Status</th>
              <th>Amount Paid</th>
              <th>Enrolled At</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
            {
                static_table_data.map((data, index) => (
                <tr key={index}>
                    <td>{data.student_name}</td>
                    <td>{data.courses_enrolled}</td>
                    <td>{data.payment_status}</td>
                    <td>{data.amount_paid}</td>
                    <td>{data.enrollement_date}</td>
                    <td>
                        <button>...</button>
                    </td>
                </tr>
                ))
            }
        </tbody>
        </table>
      </section>

      <section>
        <div>
          <button>Previous</button>
          {
            Array.from({ length: total_pages }, (_, index) => (
              <button key={index}>{index + 1}</button>
            ))
          }
          <button>Next</button>
        </div>
      </section>

    </main>
  )
}

export default studentManagementPage