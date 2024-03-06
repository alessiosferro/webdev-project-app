export default interface ApiResponse<T> {
    status: number;
    count: number;
    statusText: string;
    error: unknown;
    data: T;
}