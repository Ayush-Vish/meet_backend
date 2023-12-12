class ApiResponse {
    constructor( res , status, message, data) {
        res.status(status).json({
            status,
            message,
            data
        });
        
    }
}
export default ApiResponse;