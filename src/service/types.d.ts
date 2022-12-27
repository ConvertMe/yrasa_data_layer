export interface PayloadDataI {
    path: string
    userId: number
    login: string
    service: string
    createdAt: string
}

export interface userDateI {
    userId: string
    login: string
    service: string
    limitAndPage?: number[]
}