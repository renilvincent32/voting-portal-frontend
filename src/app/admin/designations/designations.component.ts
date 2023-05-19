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
    this.adminService.addDesignation(designation)
    .subscribe(() => this.handleSuccess("Designation added successfully"), 
    error => this.handleError(error));
    this.addDesignationForm.reset();
  }

  onRemoveDesignation(designation: Designation) {
    this.isFetching = true;
    this.adminService.removeDesignation(designation)
    .subscribe(() => this.handleSuccess("Designation removed successfully"), 
    error => this.handleError(error));
  }

  private handleSuccess(message: string) {
    this.isFetching = false;
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000);
    this.setDesignations(this.adminService.getAllDesignations());
  }

  private handleError(error) {
    this.isFetching = false;
    this.errorMessage = this.errorHandler.handleHttpError(error);
    setTimeout(() => this.errorMessage = null, 5000);
  }

  private setDesignations(subscription: Observable<Designation[]>) {
    subscription.subscribe(designations => {
      this.isFetching = false;
      this.designations = designations.map(designation => new Designation(designation.name, designation.noOfCandidates, designation.id));
    }, error => this.handleError(error));
  }
}
