import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QualitycontrolPage } from './qualitycontrol.page';

const routes: Routes = [
  {
    path: '',
    component: QualitycontrolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QualitycontrolPage]
})
export class QualitycontrolPageModule {}
