import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ActivitiesComponent } from './views/activities/activities.component';
import { schedulesComponent } from './views/schedules/schedules.component';
import { ContactComponent } from './components/forms/contact/contact.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';
import { CapoeiraComponent } from './views/activities/capoeira/capoeira.component';
import { MmaComponent } from './views/activities/mma/mma.component';
import { EditComponent } from './components/forms/edit/edit.component';
import { ShowProfileComponent } from './components/forms/show-profile/show-profile.component';
import { EventsComponent } from './views/events/events.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'activities/mma', component: MmaComponent },
    { path: 'schedules', component: schedulesComponent },
    { path: 'formContact', component: ContactComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'activities/mma', component: MmaComponent },
    { path: 'activities/capoeira', component: CapoeiraComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'editProfile', component: EditComponent },
    { path: 'showProfile', component: ShowProfileComponent },
    { path: 'events', component: EventsComponent } 
];
