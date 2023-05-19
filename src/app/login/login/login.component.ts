import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('f') loginForm: NgForm;
  isAdmin: boolean = false;
  errorMessage = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.isAdmin = router.url.includes("admin");
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        var role = params['role'];
        this.isAdmin = role === 'admin';
        console.log(this.isAdmin);
      }
    );
  }

  onSubmit() {
    const collegeId = String(this.loginForm.value.collegeId);
    const password = this.isAdmin ? String(this.loginForm.value.password) : "";
    this.authService.handleLogin(collegeId, password, this.isAdmin)
    .subscribe(() => {
      if (this.isAdmin) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/voter/cast-vote']);
      }
    }, error => {
      this.errorMessage = error.error.message;
      setTimeout(() => this.errorMessage = null, 5000);
    });
    this.loginForm.reset();
  }
}
