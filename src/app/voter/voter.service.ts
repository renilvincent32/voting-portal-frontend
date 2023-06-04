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
        return this.backendService.casteVote(request, authorizationHeader);
    }

    voteAlready() {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        let collegeId = null;
        this.authService.user.pipe(take(1)).subscribe(user => {
            collegeId = user.collegeId;
        })
        return this.backendService.voteAlready(collegeId, authorizationHeader);
    }

    private fetchCandidates() {
        this.adminService.getAllCandidates()
            .pipe(map(candidates => 
                candidates.map(candidate =>  
                    new Candidate(candidate.firstName, candidate.lastName, candidate.branch, 
                        candidate.campaignQuote, candidate.designation, candidate.symbol, 
                        candidate.img, candidate.id, 
                        candidate.imgData ? "data:image/png;base64,"+candidate.imgData: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png") )))
            .subscribe(data => {
                this.candidates = data;
            }, error => {
                this.errorHandler.handleHttpError(error);
        });
    }
}