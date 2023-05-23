import { Component } from '@angular/core';
import { Candidate } from '../candidates/candidate.model';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  candidateData: { candidateName: string, voteCount: number, designationName: string }[] = [];
  winnerData: { designationName: string, candidateName: string }[] = [];
  designations: string[] = [];
  candidateDesignationMap = {};

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.fetchResults()
    .subscribe(data => {
      this.candidateData = data["candidateData"];
      this.winnerData = data["winnerData"];
      this.designations = this.winnerData.map(a => Object.values(a)).map(a => a[0]);
      this.candidateDesignationMap = this.candidateData.reduce((map, candidate) => {
        const designation = candidate.designationName;
        if (map[designation] !== undefined) {
          const candidates = map[designation];
          candidates.push(candidate);
          map[designation] = candidates;
        } else {
          map[designation] = [candidate];
        }
        return map;
      }, {});
    }, error => {
      console.log(error);
    });
  }

}
