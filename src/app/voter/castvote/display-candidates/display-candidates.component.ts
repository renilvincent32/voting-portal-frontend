import { Component } from '@angular/core';
import { Candidate } from 'src/app/admin/candidates/candidate.model';
import { VoterService } from '../../voter.service';

@Component({
  selector: 'app-display-candidates',
  templateUrl: './display-candidates.component.html',
  styleUrls: ['./display-candidates.component.css']
})
export class DisplayCandidatesComponent {

  constructor(private voterService: VoterService) {}

  isLoading = false;
  candidatesByDesignation = null;
  designations = [];
  selectedDesignations: string[] = [];
  selectedCandidates: Candidate[] = [];
  isVotingComplete = true;

  ngOnInit() {
    this.isLoading = true;
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
    }
  }

  onVoteAgain() {
    this.selectedCandidates = [];
    this.selectedDesignations = [];
  }
}
