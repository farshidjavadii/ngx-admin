/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { NbThemeOptions, NbThemeService } from "@nebular/theme";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private themeService : NbThemeService
  ) {

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    if(localStorage.getItem('theme') != 'null')
    this.themeService.changeTheme(localStorage.getItem('theme'));
    this.themeService.onThemeChange().subscribe((theme : NbThemeOptions) => {
      localStorage.setItem('theme', theme.name);
    });
  }
}
