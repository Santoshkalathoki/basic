import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './client-side/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
  ,
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'client-side',
    loadChildren: () =>
      import('./client-side/client-side.module').then(
        (m) => m.ClientSideModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
