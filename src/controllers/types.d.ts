import UserDto from "../dtos/auth.tdo"

export type LoginReturn = {
    accessToken: string
    refreshToken?: string
    user: UserDto
}

export type ReqUpdateAvitoType = {
    userId: string
    login: string
    service: string
    pathToFile: string
    updateValues: UpdateAvitoValuesType[]
}

export type UpdateAvitoValuesType = {
    id: string
    key: string
    teg?: string
    attr?: string
    values: string[]
}