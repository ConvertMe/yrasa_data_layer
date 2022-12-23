export default class ApiError extends Error {
    status
    errors

    constructor(status: number, message: any, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static ErrorSavedFile(errorCode: string){
        return new ApiError(400,  {message: "error saved file", errorCode})
    }

    static BadRequest(message: any, errorCode: string, errors: any = []) {
        return new ApiError(400, {message, errorCode}, errors)
    }

    static UnauthorizedError(errorCode: string) {
        return new ApiError(401,  {message: "Not auth", errorCode})
    }

    static isForbidden(errorCode: string) {
        return new ApiError(403, {message: "Forbidden", errorCode})
    }

    static writeFileError(errorCode: string) {
        return new ApiError(403, {message: "Error writed file", errorCode})
    }

}