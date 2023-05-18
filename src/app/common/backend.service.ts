import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidate } from "../admin/candidates/candidate.model";
import { Designation } from "../admin/designations/designation.model";
import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class BackendService {

    BASE_URI: string = "http://localhost:8080/api/v1/";

    constructor(private httpClient: HttpClient) {}

    addDesignations(designations: string[], authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        let request: { [designations:string]: string[] } = { designations }; 
        return this.httpClient.post(this.BASE_URI + 'addDesignations', request, { headers: headers });
    }

    addCandidate(candidate: Candidate, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.post(this.BASE_URI + 'addCandidate', candidate, { headers: headers });
    }

    fetchAllDesignations(authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<Designation[]>(this.BASE_URI + 'getDesignations', { headers: headers });
    }

    fetchAllCandidates(authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<Candidate[]>(this.BASE_URI + 'getCandidates', { headers: headers });
    }

    handleLogin(collegeId: string, isAdmin: boolean) {
        let request : { collegeId: string, isAdmin: boolean } = { collegeId, isAdmin };
        return this.httpClient.post<User>(this.BASE_URI + 'login', request); 
    }

    casteVote(requestToCall, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.post(this.BASE_URI + 'castVote', requestToCall, { headers: headers });
    }
}