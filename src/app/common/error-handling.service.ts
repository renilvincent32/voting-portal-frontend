import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class ErrorHandlingService {

    handleHttpError(error: HttpErrorResponse) {
        let errorMsg = null;
        switch (+error.status) {
            case 403: errorMsg = "You are not authorized to perform this operation"; break;
            case 401: errorMsg = "You are not authenticated to perform this operation"; break;
            case 400: errorMsg = "Bad Request: " + error.error.message; break;
            case 500: errorMsg = "Something went wrong: " + error.error.message; break;
        }
        return errorMsg;
    }
}