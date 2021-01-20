import { Component, OnInit } from "@angular/core";
import {
  NbDialogService,
  NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { ProductService } from "app/services/product/product.service";
import { WarningComponent } from "../warning/warning.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";

@Component({
  selector: "ngx-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  displayedColumns = ["id", "name", "description", "quantity", "actions"];

  products = [];

  dataSource: NbTreeGridDataSource<any>;

  constructor(
    private productService: ProductService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getListOfProduct().subscribe((result) => {
      console.log(result);
      if (result.length != null) {
        result = result.map((product) => {
          return {
            data: {
              ...product,
            },
          };
        });

        this.products = result;

        this.dataSource = this.dataSourceBuilder.create(this.products);
      }
    });
  }

  ngOnInit(): void {}

  addProduct() {
    this.dialogService
      .open(AddProductComponent, {
        hasScroll: true,
        autoFocus: false,
      })
      .onClose.subscribe((result) => {
        if (result !== "" || result !== null || typeof result !== undefined) {
          if (result === "success") {
            this.toastrService.show("Data successfully Inserted", "Success", {
              status: "success",
            });
            this.getProducts();
          } else {
            this.toastrService.show(result.message, "Error", {
              status: "danger",
            });
          }
        }
      });
  }

  deleteProduct(productInfo: any) {
    this.dialogService
      .open(WarningComponent, {
        hasScroll: true,
        autoFocus: false,
      })
      .onClose.subscribe((result) => {
        if (result !== "" || result !== null || typeof result !== undefined) {
          if (result === "yes") {
            this.productService.deleteProduct(productInfo.id).subscribe(
              (result) => {
                if (result) {
                  this.toastrService.show(
                    "Data successfully Deleted",
                    "Success",
                    {
                      status: "success",
                    }
                  );
                  this.getProducts();
                }
              },
              (error) => {
                this.toastrService.show("Something went wrong!", "Error", {
                  status: "danger",
                });
              }
            );
          }
        }
      });
  }

  updateGroup(productInfo: any) {
    this.dialogService
      .open(EditProductComponent, {
        hasScroll: true,
        autoFocus: false,
        dialogClass: "modal-sm",
        context: {
          data: productInfo,
        },
      })
      .onClose.subscribe((result) => {
        if (result !== "" || result !== null || typeof result !== undefined) {
          if (result === "success") {
            this.toastrService.show("Data successfully Inserted", "Success", {
              status: "success",
            });
            this.getProducts();
          } else if (result === "error") {
            this.toastrService.show("Something went wrong!", "Error", {
              status: "danger",
            });
          }
        }
      });
  }
}
