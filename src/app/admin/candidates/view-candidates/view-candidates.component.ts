import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Candidate } from '../candidate.model';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent {

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCandidates().subscribe(candidates => {
      this.candidates = candidates.map(candidate => 
        new Candidate(candidate.firstName, candidate.lastName, candidate.branch, 
          candidate.campaignQuote, candidate.designation, candidate.symbol, candidate.imgPath, candidate.id));
    })
  }

  candidates: Candidate[] = [];

  onRemoveCandidate(candidate: Candidate) {
    this.adminService.removeCandidate(candidate);
  }
}
