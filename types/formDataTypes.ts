type InstructorSignupSubmissionPayload = {
    full_name: string;
    username: string;
    email: string;
    password: string;
    country_code?: string;
    phone_number?: string;
}

type InstructorSignupSubmissionResponse = {
    msg: string | null;
    status: boolean;
    status_code: number;
    response: any;
}