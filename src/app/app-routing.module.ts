import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdduserPage } from './pages/adduser/adduser.page';
import { UserPage } from './pages/staff/list-user/user.page';
import { DataResolverService } from './resolver/data-resolver.service';
import { HomePage } from './pages/user/home/home.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'user',
    //canActivate: [AuthGuard],
    loadChildren: './pages/user/home/home.module#HomePageModule',
  },
  {
    path: 'edituser',
    loadChildren: './pages/user/edit-user/edit-user.module#EditUserPageModule',
    //canActivate: [AuthGuard]
  },
  {
    path: 'staff',
    loadChildren: './pages/staff/home/home.module#HomePageModule',
    //canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadChildren: './pages/adduser/adduser.module#AdduserPageModule'
  },
  {
    path: 'staff/user',
    loadChildren: './pages/staff/list-user/user.module#UserPageModule'
  },
  {
    path: 'qrcode',
    //canActivate: [AuthGuard],
    loadChildren: './pages/staff/qrcode/qrcode.module#QrcodePageModule'
  },
  //{ path: 'detailuser', loadChildren: './pages/detailuser/detailuser.module#DetailuserPageModule' },
  {
    path: 'detailuser/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pages/staff/detailuser/detailuser.module#DetailuserPageModule'
  },
  {
    path: 'booking',
    //canActivate: [AuthGuard],
    loadChildren: './pages/user/booking/booking.module#BookingPageModule'
  },
  {
    path: 'workshop',
    //canActivate: [AuthGuard],
    loadChildren: './pages/staff/workshop/workshop.module#WorkshopPageModule'
  },
  {
    path: 'listbooking',
    loadChildren: './pages/staff/listbooking/listbooking.module#ListbookingPageModule'
  },
  {
    path: 'editbooking/:id',
    loadChildren: './pages/user/edit-booking/edit-booking.module#EditBookingPageModule',
    resolve: {
      special: DataResolverService
    },
    //canActivate: [AuthGuard]
  },
  {
    path: 'viewbooking',
    //canActivate: [AuthGuard],
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pages/user/view-booking/view-booking.module#ViewBookingPageModule'
  },
  { path: 'in-queue', loadChildren: './pages/staff/in-queue/in-queue.module#InQueuePageModule' },
  { path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfilePageModule' },
  { path: 'in-service', loadChildren: './pages/staff/in-service/in-service.module#InServicePageModule' },
  { path: 'password', loadChildren: './pages/user/password/password.module#PasswordPageModule' },
  { path: 'settings', loadChildren: './pages/user/settings/settings.module#SettingsPageModule' },
  { path: 'qualitycontrol', loadChildren: './pages/staff/qualitycontrol/qualitycontrol.module#QualitycontrolPageModule' },
  { path: 'assignservice', loadChildren: './pages/staff/assignservice/assignservice.module#AssignservicePageModule' },
  { path: 'model-interval', loadChildren: './pages/staff/model-interval/model-interval.module#ModelIntervalPageModule' },
  { path: 'item', loadChildren: './pages/staff/item/item.module#ItemPageModule' },
  { path: 'view-service', loadChildren: './pages/staff/view-service/view-service.module#ViewServicePageModule' },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
