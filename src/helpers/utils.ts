export const outError = (err: ErrorResponse) => {
    console.log(err);
    if (err) {
        return {
            success: false,
            message: "Error: " + err
        }
    }
}