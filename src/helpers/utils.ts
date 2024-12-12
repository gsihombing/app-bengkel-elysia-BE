export const outError = (err: ErrorResponse) => {
    if (err.code === "THROW") {
        return {
            success: false,
            message: err.message
        }
    } else if (err) {
        return {
            success: false,
            message: "Error: " + err
        }
    }
}