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
import { JuiJitsuComponent } from './views/activities/jui-jitsu/jui-jitsu.component';
import { SacoBoxeoComponent } from './views/activities/saco-boxeo/saco-boxeo.component';
import { DefensaFemeninaComponent } from './views/activities/defensa-femenina/defensa-femenina.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ChiKungComponent } from './views/activities/chi-kung/chi-kung.component';
import { HeaderMisterComponent } from './components/header-mister/header-mister.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClassesComponent } from './views/classes/classes.component';
import { CreateProgressComponent } from './components/forms/create-progress/create-progress.component';
import { CreateClassComponent } from './components/forms/create-class/create-class.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'schedules', component: schedulesComponent },
    { path: 'formContact', component: ContactComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'activities/mma', component: MmaComponent },
    { path: 'activities/capoeira', component: CapoeiraComponent },
    { path: 'events', component: EventsComponent },
    { path: 'activities/jui-jitsu', component: JuiJitsuComponent },
    { path: 'activities/saco-boxeo', component: SacoBoxeoComponent },
    { path: 'activities/chi-kung', component: ChiKungComponent },
    { path: 'activities/defensa-femenina', component: DefensaFemeninaComponent },
    { path: 'header-user', component: HeaderUserComponent },
    { path: 'header-mister', component: HeaderMisterComponent },
    { path: 'header-admin', component: HeaderAdminComponent },
    { path: 'editProfile', component: EditComponent },
    { path: 'showProfile', component: ShowProfileComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'classes', component: ClassesComponent },
    { path: 'progress', component: CreateProgressComponent },
    { path: 'clases', component: CreateClassComponent }


];
