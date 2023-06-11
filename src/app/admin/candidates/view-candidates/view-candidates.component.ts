import { Component } from '@angular/core';
import { ErrorHandlingService } from 'src/app/common/error-handling.service';
import { VoterService } from 'src/app/voter/voter.service';
import { AdminService } from '../../service/admin.service';
import { Candidate } from '../candidate.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent {

  successMessage = null;
  errorMessage = null;
  candidatesByDesignation = null;
  designations = null;

  constructor(private adminService: AdminService, private errorHandler: ErrorHandlingService) {}

  ngOnInit() {
    this.setCandidates();
    
  }

  onRemoveCandidate(candidate: Candidate) {
    this.adminService.removeCandidate(candidate)
    .subscribe(() => {
      this.successMessage = "Candidate removed successfully";
      setTimeout(() => this.successMessage = null, 5000);
      this.setCandidates();
    }, error => {
      this.errorMessage = this.errorHandler.handleHttpError(error);
      setTimeout(() => this.errorMessage = null, 5000);
    })
  }

  setCandidates() {
    this.adminService.getAllCandidates()
    .pipe(map(candidates => 
        candidates.map(candidate =>  
            new Candidate(candidate.firstName, candidate.lastName, candidate.branch, 
                candidate.campaignQuote, candidate.designation, candidate.symbol, 
                candidate.img, candidate.id, 
                candidate.imgData ? "data:image/png;base64,"+candidate.imgData: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png") )))
    .subscribe(data => {
      this.candidatesByDesignation = data.reduce((map, candidate) => {
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
    this.designations = Object.keys(this.candidatesByDesignation);
    }, error => {
        this.errorHandler.handleHttpError(error);
    });
  }
}
