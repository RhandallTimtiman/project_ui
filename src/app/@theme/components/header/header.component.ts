import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NbAuthService } from "@nebular/auth";
import { SharedService } from "app/services/shared/shared.service";
import { RootState, selectUser } from "app/@core/store";
import { select, Store } from "@ngrx/store";
import { User } from "app/@core/model/user.model";
import { SetUser } from "app/@core/store/user/user.action";
import { Router } from "@angular/router";
import { AuthGuardService } from "app/services/auth/auth-guard.service";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "cosmic";

  userMenu = [{ title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private nbMenuService: NbMenuService,
    private sharedService: SharedService,
    private store: Store<RootState>,
    private router: Router,
    private authService: NbAuthService
  ) {
    this.store
      .pipe(select(selectUser), takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.user = result;
        }
      });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.changeTheme("default");

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "user-menu-tag"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Log out") {
          this.logout();
        }
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  /**
   * Log out current sesssion
   *
   * @memberof HeaderComponent
   */
  logout() {
    this.authService.logout("email").subscribe((result) => {
      if (result.isSuccess) {
        console.log("herere");
        this.store.dispatch(new SetUser(null));
        this.router.navigate([`/auth`], {});
      }
    });
  }
}
