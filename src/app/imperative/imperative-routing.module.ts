import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImperativePage } from './imperative.page';

const routes: Routes = [
  {
    path: '',
    component: ImperativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImperativePageRoutingModule {}
