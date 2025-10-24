type StandardResponse = {
    msg: string | null;
    status: boolean;
    status_code: number;
    response: any;
} | null | undefined


type PresignedDataState = {
  presignedURL: string | null,
  objectKey: string | null
}

type PaginatedResults = {
  count: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: [any];
  total_pages: number;
}


type StandardFilters = {
  filters: any
  ordering: string | null
  search: string | null
  page: number,
  page_size: number
}