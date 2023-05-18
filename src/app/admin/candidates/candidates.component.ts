import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/common/error-handling.service';
import { Designation } from '../designations/designation.model';
import { AdminService } from '../service/admin.service';
import { Candidate } from './candidate.model';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  @ViewChild('f') addCandidateForm: NgForm;
  branches: string[] = this.adminService.getBranches();
  designations: Designation[] = [];
  isLoader: boolean = false;
  errorMessage: string = null;
  successMessage: string = null;

  constructor(private adminService: AdminService, private errorHandler: ErrorHandlingService) {}

  avatarSelected: File = null;

  ngOnInit() {
    this.adminService.getAllDesignations().subscribe(designations => {
      this.designations = designations.map(designation => new Designation(designation.name, designation.noOfCandidates, designation.id));
    }, error => {
      this.isLoader = false;
      this.errorMessage = this.errorHandler.handleHttpError(error);
      setTimeout(() => this.errorMessage = null, 5000);
    });
  }

  onSubmit() {
    this.isLoader = true;
    console.log(this.avatarSelected);
    var firstName = this.addCandidateForm.value.firstName;
    var lastName = this.addCandidateForm.value.lastName;
    var branch = this.addCandidateForm.value.branch;
    var campaignQuote = this.addCandidateForm.value.campaignQuote;
    var designation = this.addCandidateForm.value.designation;
    var symbol = this.addCandidateForm.value.symbol;
    var candidate: Candidate = new Candidate(firstName, lastName, branch, campaignQuote, designation, symbol, '');
    this.adminService.addCandidate(candidate).subscribe(() => {
      this.isLoader = false;
      this.successMessage = "Candidate added successfully";
      setTimeout(() => this.successMessage = null, 5000);
    }, error => {
      this.isLoader = false;
      this.errorMessage = this.errorHandler.handleHttpError(error);
      setTimeout(() => this.errorMessage = null, 5000);
    });
    this.addCandidateForm.reset();
  }

  selectedAvatar(event) {
    const file = event.target.files[0];
    this.avatarSelected = <File>file;
  }

}
