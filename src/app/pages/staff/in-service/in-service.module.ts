import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InServicePage } from './in-service.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const routes: Routes = [
  {
    path: '',
    component: InServicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InServicePage]
})
export class InServicePageModule {}
