import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { RootState, selectUser } from "app/@core/store";
import { take } from "rxjs/operators";

import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  currentUser: any;

  menu: any[] = [];

  constructor(private store: Store<RootState>) {
    this.store.pipe(select(selectUser), take(1)).subscribe((result) => {
      this.currentUser = result.user;
    });

    // this.filterMenu();

    this.menu = MENU_ITEMS;
  }

  /**
   * Filter Menu
   *
   * @memberof PagesComponent
   */
  filterMenu() {
    let finalMenus = [];

    MENU_ITEMS.forEach((menuItem) => {
      console.log(menuItem);
      if (menuItem && menuItem.data) {
        if (menuItem.data.includes(this.currentUser.account_type)) {
          finalMenus.push(menuItem);
        }
      } else {
        let menuWithChild = menuItem.children
          .map((menu) => {
            if (menu.data.includes(this.currentUser.account_type)) {
              return menu;
            }
          })
          .filter((menu) => menu !== undefined || null);

        finalMenus.push({
          ...menuItem,
          children: menuWithChild,
        });
      }
    });

    this.menu = finalMenus;
  }
}
