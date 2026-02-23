import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Home } from './components/home/home';
import { LandingPage } from './components/landing-page/landing-page';

export const routes: Routes = [
     {path:'',component:LandingPage},
     {path:'onboard',component:Register},
   {path:'onsignIn',component:Login},
   {path:'dashboard',component:Dashboard},
   {path:'home',component:Home},
   {path:'**',redirectTo:''}
     
];
