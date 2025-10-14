export type InstructorProfile = {
  uuid: string
  profile_picture_url: string | null
  location: string | null
  bio: string | null
}

export type Instructor = {
  country_code: string | null
  email: string
  full_name: string
  phone_number: string | null
  profile: InstructorProfile | null
  profile_completion_status: string
  username: string
  uuid: string
}