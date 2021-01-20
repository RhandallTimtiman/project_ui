import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgxAuthRoutingModule } from "./auth-routing.module";
import { NbAuthModule } from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
} from "@nebular/theme";
import { NgxLoginComponent } from "./login/login.component";
import { NgxBlockComponent } from "./block/block.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbLayoutModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    NgxBlockComponent,
    NgxLoginComponent,
    // ... here goes our new components
  ],
})
export class NgxAuthModule {}
