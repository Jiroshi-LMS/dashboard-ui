import React from 'react'


const static_table_data = [
  {
    "course_name": "Course 1",
    "status": "Active",
    "enrolled_students": 10,
    "created_at": "2023-05-01"
  },
  {
    "course_name": "Course 2",
    "status": "Inactive",
    "enrolled_students": 20,
    "created_at": "2023-05-02"
  },
  {
    "course_name": "Course 3",
    "status": "Draft",
    "enrolled_students": 30,
    "created_at": "2023-05-03"
  },
  {
    "course_name": "Course 4",
    "status": "Active",
    "enrolled_students": 40,
    "created_at": "2023-05-04"
  },
  {
    "course_name": "Course 5",
    "status": "Inactive",
    "enrolled_students": 50,
    "created_at": "2023-05-05"
  },
  {
    "course_name": "Course 6",
    "status": "Draft",
    "enrolled_students": 60,
    "created_at": "2023-05-06"
  },
]

const total_pages = 8

const courseManagementPage = () => {
  return (
    <main>
      <h1>Instructor Dashboard</h1>

      <section className='flex justify-between items-center'>
        <div>
          <div>
            <select>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
          </div>
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </div>
        <div>
          <button>Add New Course</button>
        </div>
      </section>

      <section>
        <h2>All Courses</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Status</th>
              <th>Enrolled Students</th>
              <th>Created At</th>
            </tr>
          </thead>
        <tbody>
            {
                static_table_data.map((data, index) => (
                <tr key={index}>
                    <td>{data.course_name}</td>
                    <td>{data.status}</td>
                    <td>{data.enrolled_students}</td>
                    <td>{data.created_at}</td>
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

export default courseManagementPage