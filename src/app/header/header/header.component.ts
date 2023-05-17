import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/common/auth.service';
import { User } from 'src/app/common/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  userSubscription: Subscription;
  user: User;
  isAuthenticated = false;

  ngOnInit() {
    this.userSubscription = this.authService.user
    .subscribe(user => {
      if (user != null) {
        this.user = user;
      }
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.handleLogout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
