import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './admin/candidates/candidates.component';
import { ViewCandidatesComponent } from './admin/candidates/view-candidates/view-candidates.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DesignationsComponent } from './admin/designations/designations.component';
import { ResultComponent } from './admin/result/result.component';
import { AuthGuard } from './common/auth.guard';
import { AppHomeComponent } from './home/app-home/app-home.component';
import { LoginComponent } from './login/login/login.component';
import { DisplayCandidatesComponent } from './voter/castvote/display-candidates/display-candidates.component';
import { DisplaySuccessComponent } from './voter/castvote/display-success/display-success.component';
import { DisplayVoteAlreadyComponent } from './voter/castvote/display-vote-already/display-vote-already.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: AppHomeComponent 
  },
  { 
    path: 'login',
    component: AppHomeComponent,
    children: [
      { 
        path: ':role', 
        component: LoginComponent 
      }] 
    },
  { 
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'designations',
        component: DesignationsComponent
      },
      {
        path: 'candidates',
        children: [
          {
            path: 'add',
            component: CandidatesComponent
          },
          {
            path: 'view',
            component: ViewCandidatesComponent
          }
        ]
      },
      {
        path: 'viewresult',
        component: ResultComponent
      }
    ]
  },
  {
    path: 'voter',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cast-vote',
        component: DisplayCandidatesComponent
      },
      {
        path: 'display-success',
        component: DisplaySuccessComponent
      },
      {
        path: 'vote-already',
        component: DisplayVoteAlreadyComponent
      }
    ]
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
