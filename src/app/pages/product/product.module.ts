import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbLayoutModule,
  NbCardModule,
  NbTreeGridModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbSearchModule,
  NbDialogModule,
  NbInputModule,
  NbSpinnerModule,
  NbDatepickerModule,
} from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";
import { ProductComponent } from "./product.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { WarningComponent } from "../warning/warning.component";

@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    WarningComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbTreeGridModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbSearchModule,
    NbDialogModule,
    NbInputModule,
    NbSpinnerModule,
    NbDatepickerModule,
  ],
})
export class ProductModule {}
