import { Component } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  candidateData: { candidateName: string, voteCount: number }[] = [];
  winnerData: { designationName: string, candidateName: string }[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.fetchResults()
    .subscribe(data => {
      this.candidateData = data["candidateData"];
      this.winnerData = data["winnerData"];
    }, error => {
      console.log(error);
    });
  }

}
