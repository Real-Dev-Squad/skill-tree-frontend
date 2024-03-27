export const unauthorizedResponse = {
    error: "Unauthorized",
    message: "Unauthenticated User",
    statusCode: 401,
};

export const serverErrorResponse = {
    statusCode: 500,
    error: "Internal Server Error",
    message: "An internal server error occurred",
};

export const notFoundResponse = {
    statusCode: 404,
    error: "Not Found",
    message: "Something went wrong",
};
