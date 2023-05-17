import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from 'src/app/common/error-handling.service';
import { AdminService } from '../service/admin.service';
import { Designation } from './designation.model';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent {

  @ViewChild('f') addDesignationForm: NgForm;
  designations: Designation[] = [];
  isFetching: boolean = false;
  successMessage: string = null;
  errorMessage: string = null;

  constructor(private adminService: AdminService, private errorHandler: ErrorHandlingService) {}

  ngOnInit() {
    this.isFetching = true;
    this.setDesignations(this.adminService.getAllDesignations());
  }

  onSubmit() {
    this.isFetching = true;
    let addedDesignation = String(this.addDesignationForm.value.designationName);
    let designation = new Designation(addedDesignation, 0);
    this.adminService.addDesignation(designation).subscribe(() => {
      this.isFetching = false;
      this.successMessage = "Designation added successfully";
      setTimeout(() => this.successMessage = null, 5000);
      this.setDesignations(this.adminService.getAllDesignations());
    }, error => {
      this.isFetching = false;
      this.errorMessage = this.errorHandler.handleHttpError(error);
      setTimeout(() => this.errorMessage = null, 5000);
    });
    this.addDesignationForm.reset();
  }

  onRemoveDesignation(designation: Designation) {
    this.adminService.removeDesignation(designation);
    //call backend to remove the designation
  }

  private setDesignations(subscription: Observable<Designation[]>) {
    subscription.subscribe(designations => {
      this.isFetching = false;
      this.designations = designations.map(designation => new Designation(designation.name, designation.noOfCandidates, designation.id));
    }, error => {
      this.errorMessage = this.errorHandler.handleHttpError(error);
      this.isFetching = false;
      setTimeout(() => this.errorMessage = null, 5000);
    });
  }
}
