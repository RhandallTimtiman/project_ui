import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { select, Store } from "@ngrx/store";
import { User } from "app/@core/model/user.model";
import { RootState, selectUser } from "app/@core/store";
import { ProductService } from "app/services/product/product.service";
import { Utilities } from "app/services/utilities/utilities.service";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "ngx-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  loading: boolean = false;

  user: any;

  constructor(
    protected ref: NbDialogRef<AddProductComponent>,
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
      name: ["", Validators.required],
      description: ["", Validators.required],
      quantity: ["", Validators.required],
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

  submitProduct() {
    this.loading = true;

    const data = {
      ...this.productForm.getRawValue(),
      user_id: this.user && this.user.user && this.user.user.id,
    };

    this.productService.addProduct(data).subscribe(
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
