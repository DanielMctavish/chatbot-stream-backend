
export default interface IResponseStream {
    status_code: number
    message: object | string
    body?: object | null
}