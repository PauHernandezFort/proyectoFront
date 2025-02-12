import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ActivitiesComponent } from './views/activities/activities.component';
import { schedulesComponent } from './views/schedules/schedules.component';
import { ContactComponent } from './components/forms/contact/contact.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'schedules', component: schedulesComponent },
    { path: 'formContact', component: ContactComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent }  
];
