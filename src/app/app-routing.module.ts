import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: './user/user.module#UserPageModule'
  },
  { path: 'adduser', loadChildren: './adduser/adduser.module#AdduserPageModule' },
  { path: 'detailuser', loadChildren: './detailuser/detailuser.module#DetailuserPageModule' },
  {
    path: 'detailuser/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './detailuser/detailuser.module#DetailuserPageModule'
  },
  {
    path: 'edituser/:id',
    canActivate: [AuthGuard],
    resolve: {
      special: DataResolverService
    },
    loadChildren: './edit-user/edit-user.module#EditUserPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
