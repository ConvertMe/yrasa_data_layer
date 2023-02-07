import { RequestFiltersType } from "../router/type"

export interface PayloadDataI {
    path: string
    userId: number
    login: string
    service: string
    createdAt: string
}

export interface userDateI {
    userId: string | QueryString.ParsedQs
    login: string | QueryString.ParsedQs
    service: string | QueryString.ParsedQs
    limitAndPage?: number[]
    filters: RequestFiltersType
}

export type FiltersType = "byId" | "byName" | "byDescription" | "byPrice" | "bySquare" | "byFloor"

