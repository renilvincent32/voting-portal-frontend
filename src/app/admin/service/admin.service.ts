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
    designations: Designation[] = [];
    candidates: Candidate[] = [];

    constructor(private backendService: BackendService, private authService: AuthService) {}

    addDesignation(designation: Designation) {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.addDesignations([designation.name], authorizationHeader);
    }

    removeDesignation(designation: Designation) {
        var indexToBeRemoved = this.designations.indexOf(designation);
        this.designations.splice(indexToBeRemoved, 1);
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
        var indexToBeRemoved = this.candidates.indexOf(candidate);
        this.candidates.splice(indexToBeRemoved, 1);
    }

    getAllCandidates() {
        const authorizationHeader = this.authService.getBasicAuthHeader();
        return this.backendService.fetchAllCandidates(authorizationHeader);
    }

    getBranches() {
        return ['Computer Science', 'Biology', 'Humanities', 'Mathematics', 'Physics'];
    }
}