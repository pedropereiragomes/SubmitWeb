import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserformComponent } from '../app/userform/userform.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path: 'form', component: UserformComponent},
  {path: 'login', component: LoginComponent},
  {path:  'dashboard', component: DashboardComponent},
  {path:  'submissions', component: SubmissionsComponent},
  { path: 'edituser/:id', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }