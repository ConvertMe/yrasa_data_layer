export default class ApiError extends Error {
    status
    errors

    constructor(status: number, message: any, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    } 

    static SomethingWentWrong(err: any){
        return new ApiError(500, "Something went wrong", err)
    }

    static ErrorSavedFile(message: string){
        return new ApiError(400,  `error saved file ${message}`)
    }

    static BadRequest(message: any, errors: any = []) {
        return new ApiError(400, message,  errors)
    }

    static UnauthorizedError(message: any) {
        return new ApiError(401,  `Not auth ${message}`)
    }

    static isForbidden(message: any) {
        return new ApiError(403, `Forbidden ${message}`)
    }

    static writeFileError(message: any) {
        return new ApiError(403, `Error writed file ${message}`)
    }

    static ErrorReadFile(message: any) {
        return new ApiError(403, `Error read file ${message}`)
    }

    static ErrorUpdateFile(message: any) {
        return new ApiError(403, `Error updated file ${message}`)
    }

}