export default class ApiError extends Error {
    status
    errors

    constructor(status: number, message: any, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message: any, errors: any = []) {
        return new ApiError(400, message, errors)
    }

    static UnauthorizedError() {
        return new ApiError(401, "Not auth")
    }

    static ErrorDb() {
        return new ApiError(401, "error db")
    }

    static isForbidden() {
        return new ApiError(403, "Forbidden")
    }

    static writeFileError() {
        return new ApiError(403, "Error writed file")
    }

}