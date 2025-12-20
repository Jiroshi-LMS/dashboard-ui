type DashboardKPIItem = {
    total: number,
    in_last_thirty_days: number
}

export type DashboardKPIServiceResponse = {
    courses?: DashboardKPIItem,
    signups?: DashboardKPIItem,
    enrollments?: DashboardKPIItem
}