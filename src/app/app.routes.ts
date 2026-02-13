import { Login } from './../components/login/login';
import { Routes } from '@angular/router';
import { Register } from '../components/register/register';
import { LandingPage } from '../components/landing-page/landing-page';
import { register } from 'node:module';

export const routes: Routes = [
     {path:'',component:Register},
    {path:'onboard',component:Register},
   {path:'onsignIn',component:Login},
     {path:'**',redirectTo:''},
];
