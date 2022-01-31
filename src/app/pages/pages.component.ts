import {
  AfterViewInit,
  Component,
  HostListener,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { NbMenuBag, NbMenuService } from "@nebular/theme";

import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <div
      class="p-4 rightClickPage"
      *ngIf="showMenu"
      [style.left]="rightClickMenuPositionX"
      [style.top]="rightClickMenuPositionY"
    >
      <span (click)="newTabClick()" [hidden]="!newTabEnable">تب جدید</span>
      <hr [hidden]="!newTabEnable"/>
      <span>منو دوم</span>
    </div>

    <ngx-one-column-layout>
      <nb-menu
        [items]="menu"
        autoCollapse="true"
        (contextmenu)="displayContextMenu($event); (false)"
      ></nb-menu>

      <div class="col-12">
        <router-outlet *ngIf="!tabActive"></router-outlet>
        <nb-tabset
          *ngIf="tabActive"
          fullWidth
          (click)="onCloseIconClick($event.target)"
        >
          <nb-tab
            #allTheseThings
            *ngFor="let item of tabs; let i = index"
            [tabTitle]="item.title"
            [active]="item.active"
            [tabIcon]="item.icon"
          >
            <span><router-outlet></router-outlet></span>
          </nb-tab>
        </nb-tabset>
        <!-- <nb-route-tabset
          [tabs]="tabs"
          (click)="onClick($event.target)"
        ></nb-route-tabset> -->
      </div>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements AfterViewInit {

  constructor(private menuItem: NbMenuService, private router: Router) {
    //get current menu that not selected
    this.menuItem.onItemHover().subscribe((item) => {
      this.currentMenuhover = item;

      if(item.item.link)
      this.newTabEnable = true;
      else this.newTabEnable = false;
    });
    
    this.menuItem.onItemClick().subscribe((item) => {
      if (this.tabActive) {
        this.newTabClick();
        this.tabs[this.tabs.length - 1].active = true;
      }
    });
  }

  menu = MENU_ITEMS;
  tabActive: boolean = false;
  newTabEnable: boolean = false;
  tabs = [
    {
      title: "پیش فرض",
      route: "/pages/dashboard",
      active: true,
      icon: "home-outline",
    },
  ];
  @ViewChildren("allTheseThings") things: QueryList<any>;

  ngAfterViewInit(): void {
    this.things.changes.subscribe((t) => {
      this.router.navigate([this.currentMenuhover.item.link]);

      if (this.tabs.filter((m) => m.active).length == 0)
        this.tabs[this.tabs.length - 1].active = true;
    });
  }
  onCloseIconClick(tabElements: HTMLElement) {
    while (tabElements != null && tabElements.tagName != "NB-ICON") {
      tabElements = tabElements.parentElement;
    }
    if (tabElements == null) return;
    if (tabElements.querySelectorAll(".eva-close-outline").length > 0)
      this.tabs.forEach((value, index) => {
        if (
          value.title.toLocaleLowerCase() ==
          tabElements.parentElement.innerText.toLocaleLowerCase()
        )
          this.tabs.splice(index, 1);
      });
    this.tabs[this.tabs.length - 1].active = true;
  }
  newTabClick() {
    this.tabActive = true;
    this.tabs.find((m) => m.active == true).active = false;

    if (
      !this.tabs.some(
        (item) =>
          item.title.toLocaleLowerCase() ==
          this.currentMenuhover.item.title.toLocaleLowerCase()
      )
    ) {
      this.tabs.find((m) => m.icon == "home-outline").icon = "close-outline";
      this.tabs.push({
        title: this.currentMenuhover.item.title,
        active: true,
        route: this.currentMenuhover.item.link,
        icon: "home-outline",
      });
    } else {
      this.tabs.find(
        (m) =>
          m.title.toLocaleLowerCase() ==
          this.currentMenuhover.item.title.toLocaleLowerCase()
      ).active = true;
    }
  }

 





  //righ click menu item
  currentMenuhover: NbMenuBag;
  showMenu: boolean = false;
  rightClickMenuItems: Array<any> = [];
  rightClickMenuPositionX = "100px";
  rightClickMenuPositionY = "100px";

  @HostListener("document:click")
  clickout() {
    this.showMenu = false;
  }
  displayContextMenu(event) {
    this.rightClickMenuItems = [
      {
        menuText: "تب جدید",
        menuEvent: "newTabClick()",
      },
      {
        menuText: "منوی دوم",
        menuEvent: "",
      },
    ];

    this.rightClickMenuPositionX = event.clientX - 180 + "px";
    this.rightClickMenuPositionY = event.clientY + "px";

    this.showMenu = true;
  }
}
