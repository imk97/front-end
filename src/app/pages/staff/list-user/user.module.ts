import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
