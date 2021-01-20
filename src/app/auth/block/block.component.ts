/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "nb-auth",
  styleUrls: ["./auth.component.scss"],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-auth-block>
          <router-outlet></router-outlet>
        </nb-auth-block>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgxBlockComponent implements OnDestroy {
  private alive = true;

  subscription: any;

  authenticated: boolean = false;
  token: string = "";

  // showcase of how to use the onAuthenticationChange method
  constructor() {
    // this.subscription = auth
    //   .onAuthenticationChange()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((authenticated: boolean) => {
    //     this.authenticated = authenticated;
    //   });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
