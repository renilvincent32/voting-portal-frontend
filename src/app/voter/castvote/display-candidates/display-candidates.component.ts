import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/admin/candidates/candidate.model';
import { AdminService } from 'src/app/admin/service/admin.service';
import { VoterService } from '../../voter.service';
import { map } from 'rxjs/operators';
import { ErrorHandlingService } from 'src/app/common/error-handling.service';

@Component({
  selector: 'app-display-candidates',
  templateUrl: './display-candidates.component.html',
  styleUrls: ['./display-candidates.component.css']
})
export class DisplayCandidatesComponent {

  constructor(
    private voterService: VoterService, 
    private router: Router, 
    private adminService: AdminService,
    private errorHandler: ErrorHandlingService) {}

  isLoading = false;
  candidatesByDesignation = null;
  designations = [];
  selectedDesignations: string[] = [];
  selectedCandidates: Candidate[] = [];
  isVotingComplete = true;
  hasAlreadyVoted = false;

  ngOnInit() {
    this.isLoading = true;
    this.voterService.voteAlready()
    .subscribe(val => {
      if (val) {
        this.router.navigate(["/voter/vote-already"]);
      }
    });
    this.setCandidates();
  }

  onCastVote(candidate: Candidate) {
    this.selectedCandidates.push(candidate);
    this.selectedDesignations.push(candidate.designation);
  }

  onSubmitVotes() {
    this.isVotingComplete = this.selectedDesignations.length === this.designations.length;
    setTimeout(() => this.isVotingComplete = true, 5000);
    if (this.isVotingComplete) {
      this.voterService.castVote(this.selectedCandidates).subscribe();
      this.router.navigate(["/voter/display-success"]);
    }
  }

  onVoteAgain() {
    this.selectedCandidates = [];
    this.selectedDesignations = [];
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
