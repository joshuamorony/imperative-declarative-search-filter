import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImperativePageRoutingModule } from './imperative-routing.module';

import { ImperativePage } from './imperative.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ImperativePageRoutingModule,
  ],
  declarations: [ImperativePage],
})
export class ImperativePageModule {}
