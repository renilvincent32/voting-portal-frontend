import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/common/auth.service";
import { BackendService } from "src/app/common/backend.service";
import { Candidate } from "../candidates/candidate.model";
import { Designation } from "../designations/designation.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    candidates: Candidate[] = [];

    constructor(private backendService: BackendService, private authService: AuthService) {}

    addDesignation(designation: Designation) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.addDesignations([designation.name], authorizationHeader);
    }

    removeDesignation(designation: Designation) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.deleteDesignationById(designation.id, authorizationHeader);
    }

    getAllDesignations() {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.fetchAllDesignations(authorizationHeader);
    }

    addCandidate(candidate: Candidate) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.addCandidate(candidate, authorizationHeader);
    }

    removeCandidate(candidate: Candidate) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.deleteCandidateById(candidate.id, authorizationHeader);
    }

    getAllCandidates() {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.fetchAllCandidates(authorizationHeader);
    }

    getBranches() {
        return ['Computer Science', 'Biology', 'Humanities', 'Mathematics', 'Physics'];
    }

    fetchResults() {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.fetchResults(authorizationHeader);
    }
}