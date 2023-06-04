import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/admin/candidates/candidate.model';
import { VoterService } from '../../voter.service';

@Component({
  selector: 'app-display-candidates',
  templateUrl: './display-candidates.component.html',
  styleUrls: ['./display-candidates.component.css']
})
export class DisplayCandidatesComponent {

  constructor(private voterService: VoterService, private router: Router) {}

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
    this.candidatesByDesignation = this.voterService.getCandidatesByDesignation();
    this.designations = Object.keys(this.candidatesByDesignation);
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
}
