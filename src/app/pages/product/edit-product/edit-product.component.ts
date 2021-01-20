import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { Store, select } from "@ngrx/store";
import { RootState, selectUser } from "app/@core/store";
import { ProductService } from "app/services/product/product.service";
import { Utilities } from "app/services/utilities/utilities.service";
import { take } from "rxjs/operators";

@Component({
  selector: "ngx-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;

  loading: boolean = false;

  @Input() data: any;

  user: any;

  constructor(
    protected ref: NbDialogRef<EditProductComponent>,
    private _formBuilder: FormBuilder,
    private productService: ProductService,
    private utilities: Utilities,
    private toastrService: NbToastrService,
    private store: Store<RootState>
  ) {
    this.store.pipe(select(selectUser), take(1)).subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      id: [""],
      user_id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      quantity: ["", Validators.required],
    });

    const { id, user_id, name, description, quantity } = this.data;

    this.productForm.setValue({
      id,
      user_id,
      name,
      description,
      quantity,
    });
  }

  dismiss() {
    this.ref.close();
  }

  hasError(field: string) {
    return (
      this.productForm.get(field).touched && this.productForm.get(field).invalid
    );
  }

  updateProduct() {
    this.loading = true;

    this.productService.updateProduct(this.productForm.getRawValue()).subscribe(
      (result) => {
        if (result) {
          this.loading = false;
          this.ref.close("success");
        }
      },
      (error) => {
        let message = this.utilities.parseError(error.errors);
        this.loading = false;
        this.toastrService.show(message, "Error", {
          status: "danger",
        });
      }
    );
  }
}
