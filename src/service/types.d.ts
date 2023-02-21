import { RequestFiltersType } from "../router/type"

export interface PayloadDataI {
    path: string
    userId: number
    email: string
    service: string
    createdAt: string
}

export interface userDateI {
    userId: string | QueryString.ParsedQs
    email: string | QueryString.ParsedQs
    service: string | QueryString.ParsedQs
    limitAndPage?: number[]
    filters: RequestFiltersType
}

export type FiltersType = "byId" | "byName" | "byDescription" | "byPrice" | "bySquare" | "byFloor" | "byRooms"
