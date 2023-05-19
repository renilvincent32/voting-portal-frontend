import { Component } from '@angular/core';
import { ErrorHandlingService } from 'src/app/common/error-handling.service';
import { AdminService } from '../../service/admin.service';
import { Candidate } from '../candidate.model';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent {

  successMessage = null;
  errorMessage = null;

  constructor(private adminService: AdminService, private errorHandler: ErrorHandlingService) {}

  ngOnInit() {
    this.adminService.getAllCandidates()
    .subscribe(candidates => this.setCandidates(candidates))
  }

  candidates: Candidate[] = [];

  onRemoveCandidate(candidate: Candidate) {
    this.adminService.removeCandidate(candidate)
    .subscribe(() => {
      this.successMessage = "Candidate removed successfully";
      setTimeout(() => this.successMessage = null, 5000);
      this.adminService.getAllCandidates()
      .subscribe(candidates => this.setCandidates(candidates))
    }, error => {
      this.errorMessage = this.errorHandler.handleHttpError(error);
      setTimeout(() => this.errorMessage = null, 5000);
    })
  }

  private setCandidates(candidates) {
    this.candidates = candidates.map(candidate => 
      new Candidate(candidate.firstName, candidate.lastName, candidate.branch, 
        candidate.campaignQuote, candidate.designation, candidate.symbol, candidate.imgPath, candidate.id));
  }
}
