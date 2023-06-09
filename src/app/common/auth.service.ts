import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { take } from "rxjs/operators";
import { BackendService } from "./backend.service";
import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private backendService: BackendService, private router: Router) {}

    handleLogin(collegeId: string, password: string, isAdmin: boolean) {
        return this.backendService.handleLogin(collegeId, password, isAdmin)
        .pipe(tap(response => {
            const loginUser = new User(response.collegeId, response.firstName, response.lastName, 
                response.branch, response.isAdmin);
            this.user.next(loginUser);
            localStorage.setItem("userData", JSON.stringify(loginUser));
        }));
    }

    handleAutoLogin() {
        const user: {
            collegeId: string,
            firstName: string,
            lastName: string,
            branch: string,
            isAdmin: boolean
        } = JSON.parse(localStorage.getItem("userData"));
        if (!user) {
            return;
        }
        const loadedUser = new User(user.collegeId, user.firstName, user.lastName, user.branch, user.isAdmin);
        this.user.next(loadedUser);
    }

    handleLogout() {
        this.user.next(null);
        localStorage.removeItem("userData");
        this.router.navigate(["/login"]);
    }

    public getBasicAuthHeader() {
        let authorizationHeader = null;
        this.user.pipe(take(1)).subscribe(user => {
            const encodedStr = btoa(unescape(encodeURIComponent(user.collegeId + ':test')));
            authorizationHeader = 'Basic ' + encodedStr;
        });
        return authorizationHeader;
    }
}