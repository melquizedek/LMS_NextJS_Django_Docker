"""Custom exception handler for consistent error responses."""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns a consistent error response format:
    {
        "success": false,
        "error": {
            "code": "ERROR_CODE",
            "message": "Human readable message",
            "details": { ... }  # optional field-level errors
        }
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_data = {
            "success": False,
            "error": {
                "code": _get_error_code(response.status_code),
                "message": _get_error_message(response.data),
                "details": response.data if isinstance(response.data, dict) else {},
            }
        }
        return Response(error_data, status=response.status_code)

    return Response(
        {
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred.",
                "details": {},
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


def _get_error_code(status_code: int) -> str:
    codes = {
        400: "VALIDATION_ERROR",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        405: "METHOD_NOT_ALLOWED",
        500: "INTERNAL_SERVER_ERROR",
    }
    return codes.get(status_code, "ERROR")


def _get_error_message(data) -> str:
    if isinstance(data, dict):
        if "detail" in data:
            return str(data["detail"])
        # Collect first field error
        for key, value in data.items():
            if isinstance(value, list) and value:
                return f"{key}: {value[0]}"
            return str(value)
    if isinstance(data, list) and data:
        return str(data[0])
    return "An error occurred."
