import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
        const headers = new HttpHeaders({
            "Authorization" : authorizationHeader
        });
        const formData = new FormData();
        formData.append("firstName", candidate.firstName);
        formData.append("lastName", candidate.lastName);
        formData.append("branch", candidate.branch);
        formData.append("symbol", candidate.symbol);
        formData.append("campaignQuote", candidate.campaignQuote);
        formData.append("designation", candidate.designation);
        formData.append("avatar", candidate.img);
        return this.httpClient.post(this.BASE_URI + 'addCandidate', formData, { headers: headers });
    }

    fetchAllDesignations(authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<Designation[]>(this.BASE_URI + 'getDesignations', { headers: headers });
    }

    fetchAllCandidates(authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<Candidate[]>(this.BASE_URI + 'getCandidates', { headers: headers });
    }

    handleLogin(collegeId: string, password: string, isAdmin: boolean) {
        let request : { collegeId: string, password: string, isAdmin: boolean } = { collegeId, password, isAdmin };
        return this.httpClient.post<User>(this.BASE_URI + 'login', request); 
    }

    casteVote(requestToCall, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.post(this.BASE_URI + 'castVote', requestToCall, { headers: headers });
    }

    deleteDesignationById(id: number, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.delete(this.BASE_URI + 'deleteDesignation/' + id, { headers: headers });
    }

    deleteCandidateById(id: number, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.delete(this.BASE_URI + 'deleteCandidate/' + id, { headers: headers });
    }

    fetchResults(authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<{ candidateData: [{ candidateName: string, voteCount: number, designationName: string }], 
                                     winnerData: [{ designationName: string, candidateName: string }]}>
        (this.BASE_URI + 'fetchVoteResults', { headers: headers });
    }

    voteAlready(collegeId: string, authorizationHeader: string) {
        const headers = new HttpHeaders({'Authorization' : authorizationHeader});
        return this.httpClient.get<boolean>(this.BASE_URI + 'voteAlready/' + collegeId, { headers: headers });
    }
}