import { Injectable } from "@angular/core";
import { map, take } from "rxjs/operators";
import { Candidate } from "../admin/candidates/candidate.model";
import { AdminService } from "../admin/service/admin.service";
import { AuthService } from "../common/auth.service";
import { BackendService } from "../common/backend.service";
import { ErrorHandlingService } from "../common/error-handling.service";

@Injectable({providedIn: "root"})
export class VoterService {

    candidates: Candidate[] = [];

    constructor(
        private adminService: AdminService,
        private errorHandler: ErrorHandlingService, 
        private backendService: BackendService,
        private authService: AuthService) {}

    getCandidatesByDesignation() {
        this.fetchCandidates();
        const candidatesByDesignation = this.candidates.reduce((map, candidate) => {
            const designation = candidate.designation;
            if (map[designation] !== undefined) {
                let candidates: Candidate[] = map[designation];
                candidates.push(candidate);
                map[designation] = candidates;
            } else {
                map[designation] = [candidate];
            }
            return map
        } , {});
        return candidatesByDesignation;
    }

    castVote(candidates: Candidate[]) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        let collegeId = null;
        this.authService.user.pipe(take(1)).subscribe(user => {
            collegeId = user.collegeId;
        })
        const request = candidates.map(c => ({ collegeId : collegeId, candidateId : c.id }));
        console.log(request);
        return this.backendService.casteVote(request, authorizationHeader);
    }

    private fetchCandidates() {
        this.adminService.getAllCandidates()
            .subscribe(data => {
                this.candidates = data;
            }, error => {
                this.errorHandler.handleHttpError(error);
        });
    }
}